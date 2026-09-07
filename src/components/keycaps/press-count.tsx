import { useKeyStyle } from "@/stores/key_style";
import { motion } from "motion/react";

// bug: clips when background enabled and border radius is greater than 50%
export const PressCount = ({ count }: { count: number }) => {
    const text = useKeyStyle((state) => state.text);
    const color = useKeyStyle(state => state.color.color);
    const borderRadius = useKeyStyle(state => state.border.radius);
    const appearance = useKeyStyle(state => state.appearance);

    const style = {
        width: text.size * 0.75,
        height: text.size * 0.75,
        color: color,
        backgroundColor: text.color,
        fontSize: text.size * 0.4,
        borderRadius: `${borderRadius * 100}%`,
    }

    if (appearance.animation === 'none') {
        return <div className="absolute z-10 top-0 right-0 flex items-center justify-center font-bold translate-x-1/4 -translate-y-1/4" style={style}>
            {count}
        </div>;
    }

    return (
        <motion.div
            className="absolute z-10 top-0 right-0 flex items-center justify-center font-bold translate-x-1/4 -translate-y-1/4"
            style={style}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: appearance.animationDuration / 2 }}
        >
            {count}
        </motion.div>
    );
};