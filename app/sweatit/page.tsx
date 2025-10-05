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



    return (
        <React.Fragment>
            <main
                className={`min-h-[200vh] min-w-screen relative`}
            >

                <motion.div
                    className={`flex justify-center uppercase items-center w-screen h-[20vh] absolute text-white text-[5rem] oswald font-medium z-[12] top-[5rem]`}
                >

                    {
                        "Sweat-It".split("").map((item: string, index: number): React.ReactElement => {

                            const leftMargin: number = item === "_" ? 20 : 0;
                            const rightMargin: number = item === "," ? 20 : 0;
                            return (
                                <motion.span
                                    animate={{ scaleY: 1 }}
                                    initial={{ scaleY: 0 }}
                                    transition={{
                                        duration: 0.7,
                                        delay: (index * 0.05) + 4,
                                    }}
                                    key={index}
                                    style={{marginLeft: leftMargin, marginRight: rightMargin}}
                                    className={``}
                                >
                                    {item !== "_" ? item : ""}
                                </motion.span>
                            )
                        })
                    }

                </motion.div>



                {/*MARK: Overlay*/}
                <motion.div
                    animate={{opacity: 1}}
                    initial={{opacity: 0}}
                    transition={{
                        duration: 2,
                        delay: 3.5,
                        ease: [0.61, 1, 0.88, 1]
                    }}
                    className={`w-screen origin-bottom h-[20vh] text-white uppercase flex justify-center items-center text-[5rem] oswald font-medium absolute z-[11] bg-gradient-to-t from-black to-transparent`}>


                </motion.div>


                {/*MARK: Hero Image*/}
                <motion.div
                    initial={{
                        y: "100%",
                        scale: 0.5,
                        borderRadius: "10rem"
                    }}
                    animate={{
                        height: "20vh",
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
                    className={`h-screen w-screen absolute top-0 overflow-hidden`}>
                    <Image
                        src={SweatItMockup}
                        alt={""}
                        className={`object-cover w-full h-full`}/>
                </motion.div>
            </main>
        </React.Fragment>
    )
}