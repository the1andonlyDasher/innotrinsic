import { motion } from 'framer-motion';
import Link from 'next/link';
import { FC } from 'react';

interface FooterProps {
    home: boolean;
    legal: boolean;
    data: boolean;
}

const Footer: FC<FooterProps> = (props) => {
    var date = new Date();
    var year: any = date.getFullYear().toString();
    return (
        <>

            <motion.div className=" rounded-2xl bg-[#A4C57B] w-full flex flex-col md:flex-row justify-center items-center gap-6 p-6 sm:p-8 md:p-12 my-12">
                <p className="text-[#10202f] font-header font-bold text-center w-auto">MY InnoTrinsic | © {year}</p>
                {props.home && <Link href={"/"}><p className="font-header text-[#19240c] font-semibold">Home</p></Link>}
                {props.legal && <Link href={"/impressum"}><p className="font-header text-[#19240c] font-semibold">Impressum</p></Link>}
                {props.data && <Link href={"/datenschutz"}><p className="font-header text-[#19240c] font-semibold">Datenschutz</p></Link>}
            </motion.div>

        </>
    );
};

export default Footer;
