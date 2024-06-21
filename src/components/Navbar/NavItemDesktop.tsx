import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';
import { Work_Sans } from "next/font/google";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useRouter } from 'next/router';



const variants = {
  initial: {
    x: 50,
    opacity: 0,

  },
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: 50,
    opacity: 0,
  },
};

type NavItemProps = {
  href?: string;
  name?: string;
  clickLink?: any;
  icon: IconProp;
}

export const NavItem = ({ href, name, clickLink, icon }: NavItemProps, ...props: any) => {
  const [isShrunk, setShrunk] = useState(false);
  const router = useRouter()
  useEffect(() => {
    const handler = () => {
      setShrunk((isShrunk) => {
        if (
          !isShrunk &&
          (document.body.scrollTop > 100 ||
            document.documentElement.scrollTop > 100)
        ) {
          return true;
        }
        if (
          isShrunk &&
          document.body.scrollTop < 4 &&
          document.documentElement.scrollTop < 4
        ) {
          return false;
        }
        return isShrunk;
      });
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <>
      <motion.li
        className="navItem"
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          type: "tween",
          duration: 0.75
        }}
      >
        <Link aria-label={name} data-name={name + router.pathname.replace(/^\/(.*)/, (match, p1) => p1.charAt(0).toUpperCase() + p1.slice(1))} scroll={false} className={isShrunk ? `nav-link black` : `nav-link`} href={`${href}`} onClick={clickLink}>{name}{icon && <FontAwesomeIcon
          className='ml-2 text-sm max-h-4' icon={icon} />}</Link>
      </motion.li>
    </>
  );
};

