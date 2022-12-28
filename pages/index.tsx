import Head from "next/head";
import { Inter } from "@next/font/google";
import Clock from "./Clock";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [pomodoroTime, setPomodoroTime] = useState<number>(25 * 60);

  return (
    <>
      <Head>
        <title>
          POMOWAVE{" ~ "}
          {`${
            pomodoroTime / 60 < 10
              ? `0${Math.floor(pomodoroTime / 60)} :`
              : `${Math.floor(pomodoroTime / 60)} :`
          }
          ${
            pomodoroTime % 60 < 10
              ? ` 0${pomodoroTime % 60}`
              : ` ${pomodoroTime % 60}`
          }`}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Clock setPomodoroTime={setPomodoroTime} />
    </>
  );
}
