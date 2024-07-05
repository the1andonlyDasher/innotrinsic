import { openModule } from "@/ts/atoms";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useAtom } from "jotai";
import { FC, useEffect, useState } from "react";

interface Modal {
    title: string;
    bulletPoints: string[];
}

interface ModalContent {
    HowToGo: Modal;
    NeuroloyalPlanen: Modal;
    NeuroloyalZumNeu: Modal;
    FocusOutside: Modal;
    FocusMe: Modal;
    LetsGo: Modal;
    [key: string]: Modal; // Index signature to allow dynamic key access
}

interface ModalsProps {
    modalContent: ModalContent;
}

const innerTextVariants = {
    initial: { scale: 0, opacity: 0 },
    enter: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    hover: { scale: 1.2 },
};

const wrapperVariants = {
    initial: { scale: 0, display: "none" },
    enter: { display: "flex", scale: 1 },
    exit: { scale: 0, transitionEnd: { display: "none" } }
}

const Modals: FC<ModalsProps> = ({ modalContent }) => {
    const [open, setOpen] = useState(false);
    const ms = Object.entries(modalContent);
    //atoms
    const [currentModule, setCurrentModule] = useAtom(openModule);

    const currentContent = modalContent[currentModule];
    //Uefs
    useEffect(() => {
        if (currentModule !== "") {
            setOpen(true);
        }
        console.log(currentModule)
    }, [currentModule]);

    return (
        <><AnimatePresence initial mode="wait">
            <MotionConfig
                transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 100
                }}>
                <motion.div
                    key={currentModule}
                    variants={wrapperVariants}
                    initial="initial"
                    animate={
                        open &&
                        "enter"
                    }
                    exit="exit"
                    className="z-50 rounded-2xl fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center"
                >

                    <motion.div
                        variants={innerTextVariants}
                        className="bg-[#F6F8FF] text-xl text-[#32689C] rounded-xl flex flex-col  justify-center items-end p-14 gap-6"
                    >
                        <motion.div
                            variants={innerTextVariants}
                            whileHover="hover"
                            whileTap="hover"
                            className="border border-[#32689C] aspect-square flex justify-center items-center p-2 rounded-md"
                            onClick={(e) => {
                                e.stopPropagation(),
                                    setOpen(false);
                                setCurrentModule("")
                            }}
                        >
                            <FontAwesomeIcon icon={faClose} />
                        </motion.div>

                        <motion.div className="flex flex-col gap-6">
                            <h3 className="font-bold font-header">{currentContent?.title}</h3>
                            <motion.ul className="flex gap-3 flex-col list-disc">
                                {currentContent?.bulletPoints.map(
                                    (point: string, index: number) => (
                                        <li className="list-item" key={index}>{point}</li>
                                    )
                                )}
                            </motion.ul>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </MotionConfig>
        </AnimatePresence>
        </>
    );
};

export default Modals;
