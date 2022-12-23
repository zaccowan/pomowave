import Head from "next/head";
import { Inter } from "@next/font/google";
import Nav from "./Nav";
import Clock from "./Clock";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>POMOWAVE</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Clock />
      {/* <main className="w-full h-screen flex flex-1 items-center justify-center"></main> */}
    </>
  );
}
