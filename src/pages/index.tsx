import Image from "next/image";
import { Work_Sans } from "next/font/google";
import Sec from "@/components/Section";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { IdeaData } from "@/ts/landingGL/IdeaCloud";

export default function Home() {
  const searchParams = useSearchParams();

  return (
    <Sec><>
      <motion.div
        animate={searchParams.get("view") ? "exit" : "enter"}
        variants={{
          initial: { opacity: 0, display: "none" },
          enter: { opacity: 1, display: "flex" },
          exit: { opacity: 0, display: "none" },
        }}
        className="absolute py-10 flex flex-col gap-2 items-start justify-start text-black">
        <motion.h1>Neuro-Loyal</motion.h1>
        <motion.h2>Gedacht? Gemacht.</motion.h2>
        <motion.p>
          Quo usque tandem abutere, Catilina, patientia nostra? quam diu etiam
          furor iste tuus nos eludet? quem ad finem sese effrenata iactabit
          audacia?
        </motion.p>
        <motion.div className="flex flex-wrap gap-4">
          <Link href={"/kontakt"} className="btn__primary">
            Call to Action
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
          initial: { opacity: 0, display: "none" },
          enter: { opacity: 1, display: "flex" },
          exit: { opacity: 0, display: "none" },
        }}
        className="absolute py-10 flex flex-col gap-2 items-start justify-start text-white">
        <motion.h3>{item.text}</motion.h3>
        <motion.p>
          Quo usque tandem abutere, Catilina, patientia nostra? quam diu etiam
          furor iste tuus nos eludet? quem ad finem sese effrenata iactabit
          audacia?
        </motion.p>
        <motion.div className="flex flex-wrap gap-4">
          <Link href={"/kontakt"} className="btn__alt">
            Weiter
          </Link>
          <Link href={"/kontakt"} className="btn__outline">
            Zruück
          </Link>
        </motion.div>
      </motion.div>)}</>
    </Sec>
  );
}
