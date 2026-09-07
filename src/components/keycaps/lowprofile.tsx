import { easeInOutExpo } from "@/lib/utils";
import { useKeyStyle } from "@/stores/key_style";
import { motion } from "motion/react";
import type { KeycapProps } from ".";
import { KeycapBase } from "./base";
import { PressCount } from "./press-count";

export const LowProfileKeycap = ({ event, isPressed, lastest }: KeycapProps) => {
    const color = useKeyStyle((state) => state.color);
    const text = useKeyStyle((state) => state.text);
    const border = useKeyStyle((state) => state.border);
    const modifier = useKeyStyle((state) => state.modifier);
    const showPressCount = useKeyStyle((state) => state.layout.showPressCount);

    const bgColor = event.isModifier() && modifier.highlight ? modifier.color : color.color;
    const secondaryColor = event.isModifier() && modifier.highlight ? modifier.secondaryColor : color.secondaryColor;
    const textColor = event.isModifier() && modifier.highlight ? modifier.textColor : text.color;
    const borderColor = event.isModifier() && modifier.highlight ? modifier.borderColor : border.color;

    return (
        <div
            style={{
                position: "relative",
                height: text.size * 2.5,
                minWidth: text.size * (event.isModifier() ? 2.5 : 2.25),
            }}
        >
            {(lastest && showPressCount && event.pressedCount > 1) && <PressCount count={event.pressedCount} />}
            <motion.div
                animate={{ y: isPressed ? text.size * 0.25 : 0 }}
                transition={{ ease: easeInOutExpo, duration: 0.1 }}
                style={{
                    zIndex: 2,
                    position: "relative",
                    height: text.size * 2.25,

                    paddingInline: text.size * (border.radius < 0.75 ? 0.5 : (0.5 + border.radius - 0.75)),
                    paddingBlock: text.size * 0.4,

                    fontSize: text.size,
                    color: textColor,

                    borderStyle: "solid",
                    borderWidth: border.enabled ? border.width : 0,
                    borderColor: borderColor,
                    borderRadius: border.radius * (text.size * 1.25),

                    background: bgColor,
                }}
            >
                <KeycapBase event={event} />
            </motion.div>
            <div
                style={{
                    position: "absolute",
                    height: text.size * 2.25,
                    width: "100%",
                    bottom: 0,
                    zIndex: 1,
                    borderStyle: "solid",
                    borderWidth: border.enabled ? border.width : 0,
                    borderColor: borderColor,
                    borderRadius: border.radius * (text.size * 1.25),

                    background: secondaryColor,
                }}
            />
        </div>
    );
};