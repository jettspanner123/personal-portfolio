"use client";
import React from "react";
import {motion, MotionValue, useScroll, useSpring, useTransform} from "framer-motion";
import {springOptions} from "@/app/constants/animation_constants";
import {FaLinkedin, FaTwitter} from "react-icons/fa6";
import MouseMagnetic from "@/app/ui_components/magnetic_mouse/MagneticMouse";
import {MouseHoverStateOptions, useMouseHoverState} from "@/app/stores/mouse_store";


export default function ContactSection(): React.ReactElement {

    const {toggleFor, toggleShowMouseHover} = useMouseHoverState();


    const sectionRef = React.useRef<HTMLElement | null>(null);
    const headingContainerRef = React.useRef<HTMLDivElement | null>(null);

    const {scrollYProgress} = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"]
    });

    const {scrollYProgress: headingScrollProgress} = useScroll({
        target: sectionRef,
        offset: ["start 20%", "start start"]
    });

    const emailYScale = useSpring(useTransform(scrollYProgress, [0, 1], [1000, 0]), springOptions);
    const phoneYScale = useSpring(useTransform(scrollYProgress, [0.25, 1], [1000, 0]), springOptions);

    const linkedInScale: MotionValue<number> = useSpring(useTransform(headingScrollProgress, [0, 1], [0, 1]), springOptions);
    const twitterScale: MotionValue<number> = useSpring(useTransform(headingScrollProgress, [0.25, 1], [0, 1]), springOptions);

    return (
        <React.Fragment>
            <motion.section
                ref={sectionRef}
                className={`min-h-[100vh] h-screen relative overflow-y-visible bg-black flex `}>
                <div className={`flex absolute w-screen h-screen top-[-100vh] pointer-events-none`}>
                    {
                        // [4,3,0,1,2]
                        [0, 1, 2, 3, 4].map((item: number, index: number): React.ReactElement => {
                            const rawScaleY: MotionValue<number> = useTransform(scrollYProgress, [Math.max((item) / 10, 0), 1], [0, 1]);
                            const scaleY: MotionValue<number> = useSpring(rawScaleY, springOptions);
                            return (
                                <motion.div
                                    style={{
                                        scaleY,
                                        transformOrigin: "bottom"
                                    }}
                                    key={index}
                                    className={`h-screen flex-1 bg-black`}>
                                </motion.div>
                            )
                        })
                    }
                </div>


                <div className={`flex-1 h-full flex flex-col overflow-hidden`}>


                    {/*MARK: Mouse Interaction*/}
                    <div
                        className={`flex-1/3 w-full overflow-hidden flex justify-center items-center !pr-[9vh]`}>
                        <h1
                            className={`text-[20rem] font-bold oswald text-white`}>
                            U
                        </h1>
                    </div>

                    <div
                        ref={headingContainerRef}
                        className={`flex-1 w-full flex justify-start items-end`}>
                        <h1 className={`text-[12rem] uppercase font-bold !px-[2rem] text-white`}>
                            {
                                "contact".split("").map((item: string, index: number): React.ReactElement => {
                                    const start: number = index / "contact".length;
                                    const end: number = start + (1 / "contact".length);
                                    let y: MotionValue<number> = useSpring(useTransform(headingScrollProgress, [start, end], [200, 0]), springOptions);
                                    return (
                                        <motion.span
                                            style={{y}}
                                            key={index}
                                            className={`inline-block`}
                                        >
                                            {item}
                                        </motion.span>
                                    )
                                })
                            }
                        </h1>
                    </div>
                </div>


                <div className={`flex-1 h-full flex flex-col`}>
                    {/*MARK: Dual action button*/}
                    <div
                        onMouseEnter={() => {
                            toggleShowMouseHover();
                        }}
                        onMouseLeave={() => {
                            toggleShowMouseHover();
                        }}
                        className={`!p-[3rem] flex items-center justify-end gap-[1rem]`}>

                        {/*MARK: Linked in button*/}
                        <motion.div
                            style={{scale: linkedInScale}}
                        >
                            <MouseMagnetic>
                                <motion.div
                                    whileHover={{scale: 1.25, zIndex: 100, position: "relative"}}
                                    className={`h-[6rem] blurBackground aspect-square border-white hover:cursor-pointer border-[1px] rounded-full grid place-items-center text-center`}>
                                    <MouseMagnetic>
                                        <div className={`h-[6rem] aspect-square flex justify-center items-center`}>
                                            <FaLinkedin size={30} className={`text-white`}/>
                                        </div>
                                    </MouseMagnetic>
                                </motion.div>
                            </MouseMagnetic>
                        </motion.div>


                        {/*MARK: Twitter button*/}
                        <motion.div
                            style={{scale: twitterScale}}
                        >
                            <MouseMagnetic>
                                <motion.div
                                    whileHover={{scale: 1.25, zIndex: 100, position: "relative"}}
                                    className={`h-[6rem] blurBackground aspect-square border-white hover:cursor-pointer border-[1px] rounded-full grid place-items-center text-center`}>
                                    <MouseMagnetic>
                                        <div className={`h-[6rem] aspect-square flex justify-center items-center`}>
                                            <FaTwitter size={30} className={`text-white`}/>
                                        </div>
                                    </MouseMagnetic>
                                </motion.div>
                            </MouseMagnetic>
                        </motion.div>
                    </div>


                    <div className={`w-full flex-1 !p-[3rem]`}>
                        <motion.h1
                            style={{x: emailYScale}}
                            onMouseEnter={() => {
                                toggleFor(MouseHoverStateOptions.Email)
                            }}
                            onMouseLeave={() => {
                                toggleFor(MouseHoverStateOptions.None)
                            }}
                            className={`text-[2rem] relative geist font-light text-white/30 hover:text-white text-right border-t-[0.5px] border-b-[0.5px] border-white/50 hover:border-white transition-colors duration-300 !p-[2rem]`}
                        >
                            uddeshya872@gmail.com

                            <p className={`absolute top-1/2 -translate-y-1/2 oswald uppercase text-[1.5rem]`}>Email</p>
                        </motion.h1>

                        <motion.h1
                            style={{x: phoneYScale}}
                            onMouseEnter={() => {
                                toggleFor(MouseHoverStateOptions.Phone)
                            }}
                            onMouseLeave={() => {
                                toggleFor(MouseHoverStateOptions.None)
                            }}
                            className={`text-[2rem] geist font-light relative text-white/30 hover:text-white text-right border-t-[0.5px] border-b-[0.5px] border-white/50 hover:border-white !p-[2rem] transition-colors duration-300`}
                        >
                            +91 9875660105
                            <p className={`absolute top-1/2 -translate-y-1/2 oswald uppercase text-[1.5rem] font-normal`}>Phone</p>
                        </motion.h1>
                    </div>

                    <div className={`w-full flex-1 bg-blue-300`}>

                    </div>
                </div>
            </motion.section>
        </React.Fragment>
    )
}