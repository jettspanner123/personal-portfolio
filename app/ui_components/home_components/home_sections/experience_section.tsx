"use client";
import React from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { springOptions } from "@/app/constants/animation_constants";
import { StaticImageData } from "next/image";
import SectionHeader from "@/app/ui_components/section_header/SectionHeader";
import SweatItLogo from "@/app/assets/Dumbbell.png";

// MARK: Types
interface ExperienceProps {
  name: string;
  company_name: string;
  duration: string;
  logo: StaticImageData;
}

interface AccomplishmentsProps {
  name: string;
  company_name: string;
  hackathon_name: string;
  date: string;
}

interface AnimatedListItemProps {
  item: ExperienceProps | AccomplishmentsProps;
  columns: Array<{ key: string; alignment: "left" | "end" }>;
}

interface TableHeaderProps {
  columns: string[];
  alignments: Array<"left" | "end">;
}

// MARK: Constants
const EXPERIENCES: ExperienceProps[] = [
  {
    name: "Front End Developer",
    company_name: "Cantiliver Labs",
    duration: "December, 2023",
    logo: SweatItLogo,
  },
  {
    name: "Technical Head",
    company_name: "Geeks For Geeks",
    duration: "2023-2025",
    logo: SweatItLogo,
  },
  {
    name: "Software Intern",
    company_name: "Infosys, Mysuru",
    duration: "February, 2025",
    logo: SweatItLogo,
  },
  {
    name: "Front End/UI UX",
    company_name: "HelioWeb, Bikaner",
    duration: "June, 2025",
    logo: SweatItLogo,
  },
  {
    name: "Full Stack Developer",
    company_name: "JungleWorks, Mohali",
    duration: "Feb, 2026",
    logo: SweatItLogo,
  },
];

const ACCOMPLISHMENTS: AccomplishmentsProps[] = [
  {
    name: "Regionals Winner",
    company_name: "Geeks For Geeks",
    hackathon_name: "Solving For India Hackathon",
    date: "March, 2023",
  },
  {
    name: "Larry Page UI Expert",
    company_name: "CodingNinjas",
    hackathon_name: "UI/UX Comp",
    date: "May, 2023",
  },
  {
    name: "Runner Up",
    company_name: "Geeks For Geeks",
    hackathon_name: "Solving For India Hackathon",
    date: "September, 2024",
  },
];

const EXPERIENCE_COLUMNS = [
  { label: "Position", alignment: "left" as const },
  { label: "Company", alignment: "left" as const },
  { label: "Timestamp", alignment: "end" as const },
];

const ACCOMPLISHMENT_COLUMNS = [
  { label: "Award", alignment: "left" as const },
  { label: "Event", alignment: "left" as const },
  { label: "Date", alignment: "end" as const },
];

// MARK: Table Header Component
function TableHeader({ columns, alignments }: TableHeaderProps): React.ReactElement {
  return (
    <div className="flex justify-between w-full opacity-50">
      {columns.map((column, index) => (
        <h1
          key={column}
          className={`text-[1.5rem] oswald flex-1 ${alignments[index] === "end" ? "text-end" : "text-left"}`}
        >
          {column}
        </h1>
      ))}
    </div>
  );
}

// MARK: Animated List Item Component
function AnimatedListItem({ item, columns }: AnimatedListItemProps): React.ReactElement {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end 80%"],
  });

  const scale = useSpring(
    useTransform(scrollYProgress, [0, 1], [0.8, 1]),
    springOptions
  );
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, 0]),
    springOptions
  );
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.div
      ref={ref}
      style={{ transform, willChange: "transform" }}
      className="w-full border-t-[0.5px] border-black flex justify-between"
    >
      {columns.map(({ key, alignment }) => (
        <h1
          key={key}
          className={`text-[1.75rem] geist text-light !py-[1.5rem] flex-1 ${alignment === "end" ? "text-end" : "text-left"}`}
        >
          {item[key as keyof typeof item]}
        </h1>
      ))}
    </motion.div>
  );
}

// MARK: Main Component
export default function ExperienceSection(): React.ReactElement {
  const sectionRef = React.useRef<HTMLElement>(null);
  const accomplishmentHeadingRef = React.useRef<HTMLHeadingElement>(null);

  const { scrollYProgress: headingScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 50%"],
  });


  const headingUnderlineWidthRaw = useSpring(
    useTransform(headingScrollProgress, [0, 0.5], [0, 100]),
    springOptions
  );
  const headingUnderlineWidth = useMotionTemplate`${headingUnderlineWidthRaw}%`;

  // Column configurations for mapping data
  const experienceDataColumns = [
    { key: "name", alignment: "left" as const },
    { key: "company_name", alignment: "left" as const },
    { key: "duration", alignment: "end" as const },
  ];

  const accomplishmentDataColumns = [
    { key: "name", alignment: "left" as const },
    { key: "hackathon_name", alignment: "left" as const },
    { key: "date", alignment: "end" as const },
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-white w-screen !pb-[5rem] overflow-x-hidden"
    >
      {/* MARK: Section Header */}
      <div className="w-full flex text-black !px-[7.3rem] justify-center !mt-[10rem] !mb-[5rem]">
        <SectionHeader
          foregroundColor="black"
          text="My Experience"
          underlineWidthProgress={headingUnderlineWidth}
        />
      </div>

      <div className="flex-1/3 h-full !px-[7rem] !pt-[7rem]">
        {/* MARK: Experience Section */}
        <TableHeader
          columns={EXPERIENCE_COLUMNS.map((col) => col.label)}
          alignments={EXPERIENCE_COLUMNS.map((col) => col.alignment)}
        />

        {EXPERIENCES.map((item, index) => (
          <AnimatedListItem
            key={index}
            item={item}
            columns={experienceDataColumns}
          />
        ))}

        {/* MARK: Accomplishments Section */}
        <h1
          ref={accomplishmentHeadingRef}
          className="text-[1.5rem] oswald text-left flex-1 justify-start !mt-[5rem] opacity-50"
        >
          Accomplishments
        </h1>

        <TableHeader
          columns={ACCOMPLISHMENT_COLUMNS.map((col) => col.label)}
          alignments={ACCOMPLISHMENT_COLUMNS.map((col) => col.alignment)}
        />

        {ACCOMPLISHMENTS.map((item, index) => (
          <AnimatedListItem
            key={index}
            item={item}
            columns={accomplishmentDataColumns}
          />
        ))}
      </div>
    </section>
  );
}
