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
import { faArrowDown, faArrowRight, faArrowRightArrowLeft, faAtom, faCalendar, faCheck, faContactBook, faContactCard, faPerson, faPhone, faPieChart } from "@fortawesome/free-solid-svg-icons";
import ContactForm from "@/components/ContactForm";
import FAQuestion from "@/components/FAQuestion";

const variants = {
  initial: { y: 20, filter: "blur(20px)", opacity: 0 },
  enter: { y: 0, filter: "blur(0px)", opacity: 1, delay: 1 },
  exit: { y: 20, filter: "blur(20px)", opacity: 0 },
};

const variants2 = {
  initial: { y: 20, filter: "blur(20px)", opacity: 0 },
  enter: { y: 0, filter: "blur(0px)", opacity: 1 },
  exit: { y: 20, filter: "blur(20px)", opacity: 0 },
};

const blurVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.1, when: "afterChildren" },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.1, when: "afterChildren" },
  },
};


export default function Home() {
  var date = new Date();
  var year: any = date.getFullYear().toString();
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
          viewport={{ amount: 0.25, once: false, margin: "0px" }}
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

              </motion.dd>
              <motion.h1 className="text-[#ffffff]">
                Jetzt, <br /> besser,<br /> <strong className="text-[#c3db7f]">Neuro</strong>Loyal
              </motion.h1>
            </motion.div>
            <motion.p
              variants={variants}
              className=" max-w-[60ch] text-[#eff1de] flex"
            >Mehrwert durch BrainCare: MY InnoTrinsic eröffnet neuroloyale Perspektiven und bietet „Do-it-Lösungen“ für Menschen, Unternehmen und Organisationen.
              {/* Unser Gehirn gestaltet unseren Alltag. Wir sollten aktiv damit arbeiten, als wäre es unser bester Freund. MY InnoTrinsic bietet einen neuen Blick auf das Gehirn und seine Potenziale. Wir schaffen Mehrwert durch neuroloyales Handeln und BrainCare für Menschen und Organisationen. Dafür haben wir umsetzungsorientierte Wege, Strukturen, Instrumente und Prozesse entwickelt. */}
            </motion.p>
            <motion.div variants={variants} className="flex  flex-wrap gap-4">
              <Link href={"/#mehr"} className="btn__primary">
                Erfahre mehr <FontAwesomeIcon className="ml-2" icon={faArrowDown} />
              </Link>
              <Link href={"/#kontakt"} className="btn__outline">
                Erstgespräch <FontAwesomeIcon className="ml-2" icon={faCalendar} />
              </Link>
            </motion.div>
          </motion.div>
          <motion.div variants={variants} ref={lpViewer} className=" md:py-10 w-full  flex flex-col gap-2 items-start justify-center">
            <Image className="m-auto w-[300px] sm:w-[400px] md:w-[500px]  " src="/images/landing_braincare_transparent.webp" width={600} height={300} alt=" Gehirn in einem Glaskopf wird von einer Hand gehalten" />
          </motion.div>
          {/* HERO SECTION ENDE */}
          {/* RUBRIKEN ANFANG */}


        </motion.div>
      </Sec >

      {/* SYMBOLE ANFANG */}

      <motion.div
        id="mehr"
        viewport={{ amount: 0.1, once: false, margin: "0px" }}
        initial="initial"
        whileInView="enter"
        variants={{
          initial: { opacity: 0 },
          enter: {
            opacity: 1,
          },
          exit: {
            opacity: 0
          },
        }}

        onViewportEnter={(entry) => {
          entry?.isIntersecting && setLocation("science");
        }}
        className=" py-16 flex my-auto justify-center items-start flex-col top-0 gap-12 md:gap-16 w-full h-auto"
      >

        <motion.div
          variants={variants}
          className="h-auto w-full rounded-xl  flex flex-wrap lg:flex-nowrap justify-evenly lg:justify-between flex-row gap-6 md:my-10"
        >
          <Card header={`Neurowissen\n-schaftlich\nbasiert`}>
            <NeuroSVG />
          </Card>
          <Card header={`Besser mit\nBraincare`}>
            <BraincareSVG />
          </Card>
          <Card header={"Alltags-\nkompatibel"}>
            <JederSVG />
          </Card>
          <Card header={"Leicht zu \nlernen"}>
            <ManipulateSVG />
          </Card>
          <Card header={`Selbst-\nbestimmt`}>
            <WomenSVG />
          </Card>
        </motion.div>
        <motion.h3
          variants={variants}
          className="w-full mb-12 text-center font-black text-[#506c00]"
        >
          Das ist MY InnoTrinsic:
        </motion.h3>
        <motion.div variants={variants} className="flex w-auto m-auto justify-center flex-col items-start gap-4">
          <motion.h4 variants={variants} className="w-auto text-[#506c00]">Neuroloyaler Perspektiven-Wechsel</motion.h4>
          <motion.p variants={variants}>Wir verändern Perspektiven, basierend auf
            der Leitidee des &quot;Respekts vor dem Menschen&quot; und der Kooperation und
            Kollaboration mit der Natur des Menschen - konkret der neuropsychologischen
            Zusammenhänge - unserem Gehirn. Unser Ziel ist es, allseitigen und
            wechselseitigen Mehrwert zu schaffen, Wachstum zu fördern und Durchbrüche für
            Menschen, Organisationen, Umwelt und Gesellschaft zu erreichen.</motion.p>
        </motion.div>
        <motion.div variants={variants} className="flex w-auto m-auto justify-center flex-col items-start gap-4">
          <motion.h4 variants={variants} className="w-auto text-[#506c00]">Alltagsarchitekt Gehirn</motion.h4>
          <motion.p variants={variants}>MY InnoTrinsic konzentriert sich auf das Gehirn und seine
            enorme Komplexität, die einen entscheidenden Einfluss auf unser Handeln, unsere
            Leistungsfähigkeit, unser Wohlbefinden und das Wachstum von Organisationen und
            Gesellschaft hat. Wir schöpfen aus den Neurowissenschaften und der
            Neuropsychologie, um dieses Wissen in praktische Strukturen und Methoden zu
            überführen, die im Unternehmensalltag und im Leben jedes Menschen unterstützen
            können.</motion.p>
        </motion.div>
        <motion.div variants={variants} className="flex w-auto m-auto justify-center flex-col items-start gap-4">
          <motion.h4 variants={variants} className="w-auto text-[#506c00]">Alltagsarchitekt Gehirn</motion.h4>
          <motion.p variants={variants}>MY InnoTrinsic konzentriert sich auf das Gehirn und seine
            enorme Komplexität, die einen entscheidenden Einfluss auf unser Handeln, unsere
            Leistungsfähigkeit, unser Wohlbefinden und das Wachstum von Organisationen und
            Gesellschaft hat. Wir schöpfen aus den Neurowissenschaften und der
            Neuropsychologie, um dieses Wissen in praktische Strukturen und Methoden zu
            überführen, die im Unternehmensalltag und im Leben jedes Menschen unterstützen
            können.</motion.p>
        </motion.div>
        <motion.div variants={variants} className="flex w-auto m-auto justify-center flex-col items-start gap-4">
          <motion.h4 variants={variants} className="w-auto text-[#506c00]">Das Gehirn wir zum besten Freund</motion.h4>
          <motion.p variants={variants}>Mit einem respektvollen Blick auf die Natur
            des Menschen gehen wir neue Wege der Kooperation und Kollaboration mit dem
            mächtigsten Organ des Körpers. Ähnlich wie wir für unsere physische Gesundheit
            sorgen, zeigen wir Wege auf, wie das hochkomplexe Gehirn optimal genutzt werden
            kann. Das Gehirn wird zum besten Freund, der uns unterstützt und begleitet.</motion.p>
        </motion.div>
        <motion.div variants={variants} className="flex w-auto m-auto justify-center flex-col items-start gap-4">
          <motion.h4 variants={variants} className="w-auto text-[#506c00]">BrainCare pragmatisch und mit Struktur:</motion.h4>
          <motion.p variants={variants}>Als verlässlicher Partner von Menschen
            und Organisationen haben wir aus dem Wissen der Neurowissenschaften ein
            neuroloyales Strukturprinzip entwickelt, um Menschen und Organisationen für diese
            Komplexität zu sensibilisieren und neuroloyales Handeln mit BrainCare zu
            ermöglichen. Unsere pragmatischen Strukturen und Bausteine sind bedarfsgerecht,
            zielgenau, flexibel und leicht erlernbar - für jeden nutzbar und anwendbar.</motion.p>
        </motion.div>
      </motion.div>
      {/* SYMBOLE ENDE */}
      <motion.div className="py-24"><motion.div className="flex flex-col  w-full h-full gap-12">
        <motion.h3 className="w-full text-center text-[#506C00] font-black">Unsere Angebote</motion.h3>
        <motion.div className="flex justify-center items-center flex-col lg:flex-row w-full  gap-12">
          <motion.div className="flex flex-col justify-center items-center gap-8 py-12 max-h-[600px] max-w-[400px] w-full shadow-sm rounded-xl bg-[#F8F3E0] p-6">
            <Image className="w-full max-w-48 mix-blend-darken" width={200} height={200} src={"/images/brain_as_mic.png"} alt={"A brain as a microphone"} />
            <motion.h4 className="text-center w-auto text-[#506C00]">Vortrag</motion.h4>
          </motion.div>
          <motion.div className="flex flex-col justify-center items-center gap-8 py-12 max-h-[600px] max-w-[400px] w-full shadow-sm rounded-xl bg-[#F8F3E0] p-6">
            <Image className="w-full max-w-48 mix-blend-darken" width={200} height={200} src={"/images/business_meeting.png"} alt={"A brain as a microphone"} />
            <motion.h4 className="text-center w-auto text-[#506C00]">Gruppenscouting</motion.h4>
          </motion.div>
          <motion.div className="flex flex-col justify-center items-center gap-8 py-12 max-h-[600px] max-w-[400px] w-full shadow-sm rounded-xl bg-[#F8F3E0] p-6">
            <Image className="w-full max-w-48 mix-blend-darken" width={200} height={200} src={"/images/person.png"} alt={"A brain as a microphone"} />
            <motion.h4 className="text-center w-auto text-[#506C00]">Einzelscouting</motion.h4>
          </motion.div>
        </motion.div>
      </motion.div>
      </motion.div>
      <Sec sectionName="mountain" left={false} single>
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
          className="py-16 flex my-auto justify-center items-center flex-col-reverse lg:flex-row top-0 gap-12 md:gap-16 w-full h-auto"
        >
          <motion.div className="flex  w-auto flex-col justify-center items-center gap-12 text-[#32689C]">
            <motion.h4 className="text-[#32689C] text-4xl text-center md:text-left">Ein Gehirn, das Berge versetzen kann.</motion.h4>
            <motion.ul className="mx-auto flex flex-col w-auto gap-6">
              <motion.li className="w-auto flex flex-row items-start justify-start leading-7"><p className="w-auto text-xl"><FontAwesomeIcon icon={faCheck} className="mr-4 " /></p><p className="w-auto text-xl font-semibold">Motivationsboost: Umrüche zu Durchbrüchen machen</p></motion.li>
              <motion.li className=" w-auto flex flex-row items-start justify-start leading-7"><p className="w-auto text-xl"><FontAwesomeIcon icon={faCheck} className="mr-4 text-xl" /></p><p className="w-auto text-xl font-semibold">ZukunfsMacher & BusinessGestalter - mit ZufriedenheitsMehrWert: Starten - High Quality/ExzellenzImpulse - Umsetzen
              </p></motion.li>
              <motion.li className=" w-auto flex flex-row items-start justify-start leading-7"><p className="w-auto text-xl"><FontAwesomeIcon icon={faCheck} className="mr-4 text-xl" /></p><p className="w-auto text-xl font-semibold"> HR Neuroloyal: Antriebsgerecht für Zufriedenheitsboost
              </p> </motion.li>
              <motion.li className="w-auto flex flex-row items-start justify-start leading-7"><p className="w-auto text-xl"><FontAwesomeIcon icon={faCheck} className="mr-4 text-xl" /></p><p className="w-auto text-xl font-semibold"> MehrWert für alle: Neuroloyales Personal Empowering
              </p> </motion.li>
            </motion.ul>
          </motion.div>
          <motion.div className="flex flex-col justify-center items-center w-full">
            <Image width={500} height={300} alt="Ein Gehirn das Berge versetzt" src="/images/brain_and_mountain.png" />
          </motion.div>
        </motion.div>
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
          className="py-6 flex my-auto justify-center items-start flex-col top-0 gap-4 md:gap-8 w-full h-auto"
        >
          <motion.h3 variants={blurVariants} className="m-0 text-center w-full text-[#32689C] font-black">FAQ</motion.h3>

          <motion.div className="bg-[#F8F3E0] p-6 shadow-sm rounded-3xl w-full">

            <FAQuestion borderBottom title="Was bedeutet „neuroloyal“?" description="Wortwörtlich bedeutet es gehirngerecht. Doch loyal bedeutet nach unserem
Verständnis noch viel mehr, nämlich respektierend, innerlich verbunden, schützend,
wohlwollend und achtsam. Neuroloyal zu handeln heißt also, stets im Einklang mit
seinem Gehirn zu agieren. Es heißt, die jeweils individuellen Zufriedenheitsantriebe
zu kennen und in sein zukünftiges Handeln miteinzubeziehen. So fällt es leichter zu
starten und durchzuhalten."/>
            <FAQuestion borderBottom title="Was ist BrainCare?" description="Nicht ohne Grund verwenden wir das Bild vom Gehirn, dem eine schützende Hand
hinzugefügt ist. Unser Ziel ist es, das Gehirn als Freund zu verstehen, das
entsprechend gepflegt werden muss, um sein optimales Potenzial zu entfalten.
Daher helfen wir, Brain-Brakes zu erkennen und zu umgehen sowie Brain-Booster zu
entdecken und gezielt zu fördern."/>
            <FAQuestion borderBottom title="Ein Programm, unterschiedliche Einsatzbereiche - wie kann das funktionieren?" description="Weil es letztlich immer um den Menschen geht, auch im Business. Denn obwohl
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
            <FAQuestion borderBottom title="Wie lange dauert ein Scouting?" description="Das hängt von der jeweiligen Fragestellung ab: Im Durchschnitt reichen beim Impuls-
Scouting 4 Stunden für kleinere, individuelle Fragestellungen. Ein klassisches
Einzelscouting dauert 3 Tage. Eine umfassende, individuell abgestimmte
Projektbegleitung im Unternehmen nimmt erfahrungsgemäß mehr Zeit in Anspruch."/>
            <FAQuestion borderBottom title="Warum nennen wir es Scouting und nicht Coaching oder Beratung?" description="Wir sind BrainScouts, die neurophysisch-unternehmensrelevante Zusammenhänge
sowie ihre teils weitreichenden Folgen aufzeigen und Handlungsoptionen skizzieren.
Wenn die Entscheidung fällt, mit uns gemeinsam dieses Neuland erkunden, beraten
wir nicht, sondern sind dabei: Wir packen gemeinsam einen Rucksack mit
neuroloyalem Background-Wissen und wichtigen Werkzeugen. Wir zeigen Wege und
Alternativwege und entdecken gemeinsam neue Möglichkeiten für den Einzelnen
und/oder das Unternehmen. Denn darauf legen wir größten Wert: Dass es konkrete
Ergebnisse und Ideen gibt. Und: Dass wir irgendwann nicht mehr benötigt werden."/>
            <FAQuestion borderBottom title="Was heißt „Selbstbestimmt“?" description="Das Steuer hat immer der Scoutie in der Hand. Mit MY InnoTrinsic ist keine
Manipulation möglich. MY InnoTrinsic funktioniert nur, wenn der Einzelne das
Basiswissen über die neuronalen Zusammenhänge verstanden hat und sich
ausdrücklich für seinen ganz eigenen, individuellen neuroloyalen Weg entschieden
hat. Denn neuroloyales Wachstum entsteht aus den Antrieben des Einzelnen - und
nicht aus einem fertigen Glaubenssystem."/>
            <FAQuestion borderBottom={false} title="Was unterscheidet MY InnoTrinsic von anderen Angeboten?" description="MY InnoTrinsic ist Methodenrebellion mit Win-Win-Dynamik. Es ist ein tief gehender
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
        </motion.div>
      </Sec>
      <ContactForm props={{ id: "kontakt", title: "Kontakt", subtitle: "Teilen Sie uns mit was wir für Sie tun können." }} />
      <motion.div className=" rounded-2xl bg-[#A4C57B] w-full flex flex-col md:flex-row justify-center items-center gap-6 p-6 sm:p-8 md:p-12 my-12">
        <h5 className="text-[#32689C] font-bold text-center w-auto">MY InnoTrinsic | © {year}</h5>
        <Link href={"/impressum"}><h5 className="text-[#32689C] font-bold">Impressum</h5></Link>
      </motion.div>
    </>
  );
}
