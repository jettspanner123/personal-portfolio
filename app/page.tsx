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
    return (
        <React.Fragment>
            <main className={`w-screen relative min-h-screen bg-black`}>

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
                <ExperienceSection />


                {/*MARK: Skillset section*/}
                <SkillSetSection />
            </main>
        </React.Fragment>
    );
}
