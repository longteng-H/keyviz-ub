export type Alignment =
    | 'top-left' | 'top-center' | 'top-right'
    | 'center-left' | 'center' | 'center-right'
    | 'bottom-left' | 'bottom-center' | 'bottom-right';


export const alignmentForRow: Record<Alignment, Pick<React.CSSProperties, 'justifyContent' | 'alignItems'>> = {
    'top-left': { justifyContent: 'flex-start', alignItems: 'flex-start' },
    'top-center': { justifyContent: 'center', alignItems: 'flex-start' },
    'top-right': { justifyContent: 'flex-end', alignItems: 'flex-start' },
    'center-left': { justifyContent: 'flex-start', alignItems: 'center' },
    'center': { justifyContent: 'center', alignItems: 'center' },
    'center-right': { justifyContent: 'flex-end', alignItems: 'center' },
    'bottom-left': { justifyContent: 'flex-start', alignItems: 'flex-end' },
    'bottom-center': { justifyContent: 'center', alignItems: 'flex-end' },
    'bottom-right': { justifyContent: 'flex-end', alignItems: 'flex-end' },
};

export const alignmentForColumn: Record<Alignment, Pick<React.CSSProperties, 'justifyContent' | 'alignItems'>> = {
    'top-left': { justifyContent: 'flex-start', alignItems: 'flex-start' },
    'top-center': { justifyContent: 'flex-start', alignItems: 'center' },
    'top-right': { justifyContent: 'flex-start', alignItems: 'flex-end' },
    'center-left': { justifyContent: 'center', alignItems: 'flex-start' },
    'center': { justifyContent: 'center', alignItems: 'center' },
    'center-right': { justifyContent: 'center', alignItems: 'flex-end' },
    'bottom-left': { justifyContent: 'flex-end', alignItems: 'flex-start' },
    'bottom-center': { justifyContent: 'flex-end', alignItems: 'center' },
    'bottom-right': { justifyContent: 'flex-end', alignItems: 'flex-end' },
};