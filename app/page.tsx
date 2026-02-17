"use client";
import React from "react";
import LandingSection, {
    NavbarPages,
    navbarPages
} from "../app/ui_components/home_components/home_sections/LandingSection";
import InitialLoader from "@/app/ui_components/landing_loader/InitialLoader";
import FeaturedWorksSection from "@/app/ui_components/home_components/home_sections/FeaturedWorksSection";
import CustomMouse from "@/app/ui_components/custom_mouse/CustomMouse";
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
import {springOptions} from "@/app/constants/animation_constants";
import {RxCross1} from "react-icons/rx";
import {CiMenuBurger} from "react-icons/ci";
import {useMouseHoverState} from "@/app/stores/mouse_store";


// MARK: Image import

export default function Home(): React.JSX.Element {


    React.useEffect((): void => {
        (
            async () => {
                const locomotiveScroll = (await import("locomotive-scroll")).default;
                const LocomotiveScroll = new locomotiveScroll();
            }
        )()
    }, []);

    React.useEffect(()=> {
        window.scrollTo(0, 0);
    }, []);

    const {scrollYProgress} = useScroll();

    // MARK: State
    const [isFullScreenNavbarOpen, setIsFullScreenNavbarOpen] = React.useState<boolean>(false);


    scrollYProgress.on("change", (e: number): void => {
        if (e < 0.08) {
            if (isFullScreenNavbarOpen) setIsFullScreenNavbarOpen(false);
        }
    })

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

    const {toggleShowMouseHover} = useMouseHoverState();
    return (
        <React.Fragment>
            {/*MARK: Top Navbar heading*/}
            <motion.h1
                style={{fontSize: headingSize, top: headingTopPosition, left: headingLeftPosition}}
                className={"text-white z-[1000] overflow-hidden w-full flex justify-start items-center pointer-events-none mix-blend-difference font-bold oswald text-center fixed leading-none text-nowrap uppercase"}>
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
                onMouseEnter={() => toggleShowMouseHover()}
                onMouseLeave={() => toggleShowMouseHover()}
                whileHover={{
                    cursor: "pointer",
                    opacity: 0.8
                }}
                whileTap={{
                    opacity: 0.5
                }}
                onClick={(): void => setIsFullScreenNavbarOpen(!isFullScreenNavbarOpen)}
                style={{scale: hamburgerScale}}
                animate={{
                    backgroundColor: isFullScreenNavbarOpen ? "#ffffff" : "#0E0E0E"
                }}
                transition={{
                    backgroundColor: {
                        duration: 0.5,
                        delay: 0.5
                    }
                }}
                className={`h-[8vh] aspect-square rounded-full border-[0.5px] border-white/50 z-[1000] fixed  right-[6.2vw] top-[2.5vh] flex justify-center items-center`}>

                <AnimatePresence mode={"wait"}>
                    {!isFullScreenNavbarOpen ? (
                        <motion.div
                            key={"full-screen-menu-open-button"}
                            initial={{scale: 0}}
                            animate={{
                                scale: 1
                            }}
                            exit={{scale: 0}}
                            transition={{
                                duration: 0.5,
                                ease: [0.65, 0, 0.35, 1],
                            }}
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
                            transition={{
                                duration: 0.5,
                                ease: [0.65, 0, 0.35, 1],
                            }}
                        >
                            <RxCross1 color={"black"} size={25}/>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <motion.main
                className={`w-screen relative min-h-screen bg-[#0E0E0E] origin-bottom-left`}>
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
            </motion.main>
        </React.Fragment>
    );
}