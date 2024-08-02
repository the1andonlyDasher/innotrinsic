import React from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HomeBtn from './HomeBtn';

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};
export const NavItem = ({ href, name, toggle, secondary, home, icon, contentContainer }: any) => {
  return (
    <>
      <motion.li

        variants={variants}
      >
        {home ? <motion.div onClick={toggle} aria-label={name} className={secondary ? "nav-link-secondary" : "nav-link black"} ><HomeBtn contentContainer={contentContainer} /></motion.div> :
          <Link data-name={name} onClick={toggle} aria-label={name} className={secondary ? "nav-link-secondary" : "nav-link black"} href={`${href}`}>{name}{icon && <FontAwesomeIcon
            className='ml-2 text-sm max-h-4' icon={icon} />}</Link>}
      </motion.li>
    </>
  );
};

