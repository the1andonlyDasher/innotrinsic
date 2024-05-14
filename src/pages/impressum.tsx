import { motion } from "framer-motion";
import Link from "next/link";
import { FunctionComponent } from "react";

interface ImpressumProps {

}

const Impressum: FunctionComponent<ImpressumProps> = () => {
    var date = new Date();
    var year: any = date.getFullYear().toString();
    return (<motion.section>
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
        </motion.div>
        <motion.div className="mt-auto rounded-2xl bg-[#A4C57B] w-full flex justify-center items-center p-12 my-12">
            <h5 className="text-[#32689C] font-bold">MY InnoTrinsic | © {year}</h5>
            <Link href={"/"}><h5 className="text-[#32689C] font-bold">Home</h5></Link>
        </motion.div>
    </motion.section>);
}

export default Impressum;