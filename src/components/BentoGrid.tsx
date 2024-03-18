import { faArrowRight, faBookOpen, faDiamond, faDrawPolygon, faPalette, faShop, faTriangleCircleSquare } from "@fortawesome/free-solid-svg-icons";
import { faTypo3, faWordpress } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { FunctionComponent } from "react";

type item =
    {
        name?: string | number | undefined;
        text?: string | number | undefined;
        url?: string | URL | undefined;
        bg: string;
        index?: number;
        icon?: any;

    }

interface BentoGridProps {
    items?: Array<item>
}

const items: Array<item> = [
    {
        name: "Webdesign",
        text: "Wir erstellen eine hochwertige und einzigartige Webseite, die Ihren Wünschen entspricht. Die digitale Visitenkarte für Ihr Unternehmen.",
        url: "",
        bg: "bg-[#000]",
        index: 1,
        icon: <FontAwesomeIcon icon={faPalette} />
    },
    {
        name: "E-Commerce",
        text: "Alles was Sie für Ihren Vertrieb benötigen, wir unterstützen Sie bei Ihrem Projekt und richten Ihre Verkaufsplattform ein.",
        url: "",
        bg: "bg-[#000]",
        index: 2,
        icon: <FontAwesomeIcon icon={faShop} />
    },
    {
        name: "Wordpress",
        text: "Wir erstellen Ihre Anwendung mit einer der bekanntesten Content Management Systeme überhaupt.",
        url: "",
        bg: "bg-[#000]",
        index: 3,
        icon: <FontAwesomeIcon icon={faWordpress} />
    },
    {
        name: "Typo3",
        text: "Vielseitig einsetzbar und absolut grenzenlos in puncto Anwendbarkeit: Typo3.",
        url: "",
        bg: "bg-[#000]",
        index: 4,
        icon: <FontAwesomeIcon icon={faTypo3} />
    },
    {
        name: "Primsic",
        text: "Ein High Performance CMS im Headless Setup, anpassungsfähig, schnell und vielseitig.",
        url: "",
        bg: "bg-[#000]",
        index: 7,
        icon: <FontAwesomeIcon icon={faDiamond} />
    },
    {
        name: "Logodesign",
        text: "Erhalten Sie von uns ein Logo, das Ihre Firma und Ihre Mission optimal verkörpern.",
        url: "",
        bg: "bg-[#000]",
        index: 8,
        icon: <FontAwesomeIcon icon={faDrawPolygon} />
    },
    {
        name: "Printdesign",
        text: "Vom Flyer bis hin zur Visitenkarte, wir bringen Ihren Auftrag zu Papier.",
        url: "",
        bg: "bg-[#000]",
        index: 8,
        icon: <FontAwesomeIcon icon={faBookOpen} />
    },
    {
        name: "Three",
        text: "Dreidimensionaler Inhalt ist heutzutage absolut von Vorteil um seine Seite abzuheben und um die Verkaufszahlen nach oben zu schrauben. Vom 3D Konfigurator bis hin zur Room Tour, wir erstellen Ihre 3D Anwendung.",
        url: "",
        bg: "bg-[#000]",
        index: 5,
        icon: <FontAwesomeIcon icon={faTriangleCircleSquare} />
    },

]


interface BentoGridCardProps {
    item: item;
}

const BentoGridCard: FunctionComponent<BentoGridCardProps> = (props: BentoGridCardProps) => {
    return (<div className={`bentoGrid__item ${props.item.bg}`}>
        <div className="flex flex-row gap-2">
            {props.item.icon}
            <h3 className="font-header">{props.item.name}</h3>
        </div>
        <div className="flex flex-row gap-2">
            <p>{props.item.text}</p>
        </div>
        <div className="flex flex-row gap-2">
            <Link className="btn__small py-2 text-white font-text uppercase" href={`${props.item.url}`}>Mehr</Link>
        </div>
    </div>);
}


const BentoGrid: FunctionComponent<BentoGridProps> = (props: BentoGridProps) => {
    return (<>
        <div className="bentoGrid__wrapper">
            <div className="bentoGrid">
                {items.map((item: item, index: number) => <BentoGridCard item={item} key={index} />)}
                <div className="bentoGrid__item">
                    <h4 className="uppercase">Loslegen</h4>

                </div>
            </div>

        </div>
    </>);
}

export default BentoGrid;