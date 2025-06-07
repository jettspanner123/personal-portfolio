import React from "react";
import {motion, MotionValue, useScroll, useSpring, useTransform} from "framer-motion";
import {springOptions} from "@/app/constants/animation_constants";
import ProjectViewCards from "@/app/ui_components/home_components/home_sections/project_view_card";
import ReverseProjectViewCards from "@/app/ui_components/home_components/home_sections/reverse_project_view_card";


export default function FeaturedWorksSection(): React.ReactElement {

    const sectionRef: React.RefObject<HTMLElement | null> = React.useRef(null);

    const {scrollYProgress} = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"]
    });


    const headingUnderlineWidth = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);


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

                        <motion.div style={{ width: headingUnderlineWidth, transformOrigin: "center" }} className={`w-full h-[11px] bg-black rounded-full`}/>
                    </h1>
                </div>



                {/*MARK: First project*/}
                <ProjectViewCards/>
                <ReverseProjectViewCards />


                <div className={`w-full h-[50rem]`}>

                </div>

                <div className={`w-full h-[50rem]`}>

                </div>

                <div className={`w-full h-[50rem]`}>

                </div>


            </section>
        </React.Fragment>
    )
}



