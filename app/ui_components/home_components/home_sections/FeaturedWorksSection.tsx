"use client";
import React from "react";
import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from "framer-motion";
import { springOptions } from "@/app/constants/animation_constants";
import { StaticImageData } from "next/image";
import ProjectViewCards from "@/app/ui_components/home_components/home_sections/components/project_view_card";
import ReverseProjectViewCards from "@/app/ui_components/home_components/home_sections/components/reverse_project_view_card";
import { ApplicationColor, ApplicationLinearGradient } from "@/app/constants/ui_constants";
import SectionTransition from "@/app/ui_components/home_components/home_sections/components/section_transition";
import SweatItMockup from "@/app/assets/FirstMockup.png";
import SweatItLogo from "@/app/assets/Dumbbell.png";
import MedfosysMockup from "@/app/assets/MedfosysMockup.png";
import SweatItWebsiteMockup from "@/app/assets/SweatItWebsiteMockup.png";
import MedfosysLogo from "@/app/assets/MedfosysIcon.png";

// MARK: Types
interface ProjectData {
  heading: string;
  body: string;
  iconBackground: string;
  image: StaticImageData;
  icon: StaticImageData;
  link: string;
  isReverse?: boolean;
}

// MARK: Constants
const FEATURED_PROJECTS: ProjectData[] = [
  {
    heading: "Sweat It Fitness",
    body: "Our fitness app helps you stay healthy with personalized workouts, diet plans, and progress tracking. It offers AI-powered recommendations, AR-based form correction, and syncs with wearables. Whether you're a beginner or advanced, the app adapts to your needs and keeps you motivated every step of the way.",
    iconBackground: ApplicationLinearGradient.current.appBackground,
    image: SweatItMockup,
    icon: SweatItLogo,
    link: "/sweatit",
    isReverse: false,
  },
  {
    heading: "Infosys HMS",
    body: "During my internship at Infosys, I developed a Hospital Management System using Swift. The app streamlined patient registration, appointment scheduling, and medical record management. It featured a clean UI, real-time data updates, and secure data handling, enhancing operational efficiency and improving the overall hospital workflow experience.",
    iconBackground: ApplicationLinearGradient.current.infosysHMSApp,
    image: MedfosysMockup,
    icon: MedfosysLogo,
    link: "/sweatit",
    isReverse: true,
  },
  {
    heading: "Sweat It Official Website",
    body: "I created a website for an existing fitness application to enhance its online presence. The site showcases features like workout plans, diet tracking, and progress monitoring. It includes a clean UI, responsive design, and links to download the app, helping users learn more and easily access the application.",
    iconBackground: ApplicationColor.current.appDarkBG,
    image: SweatItWebsiteMockup,
    icon: SweatItLogo,
    link: "/sweatit",
    isReverse: false,
  },
];

// MARK: Main Component
export default function FeaturedWorksSection(): React.ReactElement {
  const sectionRef = React.useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  const { scrollYProgress: reverseScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["end end", "end 50%"],
  });

  const headingUnderlineWidthRaw = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [0, 100]),
    springOptions
  );
  const headingUnderlineWidth = useMotionTemplate`${headingUnderlineWidthRaw}%`;
  const sectionOpacity = useTransform(reverseScrollProgress, [0, 1], [1, 0.5]);
  const sectionBlur = useTransform(reverseScrollProgress, [0, 1], ["blur(0)", "blur(2px)"]);

  return (
    <motion.section
      style={{ opacity: sectionOpacity, filter: sectionBlur }}
      ref={sectionRef}
      className="min-h-screen relative w-screen bg-white overflow-y-visible !pb-[20rem] overflow-x-hidden"
    >
      {/* MARK: Scroll Section Change Interaction */}
      <SectionTransition scrollYProgress={scrollYProgress} color="white" />

      {/* MARK: Section Heading */}
      <div className="w-full flex justify-center items-center">
        <h1 className="text-[3rem] !pt-[5rem] inline-block">
          Featured Works
          <motion.div
            style={{ width: headingUnderlineWidth, transformOrigin: "center" }}
            className="w-full h-[11px] bg-black rounded-full"
          />
        </h1>
      </div>

      {/* MARK: Featured Projects */}
      {FEATURED_PROJECTS.map((project, index) => {
        const ProjectComponent = project.isReverse ? ReverseProjectViewCards : ProjectViewCards;

        return (
          <ProjectComponent
            key={index}
            heading={project.heading}
            body={project.body}
            iconBackground={project.iconBackground}
            image={project.image}
            icon={project.icon}
            link={project.link}
          />
        );
      })}
    </motion.section>
  );
}
