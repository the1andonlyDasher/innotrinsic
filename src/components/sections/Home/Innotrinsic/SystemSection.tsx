import Sec from "@/components/Section";
import { FC, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faClose } from "@fortawesome/free-solid-svg-icons";
import { backgroundColors } from '../../../../ts/atoms';

interface CircleProps {
    size: number;
    shade: string;
    letter: string;
    index: number;
    onClick: (index: number) => void;
}

const Circle: FC<CircleProps> = ({ size, shade, letter, index, onClick }) => {
    const floatingVariant = useMemo(() => {


        return {
            initial: { scale: 0, opacity: 0 },
            enter: {
                scale: 1, opacity: 1
            },
            hover: {
                scale: 1.05,
                backgroundColor: "#B38224"
            },
        };
    }, []);

    return (
        <motion.div
            className={`system__circle`}
            variants={floatingVariant}
            initial="initial"
            animate="enter"
            whileHover={"hover"}
            whileTap={"hover"}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={() => onClick(index)}
            style={{
                width: size,
                height: size,
                backgroundColor: shade,

            }}
        ><label className="label">{letter}</label></motion.div>
    );
};

function CircleAnimation() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: "Dummy Header", text: "Dummy Text" });

    const circles = useMemo(() => {
        const sizeFactor = 2;
        return [
            { size: 300 * sizeFactor, shade: "#CFE6FB", letter: "D." },
            { size: 225 * sizeFactor, shade: "#A5C5E4", letter: "C." },
            { size: 150 * sizeFactor, shade: "#75A5D4", letter: "B." },
            { size: 75 * sizeFactor, shade: "#32689C", letter: "A." },
        ];
    }, []);

    const handleCircleClick = (index: number) => {
        setModalContent({
            title: `Modal Title ${index + 1}`,
            text: "This is some dummy text for the modal.",
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex justify-center items-center w-full h-full">
            <div className="system__container">
                <div className="system__legend relative">
                    <div className="absolute z-40 top-0 border-l border-r pointer-events-none border-black border-dashed w-1/2 h-1/2">
                        <div className="w-full flex gap-4 flex-row  items-center justify-center text-gray-700">
                            <FontAwesomeIcon icon={faArrowLeft} />
                            <label className="text-2xl font-semibold ">InnoTrinsic</label>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                    </div>
                    <div className="absolute z-40 top-0 right-0 pointer-events-none border-r border-black 
                    border-dashed w-1/2 h-1/2">
                        <div className="w-full flex gap-4 flex-row items-center justify-center text-gray-700">
                            <FontAwesomeIcon icon={faArrowLeft} />
                            <label className="text-2xl font-semibold ">My InnoTrinsic</label>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                    </div>
                    <div
                        style={{ width: 600, height: 600 }}
                        className="system__circle">
                        {circles.map((circle, index) => (
                            <Circle
                                key={index}
                                size={circle.size}
                                shade={circle.shade}
                                index={index}
                                letter={circle.letter}
                                onClick={handleCircleClick}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="modalBackdrop"
                        onClick={closeModal}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}

                    >
                        <motion.div
                            className="modalContent"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ y: "-50%", opacity: 0 }}
                            animate={{ y: "0%", opacity: 1 }}
                            exit={{ y: "-50%", opacity: 0 }}
                            transition={{ duration: 0.3 }}

                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">{modalContent.title}</h2>
                                <button className="text-xl" onClick={closeModal}>
                                    <FontAwesomeIcon icon={faClose} />
                                </button>
                            </div>
                            <p>{modalContent.text}</p>
                            <button
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                                onClick={closeModal}
                            >
                                More
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

interface SystemSectionProps { }

const SystemSection: FC<SystemSectionProps> = () => {
    return (
        <Sec single left sectionName="mountain">
            <>
                <div className="system__content">
                    <h2 className="system__header">Mit System zur InnoTrinsic Economy</h2>
                    <p className="system__text">Treten Sie ein in die Welt der InnoTrinsic Economy: Ein neues, anwendungsorientiertes Paradigma für neuroloyales Management. Das zweigliedrige, konzentrisches Schalen-Modell, bei dem InnoTrinsic das Fundament (Kern und erste Schale) bildet. Addiert wirt MY InnoTrinsic, dass die Handlungsperspektive abbildet.
                        Mindset & Wissen, Wollen & Dürfen, Strukturprogramm & Module, Werkzeuge & Wege.
                        Willkommen in der InnoTrinsic-Economy!</p>
                </div>
                <CircleAnimation />
            </>
        </Sec>
    );
};

export default SystemSection;
