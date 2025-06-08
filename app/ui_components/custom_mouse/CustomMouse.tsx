import React from "react";
import {MouseHoverStateOptions, useMouseHoverState} from "@/app/stores/mouse_store";
import {AnimatePresence, motion} from "framer-motion";
import {springOptions} from "@/app/constants/animation_constants";
import {GrLinkNext} from "react-icons/gr";


export default function CustomMouse(): React.ReactElement {

    const {mouseSize, mouseHoverState, showMouseHover} = useMouseHoverState();

    const [mousePosition, setMousePosition] = React.useState<{ x: number; y: number }>({x: 0, y: 0});

    React.useEffect((): () => void => {
        window.addEventListener("mousemove", (event: MouseEvent) => {
            setMousePosition({x: event.clientX - (mouseSize / 2), y: event.clientY - (mouseSize / 2)});
        })

        return () => window.removeEventListener("mousemove", () => {
        });
    }, [mouseSize]);
    return (
        <motion.div
            animate={{
                x: mousePosition.x, y: mousePosition.y, height: mouseSize, scale: showMouseHover ? 1 : 0
            }}
            transition={{
                ...springOptions,
            }}
            className={`aspect-square rounded-full flex justify-center items-center fixed z-[1000] bg-blue-300 pointer-events-none`}>
            <AnimatePresence mode={"wait"}>
                {mouseHoverState === MouseHoverStateOptions.Link && (
                    <motion.div
                        animate={{scale: 1, rotate: -40}}
                        initial={{scale: 0, rotate: -90}}
                        exit={{scale: 0, rotate: -90}}
                    >
                        <GrLinkNext size={20}/>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}