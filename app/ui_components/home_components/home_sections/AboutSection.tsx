import React from "react";
import {motion, MotionValue, useScroll, useSpring, useTransform} from "framer-motion";
import {springOptions} from "@/app/constants/animation_constants";


export default function AboutSection(): React.ReactElement {

    const sectionRef: React.RefObject<HTMLElement | null> = React.useRef(null);
    const {scrollYProgress} = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"]
    })

    const headingUnderlineWidth = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);
    return (
        <React.Fragment>
            <section
                className={`min-h-screen w-full bg-white relative`}
                ref={sectionRef}>

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



                {/*MARK: Section header*/}
                <div className={`w-full flex justify-center text-black items-center`}>
                    <h1 className={`text-[3rem] !pt-[5rem] inline-block`}>
                        My Profile

                        <motion.div
                            style={{width: headingUnderlineWidth, transformOrigin: "center"}}
                            className={`w-full h-[11px] bg-black rounded-full`}/>
                    </h1>
                </div>


                <div className={`w-[80%] !mx-auto h-screen !mt-[10rem]`}>

                </div>

            </section>
        </React.Fragment>
    )
}