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

                className={`faq border border-transparent ${props.borderBottom && "border-b-[#32689C]"} `}>

                <motion.div className="faq__content">
                    <motion.div
                        onClick={() => { setClicked(!clicked) }}
                        className="faq__trigger">
                        <motion.div

                            variants={arrow_variants}
                            animate={clicked ? "open" : "closed"}>

                            <FontAwesomeIcon icon={faPlus} scale={5} />

                        </motion.div>
                        <div className="faq__title">
                            {props.title}
                        </div>

                    </motion.div>
                </motion.div>
                <motion.div variants={desc_variants} animate={clicked ? "open" : "closed"} className="faq__answer-wrapper">
                    <p className="faq__answer">{props.description}</p>
                </motion.div>
            </motion.div>
        </motion.div>
    </>)
}


export default FAQuestion;