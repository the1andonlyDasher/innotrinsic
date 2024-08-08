import MainLayout from "@/components/MainLayout";
import "@/styles/globals.css";
import "@/styles/scss/style.scss";
import { faCalendar, faMap } from "@fortawesome/free-solid-svg-icons";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {

  const names = [
    ["Einsatzgebiete", null, false],
    ["Business", null, false],
    ["Kontakt", faCalendar, true]
  ];
  const legals_names = ["Impressum", "Datenschutz"]
  return (<>

    <MainLayout navbar={names} legals={legals_names}>
      <Component {...pageProps} />
    </MainLayout>
  </>)
}
