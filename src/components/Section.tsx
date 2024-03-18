import React, { forwardRef, ReactElement, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useAtom } from "jotai";
import { load, loc } from "@/ts/atoms";

const section_variants = {
  initial: {},
  enter: {
    transition: { staggerChildren: 0.2 },
  },
  exit: {
    transition: { staggerChildren: 0.2 },
  },
};

const text_variants = {
  initial: { opacity: 0, rotate: "5deg" },
  enter: {
    opacity: 1,
    rotate: "0deg",
    transition: { ease: "easeIn", duration: 0.5 },
  },
  exit: {
    opacity: 0,
    rotate: "0deg",
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

interface sectionProps {
  sectionName?: string;
  ref?: any;
  id?: string;
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
      viewport={{ margin: "100px", amount: 0.375, once: false }}
      onViewportEnter={(entry) => {
        // controls.start("enter")
        entry?.isIntersecting
          ? setApp(`${entry.target?.getAttribute("data-section-name")}`)
          : null;
      }}
      data-section-name={props.sectionName}
      initial="initial"
      whileInView={"enter"}
      exit="exit"
      ref={props.ref}
      id={props.id}
      variants={section_variants}
    >
      {props.single ? (
        <motion.div variants={header_variants} className="lr__wrapper">
          <motion.div variants={header_variants} className="left-wrapper">
            {props.header ? (
              <motion.h2 variants={header_variants}>{props.header}</motion.h2>
            ) : null}
            {props.subheader ? (
              <motion.h3 variants={header_variants}>
                {props.subheader}
              </motion.h3>
            ) : null}
            {props.text ? (
              <motion.p variants={text_variants}>{props.text}</motion.p>
            ) : null}
            <>{props.children}</>
          </motion.div>
          <motion.div className="right-wrapper"></motion.div>
        </motion.div>
      ) : (
        <>
          {props.header ? (
            <motion.h2 variants={header_variants}>{props.header}</motion.h2>
          ) : null}
          {props.subheader ? (
            <motion.h3 variants={header_variants}>{props.subheader}</motion.h3>
          ) : null}
          {props.text ? (
            <motion.p variants={text_variants}>{props.text}</motion.p>
          ) : null}
          <>{props.children}</>
        </>
      )}
    </motion.section>
  );
}

const Sec = forwardRef<ReactElement, sectionProps>((props, ref) => (
  <Section {...props}></Section>
));
Sec.displayName = "Section";

export default Sec;
