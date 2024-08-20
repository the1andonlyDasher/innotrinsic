import Sec from "@/components/Section";
import Einsatzbereich from "@/components/sections/Home/Einsatzbereich";
import { globalScroll, productViewer, textContent } from "@/ts/atoms";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useRef } from "react";





const More = () => {
    // search params
    const searchParams = useSearchParams();
    //atoms
    const [pvAtom, setPVAtom] = useAtom(productViewer);
    const [scroll, setGSCroll] = useAtom(globalScroll);
    //ref
    const lpViewer = useRef<any>(!null);

    //router
    const router = useRouter();
    //set coordinates for head
    const setCoords = () => {


        if (router.pathname === "/einsatzgebiete" && searchParams.get("neuron") === null) {
            const { width, height, left, top } =
                lpViewer?.current.getBoundingClientRect();
            setPVAtom({ width, height, left, top });
        }
    };


    //uefs
    useEffect(() => {
        setCoords();
    }, []);

    useEffect(() => {
        setCoords();
    }, [searchParams]);


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
        <Sec single left sectionName="landing" id="first" addClass="full-width">

            <motion.div className="w-full h-full ">
                {searchParams.get("neuron") === null && <div className="absolute top-0 left-0 w-full h-full" ref={lpViewer}></div>}
                <AnimatePresence mode="wait" initial>
                    <Einsatzbereich keyProp={searchParams.get("neuron")} text={searchParams.get("neuron")} />
                </AnimatePresence>
                {/* RUBRIKEN ENDE  */}
            </motion.div></Sec>
    );
}

export default More;