import React, { useEffect, useRef, useState } from "react";
import { useAnimationControls, motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import Cookies from 'js-cookie';
import Link from "next/link";

const userID = "zl8P8-ahkEcFjpsgG";
emailjs.init(userID);

const USER_CONSENT_COOKIE_KEY = 'cookie_consent_is_true'
const USER_CONSENT_COOKIE_EXPIRE_DATE = 365

type Props = {
    title?: string;
    subtitle?: string;
    sectionName?: string;
    id?: string;
};

interface ContactProps {
    props: Props;
}

const ContactForm = ({ props }: ContactProps) => {
    const form = useRef<HTMLFormElement>(null);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [firstName, setFirstName] = useState("");
    const [formReady, setFormReady] = useState(true);
    const [isConsentGiven, setIsConsentGiven] = useState(false);
    const controlsForm = useAnimationControls();
    const messageControls = useAnimationControls();
    const inView = useInView(form, { once: false, margin: "0px", amount: 0.1 });

    useEffect(() => {
        inView && controlsForm.start("enter")
    }, []);

    const variants = {
        initial: { y: 20, filter: "blur(20px)", opacity: 0 },
        enter: { y: 0, filter: "blur(0px)", opacity: 1, delay: 1 },
        exit: { y: 20, filter: "blur(20px)", opacity: 0 },
    };

    const formVariants = {
        initial: { opacity: 0 },
        enter: {
            opacity: 1,
            transition: { staggerChildren: 0.1, when: "beforeChildren", duration: 0.125 },
        },
        exit: {
            opacity: 0,
            transition: { staggerChildren: 0.1, when: "afterChildren" },
        },
    };

    const messageVariants = {
        initial: { opacity: 0 },
        enter: { opacity: 1, display: "flex" },
        exit: { opacity: 0, transitionEnd: { display: "none" } },
    };

    const sequence = async () => {
        await controlsForm.start("exit");
        return await messageControls.start("enter");
    };

    const [status, setStatus] = useState("Abschicken");

    const bringBackform = async (e: any) => {
        e.preventDefault();
        await messageControls.start("exit").then(() => {
            setFormReady(true);
        });
        return await controlsForm.start("enter");
    };

    const testMail = (e: any) => {
        e.preventDefault();
        if (!cookieConsentIsTrue) {
            alert("Bitte stimmen Sie der Datenschutzrichtlinie zu, bevor Sie fortfahren.");
            return;
        }
        setStatus("Sende Email...");

        setTimeout(() => {
            setStatus("Email versendet!");
            setFormReady(false);
            setTimeout(() => {
                setStatus("Abschicken");
            }, 1000);
            setFirstName("");
            setEmail("");
            setMessage("");
            sequence();
        }, 1000);
    };

    const sendEmail = (e: any) => {
        e.preventDefault();
        if (!cookieConsentIsTrue) {
            alert("Bitte stimmen Sie der Datenschutzrichtlinie zu, bevor Sie fortfahren.");
            return;
        }
        setStatus("Sende Email...");
        const currentForm = form.current;
        if (!currentForm) return; // Check if form is null
        emailjs
            .sendForm(
                "service_o81qvau",
                "template_c4wva6m",
                form.current,
                userID
            )
            .then(
                (result: any) => {
                    setStatus("Email versendet!");
                    setFormReady(false);
                    setTimeout(() => {
                        setStatus("Abschicken");
                    }, 1000);
                    sequence();
                    setFirstName("");
                    setEmail("");
                    setMessage("");
                },
                (error: any) => {
                    setStatus("Fehlgeschlagen...");
                    alert("Email konnte nicht gesendet werden...");
                }
            );
    };

    const [cookieConsentIsTrue, setCookieConsentIsTrue] = useState(Cookies.get(USER_CONSENT_COOKIE_KEY) === 'true')




    useEffect(() => {

        Cookies.set(USER_CONSENT_COOKIE_KEY, cookieConsentIsTrue ? 'true' : 'false', {
            expires: USER_CONSENT_COOKIE_EXPIRE_DATE,
        })

    }, [cookieConsentIsTrue]);

    const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCookieConsentIsTrue(e.target.checked);
    }

    useEffect(() => {
        inView && formReady ? controlsForm.start("enter") : controlsForm.start("exit");
    }, [inView]);

    return (
        <>
            <section className="form-section" id={props.id}>
                <div className="form-wrapper">
                    <h3 data-before={props.title} className="font-bold">{props.title}</h3>
                    <p>{props.subtitle}</p>
                    <motion.div
                        className="thanks__message"
                        variants={messageVariants}
                        initial="initial"
                        animate={messageControls}
                        exit="exit"
                    >
                        <h4>Vielen Dank!</h4>
                        <p>Wir werden Ihre Anfrage schnellstmöglich bearbeiten und uns bei Ihnen melden.</p>
                        <button className="text-xl py-2 px-6 bg-[#a0c17f] rounded-full hover:text-white hover:bg-[#32689C]" onClick={bringBackform}>
                            Weitere Email
                        </button>
                    </motion.div>
                    <motion.form
                        ref={form}
                        onSubmit={sendEmail}
                        variants={formVariants}
                        initial="initial"
                        animate={controlsForm}
                        exit="exit"
                    >
                        <input type="hidden" name="contact_number"></input>
                        <motion.div variants={variants}>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="user_name"
                                // className="bg-[#21212122] rounded-[2px] border border-[#222] text-neutral-50"
                                value={firstName}
                                placeholder={"Name"} // ...force the input's value to match the state variable...
                                onChange={e => setFirstName(e.target.value)}
                                required
                            />
                        </motion.div>
                        <motion.div variants={variants}>
                            <label htmlFor="email">E-Mail:</label>
                            <input
                                type="email"
                                id="email"
                                name="user_email"
                                // className="bg-[#21212122] rounded-[2px] border border-[#222] text-neutral-50"
                                value={email}
                                placeholder="E-Mail"
                                onChange={e => setEmail(e.target.value)}
                                required
                                aria-describedby="emailHelp"
                            />
                        </motion.div>
                        <motion.div variants={variants}>
                            <label htmlFor="message">Nachricht</label>
                            <textarea
                                value={message}
                                placeholder={"Was können wir für Sie tun?"}
                                onChange={e => setMessage(e.target.value)}
                                name="message"
                                // className="bg-[#21212122] rounded-[2px] border border-[#222] text-neutral-50"
                                id="message"
                                required
                                rows={5}
                            />
                        </motion.div>
                        <motion.div className="flex flex-wrap flex-row items-center text-black gap-2">
                            <label className="hidden">Cookie Consent</label>
                            <input className="w-5 h-5" type="checkbox" checked={cookieConsentIsTrue} onChange={e => handleConsentChange(e)} />Ich habe die<Link className="m-0 p-0 underline" href="/datenschutz">Datenschutzerklärung</Link> gelesen
                        </motion.div>
                        <motion.button variants={variants} className="btn__primary" type="submit">
                            {status}
                        </motion.button>
                    </motion.form>
                </div>
            </section>
        </>
    );
};

export default ContactForm;
