"use client";
import React from "react";
import {MouseHoverStateOptions, useMouseHoverState} from "@/app/stores/mouse_store";
import {AnimatePresence, motion} from "framer-motion";
import {springOptions} from "@/app/constants/animation_constants";
import {GrLinkNext} from "react-icons/gr";
import {CiRead} from "react-icons/ci";
import {MdEmail} from "react-icons/md";
import {FaPhoneAlt} from "react-icons/fa";


export default function CustomMouse(): React.ReactElement {

    const {mouseSize, mouseHoverState, showMouseHover} = useMouseHoverState();

    const [mousePosition, setMousePosition] = React.useState<{ x: number; y: number }>({x: 0, y: 0});
    const [mouseOutOfView, setMouseOutOfView] = React.useState(false);

    React.useEffect((): () => void => {
        window.addEventListener("mousemove", (event: MouseEvent) => {
            setMousePosition({x: event.clientX - (mouseSize / 2), y: event.clientY - (mouseSize / 2)});
        })

        window.addEventListener("mouseleave", () => {
            setMouseOutOfView(true);
        })

        window.addEventListener("mouseenter", () => {
            setMouseOutOfView(false);
        })

        return () => window.removeEventListener("mousemove", () => {
        });
    }, [mouseSize]);
    return (
        <motion.div
            animate={{
                x: mousePosition.x, y: mousePosition.y, height: mouseSize, scale: showMouseHover ? 1 : 0, opacity: mouseOutOfView ? 0 : 1
            }}
            transition={{
                ...springOptions,
            }}
            className={`aspect-square rounded-full fixed z-[1000] mix-blend-difference bg-white pointer-events-none`}>

            {/*MARK: When link*/}
            <AnimatePresence mode={"wait"}>
                {mouseHoverState === MouseHoverStateOptions.Link && (
                    <motion.div
                        animate={{scale: 1, rotate: -40}}
                        initial={{scale: 0, rotate: -90}}
                        exit={{scale: 0, rotate: -90}}
                        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
                    >
                        <GrLinkNext size={20}/>
                    </motion.div>
                )}
            </AnimatePresence>


            {/*MARK: When read*/}
            <AnimatePresence mode={"wait"}>
                {mouseHoverState === MouseHoverStateOptions.Read && (
                    <motion.div
                        animate={{scale: 1, rotate: 0}}
                        initial={{scale: 0, rotate: 90}}
                        exit={{scale: 0, rotate: 90}}
                        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
                    >
                        <CiRead size={20}/>
                    </motion.div>
                )}
            </AnimatePresence>


            <AnimatePresence mode={"wait"}>
                {mouseHoverState === MouseHoverStateOptions.Email && (
                    <motion.div
                        animate={{scale: 1, rotate: 0}}
                        initial={{scale: 0, rotate: 90}}
                        exit={{scale: 0, rotate: 90}}
                        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
                    >
                        <MdEmail size={20}/>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode={"wait"}>
                {mouseHoverState === MouseHoverStateOptions.Phone && (
                    <motion.div
                        animate={{scale: 1, rotate: 0}}
                        initial={{scale: 0, rotate: 90}}
                        exit={{scale: 0, rotate: 90}}
                        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
                    >
                        <FaPhoneAlt size={20}/>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}