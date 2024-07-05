import { motion } from "framer-motion";
import { FC, useEffect } from "react";
import Link from "next/link";
import { openAoA, textContent } from "@/ts/atoms";
import { useAtom } from "jotai";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLink, faPersonBurst, faPersonChalkboard } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import FAQuestion from '../../FAQuestion';
import FAQuestionSlim from "@/components/FAQuestionSlim";


const variants = {
    initial: { y: 20, filter: "blur(20px)", opacity: 0 },
    enter: { y: 0, filter: "blur(0px)", opacity: 1 },
    exit: { y: 20, filter: "blur(20px)", opacity: 0 },
};

const outerVariants = {
    initial: { opacity: 0, display: "none" },
    enter: {
        opacity: 1,
        display: "flex",
        filter: "blur(0px)",
        transition: { staggerChildren: 0.1, when: "beforeChildren", delay: 0.5 },
    },
    exit: {
        opacity: 0,
        transitionEnd: { display: "none" },
        transition: { staggerChildren: 0.1, when: "afterChildren" },
    },
}


interface EinsatzbereichProps {
    keyProp: string | null;
    text: string | null;
}


const Einsatzbereich: FC<EinsatzbereichProps> = ({ keyProp, text }) => {
    const [content, setC]: any = useAtom(openAoA)
    const searchParams = useSearchParams()
    const [tContent,] = useAtom(textContent)
    const currentContent = tContent[content];
    const router = useRouter()

    useEffect(() => {
        if (searchParams.get("neuron") !== null) {
            const urlEncodedString: any = searchParams.get("neuron")
            const decodedString = decodeURIComponent(urlEncodedString);
            setC(decodedString)
            console.log(content)
        }
    }, [searchParams]);

    useEffect(() => {
        console.log(currentContent)
    }, [content]);


    return (<>

        <motion.div
            key={keyProp}
            initial="initial"
            animate={text !== null ? "enter" : "exit"}
            exit="exit"
            variants={outerVariants}
            className="w-full h-full flex flex-col gap-6 items-start justify-end text-white "
        >
            {/* <div className="w-full flex flex-row gap-4 text-2xl font-header font-semibold">
                {searchParams.get("neuron") && <Link href="/einsatzgebiete">Einsatzgebiete</Link>}
                {searchParams.get("focusGroup") && <Link href={`/einsatzgebiete/?neuron=${searchParams.get("neuron")}`}>{searchParams.get("neuron")}</Link>}
            </div> */}
            <motion.div
                className="w-full h-full  flex flex-col gap-6 items-start justify-end text-white "
                variants={outerVariants} animate={searchParams.get("focusGroup") === content ? "exit" : "enter"}>
                <motion.h3 className="font-bold font-header" variants={variants}>{content}</motion.h3>
                <motion.p variants={variants}>
                    Lorem ipsum dolor sit amet. Hic forum est, populus properat, set Marcus stat et circumspectat.
                </motion.p>
                <motion.div variants={variants} className="flex flex-wrap gap-4">
                    <Link href={`${router.pathname}?${searchParams}&focusGroup=${content}`} className="btn__alt" shallow>
                        {searchParams.get("neuron")}<FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                    <Link href={`${router.pathname}?${searchParams}&focusGroup=${content}`} className="btn__alt" shallow>
                        Zielgruppen<FontAwesomeIcon icon={faPersonChalkboard} />
                    </Link>
                    <Link href={"/einsatzgebiete"} className="btn__outline" shallow>
                        Zurück
                    </Link>
                </motion.div>
            </motion.div>

            <motion.div
                className=" w-full h-full"
                variants={outerVariants} initial="initial" animate={searchParams.get("focusGroup") === content ? "enter" : "exit"}>
                <motion.div variants={variants} className="w-full flex flex-col items-start justify-end gap-6  text-white ">
                    {content !== "" && Object.entries(currentContent).map(([key, value]: any, index: number) =>
                        <div className="bg-[#c7e0f0] p-6 rounded-xl w-full" key={index}><h3 className="text-3xl font-bold">{key}</h3>
                            {Object.values(value).map((item: any, index: number) => <div key={index}>
                                <FAQuestionSlim title={item.title} borderBottom={false}>
                                    <ul>
                                        {item.bulletPoints.map((item: any, index: number) => <li key={index}>{item}</li>)}
                                    </ul>
                                </FAQuestionSlim>
                            </div>)}
                        </div>)}
                </motion.div>

            </motion.div>
            <div className="w-full">
                {searchParams.get("focusGroup") && <Link className="btn__outline" href={`/einsatzgebiete?view=true&neuron=${searchParams.get("neuron")}`}>Zurück zu{searchParams.get("neuron")}</Link>}
            </div>
        </motion.div>

    </>);
}

export default Einsatzbereich;