"use client";
import React from "react";
import {
  motion,
  MotionValue,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { springOptions } from "@/app/constants/animation_constants";
import SectionTransition from "@/app/ui_components/home_components/home_sections/components/section_transition";
import SectionHeader from "@/app/ui_components/section_header/SectionHeader";

// MARK: Types
interface AnimatedWordProps {
  word: string;
  index: number;
  totalWords: number;
  scrollYProgress: MotionValue<number>;
}

// MARK: Constants
const DESCRIPTION_TEXT = "I specialize in creating modern, user-focused digital experiences across web, iOS, desktop, and cross-platform applications, combining frontend, backend, and UI/UX expertise to build seamless, functional, and engaging products that inspire and perform beautifully.";

const KEYWORD_COLORS: Record<string, string> = {
  "user-focused": "#9CCFFF",
  "web,": "#B7BDF7",
  "iOS,": "#FF9B51",
  combining: "#93BD57",
  "frontend,": "#93BD57",
  "cross-platform": "#E1D9BC",
  "beautifully.": "#D02752",
  engaging: "#9F8383",
  products: "#9F8383",
};

// MARK: Helper Functions
function getKeywordColor(word: string): string {
  return KEYWORD_COLORS[word] || "#fff";
}

// MARK: Animated Word Component
function AnimatedWord({ word, index, totalWords, scrollYProgress }: AnimatedWordProps): React.ReactElement {
  const start = index / totalWords;
  const end = start + (1 / totalWords);
  const opacity = useSpring(
    useTransform(scrollYProgress, [start, end], [0.15, 1]),
    springOptions
  );

  return (
    <motion.span
      style={{ opacity, color: getKeywordColor(word) }}
      className="!ml-[1vw]"
    >
      {word}
    </motion.span>
  );
}

// MARK: Main Component
export default function TechStackSection(): React.ReactElement {
  const sectionRef = React.useRef<HTMLElement>(null);
  const descriptionRef = React.useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  const headingUnderlineWidthRaw = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [0, 100]),
    springOptions
  );
  const headingUnderlineWidth = useMotionTemplate`${headingUnderlineWidthRaw}%`;

  const { scrollYProgress: reverseScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["end end", "end 50%"],
  });

  const sectionOpacity = useSpring(
    useTransform(reverseScrollProgress, [0, 1], [1, 0.5]),
    springOptions
  );
  const sectionBlur = useTransform(reverseScrollProgress, [0, 1], ["blur(0)", "blur(2px)"]);

  const { scrollYProgress: descriptionScrollYProgress } = useScroll({
    target: descriptionRef,
    offset: ["start 80%", "start 30%"],
  });

  const words = DESCRIPTION_TEXT.split(" ");

  return (
    <motion.section
      style={{ opacity: sectionOpacity, filter: sectionBlur }}
      className="min-h-[100vh] relative overflow-y-visible translate-y-[2px] !pb-[15rem] bg-black"
      ref={sectionRef}
    >
      <SectionTransition scrollYProgress={scrollYProgress} color="black" />

      {/* MARK: Section Header */}
      <div className={`flex justify-center items-center`}>
        <SectionHeader
          text="My Expertise"
          foregroundColor="white"
          underlineWidthProgress={headingUnderlineWidth}
        />
      </div>

      {/* MARK: Description */}
      <div ref={descriptionRef} className="w-screen !pb-[15rem] !mt-[10rem]">
        <p className="text-white font-bold oswald uppercase text-[3vw] flex flex-wrap justify-center items-center !px-[6rem]">
          {words.map((word, index) => (
            <AnimatedWord
              key={index}
              word={word}
              index={index}
              totalWords={words.length}
              scrollYProgress={descriptionScrollYProgress}
            />
          ))}
        </p>
      </div>
    </motion.section>
  );
}
