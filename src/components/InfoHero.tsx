import { loc } from "@/ts/atoms";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import Link from "next/link";
import { ReactElement, forwardRef } from "react";

interface InfoHeroProps {
    ref?: any;
    header?: string | number | undefined;
    subheader?: string | number | undefined;
    text?: string | number | undefined;
    buttonText?: string | number | undefined;
    anchor: string;
    id?: string;
    sectionName?: string | number | undefined;
    icon?: any;
    view?: any;
}
function IF(props: InfoHeroProps) {
    const [location, setLocation] = useAtom(loc)
    return (
        <motion.section id={props.id} data-section-name={props.sectionName} className="flex"
            viewport={{ margin: "100px", amount: 0.375, once: true }}
            onViewportEnter={(entry) => {
                entry?.isIntersecting
                    ? setLocation(
                        `${entry.target?.getAttribute(
                            "data-section-name"
                        )}`
                    )
                    : null;
            }}
        >
            <div className="info__hero">
                <div className="w-full">
                    <h1>{props.header}</h1>
                    <h3>{props.subheader}</h3>

                </div>
                <p className="w-full mr-auto">
                    {props.text}
                </p>
                <Link scroll className="btn__small py-2" href={props.anchor}>
                    {props.buttonText}
                    <FontAwesomeIcon icon={props.icon} className="mx-2 text-md" />
                </Link>
            </div>
        </motion.section>
    )
}

const InfoHero = forwardRef<ReactElement, InfoHeroProps>((props, ref) => (
    <IF {...props}></IF>
));
InfoHero.displayName = "InfoHero";

export default InfoHero;