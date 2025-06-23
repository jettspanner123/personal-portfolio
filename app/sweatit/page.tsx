"use client";
import React from "react";
import SweatItMockup from "../assets/FirstMockup.png";
import Image from "next/image";
import {motion, useScroll, useSpring, useTransform} from "framer-motion";
import {springOptions} from "@/app/constants/animation_constants";

export default function Page(): React.ReactElement {

    React.useEffect(() => {
        (
            async () => {
                const locomotiveScroll = (await import("locomotive-scroll")).default;
                const LocomotiveScroll = new locomotiveScroll();
            }
        )()
    }, []);


    const heroImageContainerRef = React.useRef<HTMLDivElement | null>(null);
    const {scrollYProgress} = useScroll({});

    const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 30]), springOptions);
    return (
        <React.Fragment>
            <main
                className={`min-h-[200vh] min-w-screen relative`}
            >

                <div className={`h-[30vh] absolute w-screen flex items-end justify-center z-[11]`}>
                    <motion.h1
                        animate={{ opacity: 1}}
                        initial={{ opacity: 0}}
                        transition={{
                            duration: 1,
                            delay: 3
                        }}
                        className={`relative text-[7rem] blurBackground w-screen text-center uppercase font-medium text-white bottom-0 translate-y-[40%]`}>
                        {"Sweat-ItAIFitness".split("").map((item: string, index: number): React.ReactElement => {

                            function leftMargin(index: number): number {
                                if (index === 8 || index === 10) return 25;
                                else return 0;
                            }

                            return (
                                <motion.span
                                    animate={{
                                        scaleY: 1
                                    }}
                                    initial={{ scaleY: 0}}
                                    transition={{
                                        duration: 1,
                                        delay: (index * 0.05) + 4   
                                    }}
                                    style={{
                                        marginLeft: leftMargin(index),
                                        transformOrigin: "bottom"
                                    }}
                                    key={index}
                                    className={`inline-block`}
                                >
                                    {item}
                                </motion.span>
                            )
                        })}
                    </motion.h1>
                </div>


                {/*MARK: Hero Image*/}
                <motion.div
                    initial={{
                        y: "100%",
                        scale: 0.5,
                        borderRadius: "10rem"
                    }}
                    animate={{
                        height: "30vh",
                        y: "0%",
                        scale: 1,
                        borderRadius: "0",
                    }}
                    transition={{
                        height: {
                            delay: 1.7,
                            duration: 2,
                            ease: [0.85, 0, 0.15, 1]
                        },
                        y: {
                            duration: 2,
                            ease: [0.85, 0, 0.15, 1]
                        },
                        scale: {
                            duration: 2,
                            ease: [0.85, 0, 0.15, 1]
                        },
                        borderRadius: {
                            duration: 2,
                            ease: [0.85, 0, 0.15, 1],
                        }
                    }}
                    className={`h-screen w-screen absolute bg-blue-300 top-0 overflow-hidden`}>
                    <Image
                        src={SweatItMockup}
                        alt={""}
                        className={`object-cover w-full h-full`}/>
                </motion.div>
            </main>
        </React.Fragment>
    )
}