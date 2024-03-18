import MainLayout from "@/components/MainLayout";
import "@/styles/globals.css";
import "@/styles/scss/style.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {

  const names = ["Home", "Portfolio", "Kontakt"];
  const legals_names = ["Datenschutz", "Impressum"]
  return (
    <MainLayout navbar={names} legals={legals_names}>
      <Component {...pageProps} />
    </MainLayout>)
}
