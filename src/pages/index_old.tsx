import Image from "next/image";
import { Work_Sans } from "next/font/google";
import Sec from "@/components/Section";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { animate, motion } from "framer-motion";
import { IdeaData } from "@/ts/landingGL/IdeaCloud";
import { useEffect, useRef, useState } from "react";
import { backgroundText, loc, productViewer } from "@/ts/atoms";
import { useAtom } from "jotai";
import Card from "@/components/Card";
import { fa42Group, faSpeakap } from "@fortawesome/free-brands-svg-icons";
import NeuroSVG from "@/components/svgs/Neuroscience";
import BraincareSVG from "@/components/svgs/Braincare";
import JederSVG from "../components/svgs/Jedermann";
import WomenSVG from "@/components/svgs/Women";
import ManipulateSVG from "@/components/svgs/Manipulate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowRightArrowLeft, faAtom, faCalendar, faContactBook, faContactCard, faPerson, faPhone, faPieChart } from "@fortawesome/free-solid-svg-icons";

const variants = {
  initial: { y: 20, filter: "blur(20px)", opacity: 0 },
  enter: { y: 0, filter: "blur(0px)", opacity: 1, delay: 1 },
  exit: { y: 20, filter: "blur(20px)", opacity: 0 },
};

const blurVariants = {
  initial: { y: 20, filter: "blur(20px)", opacity: 0 },
  animate: {
    y: 0,
    filter: "blur(0px)",
    opacity: 1,
    transition: { staggerChildren: 0.1375, when: "beforeChildren" },
  },
  exit: {
    y: 20,
    filter: "blur(20px)",
    opacity: 0,
    transition: { staggerChildren: 0.1, when: "afterChildren" },
  },
};

const variantsTest = {
  initial: { y: 20, filter: "blur(20px)", opacity: 0 },
  animate: { y: 0, filter: "blur(0px)", opacity: 1, delay: 1 },
  exit: { y: 20, filter: "blur(20px)", opacity: 0 },
};

export default function Home() {
  const searchParams = useSearchParams();
  const [location, setLocation] = useAtom(loc);
  useEffect(() => {
    console.log(location);
  }, [location]);

  const [pvAtom, setPVAtom] = useAtom(productViewer);
  const lpViewer = useRef<any>(!null);

  const setCoords = () => {
    const { width, height, left, top } =
      lpViewer?.current.getBoundingClientRect();
    setPVAtom({ width, height, left, top });
  };

  useEffect(() => {
    setCoords();
  }, []);


  useEffect(() => {
    if (typeof window !== undefined) {
      document.body.childNodes[0].childNodes[1].addEventListener('scroll', setCoords, false);
    }
    return () => {
      document.body.childNodes[0].childNodes[1].removeEventListener('scroll', setCoords, false);
    };
  });

  useEffect(() => {
    window.addEventListener('resize', setCoords, false);
    return () => {
      window.removeEventListener('resize', setCoords, false);
    };
  });

  return (
    <>
      {/* HERO SECTION ANFANG */}

      <Sec single left={false} sectionName="landing" id="first">
        <motion.div
          className="flex flex-col-reverse w-full  h-full md:flex-row"
          viewport={{ amount: 0.25, once: false, margin: "100px" }}
          initial="initial"
          // animate={searchParams.get("view") || searchParams.get("test") ? "exit" : "enter"}
          whileInView={
            searchParams.get("view") || searchParams.get("test")
              ? "exit"
              : "enter"
          }
          variants={{
            initial: { opacity: 0 },
            enter: {
              opacity: 1,
              display: "flex",
              filter: "blur(0px)",
              transition: { staggerChildren: 0.1, when: "beforeChildren" },
            },
            exit: {
              opacity: 0,
              transitionEnd: { display: "none" },
              transition: { staggerChildren: 0.1, when: "afterChildren" },
            },
          }}
        >

          <motion.div className="w-full h-full py-5 md:py-10 flex flex-col gap-2 items-start justify-center md:justify-center">
            <motion.div variants={variants}>
              <motion.dd className="text-4xl text-[#59684e]">
                Dein bester Freund: dein Hirn.
              </motion.dd>
              <motion.h1 className="text-[#222d1b]">
                Neuro<strong className="text-[#93c152]">Loyal</strong>
              </motion.h1>
            </motion.div>
            <motion.p
              variants={variants}
              className=" max-w-[60ch] text-zinc-900 hidden md:flex"
            >
              Pragmatische Wege, Strukturen und Prozesse, die das Wissen der
              Neurowissenschaften für jeden nutzbar machen.
              {/* Unser Gehirn gestaltet unseren Alltag. Wir sollten aktiv damit arbeiten, als wäre es unser bester Freund. MY InnoTrinsic bietet einen neuen Blick auf das Gehirn und seine Potenziale. Wir schaffen Mehrwert durch neuroloyales Handeln und BrainCare für Menschen und Organisationen. Dafür haben wir umsetzungsorientierte Wege, Strukturen, Instrumente und Prozesse entwickelt. */}
            </motion.p>
            <motion.div variants={variants} className="flex flex-wrap gap-4">
              <Link href={"/kontakt"} className="btn__primary">
                Erstgespräch <FontAwesomeIcon className="ml-2" icon={faCalendar} />
              </Link>
              <Link href={"/einsatzgebiete"} className="btn__outline ">
                Einsatzgebiete <FontAwesomeIcon className="ml-2" icon={faPieChart} />
              </Link>
            </motion.div>
          </motion.div>
          <motion.div ref={lpViewer} className=" py-5 md:py-10 w-full h-full flex flex-col gap-2 items-start justify-center"></motion.div>
          {/* HERO SECTION ENDE */}
          {/* RUBRIKEN ANFANG */}

          {/* TEST ANFANG */}

          <motion.div
            animate={searchParams.get("test") ? "enter" : "exit"}
            initial="initial"
            variants={{
              initial: { opacity: 0 },
              enter: {
                opacity: 1,
                display: "flex",
                filter: "blur(0px)",
                transition: { staggerChildren: 0.1, when: "beforeChildren" },
              },
              exit: {
                opacity: 0,
                transitionEnd: { display: "none" },
                transition: { staggerChildren: 0.1, when: "afterChildren" },
              },
            }}
            className="my-auto absolute py-5 md:py-10 flex flex-col gap-2 items-start justify-start text-black"
          >
            <motion.h3
              variants={variants}
              className="text-[#141d34] font-black"
            >
              Machen Sie mit uns den Selbsttest
            </motion.h3>
            <motion.div variants={variants} className="flex flex-wrap gap-4">
              <Link replace href={"#second"} shallow className="btn__primary">
                Weiter
              </Link>
              <Link href={"/"} shallow className="btn__outline">
                Zurück
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </Sec >
      <motion.section
        initial={{ opacity: 0, display: "none" }}
        animate={
          searchParams.get("test")
            ? { opacity: 1, display: "flex" }
            : { opacity: 0, transitionEnd: { display: "none" } }
        }
        id="second"
      >
        <motion.div
          initial="initial"
          whileInView={"animate"}
          viewport={{ once: false, margin: "100px", amount: "some" }}
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              display: "flex",
              filter: "blur(0px)",
              transition: {
                staggerChildren: 0.1,
                when: "beforeChildren",
                delay: 0.25,
              },
            },
            exit: {
              opacity: 0,
              transitionEnd: { display: "none" },
              transition: { staggerChildren: 0.1, when: "afterChildren" },
            },
          }}
          className="absolute  py-5 md:py-10 flex flex-col gap-2 items-start justify-start text-black"
        >
          <motion.p variants={variantsTest} className="text-zinc-900">
            Falten Sie bitte Ihre Hände
          </motion.p>
          <motion.div variants={variantsTest} className="flex flex-wrap gap-4">
            <Link replace href={"#third"} shallow className="btn__primary">
              Weiter
            </Link>
            <Link replace href={"#first"} className="btn__outline">
              Zurück
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>
      <motion.section
        id="third"
        animate={
          searchParams.get("test")
            ? { opacity: 1, display: "flex" }
            : { opacity: 0, transitionEnd: { display: "none" } }
        }
      >
        <motion.div
          initial="initial"
          whileInView={"animate"}
          viewport={{ once: false, margin: "100px", amount: "some" }}
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              display: "flex",
              filter: "blur(0px)",
              transition: {
                staggerChildren: 0.1,
                when: "beforeChildren",
                delay: 0.25,
              },
            },
            exit: {
              opacity: 0,
              transitionEnd: { display: "none" },
              transition: { staggerChildren: 0.1, when: "afterChildren" },
            },
          }}
          className="absolute  py-5 md:py-10 flex flex-col gap-2 items-start justify-start text-black"
        >
          <motion.p variants={variantsTest} className="text-zinc-900">
            Beobachten Sie welcher Daumen oben liegt, ist es der Rechte? Der
            Linke?
          </motion.p>
          <motion.div variants={variantsTest} className="flex flex-wrap gap-4">
            <Link replace href={"#fourth"} shallow className="btn__primary">
              Weiter
            </Link>
            <Link replace href={"#second"} className="btn__outline">
              Zurück
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>
      <motion.section
        id="fourth"
        animate={
          searchParams.get("test")
            ? { opacity: 1, display: "flex" }
            : { opacity: 0, transitionEnd: { display: "none" } }
        }
      >
        <motion.div
          initial="initial"
          whileInView={"animate"}
          viewport={{ once: false, margin: "100px", amount: "some" }}
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              display: "flex",
              filter: "blur(0px)",
              transition: {
                staggerChildren: 0.1,
                when: "beforeChildren",
                delay: 0.25,
              },
            },
            exit: {
              opacity: 0,
              transitionEnd: { display: "none" },
              transition: { staggerChildren: 0.1, when: "afterChildren" },
            },
          }}
          className="absolute  py-5 md:py-10 flex flex-col gap-2 items-start justify-start text-black"
        >
          <motion.p variants={variantsTest} className="text-zinc-900">
            Und jetzt lösen Sie bitte Ihre Hände…
          </motion.p>
          <motion.div variants={variantsTest} className="flex flex-wrap gap-4">
            <Link replace href={"#fifth"} shallow className="btn__primary">
              Weiter
            </Link>
            <Link replace href={"#third"} className="btn__outline">
              Zurück
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>
      <motion.section
        id="fifth"
        animate={
          searchParams.get("test")
            ? { opacity: 1, display: "flex" }
            : { opacity: 0, transitionEnd: { display: "none" } }
        }
      >
        <motion.div
          initial="initial"
          whileInView={"animate"}
          viewport={{ once: false, margin: "100px", amount: "some" }}
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              display: "flex",
              filter: "blur(0px)",
              transition: {
                staggerChildren: 0.1,
                when: "beforeChildren",
                delay: 0.25,
              },
            },
            exit: {
              opacity: 0,
              transitionEnd: { display: "none" },
              transition: { staggerChildren: 0.1, when: "afterChildren" },
            },
          }}
          className="absolute  py-5 md:py-10 flex flex-col gap-2 items-start justify-start text-black"
        >
          <motion.p variants={variantsTest} className="text-zinc-900 test-desc">
            Falten Sie Ihre Hände nun erneut, aber sodass der andere Daumen oben
            liegt.
          </motion.p>
          <motion.div variants={variantsTest} className="flex flex-wrap gap-4">
            <Link replace href={"#sixth"} shallow className="btn__primary">
              Weiter
            </Link>
            <Link replace href={"#fourth"} className="btn__outline">
              Zurück
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>
      <motion.section
        id="sixth"
        animate={
          searchParams.get("test")
            ? { opacity: 1, display: "flex" }
            : { opacity: 0, transitionEnd: { display: "none" } }
        }
      >
        <motion.div
          initial="initial"
          whileInView={"animate"}
          viewport={{ once: false, margin: "100px", amount: "some" }}
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              display: "flex",
              filter: "blur(0px)",
              transition: {
                staggerChildren: 0.1,
                when: "beforeChildren",
                delay: 0.25,
              },
            },
            exit: {
              opacity: 0,
              transitionEnd: { display: "none" },
              transition: { staggerChildren: 0.1, when: "afterChildren" },
            },
          }}
          className="absolute  py-5 md:py-10 flex flex-col gap-2 items-start justify-start text-black"
        >
          <motion.p variants={variantsTest} className="text-zinc-900 test-desc">
            Und, war es einfach, oder hat es sie irritiert? Wenn es Sie
            irritiert hat, dann haben sie die Aktivität Ihrer neuronalen Netze
            live erlebt.
          </motion.p>
          <motion.div variants={variantsTest} className="flex flex-wrap gap-4">
            <Link replace href={"#first"} shallow className="btn__primary">
              Nochmal
            </Link>
            <Link replace href={"#fifth"} className="btn__outline">
              Zurück
            </Link>
            <Link href={"/"} className="btn__outline">
              Test beenden
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>
      {/* TEST ENDE */}
      {/* SYMBOLE ANFANG */}

      <motion.div
        style={{ scrollSnapAlign: "start", height: "200vh" }}
        viewport={{ margin: "0px", amount: 0.25, once: false }}
        onViewportEnter={(entry) => {
          entry?.isIntersecting && setLocation("science");
        }}
        className="h-full w-full"
      >
        <motion.div
          initial="initial"
          whileInView={"animate"}
          viewport={{ once: false, margin: "100px", amount: 0.1 }}
          variants={{
            initial: { opacity: 1 },
            animate: {
              opacity: 1,
              display: "flex",
              filter: "blur(0px)",
              transition: {
                staggerChildren: 0.1,
                when: "beforeChildren",
                delay: 0.25,
              },
            },
            exit: {
              opacity: 0,
              transitionEnd: { display: "none" },
              transition: { staggerChildren: 0.1, when: "afterChildren" },
            },
          }}
          style={{ perspective: "100px" }}
          className="sticky flex my-auto justify-center items-start flex-col top-0 gap-4 md:gap-8 w-full h-auto"
        >
          <div className="science-content flex w-full flex-col justify-center items-start gap-4 md:gap-6">

            <motion.div
              variants={blurVariants}
              className="h-auto w-full rounded-xl flex flex-wrap lg:flex-nowrap justify-evenly lg:justify-between flex-row gap-6 md:my-10"
            >
              <Card header={`Neurowissen\n-schaftlich`}>
                <NeuroSVG />
              </Card>
              <Card header={`Besser Dank\nBraincare`}>
                <BraincareSVG />
              </Card>
              <Card header={"Universal Einsetzbar"}>
                <JederSVG />
              </Card>
              <Card header={"Women-owned \n business"}>
                <WomenSVG />
              </Card>
              <Card header={`Nicht manipulativ`}>
                <ManipulateSVG />
              </Card>
            </motion.div>
            <motion.h3
              variants={blurVariants}
              className="font-black text-[#45692c]"
            >
              Neuro<strong className="text-[#98d06d]">loyales</strong> Wachstum
            </motion.h3>


            <motion.p
              variants={blurVariants}
              className="font-bold text-[#44483d]"
            >
              Wir gestalten den Paradigmenwechsel durch Konzepte und Prozesse,
              die die Natur des Menschen respektieren. Dadurch ermöglichen wir
              ein simultanes und gemeinsames Wachstum von Individuen,
              Unternehmen und Gesellschaft. Human Awareness Growth, Individual Growth sowie Corporate Growth
              entsteht aus bewussten{" "}
              <strong className="font-extrabold text-[#45692c]">neuro</strong>
              <strong className="font-extrabold text-[#83bb58]">
                loyalen
              </strong>{" "}
              Schritten, die aus der Human Awareness resultiert.
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        style={{ scrollSnapAlign: "start", height: "200vh" }}
        viewport={{ margin: "0px", amount: 0.25, once: false }}
        onViewportEnter={(entry) => {
          entry?.isIntersecting && setLocation("braincare");
        }}
        className="h-full w-full "
      />
      {/* <motion.div
          viewport={{ margin: "0px", amount: 0.25, once: false }}
          onViewportEnter={(entry) => {
            entry?.isIntersecting && setLocation("universal");
          }}
          className="h-full w-full "
        />
        <motion.div
          viewport={{ margin: "0px", amount: 0.25, once: false }}
          onViewportEnter={(entry) => {
            entry?.isIntersecting && setLocation("empowering");
          }}
          className="h-full w-full "
        />
        <motion.div
          viewport={{ margin: "0px", amount: 0.25, once: false }}
          onViewportEnter={(entry) => {
            entry?.isIntersecting && setLocation("authentisch");
          }}
          className="h-full w-full "
        /> */}

      {/* SYMBOLE ENDE */}
      <Sec left single={false} sectionName="perspective" header="Neuroloyaler Perspektiven-Wechsel" text="Wir verändern Perspektiven, basierend auf
der Leitidee des &quot;Respekts vor dem Menschen&quot; und der Kooperation und
Kollaboration mit der Natur des Menschen - konkret der neuropsychologischen
Zusammenhänge - unserem Gehirn. Unser Ziel ist es, allseitigen und
wechselseitigen Mehrwert zu schaffen, Wachstum zu fördern und Durchbrüche für
Menschen, Organisationen, Umwelt und Gesellschaft zu erreichen.">
      </Sec>
      <Sec left={false} single={false} sectionName="architekt" header="Alltagsarchitekt Gehirn" text="MY InnoTrinsic konzentriert sich auf das Gehirn und seine
enorme Komplexität, die einen entscheidenden Einfluss auf unser Handeln, unsere
Leistungsfähigkeit, unser Wohlbefinden und das Wachstum von Organisationen und
Gesellschaft hat. Wir schöpfen aus den Neurowissenschaften und der
Neuropsychologie, um dieses Wissen in praktische Strukturen und Methoden zu
überführen, die im Unternehmensalltag und im Leben jedes Menschen unterstützen
können.">
      </Sec>
      <Sec left single={false} sectionName="freund" header="Das Gehirn wir zum besten Freund" text="Mit einem respektvollen Blick auf die Natur
des Menschen gehen wir neue Wege der Kooperation und Kollaboration mit dem
mächtigsten Organ des Körpers. Ähnlich wie wir für unsere physische Gesundheit
sorgen, zeigen wir Wege auf, wie das hochkomplexe Gehirn optimal genutzt werden
kann. Das Gehirn wird zum besten Freund, der uns unterstützt und begleitet.">
      </Sec>
      <Sec left={false} single={false} sectionName="braincare" header="BrainCare pragmatisch und mit Struktur:" text="Als verlässlicher Partner von Menschen
und Organisationen haben wir aus dem Wissen der Neurowissenschaften ein
neuroloyales Strukturprinzip entwickelt, um Menschen und Organisationen für diese
Komplexität zu sensibilisieren und neuroloyales Handeln mit BrainCare zu
ermöglichen. Unsere pragmatischen Strukturen und Bausteine sind bedarfsgerecht,
zielgenau, flexibel und leicht erlernbar - für jeden nutzbar und anwendbar.">
      </Sec>
    </>
  );
}
