"use client";
import React from "react";
import {motion, MotionValue, useMotionTemplate, useScroll, useSpring, useTransform} from "framer-motion";
import LiquidChrome from "@/app/effects/LiquidChrome";
import {springOptions} from "@/app/constants/animation_constants";

export interface NavbarPages {
    name: string;
}

export const navbarPages: Array<NavbarPages> = [
    {name: "Home"},
    {name: "Works"},
    {name: "About"},
    {name: "Contact"}
];

export default function LandingSection(): React.JSX.Element {


    // MARK: Values
    const {scrollYProgress} = useScroll();


    // MARK: Raw values
    const descriptionScrollTransformXRaw: MotionValue<number> = useSpring(useTransform(scrollYProgress, [0, 0.01], [0, 52 * -1]), springOptions);

    // MARK: True animation values
    const descriptionScrollTransformX: MotionValue<string> = useMotionTemplate`${descriptionScrollTransformXRaw}vw`;

    return (
        <React.Fragment>
            <main className={"w-screen h-screen relative"}>
                <motion.div
                    animate={{
                        scale: 1,
                        filter: "blur(0px)"
                    }}
                    initial={{
                        scale: 2,
                        filter: "blur(5px)"
                    }}
                    transition={{
                        duration: 2,
                        delay: 2.5,
                        ease: [0.83, 0, 0.17, 1]
                    }}
                    className={"h-full w-full relative"}>
                    <LiquidChrome
                        baseColor={[0.1, 0.1, 0.1]}
                        speed={0.08}
                        amplitude={0.6}
                        interactive={true}
                    />


                    {/*MARK: Actual content screen*/}
                    <section
                        className={"w-screen h-screen absolute top-0 z-[10] bg-black/50 !pt-[22.5vw] pointer-events-none"}>


                        {/*MARK: Navigation button*/}
                        <motion.div
                            animate={{
                                scaleX: 1
                            }}
                            initial={{
                                scaleX: 0,
                            }}
                            transition={{
                                duration: 1.5,
                                delay: 3.5,
                                ease: [0.83, 0, 0.17, 1]
                            }}
                            className={"flex justify-between border-[1px] border-white/50 items-center !mx-[2vw]"}>
                            {
                                navbarPages.map((page: NavbarPages, index: number): React.JSX.Element => {
                                    return (
                                        <motion.p
                                            role={"button"}
                                            whileHover={{
                                                backgroundColor: "white",
                                                color: "black"
                                            }}
                                            style={{
                                                backgroundColor: index === 0 ? "white" : "transparent",
                                                color: index === 0 ? "black" : "white"
                                            }}
                                            key={index}
                                            className={`text-white pointer-events-auto !p-[0.5rem] flex-1 text-center ${index !== 0 ? "border-l-[1px] border-white/50" : ""} blurBackground100`}>
                                            {page.name}
                                        </motion.p>
                                    )
                                })
                            }
                        </motion.div>

                        {/*MARK: Description*/}
                        <motion.span
                            className={"inline-block"}
                            style={{x: descriptionScrollTransformX}}>
                            <motion.p
                                initial={{
                                    x: "-50vw"
                                }}
                                animate={{
                                    x: 0
                                }}
                                transition={{
                                    duration: 1.5,
                                    delay: 3.5,
                                    ease: [0.76, 0, 0.24, 1]
                                }}
                                className={"text-white border-[1px] border-white/50 font-light text-[1.3vw] geist !m-[2vw] !p-[1vw] blurBackground100 max-w-[47.8vw] [@media(max-width:870px)]:max-w-[calc(100vw - 4vw)] [@media(max-width:870px)]:text-[2vw]"}>
                                I’m a creative Full Stack Developer who blends design and logic to craft digital
                                experiences that feel seamless, engaging, and alive.
                            </motion.p>
                        </motion.span>
                    </section>

                </motion.div>
            </main>
        </React.Fragment>
    )
}