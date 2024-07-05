
import BrainBasics from '@/pages/_business/brainbasics'
import { Vector3 } from '@react-three/fiber'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const currentLabel = atom<any>("label_bottom_lime")
export const currentDistance = atom<number>(1)
export const globalScroll = atom<number>(0)
export const loc = atom<string>("/")
export const glReady = atom<boolean>(false)
export const landingSection = atom<string>("/")
export const scrollEnabled = atomWithStorage<any>("scroll", false)
export const backgroundColors = atom<string[]>(["#f6fff0", "#e5fcfc"])
export const landingHeaders = atom<string>("Mieten")
export const backgroundText = atom<string>("default");
export const orbitTarget = atom<Vector3 | { x: number; y: number; z: number; }>({ x: 0, y: 0, z: 0 })
export const load = atom(false)
export const productViewer = atom<any>(null)
export const mountainViewer = atom<any>(null)
export const modulesViewer = atom<any>(null)
export const globalTarget = atom<Vector3 | { x: number; y: number; z: number; }>({ x: 0, y: 0, z: 0 })
export const globalModuleIndex = atom(0)

// types.ts
export interface Module {
    size: [number, number, number];
    svgSrc: string;
    position: [number, number, number];
    color: string;
    textColor: string;
    label: string;
    UID: number;
}

export interface ModuleGroup {
    [key: string]: Module;
}

export interface ModuleSet {
    first: ModuleGroup;
    second: ModuleGroup;
    third: ModuleGroup;
    fourth: ModuleGroup;
    fifth: ModuleGroup;
}

export const moduleSet = atom<ModuleSet>({
    first: {
        NeuroloyalZumNeu: { label: "Neuroloyal zum Neu", size: [3.5, 1.01, 1], position: [3.65, -2.5, 0], svgSrc: "/images/Rastergrafik4.png", textColor: "hsl(39, 66%, 57%)", color: "#f4e5ca", UID: 10 },
        FocusMe: { label: "Focus Me", size: [3.5, 1.01, 1], position: [-3.65, -2.5, 0], svgSrc: "/images/Rastergrafik3.png", textColor: "hsl(210, 45%, 54%)", color: "#9EBCDA", UID: 11 },
        NeuroloyalPlanen: { label: "Neuroloyal Planen", size: [3.5, 1.01, 1], position: [3.65, -0.25, 0], svgSrc: "/images/Rastergrafik5.png", textColor: "hsl(210, 7%, 57%)", color: "#C0C4C8", UID: 12 },
        FocusOutside: { label: "Focus Outside", size: [3.5, 1.01, 1], position: [-3.65, -0.25, 0], svgSrc: "/images/Rastergrafik2.png", textColor: "hsl(80, 17%, 53%)", color: "#bec6ae", UID: 13 },
    },
    second: {
        NeuroloyalZumNeu: { label: "Neruoloyal zum Neu", size: [0, 0, 0], position: [-2, 0, 0], svgSrc: "/images/Rastergrafik4.png", textColor: "hsl(39, 66%, 57%)", color: "#f4e5ca", UID: 20 },
        NeuroloyalPlanen: { label: "Neuroloyal Planen", size: [4.75, 2, 1], position: [0, -1.5, 0], svgSrc: "/images/Rastergrafik5.png", textColor: "hsl(210, 45%, 54%)", color: "#9EBCDA", UID: 21 },
        FocusMe: { label: "Focus Me", size: [0, 0, 0], position: [4.75, -2.5, 0], svgSrc: "/images/Rastergrafik3.png", textColor: "hsl(210, 7%, 57%)", color: "#C0C4C8", UID: 22 },
        FocusOutside: { label: "Focus Outside", size: [0, 0, 0], position: [-2, -5, 0], svgSrc: "/images/Rastergrafik2.png", textColor: "hsl(80, 17%, 53%)", color: "#bec6ae", UID: 23 },
    },
    third: {
        NeuroloyalZumNeu: { label: "Neruoloyal zum Neu", size: [2.25, 1.01, 1], position: [-2.5, -2.5, 0], svgSrc: "/images/Rastergrafik4.png", textColor: "hsl(39, 66%, 57%)", color: "#f4e5ca", UID: 31 },
        NeuroloyalPlanen: { label: "Neuroloyal Planen", size: [2.25, 1.01, 1], position: [2.5, -0.25, 0], svgSrc: "/images/Rastergrafik5.png", textColor: "hsl(210, 45%, 54%)", color: "#9EBCDA", UID: 32 },
        FocusOutside: { label: "Focus Outside", size: [2.25, 1.01, 1], position: [-2.5, -0.25, 0], svgSrc: "/images/Rastergrafik2.png", textColor: "hsl(80, 17%, 53%)", color: "#bec6ae", UID: 33 },
    },
    fourth: {
        FocusMe: { label: "Focus Me", size: [4.75, 0.666, 1], position: [0, 0, 0], svgSrc: "/images/Rastergrafik3.png", textColor: "hsl(210, 45%, 54%)", color: "#9EBCDA", UID: 40 },
        FocusOutside: { label: "Focus Outside", size: [4.75, 0.666, 1], position: [0, -1.5, 0], svgSrc: "/images/Rastergrafik2.png", textColor: "hsl(80, 17%, 53%)", color: "#bec6ae", UID: 41 },
        NeuroloyalZumNeu: { label: "Neruoloyal zum Neu", size: [4.75, 0.666, 1], position: [0, -3, 0], svgSrc: "/images/Rastergrafik4.png", textColor: "hsl(39, 66%, 57%)", color: "#f4e5ca", UID: 42 },
    },
    fifth: {
        NeuroloyalZumNeu: { label: "Neruoloyal zum Neu", size: [1.5, 1, 1], position: [-3.2, -2.5, 0], svgSrc: "/images/Rastergrafik4.png", textColor: "hsl(39, 66%, 57%)", color: "#f4e5ca", UID: 51 },
        NeuroloyalPlanen: { label: "Neuroloyal Planen", size: [1.5, 1, 1], position: [0, -0.25, 0], svgSrc: "/images/Rastergrafik5.png", textColor: "hsl(210, 45%, 54%)", color: "#9EBCDA", UID: 52 },
        FocusOutside: { label: "Focus Outside", size: [1.5, 1, 1], position: [0, -2.5, 0], svgSrc: "/images/Rastergrafik2.png", textColor: "hsl(80, 17%, 53%)", color: "#bec6ae", UID: 53 },
        WhyToGo: { label: "Let's go?! Why to go?", size: [1.5, 1, 1], position: [-3.2, -0.25, 0], svgSrc: "/images/Rastergrafik7.png", textColor: "hsl(80, 17%, 53%)", color: "#bec6ae", UID: 54 },
        BrainBasics: { label: "BrainBasics - Know How to go", size: [1.5, 1, 1], position: [3.2, -0.25, 0], svgSrc: "/images/Rastergrafik7.png", textColor: "hsl(80, 17%, 53%)", color: "#bec6ae", UID: 55 },
    }
});



type ContentItem = {
    title: string;
    bulletPoints: string[];
};

type ContentSection = {
    [key: number]: ContentItem;
};

type BusinessContent = {
    [key: string]: ContentSection;
};

type TextContent = {
    [key: string]: BusinessContent;

};


export const textContent = atom<TextContent>({
    Business: {
        "Business und Projekt": {
            1: {
                title: "Neuro-Driven Excellence: Starten - Konstruktiv umsetzen - Vorantreiben - Dranbleiben durch gezielte Integration von Neuro-Strukturen",
                bulletPoints: [
                    "Innovationsmanagement",
                    "Entwicklung",
                    "Kontinuierliche Verbesserung",
                    "Projektmanagement",
                ]
            },
            2: {
                title: "Umbrüche zu Durchbrüchen machen mit ZufriedenheitsMehrwert",
                bulletPoints: [
                    "Transformation",
                    "Strategie-Roll-Out",
                    "Neue (Produktions)Prozesse",
                    "NewTech-Adaption & Technologietransfer",
                    "Transformation zur Adaptiven Organisation"
                ]
            },
            3: {
                title: "BrainCare-Excellence: Wachstum maximieren durch High-Quality-Leistung",
                bulletPoints: [
                    "Brain Creativity: Performance für High-Quality-Ideen für Innovation, Problemlösung, Impulse für Neues steigern",
                    "Performance-Boost: Ressourcen neuroloyal entfalten",
                ]
            },
        },
        "HR, People und Kultur": {
            1: {
                title: "InnoTrinsic-HR Empowerment: Vom Business-Support zum Zukunftsgestalter",
                bulletPoints: [
                    "From Process to People: InnoTrinsicHR-Strategie",
                    "BrainCare-Kultur",
                ]
            },
            2: {
                title: "InnoTrinsicHR Empowerment: NeuroConnect für Führung und Team",
                bulletPoints: [
                    "BrainCare-Support: Leadership Exzellenz",
                    "Teamentwicklung: Mit BrainCare gemeinsam besser",
                ]
            },
            3: {
                title: "Personal Development",
                bulletPoints: [
                    "Personal Development mit BrainCare",
                    "BrainCare-Support: Positionswechsel",
                    "Stark im Job - StärkenBewusst und zufrieden die Rolle gestalten",
                    "Reskilling-Motivation ist Neuro-Sache",
                    "Brain-Based-Diversity: Neuro-Wissen nutzem",
                    "Karriere-Mut & Führung-Wollen",
                    "Selbstmanagement mit BrainCare: Leistungsoptimierung ohne Selbstoptimierungsdruck"
                ]
            },
            4: {
                title: "InnoTrinsic Care",
                bulletPoints: [
                    "SelfCare",
                    "Authentisches Business-Positioning",
                    "Personal Empowering"
                ]
            }
        }
    },
    Privat: {
        "NeuZeitGestalter & NeuLandEntdecker": {
            1: {
                title: "NeuZeitGestalter",
                bulletPoints: ["Das Ziel: Neu(es), das guttut. Der Weg - neuroloyal. Die Herausforderung: Herausfinden, was genau guttut, das Neue starten, umsetzen, durchhalten - mit Zufriedenheit und einem Daumen-Hoch-Gefühl."]
            },
            2: {
                title: "Life-After-Work",
                bulletPoints: ["„Keine Lust auf „altes Eisen“! Stattdessen nutze ich mein Gold-im-Kopf und im Herzen Ich gestalte NeuLand, das mich zufrieden macht. Um den Wandel mit Zufriedenheit zu ermöglichen gestalte ich ihn mit BrainCare."]
            }
        },
        "KrisenWandler & ChancenNutzer": {
            1: { title: "Jobverlust & Freistellung", bulletPoints: ["„Chance?! Was muss mein „Besser-für mich“- Job mir ermöglichen? Mir bieten? Was biete ich dem Job? In welcher Rolle kann ich meine Potentiale authentisch zur Geltung bringen? Mein Können ausspielen? Und wie?“"] },
            2: { title: "KrisenWandler", bulletPoints: ["Die letzte Zeit war herausfordernd. Eigentlich bin ich erschöpft. Wie kann ich mein Leben - für mich - gestalten? Wie finde ich die Energie dafür?"] },
        },
        "BerufsErNeuerer & JobZufriedenheitsGestalter & RentenStarter": {
            1: {
                title: "Berufswahl/Berufswechsel: Mehr Leidenschaft im Job",
                bulletPoints: ["„Ich kann was und will es einbringen. Was ist der „Gut für mich Job“, in dem ich bewegen kann, was mich antreibt, mir wichtig ist?  Und wie komme ich hin?“"]
            },
            2: {
                title: "FamilienNEUzeit… und mein Job?",
                bulletPoints: ["„Familie und mein Beruf? Ich will beides - Full on. Ohne Kompromisse. In Job, in dem ich bewegen kann, was mich antreibt. Geht das? Wie? Was ist mein Weg?“ "]
            },
            3: {
                title: "Mehr Wirkung- Meine Positionierung- meine Personal Brand",
                bulletPoints: ["„Ich habe keine Lust mehr, übersehen und überhört zu werden! Ich mache mich JETZT sichtbar - unübersehbar. Ohne mich zu verbiegen. Das bin ich! Das kann ich! Meine Persönlichkeiten wird zur sichtbaren Basis für meinen Erfolg. Was ist mein Weg? Was macht mich sichtbar?“"]
            },
            4: {
                title: "Ruhestand - NeuStart mit Zufriedenheit",
                bulletPoints: ["Im Job aktiv - und nach der aktiven Arbeitszeit? So falle ich nicht ins Was-kommt-jetzt-Loch: Neuroloyal handeln - für mehr Gesundheit & Zufriedenheit."]
            },
        },
        "SelbstWertEntdecker & SelbstbehauptungsErschaffer ": {
            1: {
                title: "GedankenStark - dein Bild von dir",
                bulletPoints: ["„Ausweg aus bremsenden Denkwelten gesucht! NeuStart in ein starkes Selbstbild notwendig.“"]
            },
            2: {
                title: "GedankenStark - dein Bild von dir",
                bulletPoints: ["„Ausweg aus bremsenden Denkwelten gesucht! NeuStart in ein starkes Selbstbild notwendig.“"]
            },
            3: {
                title: "Mach-Dich-Stark",
                bulletPoints: ["„Sehr viele Situationen fordern mich und meine Persönlichkeit heraus. Ich halte mich oft zurück und stehe nicht für mich und mein Können ein. Vor Gruppen reden, schwierige Gespräche, Machtspiele verunsichern mich. Ich mache mich  - jetzt - stark - für mich. Und wie werde ich mein eigener Selbstbehauptungserschaffer?“"]
            },
        },
        "HamsterradDurchbrecher & GewohnheitsVeränderer": {
            1: {
                title: "FÜR MICH! Ich gestalte mein Leben",
                bulletPoints: ["„Gefühlt getrieben - durch andere? Nicht - mehr -  mit mir! Aber was will ich wirklich - was passt und wie packe ich es an?“"]
            },
            2: {
                title: "Vom NEU-Vorsatz zum NEU-Gemacht",
                bulletPoints: ["„Ich würde ja gerne dem Schweinehund den „Stinkefinger“ zeigen! Aber Gewohnheiten sind doch stabil wie Stahl? Oder gibt es doch Wege sie zu verändern…?"]
            },
        },
        "PerspektivenFinder & ZufriedenheitsGestalter": {
            1: {
                title: "Alles-gut-aber…irgendwas muss sich doch verändern",
                bulletPoints: ["„Alles-gut-aber… irgendwas muss sich verändern. Aber wie entdecke ich mein Ziel und wie finde ich die Energie für den NeuStart?“"]
            },
            2: {
                title: "MY WAY… gestalten und gehen",
                bulletPoints: ["„Irgendwie bin ich von meinem Lebenskurs abgekommen? Wie finde ich meinem WEG, wo führt er hin? Warum habe ich nicht schon längst gestartet - Für MICH?"]
            },
        },
        "Gold-im Kopf-Schürfer & PotentialNutzer": {
            1: {
                title: "Potentiale nutzen und das Gold in meinem Kopf schürfen",
                bulletPoints: ["Du weißt, dass etwas in dir schlummert. Aber was genau ist es? Wie schaffts du es, die Potentiale konsequent und jederzeit zu nutzen und BrainBrakes zu umgehen - für dich und andere? Wie schürfst du das Gold in deinem Kopf? Starte neuroloyal deinen Deep Dive. "]
            },
            2: {
                title: "UnternehmensMacher",
                bulletPoints: ["Ich will mein Unternehmen, meinen Betrieb nach vorne bringen und entwickeln - und sicher durch bewegte Zeiten steuern. Das gelingt nur durch Wandel und Veränderung. Dafür muss ich mich verändern und mit High-Quality-Impulsen vorangehen. Konkret: Meine Ressourcen besser einbringen und Raum und Möglichkeiten finden, meine Potentiale ideal zu nutzen."]
            }
        }
    },
    "Public Persons": {
        "Public & Powerful: Selbstbestimmt in der Öffentlichkeit - Stärke finden und öffentlichen Druck begegnen": {
            1: { title: "", bulletPoints: [""] }
        },
        "Dafür stehe ich - SelbstBewusste Präsenz: Starke & selbstschützende Positionierung & Personal-Branding für öffentliche Personen": {
            1: { title: "", bulletPoints: [""] }
        }
    },
    "Gesellschaft": {
        "Gesellschaft neu gedacht: Neuroloyale Strukturen als Schlüssel für Veränderung": {
            1: { title: "", bulletPoints: [""] }
        },
        "3 Tage für Morgen - Ideen und Tatkraft für die Kommune: Bürger, Verwaltung, Politik und Wirtschaft gemeinsam stark": {
            1: { title: "", bulletPoints: [""] }
        }
    },
    "Sport": {
        "Game Plan: Authentische Lebensplanung für Sportler - Dein Weg während und deine Zukunft nach der aktiven Karriere": {
            1: { title: "", bulletPoints: [""] }
        },
        "Winning Off the Field: Vom Sportler zum neuen Ich - Dein MehrWert-Weg mit BrainCare": {
            1: { title: "", bulletPoints: [""] }
        },
        "Mehr Team – neuroloyal: BrainCare-Methoden für ein starkes Team": {
            1: { title: "", bulletPoints: [""] }
        }
    }
});


export const openModule = atom<string>("")
export const openAoA = atom<string>("")