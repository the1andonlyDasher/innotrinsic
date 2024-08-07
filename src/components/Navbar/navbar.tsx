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
                viewBox="0 0 1138 323"
                
              >
                <g
                  style={{
                    fill: "none",
                  }}
                >
                  {/* <motion.path
                    animate={{ fill: nextColor1 }}
                    d="M162.665 322.5h121.548c8.308 0 15.484-4.698 18.737-12.341 3.252-7.641 1.685-16.133-4.037-22.091l-32.071-33.432c31.866-19.788 58.479-53.006 57.599-109.848-.766-50.935-21.581-91.144-60.231-116.258C225.241 3.202 180.222.5 162.676.5c-37.002 0-76.243 11.83-105.07 31.618l.278.404-.278-.404C20.27 57.753.5 95.368.5 140.803c0 70.424 26.463 115.56 59.995 143.234 33.512 27.658 74.045 37.844 102.17 38.463zm-.799-303.384-.058.116h.81c67.284 0 102.955 26.246 121.867 55.056 18.936 28.845 21.12 60.337 21.267 70.867.234 16.199-1.409 33.555-8.889 50.121-7.439 16.476-20.668 32.208-43.648 45.246l-65.669-68.416-.001-.001c-5.55-5.845-13.995-7.65-21.528-4.64-7.537 3.012-12.362 10.184-12.362 18.255v78.386c0 6.138 2.711 11.914 7.406 15.883l.002.002c4.695 3.909 10.839 5.596 16.865 4.512 16.682-2.924 44.734-7.896 71.909-20.614l35.602 37.085.007.007c.369.369.502.706.532.992.032.294-.04.584-.163.855l-.005.01-.004.011c-.185.46-.624 1.036-1.593 1.036H162.858c-2.936-.059-38.87-1.4-74.064-22.425-35.173-21.012-69.663-61.718-69.663-140.657 0-24.454 9.552-54.877 32.262-79.182C73.976 37.452 109.6 19.3 161.866 19.116Zm11.625 165.46h.373l.091.058a1.684 1.684 0 0 1 .212.179l.007.007h.001l.001.001v.001l.005.005.006.006 61.559 64.182c-16.352 6.904-36.436 12.725-60.991 17.065l-.005.001c-.759.142-1.316-.139-1.64-.417l-.005-.005a2.06 2.06 0 0 1-.761-1.612v-78.385c0-.142.004-.312.082-.486.07-.156.221-.361.608-.52l.017-.007.016-.008a.864.864 0 0 1 .243-.053c.053-.006.1-.009.134-.01l.038-.002h.008z"
                    style={{
                      stroke: "none",
                    }}
                    transform="scale(.26458)"
                  /> */}
                  <motion.path  animate={{ fill: nextColor1 }} class="st0" d="M324.4,144.8c-0.8-50.9-21.6-91.1-60.2-116.3c-39-25.3-84-28-101.5-28c-37,0-76.2,11.8-105.1,31.6l0.3,0.4
                  l-0.3-0.4C20.3,57.8,0.5,95.4,0.5,140.8c0,70.4,26.5,115.6,60,143.2c33.5,27.7,74,37.8,102.2,38.5h0h121.5
                  c8.3,0,15.5-4.7,18.7-12.3c3.3-7.6,1.7-16.1-4-22.1l-32.1-33.4C298.7,234.8,325.3,201.6,324.4,144.8z M253.2,240.5l-65.7-68.4
                  c0,0,0,0,0,0c-5.5-5.8-14-7.6-21.5-4.6c-7.5,3-12.4,10.2-12.4,18.3v78.4c0,6.1,2.7,11.9,7.4,15.9l0,0c4.7,3.9,10.8,5.6,16.9,4.5
                  c16.7-2.9,44.7-7.9,71.9-20.6l35.6,37.1l0,0c0.4,0.4,0.5,0.7,0.5,1c0,0.3,0,0.6-0.2,0.9l0,0l0,0c-0.2,0.5-0.6,1-1.6,1H162.9
                  c-2.9-0.1-38.9-1.4-74.1-22.4c-35.2-21-69.7-61.7-69.7-140.7c0-24.5,9.6-54.9,32.3-79.2C74,37.5,109.6,19.3,161.9,19.1l-0.1,0.1
                  h0.8c67.3,0,103,26.2,121.9,55.1c18.9,28.8,21.1,60.3,21.3,70.9c0.2,16.2-1.4,33.6-8.9,50.1C289.4,211.8,276.2,227.5,253.2,240.5z
                  M174.2,184.8L174.2,184.8l61.6,64.2c-16.4,6.9-36.4,12.7-61,17.1l0,0c-0.8,0.1-1.3-0.1-1.6-0.4l0,0c-0.3-0.2-0.8-0.8-0.8-1.6
                  v-78.4c0-0.1,0-0.3,0.1-0.5c0.1-0.2,0.2-0.4,0.6-0.5l0,0l0,0c0,0,0.1,0,0.2-0.1c0.1,0,0.1,0,0.1,0c0,0,0,0,0,0h0h0h0.4
                  c0,0,0.1,0,0.1,0.1C174,184.7,174.1,184.7,174.2,184.8C174.1,184.8,174.2,184.8,174.2,184.8L174.2,184.8L174.2,184.8L174.2,184.8
                  L174.2,184.8L174.2,184.8z"/>
                <motion.rect animate={{ fill: nextColor1 }} x="588.7" y="109.3" class="st0" width="17.6" height="72.7"/>
                <motion.polygon animate={{ fill: nextColor1 }} class="st0" points="524.8,139.7 524.2,139.7 508.8,109.3 489.2,109.3 515.8,157.7 515.8,182 533.2,182 533.2,157.7 
                  559.8,109.3 540.2,109.3 	"/>
                <motion.path  animate={{ fill: nextColor1 }} class="st0" d="M724.4,129.3c-2.8-1.7-6.1-2.6-10-2.6c-4,0-7.5,1-10.4,2.9c-2.9,1.9-5,4.5-6.2,7.8h-0.6v-10h-16.5V182H698
                  v-31.1c0-2.1,0.4-3.9,1.1-5.3c0.8-1.5,1.8-2.6,3.2-3.4c1.4-0.8,3-1.2,4.8-1.2c2.7,0,4.9,0.9,6.4,2.6c1.6,1.7,2.3,4.1,2.3,7.1V182
                  h17.4v-34.8c0-4.1-0.8-7.7-2.3-10.7C729.4,133.4,727.2,131,724.4,129.3z"/>
                <motion.path  animate={{ fill: nextColor1 }} class="st0" d="M661,129.3c-2.8-1.7-6.1-2.6-10-2.6c-4,0-7.5,1-10.4,2.9c-2.9,1.9-5,4.5-6.2,7.8h-0.6v-10h-16.5V182h17.4
                  v-31.1c0-2.1,0.4-3.9,1.1-5.3c0.8-1.5,1.8-2.6,3.2-3.4c1.4-0.8,3-1.2,4.8-1.2c2.7,0,4.9,0.9,6.4,2.6c1.6,1.7,2.3,4.1,2.3,7.1V182
                  h17.4v-34.8c0-4.1-0.8-7.7-2.3-10.7C666,133.4,663.8,131,661,129.3z"/>
                <motion.path  animate={{ fill: nextColor1 }} class="st0" d="M1116.8,165.5c-0.8,1.3-1.8,2.3-3.1,3c-1.2,0.7-2.7,1-4.3,1c-2,0-3.8-0.6-5.3-1.7c-1.5-1.1-2.7-2.8-3.5-5
                  c-0.8-2.2-1.2-4.9-1.2-8.2c0-3.2,0.4-5.9,1.2-8.1c0.8-2.2,2-3.9,3.5-5c1.5-1.1,3.3-1.7,5.3-1.7c2.5,0,4.5,0.8,6,2.4
                  c1.6,1.6,2.5,3.8,2.8,6.6h16.2c-0.1-4.5-1.2-8.4-3.4-11.7c-2.1-3.3-5-5.9-8.8-7.7c-3.7-1.8-8.1-2.7-13.2-2.7
                  c-5.7,0-10.6,1.2-14.7,3.6c-4.1,2.4-7.2,5.7-9.5,9.9c-2.2,4.2-3.3,9.1-3.3,14.7c0,5.6,1.1,10.5,3.3,14.7c2.2,4.2,5.3,7.5,9.4,9.9
                  c4.1,2.4,9.1,3.6,14.8,3.6c5.1,0,9.5-0.9,13.2-2.8c3.7-1.9,6.6-4.5,8.7-7.8c2.1-3.4,3.2-7.3,3.4-11.8h-16.2
                  C1118.1,162.5,1117.6,164.2,1116.8,165.5z"/>
                <motion.rect animate={{ fill: nextColor1 }} x="1055.4" y="127.5" class="st0" width="17.4" height="54.5"/>
                <motion.polygon animate={{ fill: nextColor1 }} class="st0" points="441.6,154.3 440.7,154.3 422.3,109.3 400.5,109.3 400.5,182 417.6,182 417.6,137.1 418.2,137.1 
                  435.7,181.5 446.6,181.5 464.1,137.3 464.7,137.3 464.7,182 481.8,182 481.8,109.3 460.1,109.3 	"/>
                <motion.rect animate={{ fill: nextColor1 }} x="906.1" y="127.5" class="st0" width="17.4" height="54.5"/>
                <motion.path  animate={{ fill: nextColor1 }} class="st0" d="M914.8,104.5c-2.4,0-4.5,0.8-6.3,2.5c-1.8,1.6-2.6,3.6-2.6,5.8c0,2.3,0.9,4.3,2.6,5.9c1.8,1.6,3.8,2.4,6.3,2.4
                  c2.5,0,4.6-0.8,6.3-2.4c1.8-1.6,2.6-3.6,2.6-5.9c0-2.3-0.9-4.2-2.6-5.8C919.3,105.3,917.2,104.5,914.8,104.5z"/>
                <motion.path  animate={{ fill: nextColor1 }} class="st0" d="M978.2,129.3c-2.8-1.7-6.1-2.6-10-2.6c-4,0-7.5,1-10.4,2.9c-2.9,1.9-5,4.5-6.2,7.8H951v-10h-16.5V182h17.4
                  v-31.1c0-2.1,0.4-3.9,1.1-5.3c0.8-1.5,1.8-2.6,3.2-3.4c1.4-0.8,3-1.2,4.8-1.2c2.7,0,4.9,0.9,6.4,2.6c1.6,1.7,2.3,4.1,2.3,7.1V182
                  h17.4v-34.8c0-4.1-0.8-7.7-2.3-10.7C983.2,133.4,981,131,978.2,129.3z"/>
                <motion.path  animate={{ fill: nextColor1 }} class="st0" d="M1030.6,149.8l-10.5-2c-2.3-0.5-3.9-1.1-4.8-1.9c-0.9-0.8-1.3-1.7-1.3-2.8c0-1.4,0.7-2.5,2.1-3.3
                  c1.4-0.8,3.1-1.2,5.2-1.2c1.5,0,2.9,0.3,4,0.8c1.2,0.5,2.1,1.2,2.9,2.1c0.7,0.9,1.2,1.9,1.4,3l15.9-0.4c-0.4-5.4-2.8-9.6-7.1-12.7
                  c-4.3-3.1-10.1-4.7-17.5-4.7c-4.9,0-9.2,0.7-12.8,2.1c-3.6,1.4-6.4,3.4-8.4,6c-2,2.6-2.9,5.7-2.9,9.3c0,4.2,1.3,7.6,4,10.3
                  c2.7,2.7,6.8,4.5,12.2,5.5l9.5,1.8c2.3,0.4,3.9,1,5,1.8c1.1,0.7,1.6,1.7,1.6,2.9c0,1.4-0.7,2.5-2.1,3.3c-1.4,0.8-3.2,1.2-5.4,1.2
                  c-2.5,0-4.5-0.5-6.1-1.6c-1.6-1-2.6-2.6-3-4.5l-17.1,0.4c0.6,5.4,3.2,9.7,7.7,12.9c4.5,3.2,10.6,4.8,18.4,4.8c4.9,0,9.2-0.8,13-2.3
                  c3.8-1.5,6.8-3.7,8.9-6.5c2.2-2.8,3.3-6,3.3-9.8c0-4-1.4-7.2-4-9.6C1040.1,152.5,1036.1,150.8,1030.6,149.8z"/>
                <motion.path  animate={{ fill: nextColor1 }} class="st0" d="M784.3,130.3c-4.1-2.4-9-3.6-14.7-3.6c-5.7,0-10.7,1.2-14.8,3.6c-4.1,2.3-7.3,5.6-9.5,9.9
                  c-2.2,4.2-3.3,9.1-3.3,14.7c0,5.6,1.1,10.5,3.3,14.7c2.2,4.2,5.4,7.5,9.5,9.9c4.1,2.3,9,3.5,14.8,3.5c5.7,0,10.6-1.2,14.7-3.5
                  c4.1-2.4,7.3-5.7,9.5-9.9c2.2-4.2,3.3-9.1,3.3-14.7c0-5.6-1.1-10.5-3.3-14.7C791.5,135.9,788.4,132.6,784.3,130.3z M778.2,162.7
                  c-0.8,2.3-1.9,4-3.3,5.3c-1.4,1.3-3.2,1.9-5.3,1.9c-2.2,0-4-0.6-5.5-1.9c-1.5-1.3-2.6-3.1-3.4-5.3c-0.8-2.3-1.1-4.9-1.1-7.9
                  c0-3,0.4-5.7,1.1-8c0.8-2.3,1.9-4,3.4-5.3c1.5-1.3,3.3-1.9,5.5-1.9c2.1,0,3.8,0.6,5.3,1.9c1.4,1.3,2.5,3.1,3.3,5.3
                  c0.8,2.3,1.2,4.9,1.2,8C779.4,157.8,779,160.4,778.2,162.7z"/>
                <motion.path  animate={{ fill: nextColor1 }} class="st0" d="M894.1,126.7c-3,0-5.6,0.9-7.8,2.7c-2.2,1.8-3.9,4.4-4.9,8h-0.6v-9.9H864V182h17.4v-29.6
                  c0-2.2,0.5-4.1,1.4-5.7c0.9-1.6,2.2-2.9,3.9-3.8c1.7-0.9,3.5-1.4,5.6-1.4c1,0,2.2,0.1,3.6,0.2c1.3,0.2,2.4,0.4,3.3,0.7v-15.1
                  c-0.7-0.2-1.5-0.4-2.4-0.5C895.8,126.8,894.9,126.7,894.1,126.7z"/>
                <motion.path  animate={{ fill: nextColor1 }} class="st0" d="M1064.1,104.5c-2.4,0-4.5,0.8-6.3,2.5c-1.8,1.6-2.6,3.6-2.6,5.8c0,2.3,0.9,4.3,2.6,5.9
                  c1.8,1.6,3.8,2.4,6.3,2.4c2.5,0,4.6-0.8,6.3-2.4c1.8-1.6,2.6-3.6,2.6-5.9c0-2.3-0.9-4.2-2.6-5.8
                  C1068.6,105.3,1066.6,104.5,1064.1,104.5z"/>
                <motion.polygon animate={{ fill: nextColor1 }} class="st0" points="799.6,123.5 821.7,123.5 821.7,182 839,182 839,123.5 861.1,123.5 861.1,109.3 799.6,109.3 	"/>
                </g>
              </svg>

              {/* <motion.div className="navbar__text">

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
              </motion.div> */}
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
