import { motion } from "framer-motion";
import Link from "next/link";
import { FunctionComponent } from "react";
import Sec from '@/components/Section';

interface ImpressumProps {

}

const Impressum: FunctionComponent<ImpressumProps> = () => {
    var date = new Date();
    var year: any = date.getFullYear().toString();
    return (<Sec single left sectionName="science">
        <>
            <motion.div className="flex h-full w-full flex-col justify-start md:justify-center items-start gap-6">
                <h4>Haftung für Inhalte</h4>
                <p>
                    Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für
                    die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir
                    jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7
                    Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen
                    Gesetzen verantwortlich. Nach §§ 8-10 TMG sind wir als Diensteanbieter
                    jedoch nicht verpflichtet, übermittelte oder gespeicherte
                    Informationen zu überwachen oder nach Umständen zu forschen, die auf
                    eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung
                    oder Sperrung der Nutzung von Informationen nach den allgemeinen
                    Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist
                    jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Kenntnis
                    möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen
                    werden wir diese Inhalte umgehend entfernen.
                </p>
                <h4>Urheberrecht</h4>
                <p>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
                    Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
                    Bearbeitung und Verbreitung und jede Art der Verwertung außerhalb der
                    Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des
                    jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite
                    sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                    Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
                    wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden
                    Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf
                    eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
                    entsprechende Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden
                    wir derartige Inhalte umgehend entfernen.
                </p>
                <h4>Haftung für Links</h4>
                <p>
                    Unser Angebot enthält Links zu Webseiten Dritter, auf deren Inhalte
                    wir keinen Einfluss haben. Deshalb können wir für diese fremden
                    Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
                    Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
                    verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
                    Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
                    Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine
                    permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
                    konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
                    Bekanntwerden von Rechtsverletzungen werden wir derartige Links
                    umgehend entfernen.
                </p>
                <h4>Datenschutz</h4>
                <p>
                    Die Nutzung unserer Webseite ist in der Regel ohne Angabe
                    personenbezogener Daten möglich. Soweit auf unseren Seiten
                    personenbezogene Daten (beispielsweise Name, Anschrift oder
                    eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets
                    auf freiwilliger Basis. Diese Daten werden nicht ohne Ihre
                    ausdrückliche Zustimmung an Dritte weiter gegeben. Wir weisen darauf
                    hin, dass die Datenübertragung im Internet (z.B. Bei der Kommunikation
                    per Email). Sicherheitslücken aufweisen kann. Ein lückenloser Schutz
                    der Daten vor dem Zugriff durch Dritte ist nicht möglich. Die Nutzung
                    von im Rahmen der Impressumpflicht veröffentlichten Kontaktdaten durch
                    Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung
                    und Informationsmaterialien wird hiermit ausdrücklich widersprochen.
                    Die Betreiber der Seiten behalten sich ausdrücklich rechtliche
                    Schritte im Falle der unverlangten Zusendung von Werbeinformationen,
                    etwa durch Spam-Mails vor.
                </p>
            </motion.div>
            <motion.div className=" rounded-2xl bg-[#A4C57B] w-full flex flex-col md:flex-row justify-center items-center gap-6 p-6 sm:p-8 md:p-12 my-12">
                <h5 className="text-[#10202f] font-bold text-center w-auto">MY InnoTrinsic | © {year}</h5>
                <Link href={"/"}><h5 className="text-[#32689C] font-bold">Home</h5></Link>
                <Link href={"/impressum"}><h5 className="text-[#32689C] font-bold">Impressum</h5></Link>
            </motion.div>
        </>
    </Sec>);
}

export default Impressum;