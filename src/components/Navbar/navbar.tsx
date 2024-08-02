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
import { targetColorsNavTitle, addColors } from "@/ts/bgColors";


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
    open: {}
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
      // className={isShrunk ? "navbar shrunk" : "navbar"}
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
                xmlSpace="preserve"
                width={324.962}
                height={323}
                viewBox="0 0 85.98 85.46"
              >
                <g
                  style={{
                    fill: "none",
                  }}
                >
                  <motion.path
                    animate={{ fill: nextColor1 }}
                    d="M162.665 322.5h121.548c8.308 0 15.484-4.698 18.737-12.341 3.252-7.641 1.685-16.133-4.037-22.091l-32.071-33.432c31.866-19.788 58.479-53.006 57.599-109.848-.766-50.935-21.581-91.144-60.231-116.258C225.241 3.202 180.222.5 162.676.5c-37.002 0-76.243 11.83-105.07 31.618l.278.404-.278-.404C20.27 57.753.5 95.368.5 140.803c0 70.424 26.463 115.56 59.995 143.234 33.512 27.658 74.045 37.844 102.17 38.463zm-.799-303.384-.058.116h.81c67.284 0 102.955 26.246 121.867 55.056 18.936 28.845 21.12 60.337 21.267 70.867.234 16.199-1.409 33.555-8.889 50.121-7.439 16.476-20.668 32.208-43.648 45.246l-65.669-68.416-.001-.001c-5.55-5.845-13.995-7.65-21.528-4.64-7.537 3.012-12.362 10.184-12.362 18.255v78.386c0 6.138 2.711 11.914 7.406 15.883l.002.002c4.695 3.909 10.839 5.596 16.865 4.512 16.682-2.924 44.734-7.896 71.909-20.614l35.602 37.085.007.007c.369.369.502.706.532.992.032.294-.04.584-.163.855l-.005.01-.004.011c-.185.46-.624 1.036-1.593 1.036H162.858c-2.936-.059-38.87-1.4-74.064-22.425-35.173-21.012-69.663-61.718-69.663-140.657 0-24.454 9.552-54.877 32.262-79.182C73.976 37.452 109.6 19.3 161.866 19.116Zm11.625 165.46h.373l.091.058a1.684 1.684 0 0 1 .212.179l.007.007h.001l.001.001v.001l.005.005.006.006 61.559 64.182c-16.352 6.904-36.436 12.725-60.991 17.065l-.005.001c-.759.142-1.316-.139-1.64-.417l-.005-.005a2.06 2.06 0 0 1-.761-1.612v-78.385c0-.142.004-.312.082-.486.07-.156.221-.361.608-.52l.017-.007.016-.008a.864.864 0 0 1 .243-.053c.053-.006.1-.009.134-.01l.038-.002h.008z"
                    style={{
                      stroke: "none",
                    }}
                    transform="scale(.26458)"
                  />
                </g>
              </svg>

              <motion.div className="navbar__text">

                <motion.div animate={{ color: nextColor1 }} className={`main-name `}>
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
            <NavItem icon={i[1]} clickLink={null} key={i[0]} name={i[0]} href={i[2] === false ? `${i[0].toLowerCase()}` : `#${i[0].toLowerCase()}`} />
          ))}
        </Navigation>
        <MobileNav>
          <Mnav toggle={() => toggleOpen()} icon={null} clickLink={null} name={"Home"} href={"/"} />
          {navbar.map((i: any, index: number) => (
            <Mnav toggle={() => toggleOpen()} icon={i[1]} clickLink={null} key={i[0]} name={i[0]} href={i[2] === false ? `${i[0].toLowerCase()}` : `#${i[0].toLowerCase()}`} />
          ))}
          {legals.map((i: any, index: number) => (
            <Mnav secondary toggle={() => toggleOpen()} key={i} name={i} href={`${i.toLowerCase()}`} />
          ))}
        </MobileNav>
        <NavbarToggle toggle={() => toggleOpen()} />
      </div >
    </motion.nav >
  );
};

export default Navbar;
