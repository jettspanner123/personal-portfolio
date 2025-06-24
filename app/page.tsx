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

import {motion} from "framer-motion";


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

    const {isPageChanging} = useHomePageState();
    return (
        <React.Fragment>
            <main className={`w-screen relative min-h-screen bg-black`}>

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
                                    className={`flex-1 h-full bg-[#212121] pointer-events-none`}
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
                <WhatDoIDoSection/>


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
