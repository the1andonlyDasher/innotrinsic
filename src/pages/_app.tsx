import MainLayout from "@/components/MainLayout";
import "@/styles/globals.css";
import "@/styles/scss/style.scss";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {

  const names = [
    ["Home", null],
    ["Kontakt", faCalendar]
  ];
  const legals_names = ["Impressum"]
  return (<>

    <MainLayout navbar={names} legals={legals_names}>
      <Component {...pageProps} />
    </MainLayout>
  </>)
}
