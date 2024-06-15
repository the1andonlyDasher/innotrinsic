import Sec from "@/components/Section";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { FunctionComponent } from "react";

interface ImpressumProps {

}

const Impressum: FunctionComponent<ImpressumProps> = () => {
    var date = new Date();
    var year: any = date.getFullYear().toString();
    return (<Sec single left sectionName="science">
        <>
            <Head>
                <title>Impressum</title>
                <meta property="og:title" content="Impressum" key="title" />
                <meta
                    property="description"
                    content="MY Innotrinsic Impressum"
                />
            </Head>
            <motion.div className="flex h-full w-full flex-col justify-start md:justify-center items-start gap-6">
                <h4>Impressum</h4>
                <p className="w-full">
                    MY InnoTrinsic <br />
                    Dr. Karin Koert-Lehmann <br />
                    Lichtenbergstraße 7
                    <br />
                    47839 Krefeld <br />
                    0177 6064662
                    <br />
                    karin@rethink-n-move.de <br />
                </p>
                <h4>Online-Streitbeilegung (OS)</h4>
                <p>
                    Online-Streitbeilegung: Die Europäische Kommission stellt eine
                    Plattform zur Online-Streitbeilegung (OS) bereit, die Sie unter
                    https://ec.europa.eu/consumers/odr/ finden. Verbraucher haben die
                    Möglichkeit, diese Plattform für die Beilegung ihrer Streitigkeiten
                    zu nutzen.
                </p>
                <h4>Haftung- und Ureheberrechtshinweise</h4>
                <p>
                    Links auf fremde Webseiten: Inhalte fremder Webseiten, auf die wir
                    direkt oder indirekt verweisen, liegen außerhalb unseres
                    Verantwortungsbereiches und machen wir uns nicht zu Eigen. Für alle
                    Inhalte und insbesondere für Schäden, die aus der Nutzung der in den
                    verlinkten Webseiten aufrufbaren Informationen entstehen, haftet
                    allein der Anbieter der verlinkten Webseiten. Urheberrechte und
                    Markenrechte: Alle auf dieser Website dargestellten Inhalte, wie
                    Texte, Fotografien, Grafiken, Marken und Warenzeichen sind durch die
                    jeweiligen Schutzrechte (Urheberrechte, Markenrechte) geschützt. Die
                    Verwendung, Vervielfältigung usw. unterliegen unseren Rechten oder
                    den Rechten der jeweiligen Urheber bzw. Rechteverwalter. Hinweise
                    auf Rechtsverstöße: Sollten Sie innerhalb unseres Internetauftritts
                    Rechtsverstöße bemerken, bitten wir Sie uns auf diese hinzuweisen.
                    Wir werden rechtswidrige Inhalte und Links nach Kenntnisnahme
                    unverzüglich entfernen.
                </p>
            </motion.div>
            <motion.div className=" rounded-2xl bg-[#A4C57B] w-full flex flex-col md:flex-row justify-center items-center gap-6 p-6 sm:p-8 md:p-12 my-12">
                <h5 className="text-[#10202f] font-bold text-center w-auto">MY InnoTrinsic | © {year}</h5>
                <Link href={"/"}><h5 className="text-[#32689C] font-bold">Home</h5></Link>
                <Link href={"/datenschutz"}><h5 className="text-[#32689C] font-bold">Datenschutz</h5></Link>
            </motion.div>
        </>
    </Sec>);
}

export default Impressum;