import Sec from "@/components/Section";
import Einsatzbereich from "@/components/sections/Home/Einsatzbereich";
import { globalScroll, productViewer, textContent } from "@/ts/atoms";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FunctionComponent, useEffect, useRef } from "react";





const More = () => {
    // search params
    const searchParams = useSearchParams();
    //atoms
    const [pvAtom, setPVAtom] = useAtom(productViewer);
    const [scroll, setGSCroll] = useAtom(globalScroll);
    //ref
    const lpViewer = useRef<any>(!null);
    //set coordinates for head
    const setCoords = () => {
        const { width, height, left, top } =
            lpViewer?.current.getBoundingClientRect();
        setPVAtom({ width, height, left, top });
    };


    //uefs
    useEffect(() => {
        setCoords();
    }, []);

    useEffect(() => {
        setCoords();
    }, [scroll]);

    useEffect(() => {
        window.addEventListener('resize', setCoords, false);
        return () => {
            window.removeEventListener('resize', setCoords, false);
        };
    });



    return (
        <Sec single left sectionName="landing" id="first">
            <motion.div className="w-full h-full" ref={lpViewer}>
                <AnimatePresence mode="wait" initial>
                    <Einsatzbereich keyProp={searchParams.get("neuron")} text={searchParams.get("neuron")} />
                </AnimatePresence>
                {/* RUBRIKEN ENDE  */}
            </motion.div></Sec>
    );
}

export default More;