import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faArrowRight, faPhoneSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const Footer = () => {
    var date = new Date();
    var year: any = date.getFullYear().toString();
    return (
        <>
            <footer className="bg-black mt-6 flex flex-wrap gap-4 p-4 md:p-8">
                {/* <ul className="footer-links">
          <li><Link className="flex justify-center p-4 w-full" to="/Datenschutz">Datenschutz</Link></li>
          <li><Link className="flex justify-center p-4 w-full" to="/Impressum">Impressum</Link></li>
          <li><Link className="flex justify-center p-4 w-full" to="/AGB">AGB</Link></li>
        </ul> */}
                <div className="h-full w-full pb-6 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    <div className="flex flex-col justify-start gap-2 md:gap-4 bg-black rounded-md p-4  border border-stone-900">
                        <Link
                            title="Link zur Homepage"
                            className="text-zinc-400 text-md hover:text-stone-500"
                            href={'/'}
                        >
                            Home
                        </Link>
                        <Link
                            title="Link zur Seite Über uns"
                            className="text-zinc-400 text-md hover:text-stone-500"
                            href={'/'}
                        >
                            Über uns
                        </Link>
                        <Link
                            title="Link zum Shop"
                            className="text-zinc-400 text-md hover:text-stone-500"
                            href={'/'}
                        >
                            Shop
                        </Link>
                        <Link
                            title="Link zur Preisliste"
                            className="text-zinc-400 text-md hover:text-stone-500"
                            href={'/'}
                        >
                            Preise
                        </Link>
                        <Link
                            title="Link zur Kontaktseite"
                            className="text-zinc-400 text-md hover:text-stone-500"
                            href={'/'}
                        >
                            Kontakt
                        </Link>
                    </div>
                    <div className="flex flex-col justify-start gap-2 md:gap-4 bg-black rounded-md p-4  border border-stone-900">
                        <Link
                            title="Link zum Impressum"
                            className="text-zinc-400 text-md hover:text-stone-500"
                            href={'/Impressum'}
                        >
                            Impressum
                        </Link>
                        <Link
                            title="Link zum Datenschutzhinweis"
                            className="text-zinc-400 text-md hover:text-stone-500"
                            href={'/Datenschutz'}
                        >
                            Datenschutz
                        </Link>
                        <Link
                            title="Link zu den allgemeinen Geschäftsbedingungen"
                            className="text-zinc-400 text-md hover:text-stone-500"
                            href={'/AGB'}
                        >
                            AGB
                        </Link>
                    </div>
                    <div className="flex flex-col justify-start gap-2 md:gap-4 bg-black rounded-md p-4 border border-stone-900">
                        <Link
                            title="Facebook von Kopfsache by Stephan"
                            aria-label="Facebook von Kopfsache by Stephan"
                            href="https://www.facebook.com/people/Kopfsache-by-Stephan/100070527370504/"
                            className="text-zinc-400 text-md flex gap-2 flex-row items-center hover:text-indigo-600"
                        >
                            <FontAwesomeIcon icon={faFacebookF} />
                            Facebook
                        </Link>
                        <Link
                            title="Instagram von Kopfsache by Stephan"
                            aria-label="Instagram von Kopfsache by Stephan"
                            href="https://www.instagram.com/kopfsache.by.stephan/"
                            className="text-zinc-400 text-md flex gap-2 flex-row items-center hover:text-indigo-600"
                        >
                            <FontAwesomeIcon icon={faInstagram} />
                            Instagram
                        </Link>
                        <Link
                            title="Email-Adresse von Kopfsache by Stephan"
                            aria-label="Email-Adresse von Kopfsache by Stephan"
                            href="mailto:stephan.muller4@aol.de"
                            className="text-zinc-400 text-md flex gap-2 flex-row items-center hover:text-indigo-600"
                        >
                            <FontAwesomeIcon icon={faEnvelope} />
                            E-Mail
                        </Link>
                        <Link
                            title="Telefonnummer von Kopfsache by Stephan"
                            aria-label="Telefonnummer von Kopfsache by Stephan"
                            href="tel:+49152 23024555"
                            className="text-zinc-400 text-md flex gap-2 flex-row items-center hover:text-indigo-600"
                        >
                            <FontAwesomeIcon icon={faPhoneSquare} />
                            Anrufen
                        </Link>
                    </div>
                    <div className="flex flex-col justify-start gap-2 md:gap-4 bg-[#050505] rounded-md p-4  border border-[#050505]">
                        <h3>Neue Frisur?</h3>{' '}
                        <Link className="text-indigo-300  hover:text-indigo-600" href={'https://www.studiobookr.com/kopfsache-by-stephan-mueller-56870#/"'}>
                            Jetzt Termin ausmachen <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                    </div>
                    <div className="flex flex-col justify-start  bg-black rounded-md p-4 gap-2 md:gap-4 col-span-1 sm:col-span-2 xl:col-span-1">
                        <h3 className='my-2'>Abonniere unseren Newsletter</h3>
                        <div className='flex flex-col sm:flex-row w-full gap-2 md:gap-4'>
                            <div className="flex my-[20px] mb-0 flex-col w-full relative">
                                <label className="text-indigo-500 absolute top-[-20px] left-0">
                                    E-Mail
                                </label>
                                <input className="rounded-md bg-[#050505] border border-slate-900 w-full"></input>
                            </div>
                            <button className="my-[20px] mb-0 bg-indigo-500 text-white px-6 py-2 rounded-md max-w-[200px]">
                                Abschicken
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full flex flex-row justify-between items-center">
                    <h5>Kopfsache | © {year}</h5>
                </div>
            </footer>
        </>
    );
};

export default Footer;
