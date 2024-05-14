import { forwardRef, useState } from "react";
import Section from "./Section";
import { AnimationProps, Variant, Variants, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faChevronDown, faPlus } from "@fortawesome/free-solid-svg-icons";


type serviceType = {
    title: string;
    description?: string;
    borderBottom: boolean;
}


const arrow_variants = {
    closed: { rotate: "0deg" },
    open: { rotate: "180deg" },
};

const desc_variants = {
    closed: { gridTemplateRows: "0fr", opacity: 0, marginTop: 0, paddingTop: 0 },
    open: { gridTemplateRows: "1fr", opacity: 1, marginTop: "0.75rem", paddingTop: "0.75rem" }
}

const blurVariants = {
    initial: { y: 20, filter: "blur(20px)", opacity: 0 },
    animate: {
        y: 0,
        filter: "blur(0px)",
        opacity: 1,
        transition: { staggerChildren: 0.05, when: "beforeChildren" },
    },
    exit: {
        y: 20,
        filter: "blur(20px)",
        opacity: 0,
        transition: { staggerChildren: 0.1, when: "afterChildren" },
    },
};

const FAQuestion = (props: serviceType) => {
    const [clicked, setClicked] = useState(false)
    return (<>
        <motion.div initial="initial" whileInView="animate" exit="exit" variants={blurVariants} className="w-full h-auto">
            <motion.div
                variants={{
                    show: { display: 'grid', opacity: 1, transition: { delay: 0.5, } },
                    hide: { transitionEnd: { display: "none" }, opacity: 0, transition: { display: { delay: 0.125 }, opacity: { duration: 0.125 }, when: "beforeChildren" } },
                }}

                className={`p-4 my-2 border border-transparent ${props.borderBottom && "border-b-[#32689C]"} h-auto grid grid-cols-1 justif-start grid-rows-1 gap-x-4  w-full origin-right`}>

                <motion.dl className="flex flex-col col-span-1 w-full">
                    <motion.div
                        onClick={() => { setClicked(!clicked) }}
                        className="flex gap-6 cursor-pointer justify-start flex-row items-center">
                        <motion.div
                            className="origin-center"
                            variants={arrow_variants}
                            animate={clicked ? "open" : "closed"}>

                            <FontAwesomeIcon className="text-[#32689C] origin-center" icon={faPlus} scale={5} />

                        </motion.div>
                        <dl className="m-0 w-auto text-[#32689C] font-bold text-2xl">
                            {props.title}
                        </dl>

                    </motion.div>
                </motion.dl>
                <motion.div variants={desc_variants} animate={clicked ? "open" : "closed"} className="grid overflow-hidden w-full col-span-1  border-t border-[#32689C]  items-start">
                    <p className="m-0 overflow-hidden w-full leading-9">{props.description}</p>
                </motion.div>
            </motion.div>
        </motion.div>
    </>)
}


export default FAQuestion;