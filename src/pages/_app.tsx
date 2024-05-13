import MainLayout from "@/components/MainLayout";
import "@/styles/globals.css";
import "@/styles/scss/style.scss";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {

  const names = [
    ["Home", null],
    ["Einsatzgebiete", null],
    ["Blog", null],
    ["Kontakt", faCalendar]
  ];
  const legals_names = ["Datenschutz", "Impressum"]
  return (
    <MainLayout navbar={names} legals={legals_names}>
      <Component {...pageProps} />
    </MainLayout>)
}
