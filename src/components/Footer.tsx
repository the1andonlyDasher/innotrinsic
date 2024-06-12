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
                <h5 className="text-[#10202f] font-bold text-center w-auto">MY InnoTrinsic | © {year}</h5>
                {props.home && <Link href={"/"}><h5 className="text-[#32689C] font-bold">Home</h5></Link>}
                {props.legal && <Link href={"/impressum"}><h5 className="text-[#32689C] font-bold">Impressum</h5></Link>}
                {props.data && <Link href={"/datenschutz"}><h5 className="text-[#32689C] font-bold">Datenschutz</h5></Link>}
            </motion.div>

        </>
    );
};

export default Footer;
