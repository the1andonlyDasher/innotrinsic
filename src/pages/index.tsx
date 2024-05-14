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
import ContactForm from "@/components/ContactForm";
import FAQuestion from "@/components/FAQuestion";

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
    transition: { staggerChildren: 0.1, when: "beforeChildren", duration: 0.125 },
  },
  exit: {
    y: 20,
    filter: "blur(20px)",
    opacity: 0,
    transition: { staggerChildren: 0.1, when: "afterChildren" },
  },
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
                Mehrwert durch BrainCare:
              </motion.dd>
              <motion.h1 className="text-[#222d1b]">
                Neuro<strong className="text-[#93c152]">Loyal</strong>
              </motion.h1>
            </motion.div>
            <motion.p
              variants={variants}
              className=" max-w-[60ch] text-zinc-900 hidden md:flex"
            >
              MY InnoTrinsic eröffnet neuroloyale Perspektiven und bietet „Do-it-Lösungen“ für Menschen, Unternehmen und Organisationen.
              {/* Unser Gehirn gestaltet unseren Alltag. Wir sollten aktiv damit arbeiten, als wäre es unser bester Freund. MY InnoTrinsic bietet einen neuen Blick auf das Gehirn und seine Potenziale. Wir schaffen Mehrwert durch neuroloyales Handeln und BrainCare für Menschen und Organisationen. Dafür haben wir umsetzungsorientierte Wege, Strukturen, Instrumente und Prozesse entwickelt. */}
            </motion.p>
            <motion.div variants={variants} className="flex flex-wrap gap-4">
              <Link href={"/kontakt"} className="btn__primary">
                Erstgespräch <FontAwesomeIcon className="ml-2" icon={faCalendar} />
              </Link>
            </motion.div>
          </motion.div>
          <motion.div ref={lpViewer} className=" py-5 md:py-10 w-full h-full flex flex-col gap-2 items-start justify-center"></motion.div>
          {/* HERO SECTION ENDE */}
          {/* RUBRIKEN ANFANG */}


        </motion.div>
      </Sec >

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
      <Sec left={false} single sectionName="faq">
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
          className=" flex my-auto justify-center items-start flex-col top-0 gap-4 md:gap-8 w-full h-auto"
        >
          <motion.h3 variants={blurVariants} className="m-0 w-auto text-[#32689C]">FAQ</motion.h3>
          <FAQuestion title="Was bedeutet „neuroloyal“?" description="Wortwörtlich bedeutet es gehirngerecht. Doch loyal bedeutet nach unserem
Verständnis noch viel mehr, nämlich respektierend, innerlich verbunden, schützend,
wohlwollend und achtsam. Neuroloyal zu handeln heißt also, stets im Einklang mit
seinem Gehirn zu agieren. Es heißt, die jeweils individuellen Zufriedenheitsantriebe
zu kennen und in sein zukünftiges Handeln miteinzubeziehen. So fällt es leichter zu
starten und durchzuhalten."/>
          <FAQuestion title="Was ist BrainCare?" description="Nicht ohne Grund verwenden wir das Bild vom Gehirn, dem eine schützende Hand
hinzugefügt ist. Unser Ziel ist es, das Gehirn als Freund zu verstehen, das
entsprechend gepflegt werden muss, um sein optimales Potenzial zu entfalten.
Daher helfen wir, Brain-Brakes zu erkennen und zu umgehen sowie Brain-Booster zu
entdecken und gezielt zu fördern."/>
          <FAQuestion title="Ein Programm, unterschiedliche Einsatzbereiche - wie kann das funktionieren?" description="Weil es letztlich immer um den Menschen geht, auch im Business. Denn obwohl
stets von „dem Unternehmen“ die Rede ist - am Ende sind es Menschen, die dort
agieren und mit ihren Handlungen im besten Fall für Wachstum, Fortschritt und
Gewinn sorgen. Und die sind keine Maschinen, sondern agieren nach den
Spielregeln der menschlichen Natur. Wenn wir anfangen, diese Spielregeln und
Rahmenbedingungen der NeuroPhysis nicht nur zu akzeptieren, sondern konstruktiv
in den Alltag zu integrieren, erreichen wir Mehr-Wert durch optimale, intrinsisch
motivierte Ressourcennutzung. Das gelingt ebenso im Einzelscouting für
Privatpersonen wie im Business-Scouting für Unternehmen. Mehr noch: MY
InnoTrinsic ist die erste Methodik, die dank des modularen Systems
neurowissenschaftliche Erkenntnisse management- und prozessfähig umsetzt."/>
          <FAQuestion title="Wie lange dauert ein Scouting?" description="Das hängt von der jeweiligen Fragestellung ab: Im Durchschnitt reichen beim Impuls-
Scouting 4 Stunden für kleinere, individuelle Fragestellungen. Ein klassisches
Einzelscouting dauert 3 Tage. Eine umfassende, individuell abgestimmte
Projektbegleitung im Unternehmen nimmt erfahrungsgemäß mehr Zeit in Anspruch."/>
          <FAQuestion title="Warum nennen wir es Scouting und nicht Coaching oder Beratung?" description="Wir sind BrainScouts, die neurophysisch-unternehmensrelevante Zusammenhänge
sowie ihre teils weitreichenden Folgen aufzeigen und Handlungsoptionen skizzieren.
Wenn die Entscheidung fällt, mit uns gemeinsam dieses Neuland erkunden, beraten
wir nicht, sondern sind dabei: Wir packen gemeinsam einen Rucksack mit
neuroloyalem Background-Wissen und wichtigen Werkzeugen. Wir zeigen Wege und
Alternativwege und entdecken gemeinsam neue Möglichkeiten für den Einzelnen
und/oder das Unternehmen. Denn darauf legen wir größten Wert: Dass es konkrete
Ergebnisse und Ideen gibt. Und: Dass wir irgendwann nicht mehr benötigt werden."/>
          <FAQuestion title="Was heißt „Selbstbestimmt“?" description="Das Steuer hat immer der Scoutie in der Hand. Mit MY InnoTrinsic ist keine
Manipulation möglich. MY InnoTrinsic funktioniert nur, wenn der Einzelne das
Basiswissen über die neuronalen Zusammenhänge verstanden hat und sich
ausdrücklich für seinen ganz eigenen, individuellen neuroloyalen Weg entschieden
hat. Denn neuroloyales Wachstum entsteht aus den Antrieben des Einzelnen - und
nicht aus einem fertigen Glaubenssystem."/>
          <FAQuestion title="Was unterscheidet MY InnoTrinsic von anderen Angeboten?" description="MY InnoTrinsic ist Methodenrebellion mit Win-Win-Dynamik. Es ist ein tief gehender
neurowissenschaftlich verankerter Prozess, der den Menschen bzw. den Menschen
mit seinen neurophysischen Besonderheiten in den Mittelpunkt stellt. Durch
neuroloyales BrainCare werden für Privatpersonen Umbrüche zu Durchbrüchen und
in Unternehmen Mitarbeitende zu MitWirkern, die motiviert Neues entwickeln und
vorantreiben. Wir arbeiten transparent und legen jederzeit alle Karten auf den Tisch,
indem wir unsere neuroloyalen Werkzeuge zur eigenen Verwendung zur Verfügung
stellen. MY InnoTrinsic ist zudem die erste Methodik, die auf Basis eines modularen
Systems neurowissenschaftliche Erkenntnisse und konkreter neuroloyaler
Instrumente, management- und prozessfähig umsetzt.."/>
        </motion.div>
      </Sec>
      <ContactForm props={{ title: "Kontakt", subtitle: "Teilen Sie uns mit was wir für Sie tun können." }} />
    </>
  );
}
