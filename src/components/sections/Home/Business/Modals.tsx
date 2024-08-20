import { globalModuleIndex, openModule } from "@/ts/atoms";
import { transition } from "@/ts/utils";
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



    const closeModal = () => {
        setOpen(false);
        setCurrentModule("")
    };

    const [globalIndex, setGlobalIndex] = useAtom(globalModuleIndex)


    return (
        <>

            <MotionConfig
                transition={transition({ delay: 0 })}>
                <AnimatePresence>

                    {open && (
                        <motion.div
                            className="modalBackdrop"
                            onClick={closeModal}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="modalContent"
                                onClick={(e) => e.stopPropagation()}
                                initial={{ y: "-50%", opacity: 0 }}
                                animate={{ y: "0%", opacity: 1 }}
                                exit={{ y: "-50%", opacity: 0 }}
                                transition={{ duration: 0.3 }}

                            >
                                <motion.div className="system__content">
                                    <div className="flex justify-between items-center mb-4 gap-4">
                                        <h3 className="font-bold font-header">{currentContent?.title}</h3>
                                        <motion.div
                                            variants={innerTextVariants}
                                            whileHover="hover"
                                            whileTap="hover"
                                            className="modal__close"
                                            onClick={closeModal}
                                        >
                                            <FontAwesomeIcon icon={faClose} />
                                        </motion.div>
                                    </div>
                                    <motion.ul className="modal__list">
                                        {currentContent?.bulletPoints.map(
                                            (point: string, index: number) => (
                                                <li className="list-item" key={index}>{point}</li>
                                            )
                                        )}
                                    </motion.ul>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </MotionConfig>
        </>
    );
};

export default Modals;
