import { emit, listen, UnlistenFn } from '@tauri-apps/api/event';
import { create, StateCreator, StoreApi, UseBoundStore } from 'zustand';

// ───────────── Shared Payload ─────────────
interface StoreUpdateEventPayload<T> {
    key: keyof T;
    value: T[keyof T];
}

// ───────────── Zustand Middleware for Emitting Tauri Events (used by the Sender Window) ─────────────
function tauriEventMiddleware<T>(storeName: string, config: StateCreator<T>): StateCreator<T> {
    return (set: any, get: any, api: any) =>
        config(
            (partial, replace) => {
                // Get current state before update
                const oldState = get();

                // Perform the actual state update
                set(partial, replace);

                // Get state after update
                const updatedState = get();

                // Compare oldState and updatedState to find changes and emit events
                for (const key of Object.keys(updatedState) as Array<keyof T>) {
                    // Skip actions (functions) or properties that haven't changed
                    if (typeof updatedState[key] === 'function' || !oldState || !updatedState || updatedState[key] === oldState[key]) {
                        continue;
                    }

                    // Handle objects separately to check for deep changes,
                    // otherwise a simple reference check is enough.
                    // Zustand's immutable updates mean if a nested property changes,
                    // the parent object's reference also changes.
                    if (typeof updatedState[key] === 'object' && updatedState[key] !== null) {
                        // If the property is an object, compare its content shallowly
                        const oldObject = oldState[key] as object | undefined;
                        const newObject = updatedState[key] as object;

                        // Check if object reference changed OR if its content changed (for cases where ref might not change)
                        const objectChanged = oldObject !== newObject && (
                            Object.keys(newObject).length !== Object.keys(oldObject ?? {}).length ||
                            Object.keys(newObject).some(
                                nestedKey => newObject[nestedKey as keyof typeof newObject] !== (oldObject?.[nestedKey as keyof typeof oldObject])
                            )
                        );

                        if (objectChanged) {
                            emit(storeName, { key: key, value: updatedState[key] });
                        }
                    } else {
                        // For primitives (string, number, boolean, null, undefined)
                        emit(storeName, { key: key, value: updatedState[key] });
                    }
                }
            },
            get,
            api
        );
}

// ───────────── Zustand Store Creator ─────────────
type StoreFactory<T> = (isSender: boolean) => UseBoundStore<StoreApi<T>>;

function createSyncedStore<T>(
    storeName: string,
    storeDefaults: StateCreator<T>,
    middleware?: (config: StateCreator<T>) => StateCreator<T, any, any>,
): StoreFactory<T> {
    return (isSender: boolean) => {
        // Base configuration
        let config = storeDefaults;
        // If this is the Sender window, wrap with your Sync Emitter
        if (isSender) {
            config = tauriEventMiddleware(storeName, config);
        }
        // If additional middleware is provided, wrap with that as well
        if (middleware) {
            config = middleware(config);
        }
        // Create the store
        return create<T>()(config as StateCreator<T>);
    };
};

// ───────────── Listener for Receiving Updates (used by Receiver Windows) ─────────────
function listenForUpdates<T>(
    storeName: string,
    setState: (partial: T | Partial<T> | ((state: T) => T | Partial<T>), replace?: false) => void,
): Promise<UnlistenFn> {
    return listen<StoreUpdateEventPayload<T>>(storeName, (event) => {
        const { key, value } = event.payload;
        setState(() => {
            // Simply replace the top-level key. 
            // The sender emits the complete updated value for that key, 
            // so we don't need to merge. Merging causes issues with arrays.
            return { [key]: value } as Partial<T>;
        });
    });
}

// Export the events for convenience
export { createSyncedStore, listenForUpdates, type StoreUpdateEventPayload };
