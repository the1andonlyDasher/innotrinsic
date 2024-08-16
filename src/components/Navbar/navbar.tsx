import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { NavItem } from "@/components/Navbar/NavItemDesktop";
import Navigation from "@/components/Navbar/Navigation";
import MobileNav from "@/components/Navbar/MobileNav";
import { NavItem as Mnav } from "@/components/Navbar/NavItemMobile";
import NavbarToggle from "./NavbarToggle";
import { useAtom } from "jotai";
import { loc } from "@/ts/atoms";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent } from "react";
import HomeBtn from "./HomeBtn";
import Home from '../../pages/index';
import { addColors, targetColorsNavTitle } from "@/ts/bgColors";


const Navbar = ({ contentContainer, navbar, legals }: any) => {
  const router = useRouter()
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
    open: {},

  };

  const image_variants = {
    initial: { scale: 0, opacity: 0 },
    enter: { scale: [0, 1.2, 1], opacity: 1 },
    exit: { scale: 0, opacity: 0 },
  }




  const [isOpen, toggleOpen] = useCycle(false, true);
  const [location, setLocation] = useAtom(loc);
  const [nextColor1, setNextColor1] = useState(targetColorsNavTitle[`${location}`])
  const [nextColor2, setNextColor2] = useState(addColors[`${location}`])

  useEffect(() => {
    setNextColor1(targetColorsNavTitle[`${location}`])
    setNextColor2(addColors[`${location}`])
  }, [location]);

  const pathsToShowTitle = [
    "/business",
    "/private",
    "/dashboard",
  ]

  useEffect(() => {
    // Scroll to top when navigating to the root
    const handleRouteChange = (url: string) => {
      if (url === '/') {
        contentContainer.current.scrollTo(0, 0);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (router.pathname === '/') {
      e.preventDefault();
      contentContainer.current.scrollTo(0, 0);
    }
  };

  return (
    <motion.nav
      className={`navbar`}
      variants={variants}
      ref={navbarMain}
      initial={false}
      animate={isOpen ? "open" : "closed"}
    >
      <div className="navbar__container" aria-haspopup="menu" >
        <motion.div
          variants={image_variants} initial="hidden" animate="enter" exit="exit"
        >
          <Link
            aria-label="Home"
            aria-current="page"
            className="company__name"

            href="/"
          >
            <div className="flex flex-row gap-4 items-center" onClick={handleClick}>

              <svg
                className="navbar__logo"
                xmlns="http://www.w3.org/2000/svg"
                width={323}
                height={323}
                viewBox="0 0 323 323"
              >
                <motion.path animate={{ fill: nextColor1 }} d="M324.4 144.8c-.8-50.9-21.6-91.1-60.2-116.3-39-25.3-84-28-101.5-28-37 0-76.2 11.8-105.1 31.6l.3.4-.3-.4C20.3 57.8.5 95.4.5 140.8c0 70.4 26.5 115.6 60 143.2 33.5 27.7 74 37.8 102.2 38.5h121.5c8.3 0 15.5-4.7 18.7-12.3 3.3-7.6 1.7-16.1-4-22.1l-32.1-33.4c31.9-19.9 58.5-53.1 57.6-109.9zm-71.2 95.7-65.7-68.4c-5.5-5.8-14-7.6-21.5-4.6s-12.4 10.2-12.4 18.3v78.4c0 6.1 2.7 11.9 7.4 15.9 4.7 3.9 10.8 5.6 16.9 4.5 16.7-2.9 44.7-7.9 71.9-20.6l35.6 37.1c.4.4.5.7.5 1 0 .3 0 .6-.2.9-.2.5-.6 1-1.6 1H162.9c-2.9-.1-38.9-1.4-74.1-22.4-35.2-21-69.7-61.7-69.7-140.7 0-24.5 9.6-54.9 32.3-79.2C74 37.5 109.6 19.3 161.9 19.1l-.1.1h.8c67.3 0 103 26.2 121.9 55.1 18.9 28.8 21.1 60.3 21.3 70.9.2 16.2-1.4 33.6-8.9 50.1s-20.7 32.2-43.7 45.2zm-79-55.7 61.6 64.2c-16.4 6.9-36.4 12.7-61 17.1-.8.1-1.3-.1-1.6-.4-.3-.2-.8-.8-.8-1.6v-78.4c0-.1 0-.3.1-.5s.2-.4.6-.5c0 0 .1 0 .2-.1h.5s.1 0 .1.1c.1 0 .2 0 .3.1-.1 0 0 0 0 0z" />
              </svg>

              <motion.div className="navbar__text">

                <motion.div animate={{ color: nextColor1, y: 0, x: 0 }} className={`main-name `}>
                  MY InnoTrinsic
                </motion.div>
                <AnimatePresence mode="wait">
                  {pathsToShowTitle.includes(router.pathname) && (

                    <motion.div
                      key={router.pathname}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1, color: nextColor2, transition: { x: { delay: 1 }, opacity: { delay: 1 } } }}
                      exit={{ opacity: 0, x: -10 }}
                      className={`name-add`}
                    >
                      {router.pathname.replace(/^\/(.*)/, (match, p1) => p1.charAt(0).toUpperCase() + p1.slice(1))}
                    </motion.div>

                  )}</AnimatePresence>
              </motion.div>
            </div>
          </Link>

        </motion.div>
        <Navigation>
          <HomeBtn contentContainer={contentContainer} />
          {navbar.map((i: any, index: number) => (
            <NavItem icon={i[1]} clickLink={null} key={i[0]} name={i[0]} href={i[2] === false ? `/${i[0].toLowerCase()}` : `/#${i[0].toLowerCase()}`} />
          ))}
        </Navigation>
        <MobileNav>
          <Mnav toggle={() => toggleOpen()} icon={null} clickLink={null} name={"Home"} href={"/"} />
          {navbar.map((i: any, index: number) => (
            <Mnav toggle={() => toggleOpen()} icon={i[1]} clickLink={null} key={i[0]} name={i[0]} href={i[2] === false ? `/${i[0].toLowerCase()}` : `/#${i[0].toLowerCase()}`} />
          ))}
          {legals.map((i: any, index: number) => (
            <Mnav secondary toggle={() => toggleOpen()} key={i} name={i} href={`/${i.toLowerCase()}`} />
          ))}
        </MobileNav>
        <NavbarToggle toggle={() => toggleOpen()} />
      </div >
    </motion.nav >
  );
};

export default Navbar;
