import type { LucideProps } from "lucide-react";
import { forwardRef, type ReactNode } from "react";

// Factory function to create custom icons
function createCustomIcon(name: string, children: ReactNode) {
    const Icon = forwardRef<SVGSVGElement, LucideProps>(
        ({ color = "currentColor", size = 24, strokeWidth = 2, ...props }, ref) => (
            <svg
                ref={ref}
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
            >
                {children}
            </svg>
        )
    );
    Icon.displayName = name;
    return Icon;
}

export const ReturnIcon = createCustomIcon("ReturnIcon", (
    <>
        <path d="M11 6H15.5C17.9853 6 20 8.01472 20 10.5C20 12.9853 17.9853 15 15.5 15H4" />
        <path d="M6.99998 12C6.99998 12 4.00001 14.2095 4 15C3.99999 15.7906 7 18 7 18" />
    </>
));

export const MouseLeftClickIcon = createCustomIcon("MouseLeftClickIcon", (
    <>
        <path d="M5 11L5 15C5 18.866 8.13401 22 12 22C15.866 22 19 18.866 19 15V9C19 5.13401 15.866 2 12 2C10.9264 2 9.90926 2.24169 9 2.67363" />
        <path d="M12 6V10" />
        <circle cx="5" cy="6" r="2" />
    </>

));

export const MouseMiddleClickIcon = createCustomIcon("MouseMiddleClickIcon", (
    <>
        <path d="M19 9C19 5.13401 15.866 2 12 2C8.13401 2 5 5.13401 5 9V15C5 18.866 8.13401 22 12 22C15.866 22 19 18.866 19 15V9Z" />
        <circle cx="12" cy="8" r="2" />
    </>

));

export const MouseRightClickIcon = createCustomIcon("MouseRightClickIcon", (
    <>
        <path d="M19 11V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9C5 5.13401 8.13401 2 12 2C13.0736 2 14.0907 2.24169 15 2.67363" />
        <path d="M12 6V10" />
        <circle cx="19" cy="6" r="2" />
    </>
));

export const MouseRightDragIcon = createCustomIcon("MouseRightDragIcon", (
    <>
        <path d="M5.1851 18.9941C9.48005 21.4312 12.2743 19.1116 14.3687 15.5464C16.463 11.9811 17.1098 8.44303 12.8149 6.00594C8.51993 3.56885 5.72575 5.8884 3.63136 9.45367C1.53697 13.0189 0.890156 16.557 5.1851 18.9941Z" />
        <path d="M12 8L12.7192 6.70551C13.6233 5.07824 14.0753 4.26461 14.8427 4.05095C15.61 3.83729 16.393 4.30704 17.9589 5.24654L20.0351 6.49216C20.7231 6.90492 21.6028 6.65997 22 5.94505" />
        <path d="M12.25 10.299C12.483 9.89552 12.5995 9.69376 12.6254 9.49655C12.66 9.2336 12.5888 8.96767 12.4273 8.75726C12.3062 8.59946 12.1045 8.48297 11.701 8.25C11.2974 8.01703 11.0957 7.90054 10.8985 7.87458C10.6355 7.83996 10.3696 7.91122 10.1592 8.07267C10.0014 8.19376 9.88489 8.39552 9.65192 8.79904L9.15192 9.66506C8.91895 10.0686 8.80247 10.2703 8.7765 10.4675C8.74189 10.7305 8.81314 10.9964 8.9746 11.2068C9.09569 11.3646 9.29744 11.4811 9.70096 11.7141C10.1045 11.9471 10.3062 12.0636 10.5034 12.0895C10.7664 12.1241 11.0323 12.0529 11.2427 11.8914C11.4005 11.7703 11.517 11.5686 11.75 11.1651L12.25 10.299Z" />
    </>
));

export const MouseScrollUpIcon = createCustomIcon("MouseScrollIcon", (
    <>
        <path d="M19 9C19 5.13401 15.866 2 12 2C8.13401 2 5 5.13401 5 9V15C5 18.866 8.13401 22 12 22C15.866 22 19 18.866 19 15V9Z" />
        <path d="M12 7V12" />
        <path d="M14 8L12 6L10 8" />
    </>
));

export const MouseScrollDownIcon = createCustomIcon("MouseScrollIcon", (
    <>
        <path d="M19 9C19 5.13401 15.866 2 12 2C8.13401 2 5 5.13401 5 9V15C5 18.866 8.13401 22 12 22C15.866 22 19 18.866 19 15V9Z" />
        <path d="M12 7V12" />
        <path d="M10 10L12 12L14 10" />
    </>
));