import { useKeyStyle } from "@/stores/key_style";
import { KeyEvent } from "@/types/event";
import { LowProfileKeycap } from "./lowprofile";
import { LaptopKeycap } from "./laptop";
import { MinimalKeycap } from "./minimal";
import { PBTKeycap } from "./pbt";

export interface KeycapProps {
    event: KeyEvent;
    isPressed: boolean;
    lastest: boolean;
}

const components = {
    minimal: MinimalKeycap,
    laptop: LaptopKeycap,
    lowprofile: LowProfileKeycap,
    pbt: PBTKeycap,
} as const;

export const Keycap = (props: KeycapProps) => {
    const style = useKeyStyle(state => state.appearance.style);
    const KeycapComponent = components[style];
    
    return <KeycapComponent {...props} />;
};
