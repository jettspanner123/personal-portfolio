"use client";
import React from "react";
import {motion, MotionValue, useMotionTemplate, useScroll, useSpring, useTransform} from "framer-motion";
import {springOptions} from "@/app/constants/animation_constants";

// MARK: Image imports
import MyProfileImage from "@/app/assets/Me.jpeg";
import Image from "next/image";
import {useMouseHoverState} from "@/app/stores/mouse_store";
import SectionTransition from "@/app/ui_components/home_components/home_sections/components/section_transition";


export default function AboutSection(): React.ReactElement {
    const {toggleShowMouseHover} = useMouseHoverState();

    const sectionRef: React.RefObject<HTMLElement | null> = React.useRef(null);
    const {scrollYProgress} = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"]
    })


    const imageScale = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), springOptions);

    const headingUnderlineWidthRaw: MotionValue<number> = useSpring(useTransform(scrollYProgress, [0, 0.5], [0, 100]), springOptions);
    const headingUnderlineWidth: MotionValue<string> = useMotionTemplate`${headingUnderlineWidthRaw}%`;

    const aboutMeContent: string = "For over 2 years I have been striving to create bold experiences that connect brands with their audience through design that resonates.";
    const aboutMeSubContent: string = "Specializing in digital design, motion design. I strive to give each project a unique personality and visual design."
    return (
        <React.Fragment>
            <section
                onMouseEnter={() => {
                    toggleShowMouseHover();
                }}
                onMouseLeave={() => {
                    toggleShowMouseHover();
                }}
                className={`min-h-screen w-full bg-white relative`}
                ref={sectionRef}>

                <SectionTransition scrollYProgress={scrollYProgress} color={"white"} />


                {/*MARK: Section header*/}
                <div className={`w-full flex justify-center text-black items-center`}>
                    <h1 className={`text-[3rem] !pt-[5rem] inline-block`}>
                        My Profile

                        <motion.div
                            style={{width: headingUnderlineWidth, transformOrigin: "center"}}
                            className={`w-full h-[11px] bg-black rounded-full`}/>
                    </h1>
                </div>


                <div className={`w-full !px-[6rem] !mx-auto h-screen !mt-[10rem] flex`}>

                    <div className={`flex-1 h-full`}>

                        <h1
                            style={{lineHeight: 1}}
                            className={`text-[3.5rem] geist font-light flex flex-wrap`}
                        >
                            {aboutMeContent.split(" ").map((item: string, index: number): React.ReactElement => {
                                const start: number = index / aboutMeContent.split(" ").length;
                                const end: number = start + (1 / aboutMeContent.split(" ").length);
                                const scale: MotionValue<number> = useSpring(useTransform(scrollYProgress, [start, end], [0, 1]), springOptions);
                                const filter: MotionValue<string> = useTransform(scrollYProgress, [start, end], ["blur(5px)", "blur(0px)"]);
                                return (
                                    <motion.span
                                        key={index}
                                        className={`!ml-[12px]`}
                                        style={{scale, filter, transformOrigin: "left"}}
                                    >
                                        {item}
                                    </motion.span>
                                )
                            })}
                        </h1>


                        <h1
                            style={{lineHeight: 1}}
                            className={`text-[1.5rem] geist font-light flex flex-wrap !mt-[10rem] w-[50%]`}
                        >
                            {aboutMeSubContent.split(" ").map((item: string, index: number): React.ReactElement => {
                                const start: number = index / aboutMeContent.split(" ").length;
                                const end = start + (1 / aboutMeContent.split(" ").length);
                                const filter = useTransform(scrollYProgress, [start, end], ["blur(10px)", "blur(0px)"]);
                                return (
                                    <motion.span
                                        key={index}
                                        className={`!ml-[12px]`}
                                        style={{filter, transformOrigin: "left"}}
                                    >
                                        {item}
                                    </motion.span>
                                )
                            })}
                        </h1>

                        <motion.button
                            whileHover={{
                                background: "black",
                                color: "white",
                            }}
                            className={`geist font-light !mt-[2rem] !ml-[0.75rem] text-black text-[1rem] !p-[1rem] border-[0.5px] border-black rounded-full hover:cursor-pointer`}>
                            Download CV
                        </motion.button>
                    </div>


                    {/*MARK: Profile image*/}
                    <div
                        className={`flex-1 h-full relative justify-end flex`}>
                        <motion.div
                            style={{scale: imageScale, transformOrigin: "top right"}}
                        >
                            <Image src={MyProfileImage} alt={""} style={{width: "700px", height: "900px"}}/>
                        </motion.div>
                    </div>

                </div>

            </section>
        </React.Fragment>
    )
}