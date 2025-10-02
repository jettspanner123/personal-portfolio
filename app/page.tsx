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
import LightRays from "@/app/effects/LightRays";
import {RxCross1} from "react-icons/rx";
import {CiMenuBurger} from "react-icons/ci";
import * as z from "zod";
import {BeatLoader} from "react-spinners";
import {MouseHoverStateOptions, useMouseHoverState} from "@/app/stores/mouse_store";


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

    const { toggleShowMouseHover } = useMouseHoverState();
    return (
        <React.Fragment>
            {/*MARK: Top Navbar heading*/}
            <motion.h1
                style={{fontSize: headingSize, top: headingTopPosition, left: headingLeftPosition}}
                className={"text-white z-[12] overflow-hidden w-full flex justify-start items-center pointer-events-none mix-blend-difference font-bold oswald text-center fixed leading-none text-nowrap uppercase"}>
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
                className={`h-[8vh] aspect-square rounded-full border-[0.5px] border-white/50 z-[13] fixed  right-[6.2vw] top-[2.5vh] flex justify-center items-center`}>

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

            <FullScreenMenu isShow={isFullScreenNavbarOpen} setShow={setIsFullScreenNavbarOpen}/>
            <main className={`w-screen relative min-h-screen bg-[#0E0E0E]`}>


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
            </main>
        </React.Fragment>
    );
}


function FullScreenMenu({isShow, setShow}: {
    isShow: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}): React.JSX.Element {

    const {scrollYProgress} = useScroll();

    const scrollTopOffsetRaw: MotionValue<number> = useSpring(useTransform(scrollYProgress, [0, 0.08], [40, 12]), springOptions);

    const scrollTopOffset: MotionValue<string> = useMotionTemplate`${scrollTopOffsetRaw}vh`;

    const contactSectionSchema = z.object({
        name: z.string()
            .min(2, {message: "Name must be at least 2 characters long!"})
            .max(100, {message: "Name is too long!"}),
        email: z.email({message: "Invalid Email Address!"}),
        description: z.string()
            .min(10, {message: "Description must be at least 10 characters long!"})
            .max(1000, {message: "Description is too long!"})
    });

    const [name, setName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);

    async function sendMessage(): Promise<void> {
        setLoading(true);
        setError(null);
        let formData = contactSectionSchema.safeParse({name, email, description});

        if (!formData.success) {
            setError(formData.error.issues[0].message);
            setLoading(false);
            return;
        }

        const data = formData.data;
        try {
            console.log(data);
        } catch {
            setError("Something Went Wrong!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <React.Fragment>
            <motion.nav
                initial={{clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"}}
                animate={{
                    clipPath: isShow ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "polygon(0 0, 100% 0, 100% 0, 0 0)"
                }}
                transition={{
                    duration: 1.1,
                    ease: [0.85, 0, 0.15, 1],
                    delay: 0.1
                }}
                className={"bg-[#0E0E0E] h-screen w-screen fixed top-0 z-[11] overflow-hidden flex justify-center items-center"}>


                {/*MARK: Contact me sectrion*/}
                <motion.section
                    animate={{
                        y: isShow ? 0 : "-100vw"
                    }}
                    transition={{
                        duration: 1.1,
                        delay: isShow ? 0.2 : 0,
                        ease: [0.85, 0, 0.15, 1],
                    }}
                    style={{paddingTop: scrollTopOffset}}
                    className={"h-full flex-1 !px-[6.1vw]"}>

                    <p className={"text-white geist text-[1.1vw] !mt-[2vw]"}>
                        Let’s connect—feel free to reach out with any questions, ideas, or collaborations.
                    </p>

                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={"Enter name here."}
                        className={"w-full geist !mt-[1vw] border-[1px] border-white/50 rounded-xl !p-[1vw] text-[1vw] text-white bg-black"}/>

                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={"Enter email here."}
                        className={"w-full geist !mt-[1vw] border-[1px] border-white/50 rounded-xl !p-[1vw] text-[1vw] text-white bg-black"}/>

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={"Enter description here."}
                        className={"w-full geist !mt-[1vw] border-[1px] border-white/50 rounded-xl !p-[1vw] text-[1vw] text-white bg-black max-h-[30vh] h-[30vh]"}
                    >
                    </textarea>

                    {error && (
                        <motion.div
                            animate={{filter: "blur(0px)", scale: 1}}
                            initial={{filter: "blur(10px)", scale: 0}}
                            exit={{filter: "blur(10px)", scale: 0}}
                            className={"w-full text-red-400 geist text-[1vw] text-center !mt-[1vh]"}>
                            {error}
                        </motion.div>
                    )}


                    <motion.button
                        whileTap={{
                            opacity: 0.5
                        }}
                        whileHover={{
                            cursor: "pointer"
                        }}
                        animate={{
                            x: error ? [10, -10, 10, -10, 0] : 0
                        }}
                        transition={{
                            x: {
                                duration: 0.25
                            }
                        }}
                        className={"w-full geist font-bold !mt-[1vw] bg-white text-black rounded-xl text-[1vw] !p-[0.8vw] flex justify-center items-center h-[3rem]"}
                        onClick={sendMessage}>
                        <AnimatePresence mode={"wait"}>
                            {
                                loading ? (
                                    <motion.div
                                        animate={{filter: "blur(0)", scale: 1}}
                                        initial={{filter: "blur(10px)", scale: 0}}
                                        exit={{filter: "blur(10px)", scale: 0}}
                                        key={"contact-form-loader"}
                                        className={"flex justify-center items-center"}>
                                        <BeatLoader/>
                                    </motion.div>
                                ) : (
                                    <motion.p
                                        animate={{filter: "blur(0)", scale: 1}}
                                        initial={{filter: "blur(10px)", scale: 0}}
                                        exit={{filter: "blur(10px)", scale: 0}}
                                        key={"contact-form-text-loader"}
                                    >
                                        Send
                                    </motion.p>
                                )
                            }
                        </AnimatePresence>
                    </motion.button>


                </motion.section>


                {/*MARK: Actual Navbar*/}
                <section className={"h-full flex-1 flex flex-col justify-center items-center"}>
                    {
                        navbarPages.map((item: NavbarPages, index: number): React.JSX.Element => {
                            return (
                                <NavbarLinks item={item} index={index} isOpen={isShow} setOpen={setShow}
                                             key={index}/>
                            )
                        })
                    }
                </section>

            </motion.nav>


            <motion.div
                initial={{
                    opacity: 0,

                }}
                animate={{
                    opacity: isShow ? 1 : 0
                }}
                transition={{
                    duration: .5,
                    delay: isShow ? 0.9 : 0.25
                }}
                className={"h-screen w-screen z-[12] fixed pointer-events-none"}>
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#ffffff"
                    raysSpeed={1}
                    lightSpread={1}
                    rayLength={1.2}
                    followMouse={true}
                    mouseInfluence={0.15}
                    noiseAmount={0.1}
                    distortion={0.05}
                    className="custom-rays"
                />
            </motion.div>
        </React.Fragment>

    );
}

function NavbarLinks({item, index, isOpen, setOpen}: {
    item: NavbarPages,
    index: number;
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {

    const [isHover, setHover] = React.useState(false);
    return (
        <motion.div
            animate={{
                y: isOpen ? 0 : "-100vh"
            }}
            transition={{
                duration: 1,
                delay: isOpen ? 0.3 + ((navbarPages.length - index) * 0.1) : (index * 0.1),
                ease: [0.65, 0, 0.35, 1]
            }}
            whileHover={{
                cursor: "pointer"
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={"w-full"}
        >
            <motion.h1
                className={`${index === 0 ? "bg-white text-black" : "text-white"} font-bold oswald uppercase text-[7vw] leading-[9vw] relative !px-[2vw] text-left overflow-hidden hover:bg-white hover:text-black transition-all duration-400`}>
                <motion.span
                    animate={{
                        y: isHover ? -200 : 0
                    }}
                    transition={{
                        duration: .35,
                        ease: [0.65, 0, 0.35, 1]
                    }}
                    className={"inline-block"}
                >
                    {item.name}
                </motion.span>

                <motion.p
                    animate={{
                        top: isHover ? 0 : "100%"
                    }}
                    transition={{
                        duration: .35,
                        ease: [0.65, 0, 0.35, 1]
                    }}
                    className={"absolute"}>
                    {item.name}
                </motion.p>
            </motion.h1>
        </motion.div>
    )
}