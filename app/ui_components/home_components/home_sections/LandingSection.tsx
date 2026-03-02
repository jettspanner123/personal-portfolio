"use client";
import React from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import LiquidChrome from "@/app/effects/LiquidChrome";
import { springOptions } from "@/app/constants/animation_constants";
import { BiLinkExternal } from "react-icons/bi";
import SectionTransition from "@/app/ui_components/home_components/home_sections/components/section_transition";

// MARK: Types
export interface NavbarPages {
  name: string;
}

// MARK: Constants
export const NAVBAR_PAGES: NavbarPages[] = [
  { name: "Home" },
  { name: "Works" },
  { name: "About" },
  { name: "Contact" },
];

const SKILLS: string[] = [
  "Web Apps",
  "IOS Apps",
  "Desktop Dev",
  "UI/UX Design",
  "Graphics Designer",
];

const DESCRIPTION_TEXT = "I'm a creative Full Stack Developer who blends design and logic to craft digital experiences that feel seamless, engaging, and alive.";

// Animation constants
const ANIMATION_CONFIG = {
  initial: {
    scale: 2,
    filter: "blur(5px)",
  },
  animate: {
    scale: 1,
    filter: "blur(0px)",
  },
  transition: {
    duration: 2,
    delay: 2.5,
    ease: [0.83, 0, 0.17, 1] as const,
  },
  navigation: {
    duration: 1.5,
    delay: 3.5,
    ease: [0.83, 0, 0.17, 1] as const,
  },
  description: {
    duration: 1.5,
    delay: 3.5,
    ease: [0.76, 0, 0.24, 1] as const,
  },
  skills: {
    duration: 1.5,
    delay: 3.75,
    ease: [0.76, 0, 0.24, 1] as const,
  },
};

// MARK: Navigation Button Component
interface NavigationButtonProps {
  page: NavbarPages;
  index: number;
}

function NavigationButton({ page, index }: NavigationButtonProps): React.ReactElement {
  const isActive = index === 0;

  return (
    <motion.p
      role="button"
      whileHover={{
        backgroundColor: "white",
        color: "black",
      }}
      style={{
        backgroundColor: isActive ? "white" : "transparent",
        color: isActive ? "black" : "white",
      }}
      className={`text-white pointer-events-auto !p-[0.5rem] flex-1 text-center ${index !== 0 ? "border-l-[1px] border-white/50" : ""} relative`}
    >
      {page.name}
      <BiLinkExternal className="absolute top-1/2 -translate-y-1/2 right-2" />
    </motion.p>
  );
}

// MARK: Skill Item Component
interface SkillItemProps {
  skill: string;
  index: number;
}

function SkillItem({ skill, index }: SkillItemProps): React.ReactElement {
  return (
    <motion.p
      key={`skills-${index}`}
      className="text-white w-[23.5vw] border-[1px] border-white/50 font-light text-[1.3vw] geist !p-[1vw]"
    >
      {skill}
    </motion.p>
  );
}

// MARK: Main Component
export default function LandingSection(): React.ReactElement {
  const sectionRef = React.useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll();
  const { scrollYProgress: sectionTransitionScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // MARK: Scroll animations
  const descriptionScrollTransformXRaw = useSpring(
    useTransform(scrollYProgress, [0, 0.01], [0, -52]),
    springOptions
  );
  const skillsScrollTransformScaleRaw = useSpring(
    useTransform(scrollYProgress, [0, 0.02], [1, 0]),
    springOptions
  );
  const skillsScrollTransformXRaw = useSpring(
    useTransform(scrollYProgress, [0, 0.02], [0, -30]),
    springOptions
  );

  const descriptionScrollTransformX = useMotionTemplate`${descriptionScrollTransformXRaw}vw`;
  const skillsScrollTransformScale = useMotionTemplate`translateX(${skillsScrollTransformXRaw}vw) scale(${skillsScrollTransformScaleRaw})`;

  return (
    <motion.main
      ref={sectionRef}
      className="w-screen h-screen relative landing_screen"
    >
      <SectionTransition
        firstTransition
        scrollYProgress={sectionTransitionScrollProgress}
        color="white"
      />

      <motion.div
        animate={ANIMATION_CONFIG.animate}
        initial={ANIMATION_CONFIG.initial}
        transition={ANIMATION_CONFIG.transition}
        className="h-full w-full relative"
      >
        <LiquidChrome
          baseColor={[0.1, 0.1, 0.1]}
          speed={0.08}
          amplitude={0.6}
          interactive
        />

        {/* MARK: Content Section */}
        <section className="w-screen h-screen absolute top-0 z-[10] !pt-[22.5vw] pointer-events-none">
          {/* MARK: Navigation Buttons */}
          <motion.div
            animate={{ scaleX: 1 }}
            initial={{ scaleX: 0 }}
            transition={ANIMATION_CONFIG.navigation}
            className="flex blurBackground100 justify-between border-[1px] border-white/50 items-center !mx-[2vw]"
          >
            {NAVBAR_PAGES.map((page, index) => (
              <NavigationButton key={index} page={page} index={index} />
            ))}
          </motion.div>

          {/* MARK: Description */}
          <motion.span
            className="inline-block"
            style={{ x: descriptionScrollTransformX }}
          >
            <motion.p
              initial={{ x: "-50vw" }}
              animate={{ x: 0 }}
              transition={ANIMATION_CONFIG.description}
              className="text-white border-[1px] border-white/50 font-light text-[1.3vw] geist !m-[2vw] !p-[1vw] blurBackground100 w-[calc(100vw-4rem)] midscr:w-[50vw]"
            >
              {DESCRIPTION_TEXT}
            </motion.p>
          </motion.span>

          {/* MARK: Skills */}
          <motion.div
            animate={{ x: 0, rotate: 0 }}
            initial={{ x: "-30vw", rotate: "-15deg" }}
            className="origin-bottom-left"
            transition={ANIMATION_CONFIG.skills}
          >
            <motion.div
              style={{ transform: skillsScrollTransformScale }}
              animate={{ x: 0 }}
              initial={{ x: "-30vw" }}
              transition={ANIMATION_CONFIG.skills}
              className="!mx-[2vw] w-fit blurBackground100 origin-bottom-left"
            >
              {SKILLS.map((skill, index) => (
                <SkillItem key={`skills-${index}`} skill={skill} index={index} />
              ))}
            </motion.div>
          </motion.div>
        </section>
      </motion.div>
    </motion.main>
  );
}
