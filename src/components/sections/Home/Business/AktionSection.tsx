import FAQuestion from "@/components/FAQuestion";
import Sec from "@/components/Section";
import { FC } from "react";

interface AktionsectionProps {

}

const Aktionsection: FC<AktionsectionProps> = () => {
    return (<Sec single left sectionName="business">
        <div className="actions__wrapper">
            <div>
                <p>MY InnoTrinsic in Aktion: Einsatz- und Nutzungsoptionen</p>
                <h3>Business und Project</h3>
            </div>
            <div className="faq__container">
                <FAQuestion title={"High Performing Business: InnoTrinsci Corporate Management für Corporate Growth (Co-Effekt: Individual Growth)"} description="" borderBottom={false}>
                    <div className="actions__answer">
                        <h4>“Wendepunkte sind Kopfsache: Umbrüche zu Durchbrüchen für High Performing Business mit ZufriedenheitsMehrwert”</h4>
                        <ul>
                            <li>-Strategie & Strategie RollOut</li>
                            <li>-KI-Zeitalter: High Performing Kolloboration von Mensch und KI</li>
                            <li>-Transformationsprojekte</li>
                            <li>-Neue Produktionsprozesse neuroloyal implementieren</li>
                        </ul>
                    </div>
                </FAQuestion>
            </div>
        </div>
    </Sec>);
}

export default Aktionsection;