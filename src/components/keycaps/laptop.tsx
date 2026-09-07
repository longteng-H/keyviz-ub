import { darken, lighten } from "@/lib/utils";
import { useKeyStyle } from "@/stores/key_style";
import type { KeycapProps } from ".";
import { KeycapBase } from "./base";
import { PressCount } from "./press-count";

export const LaptopKeycap = ({ event, lastest, isPressed }: KeycapProps) => {
    const color = useKeyStyle((state) => state.color);
    const text = useKeyStyle((state) => state.text);
    const border = useKeyStyle((state) => state.border);
    const modifier = useKeyStyle((state) => state.modifier);
    const showPressCount = useKeyStyle((state) => state.layout.showPressCount);

    const bgColor = event.isModifier() && modifier.highlight ? modifier.color : color.color;
    const textColor = event.isModifier() && modifier.highlight ? modifier.textColor : text.color;
    const borderColor = event.isModifier() && modifier.highlight ? modifier.borderColor : border.color;

    return (
        <div
            style={{
                position: "relative",
                height: text.size * 2.25,
                minWidth: text.size * (event.isModifier() ? 2.5 : 2.25),

                paddingInline: text.size * (border.radius < 0.75 ? 0.5 : (0.5 + border.radius - 0.75)),
                paddingBlock: text.size * 0.4,

                fontSize: text.size,
                color: textColor,

                borderRadius: border.radius * (text.size * 1.25),

                background: color.useGradient
                    ? `linear-gradient(oklch(from ${bgColor} clamp(0, calc(l + 0.1), 1) c h), ${bgColor})`
                    : bgColor,

                boxShadow: [
                    isPressed ? `inset 0 .05em .2em 0 ${darken(bgColor, 0.2)}` : `inset 0 .05em .1em 0 ${lighten(bgColor, 0.2)}`,
                    border.enabled && `0 0 0 ${border.width}px ${borderColor}`,
                    `0 .1em .1em 0 #00000080`,
                ].filter(Boolean).join(", "),

                transition: "box-shadow 0.1s ease",
            }}
        >
            {(showPressCount && lastest && event.pressedCount > 1) && <PressCount count={event.pressedCount} />}
            <KeycapBase event={event} />
        </div>
    );
};