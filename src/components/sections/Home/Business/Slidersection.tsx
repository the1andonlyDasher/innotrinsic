import { ImageCarousel } from "@/components/ImageCarousel";
import { ModuleCarousel } from "@/components/ModuleCarousel";
import Sec from "@/components/Section";
import { SliderCarousel } from "@/components/SliderCarousel";
import { FC } from "react";

interface SliderSectionProps {

}

const slides = [
    { title: "Wollen Sie die Zukunft gestalten? Oder nur zuschauen und vorhandene Potentiale brach liegen lassen?", text: null },
    { title: null, text: "MY InnoTrinsic wandelt dieses Neuro-Wissen in management- und prozessfähige Strukturen.Mit unserem praxistauglichen Modulprogramm sowie einem flexiblen Prozess, der auf jeweilige Herausforderungen und Aufgaben zugeschnitten wird, können Unternehmen die Erkenntnisse der Neurowissenschaften auf jeden Bereich und jedes Projekt anwenden." },
    { title: "Sie entscheiden! Weiter auf ausgetretenen Wegen oder revolutionäres BrainCare-Management?", text: null },

]

const SliderSection: FC<SliderSectionProps> = () => {
    return (<Sec single left sectionName="slider">
        <SliderCarousel images={slides} />
    </Sec>);
}

export default SliderSection;