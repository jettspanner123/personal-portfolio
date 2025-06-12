import React from "react";
import {motion, MotionValue, useScroll, useSpring, useTransform} from "framer-motion";
import {springOptions} from "@/app/constants/animation_constants";
import {FaLinkedin, FaTwitter} from "react-icons/fa6";
import MouseMagnetic from "@/app/ui_components/magnetic_mouse/MagneticMouse";


export default function ContactSection(): React.ReactElement {

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

    const linkedInScale = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), springOptions);
    const twitterScale = useSpring(useTransform(scrollYProgress, [0.5, 1], [0, 1]), springOptions);

    return (
        <React.Fragment>
            <motion.section
                ref={sectionRef}
                className={`min-h-[100vh] h-screen relative overflow-y-visible bg-black flex overflow-hidden`}>
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


                <div className={`flex-1 h-full flex flex-col`}>

                    <div className={`flex-1/3 w-full`}>

                    </div>

                    <div
                        ref={headingContainerRef}
                        className={`flex-1 w-full flex justify-start items-end`}>
                        <h1 className={`text-[10rem] uppercase font-bold !px-[2rem] text-white`}>
                            {
                                "contact".split("").map((item: string, index: number): React.ReactElement => {
                                    const start: number = index / "contact".length;
                                    const end: number = start + (1 / "contact".length);
                                    let y = useSpring(useTransform(headingScrollProgress, [start, end], [200, 0]), springOptions);
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
                    <div className={`!p-[3rem] flex items-center justify-end gap-[1rem]`}>


                        {/*MARK: Linked in button*/}
                        <MouseMagnetic>
                            <motion.div
                                style={{scale: linkedInScale}}
                                whileHover={{scale: 1.25, zIndex: 100, position: "relative"}}
                                className={`h-[6rem] blurBackground aspect-square border-white hover:cursor-pointer border-[1px] rounded-full grid place-items-center text-center`}>
                                <MouseMagnetic>
                                    <div className={`h-[6rem] aspect-square flex justify-center items-center`}>
                                        <FaLinkedin size={30} className={`text-white`}/>
                                    </div>
                                </MouseMagnetic>
                            </motion.div>
                        </MouseMagnetic>


                        {/*MARK: Twitter button*/}
                        <MouseMagnetic>
                            <motion.div
                                style={{scale: twitterScale}}
                                whileHover={{scale: 1.25, zIndex: 100, position: "relative"}}
                                className={`h-[6rem] blurBackground aspect-square border-white hover:cursor-pointer border-[1px] rounded-full grid place-items-center text-center`}>
                                <MouseMagnetic>
                                    <div className={`h-[6rem] aspect-square flex justify-center items-center`}>
                                        <FaTwitter size={30} className={`text-white`}/>
                                    </div>
                                </MouseMagnetic>
                            </motion.div>
                        </MouseMagnetic>
                    </div>
                </div>
            </motion.section>
        </React.Fragment>
    )
}