import { darken, easeInOutExpo } from "@/lib/utils";
import { useKeyStyle } from "@/stores/key_style";
import { motion } from "motion/react";
import { KeycapProps } from ".";
import { KeycapBase } from "./base";
import { PressCount } from "./press-count";

export const PBTKeycap = ({ event, isPressed, lastest }: KeycapProps) => {
    const color = useKeyStyle((state) => state.color);
    const text = useKeyStyle((state) => state.text);
    const border = useKeyStyle((state) => state.border);
    const modifier = useKeyStyle((state) => state.modifier);
    const showPressCount = useKeyStyle((state) => state.layout.showPressCount);

    const bgColor = event.isModifier() && modifier.highlight ? modifier.color : color.color;
    const secondaryBgColor = event.isModifier() && modifier.highlight ? modifier.secondaryColor : color.secondaryColor;
    const textColor = event.isModifier() && modifier.highlight ? modifier.textColor : text.color;
    const borderColor = event.isModifier() && modifier.highlight ? modifier.borderColor : border.color;

    return (
        <div
            style={{
                position: "relative",
                height: text.size * 2.75,
                minWidth: text.size * (event.isModifier() ? 3 : 2.75),
                borderRadius: border.radius * (text.size * 1.25),
                background: color.useGradient
                    ? `linear-gradient(to bottom right, ${secondaryBgColor}, ${darken(secondaryBgColor, 0.2)})`
                    : secondaryBgColor,
                boxShadow: `0 0 0 ${border.enabled ? border.width : 0}px ${borderColor}`,
            }}
        >
            {(lastest && showPressCount && event.pressedCount > 1) && <PressCount count={event.pressedCount} />}
            <motion.div
                animate={{ y: isPressed ? text.size * 0.15 : 0 }}
                transition={{ ease: easeInOutExpo, duration: 0.1 }}
                style={{
                    height: text.size * 2.2,
                    minWidth: text.size * 2,

                    marginInline: text.size * 0.3,
                    paddingInline: text.size * (border.radius < 0.75 ? 0.5 : (0.5 + border.radius - 0.75)),
                    paddingBlock: text.size * 0.4,

                    fontSize: text.size,
                    color: textColor,

                    borderBottom: `.06em solid ${bgColor}`,
                    borderRadius: border.radius * (text.size * 1.25),

                    background: color.useGradient
                        ? `linear-gradient(to right, ${darken(bgColor, 0.1)}, ${bgColor})`
                        : bgColor,

                    boxShadow: color.useGradient ? '' : `0 0 0 ${border.enabled ? border.width : 0}px ${borderColor}`,
                }}
            >
                <KeycapBase event={event} />
            </motion.div>
        </div>
    );
}