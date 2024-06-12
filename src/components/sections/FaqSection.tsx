import { motion } from "framer-motion";
import { FunctionComponent } from "react";
import FAQuestion from "../FAQuestion";
import Sec from "../Section";

interface FaqSectionProps {

}

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


const FaqSection: FunctionComponent<FaqSectionProps> = () => {
    return (<Sec left={false} single sectionName="faq">
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
            className="faq__wrapper"
        >
            <motion.h3 variants={blurVariants} >FAQ</motion.h3>

            <motion.div className="faq__container">

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
    </Sec>);
}

export default FaqSection;