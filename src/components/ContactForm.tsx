// import React, { useEffect, useRef, useState } from "react";
// import { useAnimationControls, motion, useInView } from "framer-motion";
// import { useTranslation } from "next-i18next";
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// import emailjs from "@emailjs/browser"
// emailjs.init("lPNDYXO-4WREGEgyS");

// type props = {
//   title?: string,
//   subtitle?: string,
//   sectionName?: string,
//   id?: string
// }

// interface contactProps {
//   props: props
// }

// export async function getServerSideProps(context: any) {
//   // extract the locale identifier from the URL
//   const { locale } = context

//   return {
//     props: {
//       // pass the translation props to the page component
//       ...(await serverSideTranslations(locale)),
//     },
//   }
// }

// const ContactForm = ({ props }: contactProps) => {
//   const { t } = useTranslation()
//   const form = useRef<HTMLFormElement>(null);
//   const [email, setEmail] = useState("")
//   const [message, setMessage] = useState("")
//   const [firstName, setFirstName] = useState("");
//   const controlsForm = useAnimationControls();
//   const messageControls = useAnimationControls();
//   const inView = useInView(form, { once: true, margin: "100px 0px 100px 0px" });

//   const variants = {
//     initial: { opacity: 0, x: -10 },
//     enter: {
//       opacity: 1,
//       x: 0,
//       transition: { ease: "easeIn", duration: 0.5 },
//     },
//     exit: {
//       x: 10, opacity: 0,
//       transition: { ease: "easeOut", duration: 0.5 },
//     },
//   }

//   const formVariants = {
//     initial: { opacity: 0, },
//     enter: {
//       opacity: 1,
//       transition: { ease: "easeIn", duration: 0.5, staggerChildren: 0.25 },
//     },
//     exit: { opacity: 0, transition: { ease: "easeOut", duration: 0.5, staggerChildren: 0.25 } },
//   };
//   const messageVariants = {
//     initial: { opacity: 0 },
//     enter: { opacity: 1, display: "flex" },
//     exit: { opacity: 0, display: "none" },
//   };
//   const sequence = async () => {
//     await controlsForm.start("exit");
//     return await messageControls.start("enter");
//   };

//   const [status, setStatus] = useState("Send");

//   const bringBackform = async (e: any) => {
//     e.preventDefault();
//     await messageControls.start("exit");
//     return await controlsForm.start("enter");
//   };

//   const testMail = (e: any) => {
//     e.preventDefault();
//     setStatus("Mail geht raus...");
//     setTimeout(() => {
//       setStatus("Mail ist raus!");
//       setTimeout(() => {
//         setStatus("Abschicken");
//       }, 1000);
//       setFirstName("");
//       setEmail("")
//       setMessage("")
//       sequence();
//     }, 1000);
//   };
//   const sendEmail = (e: any) => {
//     e.preventDefault();
//     if (form.current == null) return;
//     setStatus("Mail geht raus...");
//     emailjs
//       .sendForm(
//         "service_svvit4h",
//         "template_t5ebzez",
//         form.current,
//         "lPNDYXO-4WREGEgyS"
//       )
//       .then(
//         (result: any) => {
//           setStatus("Mail ist raus!");
//           setTimeout(() => {
//             setStatus("Abschicken");
//           }, 1000);
//           sequence();
//           setFirstName("");
//           setEmail("")
//           setMessage("")
//         },
//         (error: any) => {
//           setStatus("Ups...");
//           alert("Mail konnte nicht gesendet werden...");
//         }
//       );
//   };

//   useEffect(() => {
//     if (inView) {
//       controlsForm.start("enter");
//     }
//   }, [inView, controlsForm]);

//   return (
//     <>
//       <section className="form-section">
//         <div className="form-wrapper">
//           <h3 data-before={props.title}>{props.title}</h3>
//           <p>{props.subtitle}</p>
//           <motion.div
//             className="thanks__message"
//             variants={messageVariants}
//             initial="initial"
//             animate={messageControls}
//             exit="exit"
//           >
//             <h4>{t("THANKYOU")}</h4>
//             <p>{t("THANKYOU_TEXT")}</p>
//             <button className="btn__small py-2" onClick={bringBackform}>
//               {t("THANKYOU_FORGOT")}
//             </button>
//           </motion.div>
//           <motion.form
//             ref={form}
//             onSubmit={sendEmail}
//             variants={formVariants}
//             initial="initial"
//             animate={controlsForm}
//             exit="exit"
//           >
//             <input type="hidden" name="contact_number"></input>
//             <motion.div variants={variants}>
//               <label htmlFor="name">Name:</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="user_name"
//                 // className="bg-[#21212122] rounded-[2px] border border-[#222] text-neutral-50"
//                 value={firstName}
//                 placeholder={"Name"} // ...force the input's value to match the state variable...
//                 onChange={e => setFirstName(e.target.value)}
//                 required
//               />
//             </motion.div>
//             <motion.div variants={variants}>
//               <label htmlFor="email">E-Mail:</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="user_email"
//                 // className="bg-[#21212122] rounded-[2px] border border-[#222] text-neutral-50"
//                 value={email}
//                 placeholder="E-Mail"
//                 onChange={e => setEmail(e.target.value)}
//                 required
//                 aria-describedby="emailHelp"
//               />
//             </motion.div>
//             <motion.div variants={variants}>
//               <label htmlFor="message">{t("MESSAGE")}</label>
//               <textarea
//                 value={message}
//                 placeholder={t("YOUR_MESSAGE")}
//                 onChange={e => setMessage(e.target.value)}
//                 name="message"
//                 // className="bg-[#21212122] rounded-[2px] border border-[#222] text-neutral-50"
//                 id="message"
//                 required
//                 rows={5}
//               />
//             </motion.div>
//             <motion.button variants={variants} className="btn__primary" type="submit">
//               {status}
//             </motion.button>
//           </motion.form>
//         </div>
//       </section>
//     </>
//   );
// };

// export default ContactForm;
