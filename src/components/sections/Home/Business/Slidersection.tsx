import { ImageCarousel } from "@/components/ImageCarousel";
import { ModuleCarousel } from "@/components/ModuleCarousel";
import Sec from "@/components/Section";
import { SliderCarousel } from "@/components/SliderCarousel";
import { FC } from "react";

interface SliderSectionProps {

}

const slides = [
    { title: "MY InnoTrinsic - Exzellenz durch BrainCare", text: "MY InnoTrinsic startet dort, wo sich entscheidet, ob es zu Exzellenz-Ergebnissen kommt - oder nicht, ob es zu  High Quality Output kommt- oder nicht, ob es zur Umsetzung kommt - oder nicht - ob Menschen motiviert und gerne agieren - oder nicht….MY InnoTrinsic startet im Kopf und stellt das in den Mittelpunkt, was Unternehmen im Kern erfolgreich, leistungsfähig und zukunftsfähig, motiviert und zufrieden macht: den Menschen mit seinen neurophysischen Besonderheiten…. Denn Menschen sind keine Maschinen. Den Herausforderungen unserer Zeit begegnen wir nicht mit SchemaF, sondern nur, wenn wir den Blickwinkel ändern und auf die Mitarbeitenden nicht als Einsetzbare Ressourcen mit „Funktionieren-Erwartung“ schauen, stattdessen humanzentriert. Diese Human Awareness, konkret die Erkenntnisse der Neurowissenschaften, fließen ein in ein neuroloyale zugleich pragmatisches Strukturprinzip mit pragmatischen Prozessen, Werkzeugen und Methoden mit Brain Care." },
    { title: "MY InnoTrinsic - Exzellenz durch BrainCare", text: "MY InnoTrinsic startet dort, wo sich entscheidet, ob es zu Exzellenz-Ergebnissen kommt - oder nicht, ob es zu  High Quality Output kommt- oder nicht, ob es zur Umsetzung kommt - oder nicht - ob Menschen motiviert und gerne agieren - oder nicht….MY InnoTrinsic startet im Kopf und stellt das in den Mittelpunkt, was Unternehmen im Kern erfolgreich, leistungsfähig und zukunftsfähig, motiviert und zufrieden macht: den Menschen mit seinen neurophysischen Besonderheiten…. Denn Menschen sind keine Maschinen. Den Herausforderungen unserer Zeit begegnen wir nicht mit SchemaF, sondern nur, wenn wir den Blickwinkel ändern und auf die Mitarbeitenden nicht als Einsetzbare Ressourcen mit „Funktionieren-Erwartung“ schauen, stattdessen humanzentriert. Diese Human Awareness, konkret die Erkenntnisse der Neurowissenschaften, fließen ein in ein neuroloyale zugleich pragmatisches Strukturprinzip mit pragmatischen Prozessen, Werkzeugen und Methoden mit Brain Care." },
    { title: "MY InnoTrinsic - Exzellenz durch BrainCare", text: "MY InnoTrinsic startet dort, wo sich entscheidet, ob es zu Exzellenz-Ergebnissen kommt - oder nicht, ob es zu  High Quality Output kommt- oder nicht, ob es zur Umsetzung kommt - oder nicht - ob Menschen motiviert und gerne agieren - oder nicht….MY InnoTrinsic startet im Kopf und stellt das in den Mittelpunkt, was Unternehmen im Kern erfolgreich, leistungsfähig und zukunftsfähig, motiviert und zufrieden macht: den Menschen mit seinen neurophysischen Besonderheiten…. Denn Menschen sind keine Maschinen. Den Herausforderungen unserer Zeit begegnen wir nicht mit SchemaF, sondern nur, wenn wir den Blickwinkel ändern und auf die Mitarbeitenden nicht als Einsetzbare Ressourcen mit „Funktionieren-Erwartung“ schauen, stattdessen humanzentriert. Diese Human Awareness, konkret die Erkenntnisse der Neurowissenschaften, fließen ein in ein neuroloyale zugleich pragmatisches Strukturprinzip mit pragmatischen Prozessen, Werkzeugen und Methoden mit Brain Care." },

]

const SliderSection: FC<SliderSectionProps> = () => {
    return (<Sec single left sectionName="business">
        <SliderCarousel images={slides} />
    </Sec>);
}

export default SliderSection;