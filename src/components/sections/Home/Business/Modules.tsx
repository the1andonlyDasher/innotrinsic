import { faArrowDown, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    AnimatePresence,
    MotionConfig,
    motion,
    useInView,
} from "framer-motion";
import Link from "next/link";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import Sec from "@/components/Section";
import { modulesViewer, mountainViewer, productViewer } from "@/ts/atoms";
import { useAtom } from "jotai";
import { useSearchParams } from "next/navigation";
import { ModuleCarousel } from "@/components/ModuleCarousel";
import Modals from "./Modals";


interface ModulesProps { }



const Modules: FunctionComponent<ModulesProps> = () => {
    const headers = ["wachsen", "verwalten", "umsetzen"];

    const texts = [
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        "Sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        "Dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    ];

    const modalContent = {
        HowToGo: {
            title: "How To Go",
            bulletPoints: ["Neuronales Basiswissen", "Prozess-Motivation & Fokus"],
        },
        NeuroloyalPlanen: {
            title: "Neuroloyal Planen",
            bulletPoints: [
                "Outlines: Neuroloyales Handlungskonzept",
                "Neuroloyaler Projektplan",
                "Plan: Neue Routinen verfestigen",
            ],
        },
        NeuroloyalZumNeu: {
            title: "Neuroloyal zum Neu",
            bulletPoints: [
                "Neuroloyal zu Ideen und Lösungen",
                "Motivierendes NEU in der Schnitttmenge Antriebe - (External) Needs entwickeln",
            ],
        },
        WhyToGo: {
            title: "Let’s go?! Why to go?",
            bulletPoints: [
                "Ziel & Fokus",
                "Prozess-Willen stärken",
                "ProzessPower aufbauen (z.B. Prozess-Haltung)",
                "MY InnoTrinsic-Steps planen",
            ],
        },
        BrainBasics: {
            title: "BrainBasics - Know How to go",
            bulletPoints: [
                "Neuro-Wissen",
                "Neuro-Booster &amp; Neuro-Brakes",
            ],
        },
        FocusOutside: {
            title: "Focus Outside",
            bulletPoints: [
                "Analyse: Needs des Umfelds und Rahmenbedingungen",
                "Identifizieren: Ziele in der Schnittmenge (Neuro-Booster (z.B. Antriebe) - Needs Outside)",
                "Neuro-Chancen & Challenge-Analyse"
            ],
        },
        FocusMe: {
            title: "Focus ME & YOU",
            bulletPoints: [
                "Standort klären",
                "Individuelle Ausprägung der Antriebe identifizieren",
                "Neuro-Booster & Neuro-Brakes identifizieren",
            ],
        },
        LetsGo: {
            title: "Let's Go",
            bulletPoints: [
                "Neuroloyales Werkzeuge: „Starten - Umsetzen - Durchhalten“",
                "Neuroloyale Werkzeuge: High-Quality-Ergebnisse",
                "Neuroloyale Werkzeuge: Wellbeeing und Wellfeeling (Motivation & Zufriedenheit)",
            ],
        },
        BrainPlus: {
            title: "BrainPlus",
            bulletPoints: [
                "?",
                "?",
                '?',
            ],
        },
    };

    const [index, setIndex] = useState(0);
    const [header1, setHeader1] = useState(headers[index]);
    const [texts1, setTexts1] = useState(texts[index]);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((index) => (index + 1) % 3); // limit to 4
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setHeader1(headers[index]);
        setTexts1(texts[index]);
    }, [index]);

    const moduleVariants = [
        {
            title: "Neuroloyale Transformationsprojekte",
            text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        },
        {
            title: "Projektmanagement mit BrainCare",
            text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        },
        {
            title: "Kopfsache: Entwicklung und Innovationsmanagement",
            text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        },
        {
            title: "High-Quality-Ideen und Lösungen - Deep Brain Creativity",
            text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        },
        {
            title: "Alles Zusammen",
            text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        },
    ];

    return (
        <Sec single left sectionName="business">
            <>
                <Modals modalContent={modalContent} />
                <ModuleCarousel images={moduleVariants} />
            </>
        </Sec>
    );
};

export default Modules;
