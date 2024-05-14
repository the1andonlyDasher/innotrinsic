import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useCycle } from "framer-motion";
import { NavItem } from "@/components/Navbar/NavItemDesktop";
import Navigation from "@/components/Navbar/Navigation";
import MobileNav from "@/components/Navbar/MobileNav";
import { NavItem as Mnav } from "@/components/Navbar/NavItemMobile";
import NavbarToggle from "./NavbarToggle";
import { useAtom } from "jotai";
import { loc } from "@/ts/atoms";


const Navbar = ({ logo, alt, navbar, legals }: any) => {

  const navbarMain = useRef<any>(!null);
  const [isShrunk, setShrunk] = useState(false);
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
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);


  const variants = {
    closed: {},
    open: {}
  };

  const image_variants = {
    initial: { scale: 0, opacity: 0 },
    enter: { scale: [0, 1.2, 1], opacity: 1 },
    exit: { scale: 0, opacity: 0 },
  }

  const targetColors: any = {
    landing: "#ffffff",
    "/": "#ffffff",
    science: "#060f20",
    symbols: "#060f20",
    perspective: "#060f20",
  }

  const [isOpen, toggleOpen] = useCycle(false, true);
  const hrefs = ["/", "/portfolio", "/kontakt"];
  const legal_hrefs = ["/datapolicy", "/imprint"]
  const [location, setLocation] = useAtom(loc);
  const [nextColor1, setNextColor1] = useState(targetColors[`${location}`])

  useEffect(() => {
    setNextColor1(targetColors[`${location}`])
  }, [location]);

  return (
    <motion.nav
      // className={isShrunk ? "navbar shrunk" : "navbar"}
      className={`navbar`}
      variants={variants}
      ref={navbarMain}
      initial={false}
      animate={isOpen ? "open" : "closed"}
    >
      <div className="navbar__container" aria-haspopup="menu" >
        <motion.a
          aria-label="Home"
          aria-current="page"
          className=" active flex justify-center items-center py-4 gap-2"
          href="/"
          variants={image_variants} initial="hidden" animate="enter" exit="exit"
        >
          <motion.svg

            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            width={200}
            height={200}
            viewBox="0 0 52.917 52.917"
          >
            <motion.path
              animate={{ stroke: nextColor1 }}
              d="m41.902 42.278-15.444-15.82v11.68c.867.074 15.206-1.954 15.166-12.42.01-7.825-5.3-13.744-15.166-13.8-9.199.46-14.988 7.216-15.042 14.54.039 8.078 5.902 15.327 15.042 15.82z"
              style={{
                fill: "none",

                strokeWidth: 1.1,
                strokeLinecap: "round",
                strokeDasharray: "none",
                strokeDashoffset: 2.26772,
                strokeOpacity: 1,
                paintOrder: "fill markers stroke",
              }}
              transform="matrix(1.60298 0 0 1.60298 -16.842 -16.865)"
            />
          </motion.svg>
          <motion.dd animate={{ color: nextColor1 }} className={`font-header text-[${nextColor1}]`}>
            MyInnoTrinsic
          </motion.dd>
        </motion.a>
        <Navigation>
          {navbar.map((i: any, index: number) => (
            <NavItem icon={i[1]} clickLink={null} key={i[0]} name={i[0]} href={index === 0 ? `/` : `${i[0].toLowerCase()}`} />
          ))}
        </Navigation>
        <MobileNav>
          {navbar.map((i: any, index: number) => (
            <Mnav toggle={() => toggleOpen()} icon={i[1]} clickLink={null} key={i[0]} name={i[0]} href={index === 0 ? `/` : `${i[0].toLowerCase()}`} />
          ))}
          {legals.map((i: any, index: number) => (
            <Mnav secondary toggle={() => toggleOpen()} key={i} name={i} href={`${i.toLowerCase()}`} />
          ))}
        </MobileNav>
        <NavbarToggle toggle={() => toggleOpen()} />
      </div>
    </motion.nav>
  );
};

export default Navbar;
