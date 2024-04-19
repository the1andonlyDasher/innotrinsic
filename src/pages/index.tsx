import Image from "next/image";
import { Work_Sans } from "next/font/google";
import Sec from "@/components/Section";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { IdeaData } from "@/ts/landingGL/IdeaCloud";

const variants = {
  initial: { y: 20, filter: "blur(20px)", opacity: 0 },
  enter: { y: 0, filter: "blur(0px)", opacity: 1, delay: 1 },
  exit: { y: 20, filter: "blur(20px)", opacity: 0 },
}

const variantsTest = {
  initial: { y: 20, filter: "blur(20px)", opacity: 0 },
  animate: { y: 0, filter: "blur(0px)", opacity: 1, delay: 1 },
  exit: { y: 20, filter: "blur(20px)", opacity: 0 },
}

export default function Home() {
  const searchParams = useSearchParams();

  return (
    <>
      <Sec id="first"><>
        <motion.div
          animate={searchParams.get("view") || searchParams.get("test") ? "exit" : "enter"}
          variants={{
            initial: { opacity: 0 },
            enter: { opacity: 1, display: "flex", filter: "blur(0px)", transition: { staggerChildren: 0.1, when: "beforeChildren" } },
            exit: { opacity: 0, transitionEnd: { display: "none" }, transition: { staggerChildren: 0.1, when: "afterChildren" } },
          }}
          className="absolute py-10 flex flex-col gap-2 items-start justify-start">
          <motion.div variants={variants} className="mix-blend-screen">
            <motion.h1 className="">
              Neuro<strong className="text-[#32689C]">Loyal</strong>
            </motion.h1>
          </motion.div>
          <motion.h2 variants={variants}>Mach etwas Neues. <strong className="font-black drop-shadow-sm ">Besser. <strong className="text-[#32689C]">Jetzt.</strong></strong></motion.h2>

          <motion.p variants={variants} className="text-zinc-900 hidden md:flex">
            Wir tragen ein uraltes Gehirn in einer modernen Welt. Seine Aufgabe? Überleben. Deine Aufgabe? Dich leistungsfähig, effizient, flexibel, kreativ, konstruktiv, handlungsstark, lösungsorientiert oder glücklich zu machen.
          </motion.p>
          <motion.div variants={variants} className="flex flex-wrap gap-4">
            <Link href={"?test=true"} shallow className="btn__primary">
              Mach den Test
            </Link>
            <Link href={"/kontakt"} className="btn__outline">
              Kontakt
            </Link>
          </motion.div>
        </motion.div>
        {IdeaData.map((item: any, i: number) => <motion.div
          key={i}
          animate={searchParams.get("neuron") === item.text ? "enter" : "exit"}
          variants={{
            initial: { opacity: 0 },
            enter: { opacity: 1, display: "flex", filter: "blur(0px)", transition: { staggerChildren: 0.1, when: "beforeChildren" } },
            exit: { opacity: 0, transitionEnd: { display: "none" }, transition: { staggerChildren: 0.1, when: "afterChildren" } },
          }}
          className="absolute py-10 flex flex-col gap-2 items-start justify-start text-white ">
          <motion.h3 variants={variants}>{item.text}</motion.h3>
          <motion.p variants={variants}>
            Quo usque tandem abutere, Catilina, patientia nostra? quam diu etiam
            furor iste tuus nos eludet? quem ad finem sese effrenata iactabit
            audacia?
          </motion.p>
          <motion.div variants={variants} className="flex flex-wrap gap-4">
            <Link href={"/kontakt"} className="btn__alt">
              Weiter
            </Link>
            <Link href={"/"} shallow className="btn__outline">
              Zurück
            </Link>
          </motion.div>
        </motion.div>)}
        <motion.div
          animate={searchParams.get("test") ? "enter" : "exit"}

          variants={{
            initial: { opacity: 0 },
            enter: { opacity: 1, display: "flex", filter: "blur(0px)", transition: { staggerChildren: 0.1, when: "beforeChildren" } },
            exit: { opacity: 0, transitionEnd: { display: "none" }, transition: { staggerChildren: 0.1, when: "afterChildren" } },
          }}
          className="my-auto py-10 flex flex-col gap-2 items-start justify-start text-black">
          <motion.h3 variants={variants} className="text-[#141d34] font-black">
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
      </>
      </Sec>
      <motion.section animate={searchParams.get("test") ? { opacity: 1, display: "flex" } : { opacity: 0, transitionEnd: { display: "none" } }}
        id="second">
        <motion.div
          initial="initial"
          whileInView={"animate"}
          viewport={{ once: false, margin: "100px", amount: "some" }}
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1, display: "flex", filter: "blur(0px)", transition: { staggerChildren: 0.1, when: "beforeChildren", delay: 0.25 } },
            exit: { opacity: 0, transitionEnd: { display: "none" }, transition: { staggerChildren: 0.1, when: "afterChildren" } },
          }}
          className="absolute py-10 flex flex-col gap-2 items-start justify-start text-black">
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
      <motion.section id="third"
        animate={searchParams.get("test") ? { opacity: 1, display: "flex" } : { opacity: 0, transitionEnd: { display: "none" } }}
      >
        <motion.div
          initial="initial"
          whileInView={"animate"}
          viewport={{ once: false, margin: "100px", amount: "some" }}
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1, display: "flex", filter: "blur(0px)", transition: { staggerChildren: 0.1, when: "beforeChildren", delay: 0.25 } },
            exit: { opacity: 0, transitionEnd: { display: "none" }, transition: { staggerChildren: 0.1, when: "afterChildren" } },
          }}
          className="absolute py-10 flex flex-col gap-2 items-start justify-start text-black">
          <motion.p variants={variantsTest} className="text-zinc-900">
            Beobachten Sie welcher Daumen oben liegt, ist es der Rechte? Der Linke?
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
      <motion.section id="fourth"
        animate={searchParams.get("test") ? { opacity: 1, display: "flex" } : { opacity: 0, transitionEnd: { display: "none" } }}
      >
        <motion.div
          initial="initial"
          whileInView={"animate"}
          viewport={{ once: false, margin: "100px", amount: "some" }}
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1, display: "flex", filter: "blur(0px)", transition: { staggerChildren: 0.1, when: "beforeChildren", delay: 0.25 } },
            exit: { opacity: 0, transitionEnd: { display: "none" }, transition: { staggerChildren: 0.1, when: "afterChildren" } },
          }}
          className="absolute py-10 flex flex-col gap-2 items-start justify-start text-black">
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
      <motion.section id="fifth"
        animate={searchParams.get("test") ? { opacity: 1, display: "flex" } : { opacity: 0, transitionEnd: { display: "none" } }}
      >
        <motion.div
          initial="initial"
          whileInView={"animate"}
          viewport={{ once: false, margin: "100px", amount: "some" }}
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1, display: "flex", filter: "blur(0px)", transition: { staggerChildren: 0.1, when: "beforeChildren", delay: 0.25 } },
            exit: { opacity: 0, transitionEnd: { display: "none" }, transition: { staggerChildren: 0.1, when: "afterChildren" } },
          }}
          className="absolute py-10 flex flex-col gap-2 items-start justify-start text-black">
          <motion.p variants={variantsTest} className="text-zinc-900 test-desc">
            Falten Sie Ihre Hände nun erneut, aber sodass der andere Daumen oben liegt.</motion.p>
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
      <motion.section id="sixth"
        animate={searchParams.get("test") ? { opacity: 1, display: "flex" } : { opacity: 0, transitionEnd: { display: "none" } }}
      >
        <motion.div
          initial="initial"
          whileInView={"animate"}
          viewport={{ once: false, margin: "100px", amount: "some" }}
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1, display: "flex", filter: "blur(0px)", transition: { staggerChildren: 0.1, when: "beforeChildren", delay: 0.25 } },
            exit: { opacity: 0, transitionEnd: { display: "none" }, transition: { staggerChildren: 0.1, when: "afterChildren" } },
          }}
          className="absolute py-10 flex flex-col gap-2 items-start justify-start text-black">
          <motion.p variants={variantsTest} className="text-zinc-900 test-desc">
            Und, war es einfach, oder hat es sie irritiert? Wenn es Sie irritiert hat, dann haben sie die Aktivität Ihrer neuronalen Netze live erlebt.
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

    </>
  );
}
