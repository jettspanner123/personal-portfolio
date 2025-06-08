import React from "react";
import {motion} from "framer-motion";

interface MouseMagneticProps {
    children: React.ReactNode;
}

export default function MouseMagnetic({children}: MouseMagneticProps): React.JSX.Element {

    const [mousePosition, setMousePosition] = React.useState<{ x: number, y: number }>({x: 0, y: 0});

    const elementRef: React.RefObject<HTMLDivElement | null> = React.useRef(null);

    function mouseMoveHandler(e: React.MouseEvent<HTMLDivElement>): void {
        if (!elementRef.current) return;
        const {clientX, clientY} = e;
        const {height, width, left, top} = elementRef.current.getBoundingClientRect();

        const x: number = clientX - (left + width / 2);
        const y: number = clientY - (top + height / 2);

        setMousePosition({x, y});
    }

    function mouseLeaveHandler(e: React.MouseEvent<HTMLDivElement>): void {
        setMousePosition({x: 0, y: 0});
    }

    return (
        <motion.div
            onMouseMove={mouseMoveHandler}
            onMouseLeave={mouseLeaveHandler}
            ref={elementRef}
            animate={{ x: mousePosition.x, y: mousePosition.y }}
            transition={{ mass: 3, stiffness: 20, duration: 0.4 }}
        >
            {children}
        </motion.div>
    )
}