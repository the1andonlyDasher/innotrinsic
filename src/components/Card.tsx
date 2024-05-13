import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FunctionComponent } from 'react';
import { Inter } from "next/font/google";
import Image from 'next/image';
import { motion } from 'framer-motion';

const inter = Inter({
    subsets: ["latin"],
    weight: ["800", "900"],
})

const variants = {
    initial: { y: 20, filter: "blur(20px)", opacity: 0 },
    enter: { y: 0, filter: "blur(0px)", opacity: 1, delay: 1 },
    exit: { y: 20, filter: "blur(20px)", opacity: 0 },
};

const blurVariants = {
    initial: { y: 20, filter: "blur(20px)", opacity: 0 },
    animate: {
        y: 0,
        filter: "blur(0px)",
        opacity: 1,
        transition: { staggerChildren: 0.1, when: "beforeChildren" },
    },
    exit: {
        y: 20,
        filter: "blur(20px)",
        opacity: 0,
        transition: { staggerChildren: 0.1, when: "afterChildren" },
    },
};

interface Props {
    header?: string;
    text?: string;
    icon?: IconProp;
    img?: string;
    alt?: string;
    children?: React.ReactNode
}

const Card: FunctionComponent<Props> = (props) => {
    return (
        <motion.div variants={blurVariants} className="relative z-10 backdrop-blur-xl card" >
            <motion.div variants={blurVariants} className='card__icon'>
                {props.children}
                {props.icon && <FontAwesomeIcon icon={props.icon} />}
                {props.img && <Image width={100} height={100} alt={props.img} src={props.img} />}
            </motion.div>
            <motion.div variants={blurVariants} className={`card__header ${inter.className} text-[#6fa53d]`}>{props.header}</motion.div>
            <motion.p variants={blurVariants} className='text-small'>{props.text}</motion.p>

        </motion.div >
    );
};

export default Card;
