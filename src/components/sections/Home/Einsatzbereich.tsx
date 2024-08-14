import { motion } from "framer-motion";
import { FC, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { imageViewer, openAoA, productViewer, textContent } from "@/ts/atoms";
import { useAtom } from "jotai";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLink, faPersonBurst, faPersonChalkboard } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import FAQuestion from '../../FAQuestion';
import FAQuestionSlim from "@/components/FAQuestionSlim";
import { content as c } from "@/ts/atoms"


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
    const [tContent]: any = useAtom(c)
    const currentContent = tContent[content];
    const [mainContent, setMainContent] = useState(c)
    const router = useRouter()

    const [pvAtom, setPVAtom] = useAtom(imageViewer);
    const lpViewer = useRef<any>(!null);

    const setCoords = () => {
        if (lpViewer.current) {
            const { width, height, left, top } =
                lpViewer?.current.getBoundingClientRect();
            setPVAtom({ width, height, left, top });
        }
    };

    useEffect(() => {
        setCoords();
    }, [searchParams]);

    useEffect(() => {
        setCoords();
    }, []);

    useEffect(() => {
        if (typeof window !== undefined) {
            document.body.childNodes[0].childNodes[2].addEventListener(
                "scroll",
                setCoords,
                false
            );
        }
        return () => {
            document.body.childNodes[0].childNodes[2].removeEventListener(
                "scroll",
                setCoords,
                false
            );
        };
    });

    useEffect(() => {
        window.addEventListener("resize", setCoords, false);
        return () => {
            window.removeEventListener("resize", setCoords, false);
        };
    });

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

    const [bgColor, setbgColor] = useState("")
    const colors: any = {
        Privat: "bg-[#7ca950]",
        Business: "bg-[#42677f]",
        Gesellschaft: "bg-[#7a913b]",
        Sport: "bg-[#907a2c]",
        "Public Persons": "bg-[#1b394a]",
    }

    useEffect(() => {
        setbgColor(colors[content])
    }, [content]);

    return (<>

        <motion.div
            key={keyProp}
            initial="initial"
            animate={text !== null ? "enter" : "exit"}
            exit="exit"
            variants={outerVariants}
            className="w-full h-full p-10 flex flex-col gap-6 items-start justify-end text-white "
        >
            <motion.div
                className="w-full h-full flex flex-col gap-6 lg:flex-row items-center justify-center text-white "
                variants={outerVariants} animate={searchParams.get("focusGroup") === content ? "exit" : "enter"}>
                {/* MAIN CONTENT */}
                <motion.div className="w-full h-full flex flex-column lg:flex-row justify-evenly">
                    {/* LEFT WINDOW */}
                    <motion.div ref={lpViewer} className="w-full h-full flex justify-center items-center "></motion.div>
                    {/* RIGHT WINDOW */}
                    <motion.div className={`w-full h-full flex gap-12 justify-center items-start flex-col ${bgColor} px-10 rounded-3xl shadow-sm`}>
                        {/* UPPER NAVIGATION WITH PILLS */}

                        <ul className="w-full flex flex-row flex-wrap gap-4 list-style-none">
                            <li className="rounded-full border border-white py-2 px-3">Business</li>
                            <li className="rounded-full border border-white py-2 px-3">Privat</li>
                            <li className="rounded-full border border-white py-2 px-3">Gesellschaft</li>
                            <li className="rounded-full border border-white py-2 px-3">Public Persons</li>
                            <li className="rounded-full border border-white py-2 px-3">Sport</li>
                        </ul>

                        <h3 className="text-5xl font-bold">My InnoTrinsic für {content}</h3>
                        <motion.ul className="flex flex-col gap-4">
                            {tContent[content] && Object.entries(tContent[content]).map(([key, { title, text }]: any, index: number) => (
                                <li key={key} className="flex flex-col gap-1">
                                    <h3 className="text-base font-semibold">{index + 1}. {title}</h3>
                                    {text && <p className="text-base text-[#d5e0c3]">{text}</p>}
                                </li>
                            ))}
                        </motion.ul>
                        <motion.div className="button__wrapper">
                            <Link className={`btn__alt ${bgColor}`} href="/business">Zu My Innotrinsic {content}</Link>
                            <Link className={`btn__outline hover:${bgColor}`} href="/einsatzgebiete">zurück</Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>

    </>);
}

export default Einsatzbereich;