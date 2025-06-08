import React from "react";
import {motion, MotionValue, useScroll, useSpring, useTransform} from "framer-motion";
import {springOptions} from "@/app/constants/animation_constants";
import ProjectViewCards from "@/app/ui_components/home_components/home_sections/project_view_card";
import ReverseProjectViewCards from "@/app/ui_components/home_components/home_sections/reverse_project_view_card";
import {MouseHoverStateOptions, useMouseHoverState} from "@/app/stores/mouse_store";
import {ApplicationColor, ApplicationLinearGradient} from "@/app/constants/ui_constants";


export default function FeaturedWorksSection(): React.ReactElement {

    const {toggleFor, mouseHoverState, mouseSize} = useMouseHoverState();

    const sectionRef: React.RefObject<HTMLElement | null> = React.useRef(null);

    const {scrollYProgress} = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"]
    });


    const headingUnderlineWidth = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);


    React.useEffect(() => {
        console.log(mouseHoverState, mouseSize);
    }, [mouseHoverState, mouseSize]);


    return (
        <React.Fragment>
            <section
                ref={sectionRef}
                className={`h-screen relative w-screen bg-white overflow-y-visible`}>


                {/*MARK: Scroll Section Change Interaction*/}
                <div className={`flex absolute w-screen h-screen top-[-100vh]`}>
                    {
                        // [4,3,0,1,2]
                        [0, 1, 2, 3, 4].map((item: number, index: number): React.ReactElement => {
                            const rawScaleY: MotionValue<number> = useTransform(scrollYProgress, [Math.max((item) / 10, 0), 1], [0, 1]);
                            const scaleY: MotionValue<number> = useSpring(rawScaleY, springOptions);
                            return (
                                <motion.div
                                    style={{
                                        scaleY,
                                        transformOrigin: "bottom"
                                    }}
                                    key={index}
                                    className={`h-screen flex-1 bg-white pointer-events-none`}>
                                </motion.div>
                            )
                        })
                    }
                </div>


                {/*MARK: Actual Section*/}

                {/*MARK: Section Heading*/}

                <div className={`w-full flex justify-center items-center`}>
                    <h1 className={`text-[3rem] !pt-[5rem] inline-block`}>
                        Featured Works

                        <motion.div style={{width: headingUnderlineWidth, transformOrigin: "center"}}
                                    className={`w-full h-[11px] bg-black rounded-full`}/>
                    </h1>
                </div>


                {/*MARK: First project*/}
                <ProjectViewCards
                    heading={"Sweat It Fitness"}
                    body={"Our fitness app helps you stay healthy with personalized workouts, diet plans, and progress tracking. It offers AI-powered recommendations, AR-based form correction, and syncs with wearables. Whether you’re a beginner or advanced, the app adapts to your needs and keeps you motivated every step of the way."}
                    iconBackground={ApplicationColor.current.appDarkBG}
                />
                <ReverseProjectViewCards
                    heading={"Infosys HMS"}
                    body={"During my internship at Infosys, I developed a Hospital Management System using Swift. The app streamlined patient registration, appointment scheduling, and medical record management. It featured a clean UI, real-time data updates, and secure data handling, enhancing operational efficiency and improving the overall hospital workflow experience."}
                    iconBackground={ApplicationLinearGradient.current.infosysHMSApp}
                />


                <div
                    onMouseEnter={() => toggleFor(MouseHoverStateOptions.Link)}
                    onMouseLeave={() => toggleFor(MouseHoverStateOptions.Link)}
                    className={`w-full bg-red-300 h-[50rem]`}>

                </div>

                <div className={`w-full h-[50rem]`}>

                </div>

                <div className={`w-full h-[50rem]`}>

                </div>


            </section>
        </React.Fragment>
    )
}



