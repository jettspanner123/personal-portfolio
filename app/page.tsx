"use client";
import React from "react";
import LandingSection from "../app/ui_components/home_components/home_sections/LandingSection";
import InitialLoader from "@/app/ui_components/landing_loader/InitialLoader";
import FeaturedWorksSection from "@/app/ui_components/home_components/home_sections/FeaturedWorksSection";
import CustomMouse from "@/app/ui_components/custom_mouse/CustomMouse";
import WhatDoIDoSection from "@/app/ui_components/home_components/home_sections/TechStackSection";
import AboutSection from "@/app/ui_components/home_components/home_sections/AboutSection";
import ExperienceSection from "@/app/ui_components/home_components/home_sections/experience_section";
import SkillSetSection from "@/app/ui_components/home_components/home_sections/skllset_section";
import ContactSection from "@/app/ui_components/home_components/home_sections/contact_section";
import {useHomePageState} from "@/app/stores/homepage_store";

import {
    AnimatePresence,
    motion,
    MotionValue,
    useMotionTemplate,
    useScroll,
    useSpring,
    useTransform
} from "framer-motion";
import TechStackSection from "@/app/ui_components/home_components/home_sections/TechStackSection";
import {useMotion} from "@react-three/drei";
import {springOptions} from "@/app/constants/animation_constants";
import MouseMagnetic from "@/app/ui_components/magnetic_mouse/MagneticMouse";
import LightRays from "@/app/effects/LightRays";
import {GiHamburgerMenu} from "react-icons/gi";
import {RxColumns, RxCross1} from "react-icons/rx";
import {CiMenuBurger} from "react-icons/ci";


// MARK: Image imports

export default function Home(): React.JSX.Element {

    React.useEffect((): void => {
        (
            async () => {
                const locomotiveScroll = (await import("locomotive-scroll")).default;
                const LocomotiveScroll = new locomotiveScroll();
            }
        )()
    }, []);

    const {scrollYProgress} = useScroll();

    // MARK: State
    const [isFullScreenNavbarOpen, setIsFullScreenNavbarOpen] = React.useState<boolean>(false);


    // MARK: Raw values
    const headingSizeRaw: MotionValue<number> = useSpring(useTransform(scrollYProgress, [0, 0.08], [22.5, 3]), springOptions);
    const headingLeftPositionRaw: MotionValue<number> = useSpring(useTransform(scrollYProgress, [0, 0.08], [0, 6.2]), springOptions);
    const headingTopPositionRaw: MotionValue<number> = useSpring(useTransform(scrollYProgress, [0, 0.08], [0, 5]), springOptions);


    // MARK: Transformed values
    const headingSize: MotionValue<string> = useMotionTemplate`${headingSizeRaw}vw`;
    const headingTopPosition: MotionValue<string> = useMotionTemplate`${headingTopPositionRaw}vh`;
    const headingLeftPosition: MotionValue<string> = useMotionTemplate`${headingLeftPositionRaw}vw`;
    const hamburgerScale: MotionValue<number> = useSpring(useTransform(scrollYProgress, [0.05, 0.08, 0.9, 0.96], [0, 1, 1, 0]), springOptions);

    const {isPageChanging} = useHomePageState();
    return (
        <React.Fragment>

            {/*MARK: Top Navbar heading*/}
            <motion.h1
                style={{fontSize: headingSize, top: headingTopPosition, left: headingLeftPosition}}
                className={"text-white z-[10] overflow-hidden w-full flex justify-start items-center pointer-events-none mix-blend-difference font-bold oswald text-center fixed leading-none text-nowrap uppercase"}>
                {
                    "uddeshya".split("").map((item: string, index: number): React.JSX.Element => {
                        return (
                            <motion.span
                                animate={{
                                    y: 0
                                }}
                                initial={{
                                    y: "-40vw"
                                }}
                                transition={{
                                    duration: 2,
                                    delay: 3 + (index * 0.05),
                                    ease: [0.65, 0, 0.35, 1],
                                }}
                                className={"inline-block"}
                                key={index}>
                                {item}
                            </motion.span>
                        )
                    })
                }
            </motion.h1>


            {/*MARK: Top Navbar Hamburger*/}
            <motion.div
                onClick={(): void => setIsFullScreenNavbarOpen(!isFullScreenNavbarOpen)}
                style={{scale: hamburgerScale}}
                className={"h-[8vh] aspect-square rounded-full bg-[#0E0E0E] border-[0.5px] border-white/50 z-[13] fixed  right-[6.2vw] top-[2.5vh] flex justify-center items-center"}>

                <AnimatePresence mode={"wait"}>
                    {!isFullScreenNavbarOpen ? (
                        <motion.div
                            key={"full-screen-menu-open-button"}
                            initial={{scale: 0}}
                            animate={{
                                scale: 1
                            }}
                            exit={{scale: 0}}
                        >
                            <CiMenuBurger color={"white"} size={25}/>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={"full-screen-menu-close-button"}
                            initial={{scale: 0}}
                            animate={{
                                scale: 1
                            }}
                            exit={{scale: 0}}
                        >
                            <RxCross1 color={"white"} size={25}/>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <FullScreenMenu isShow={isFullScreenNavbarOpen} setShow={setIsFullScreenNavbarOpen}/>
            <main className={`w-screen relative min-h-screen bg-[#0E0E0E]`}>


                {/*MARK: Page change animation*/}
                <div className={`h-screen w-screen fixed z-[11] flex pointer-events-none`}>
                    {
                        [0, 1, 2, 3, 4, 5].map((item: number, index: number): React.ReactElement => {

                            return (
                                <motion.div
                                    animate={{
                                        y: isPageChanging ? "0vh" : "-110vh",
                                        backgroundColor: isPageChanging ? "#000000" : "#212121"
                                    }}
                                    initial={false}
                                    transition={{
                                        y: {
                                            duration: 1.5,
                                            ease: [0.85, 0, 0.15, 1],
                                            delay: index * 0.05
                                        },
                                        backgroundColor: {
                                            delay: 1,
                                            duration: 1
                                        }
                                    }}
                                    key={index}
                                    className={`flex-1 h-full bg-[#0E0E0E] pointer-events-none`}
                                >
                                </motion.div>
                            )
                        })
                    }
                </div>


                {/*MARK: Custom Mouse*/}
                <CustomMouse/>

                {/*MARK: Loading Screen*/}
                <InitialLoader/>


                {/*MARK: Lading screens*/}
                <LandingSection/>


                {/*MARK: Featured Word Screen*/}
                <FeaturedWorksSection/>


                {/*MARK: Tech stack section*/}
                <TechStackSection/>


                {/*MARK: ABout me section*/}
                <AboutSection/>


                {/*MARK: Experice section*/}
                <ExperienceSection/>


                {/*MARK: Skillset section*/}
                <SkillSetSection/>

                {/*MARK: contact me section*/}
                <ContactSection/>
            </main>
        </React.Fragment>
    );
}


function FullScreenMenu({isShow, setShow}: {
    isShow: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}): React.JSX.Element {
    return (
        <React.Fragment>
            <motion.nav
                initial={{clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"}}
                animate={{
                    clipPath: isShow ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "polygon(0 0, 100% 0, 100% 0, 0 0)"
                }}
                transition={{
                    duration: 1.1,
                    ease: [0.85, 0, 0.15, 1],
                    delay: 0.1
                }}
                className={"bg-[#0E0E0E] h-screen w-screen fixed top-0 z-[11] overflow-hidden"}>

            </motion.nav>


            <motion.div
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: isShow ? 1 : 0
                }}
                transition={{
                    duration: .5,
                    delay: isShow ? 0.9 : 0
                }}
                className={"h-screen w-screen z-[12] fixed pointer-events-none"}>
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#ffffff"
                    raysSpeed={1}
                    lightSpread={1}
                    rayLength={1.2}
                    followMouse={true}
                    mouseInfluence={0.15}
                    noiseAmount={0.1}
                    distortion={0.05}
                    className="custom-rays"
                />
            </motion.div>
        </React.Fragment>

    );
}
