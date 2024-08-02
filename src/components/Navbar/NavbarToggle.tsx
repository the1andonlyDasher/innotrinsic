import React, { useEffect, useState } from 'react';
import { motion, useCycle } from 'framer-motion';
import { loc } from '@/ts/atoms';
import { useAtom } from 'jotai';

const targetColors: any = {
  landing: "#ffffff",
  landingBusiness: "#32689C",
  business: "#32689C",
  "/": "#ffffff",
  science: "#506c00",
  symbols: "#506c00",
  perspective: "#506c00",
  braincare: "#506c00",
  universal: "#506c00",
  architekt: "#506c00",
  freund: "#506c00",
  head: "#506c00",
  services: "#506c00",
  faq: "#506c00",
  different: "#506c00",
  mountain: "#506c00",
}

const NavbarToggle = ({ toggle, clickLink }: any) => {
  const [location, setLocation] = useAtom(loc);
  const [nextColor1, setNextColor1] = useState(targetColors[`${location}`])

  useEffect(() => {
    setNextColor1(targetColors[`${location}`])
  }, [location]);

  return (
    <button
      onClick={toggle}
      id="menu-toggle"
      aria-label="mobile-menu-toggle"
      aria-controls="nav-items-mobile"
      aria-expanded="false"
    >
      Menu
      <motion.div className="bar" variants={{
        closed: { rotate: [45, 0, 0], top: ["50%", "50%", "35%"] },
        open: { rotate: [0, 0, 45], top: ["35%", "50%", "50%"] },
        transition: {
          type: "spring",
        }
      }} ><motion.div animate={{ backgroundColor: nextColor1 }} /></motion.div>
      <motion.div className="bar" variants={{
        closed: { rotate: [-45, 0, 0], top: ["50%", "50%", "65%"] },
        open: { rotate: [0, 0, -45], top: ["65%", "50%", "50%"] },
        transition: {
          type: "spring",
        }
      }} ><motion.div animate={{ backgroundColor: nextColor1 }} /></motion.div>
    </button>
  );
}

export default NavbarToggle;
