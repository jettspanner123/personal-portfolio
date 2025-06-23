"use client";
import React from "react";
import {motion, MotionValue, useScroll, useSpring, useTransform} from "framer-motion";
import {springOptions} from "@/app/constants/animation_constants";


export default function WhatDoIDoSection(): React.ReactElement {

    const sectionRef: React.RefObject<HTMLElement | null> = React.useRef(null);
    const {scrollYProgress} = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"]
    });

    const headingUnderlineWidth = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);


    const firstContent: string = "I’m a full-stack developer with a strong passion for UI/UX and front-end development. I love crafting intuitive, visually engaging interfaces while also handling robust backend systems. My focus lies in building seamless, user-centric digital experiences—from clean code to thoughtful design, I bring both functionality and aesthetics together.";


    const firstParagraphRef: React.RefObject<HTMLParagraphElement | null> = React.useRef(null);

    const {scrollYProgress: firstParagraphScrollProgress} = useScroll({
        target: firstParagraphRef,
        offset: ["start end", "start 20%"]
    })

    const {scrollYProgress: reverseScrollProgress} = useScroll({
        target: sectionRef,
        offset: ["end end", "end 50%"]
    });

    const sectionOpacity: MotionValue<number> = useSpring(useTransform(reverseScrollProgress, [0, 1], [1, 0.5]), springOptions);
    const sectionBlur: MotionValue<string> = useTransform(reverseScrollProgress, [0, 1], ["blur(0)", "blur(2px)"]);
    React.useEffect(() => {
        sectionOpacity.on("change", newValue => {
            console.log(newValue);
        });
    }, [])


    return (
        <React.Fragment>
            <motion.section
                style={{opacity: sectionOpacity, filter: sectionBlur}}
                className={`min-h-[100vh] relative overflow-y-visible translate-y-[2px] !pb-[25rem]`}
                ref={sectionRef}>


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


                {/*MARK: Section header*/}
                <div className={`w-full flex justify-center text-white items-center`}>
                    <h1 className={`text-[3rem] !pt-[5rem] inline-block`}>
                        My Expertise

                        <motion.div
                            style={{width: headingUnderlineWidth, transformOrigin: "center"}}
                            className={`w-full h-[11px] bg-white rounded-full`}/>
                    </h1>
                </div>


                <div className={`w-screen !pb-[15rem] !mt-[10rem]`}>


                    {/*MARK: Scroll text animation thing*/}
                    <p ref={firstParagraphRef}
                       className={`text-white flex flex-wrap roboto font-semibold text-[3.125rem] uppercase  w-[80%] !mx-auto text-justify`}>
                        {firstContent.split(" ").map((word: string, index: number): React.ReactElement => {
                            let start = index / firstContent.split(" ").length;
                            let end = start + (1 / firstContent.split(" ").length);
                            const rawOpacity = useTransform(firstParagraphScrollProgress, [start, end], [0, 1]);
                            const opacity = useSpring(rawOpacity, springOptions);

                            return (
                                <span key={index}>
                                    <span style={{opacity: 0.15}} className={`text-white absolute !ml-[12px]`}>
                                       {word}
                                    </span>

                                    <motion.span
                                        style={{opacity}}
                                        className={`text-white !ml-[12px] !mt-[12px]`}>
                                        {word}
                                    </motion.span>
                                </span>
                            )
                        })}
                    </p>

                </div>

            </motion.section>
        </React.Fragment>
    )
}