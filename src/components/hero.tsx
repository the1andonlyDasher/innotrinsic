import React, { ReactNode, useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { useInView } from "framer-motion";
import Link from "next/link";
import { Url } from "url";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["800", "900"],
})

const section_variants = {
  initial: {
    transition: { staggerChildren: 0.2 },
  },
  enter: {
    transition: { staggerChildren: 0.2, },
  },
  exit: {
    transition: { staggerChildren: 0.2 },
  },
}

const text_variants = {
  initial: {
    opacity: 0,
    y: -10
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: { ease: "easeIn", duration: 0.5 },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { ease: "easeOut", duration: 0.5 },
  },
};

const header_variants = {
  initial: { opacity: 0, x: 100 },
  enter: {
    opacity: 1,
    x: 0,
    transition: { ease: "easeIn", duration: 0.5 },
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: { ease: "easeOut", duration: 0.5 },
  },
};

const variants = {
  initial: {
    y: 50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
      ease: "easeIn",
      delay: 1.25,
      duration: 0.5,
    },
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: {
      type: "tween",
      ease: "easeOut",

      duration: 0.5,
    },
  },
};

interface heroProps {
  headerPartOne?: string | number | undefined,
  headerPartTwo?: string | number | undefined,
  subHeader?: string | number | undefined,
  text?: string | number | undefined,
  buttonOne?: string | number | undefined,
  buttonTwo?: string | number | undefined,
  linkOne: Url | string,
  linkTwo: Url | string,
  children?: ReactNode;
  ref?: any;
}

const Hero = (props: heroProps) => {
  const ref = useRef<any>(!null);

  return (
    <>
      <motion.div className="lr__wrapper">
        <motion.div
          className="left-wrapper"
          variants={section_variants}
          initial="initial"
          whileInView="enter"
          viewport={{ margin: "0px", amount: 0.25, once: true }}
          exit="exit"
        >
          {props.headerPartOne ? <motion.h1 className="sectionHeader" variants={header_variants}>{props.headerPartOne}
            <strong>{props.headerPartTwo ? props.headerPartTwo : null}</strong>
          </motion.h1> : null}

          {props.subHeader && <motion.h2 className={`${inter.className} bg-gradient-to-r from-[#477dd3] to-sky-500 inline-block text-transparent bg-clip-text drop-shadow-sm`} variants={header_variants}>{props.subHeader}</motion.h2>}
          <motion.p variants={text_variants} className="text-white">
            {props.text}
          </motion.p>
          <motion.div variants={text_variants} className="">
            <Link href={props.linkOne}><button type="button" className="btn__primary">{props.buttonOne}</button></Link>

            {props.buttonTwo ? <Link href={props.linkTwo}><button type="button" className="btn__outline">{props.buttonTwo}</button></Link> : null}

          </motion.div>

        </motion.div>
        <motion.div className="right-wrapper"> {props.children}</motion.div>
      </motion.div>
    </>
  );
};

export default Hero;
