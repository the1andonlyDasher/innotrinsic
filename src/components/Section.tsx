import React, { forwardRef, ReactElement, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useAtom } from "jotai";
import { load, loc } from "@/ts/atoms";

const variants = {
  initial: { y: 20, filter: "blur(20px)", opacity: 0 },
  animate: { y: 0, filter: "blur(0px)", opacity: 1, },
  exit: { y: 20, filter: "blur(20px)", opacity: 0 },
};

const blurVariants = {
  initial: { opacity: 1 },
  animate: {
    opacity: 1,
    display: "flex",
    filter: "blur(0px)",
    transition: {
      staggerChildren: 0.125,
      when: "beforeChildren",
      delay: 0.25,
    },
  },
  exit: {
    opacity: 0,
    transitionEnd: { display: "none" },
    transition: { staggerChildren: 0.1, when: "afterChildren" },
  },
}

interface sectionProps {
  sectionName?: string;
  ref?: any;
  id?: string;
  left: boolean;
  header?: string | number;
  subheader?: string | number;
  text?: string;
  children?: JSX.Element;
  single?: boolean;
}

interface sProps {
  props: sectionProps;
}

function Section(props: sectionProps) {
  const [loaded, setLoaded] = useAtom(load);
  const [app, setApp] = useAtom(loc);
  const controls = useAnimation();
  return (
    <motion.section
      viewport={{ margin: "0px", amount: 0.125, once: false }}
      onViewportEnter={(entry) => {
        // controls.start("enter")
        entry?.isIntersecting
          ? setApp(`${entry.target?.getAttribute("data-section-name")}`)
          : null;
      }}
      data-section-name={props.sectionName}
      initial="initial"
      whileInView="animate"
      exit="exit"
      ref={props.ref}
      id={props.id}
      variants={blurVariants}
      className="overflow-hidden"
    >
      {props.single ? (

        <>
          {props.header ? (
            <motion.h2 className="text-[#98d06d] font-bold" variants={variants}>{props.header}</motion.h2>
          ) : null}
          {props.subheader ? (
            <motion.h3 variants={variants}>{props.subheader}</motion.h3>
          ) : null}
          {props.text ? (
            <motion.p variants={variants}>{props.text}</motion.p>
          ) : null}
          <>{props.children}</>
        </>
      ) : (
        <motion.div variants={variants} className="lr__wrapper">
          {props.left ? <>
            <motion.div variants={variants} className="left-wrapper">
              {props.header ? (
                <motion.h2 className="text-[#98d06d] font-bold" variants={variants}>{props.header}</motion.h2>
              ) : null}
              {props.subheader ? (
                <motion.h3 variants={variants}>
                  {props.subheader}
                </motion.h3>
              ) : null}
              {props.text ? (
                <motion.p variants={variants}>{props.text}</motion.p>
              ) : null}
              <>{props.children}</>
            </motion.div>
            <motion.div className="right-wrapper"></motion.div> </> : <>
            <motion.div variants={variants} className="left-wrapper">
            </motion.div>
            <motion.div className="right-wrapper">
              {props.header ? (
                <motion.h2 className="text-[#98d06d] font-bold" variants={variants}>{props.header}</motion.h2>
              ) : null}
              {props.subheader ? (
                <motion.h3 variants={variants}>
                  {props.subheader}
                </motion.h3>
              ) : null}
              {props.text ? (
                <motion.p variants={variants}>{props.text}</motion.p>
              ) : null}
              <>{props.children}</></motion.div></>}

        </motion.div>
      )}

    </motion.section>
  );
}

const Sec = forwardRef<ReactElement, sectionProps>((props, ref) => (
  <Section {...props}></Section>
));
Sec.displayName = "Section";

export default Sec;
