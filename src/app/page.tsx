/** @format */
"use client";

import clsx from "clsx";
import Image from "next/image";
import { FaRegCopy } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { passwordStrength } from "check-password-strength";
import { Slider } from "@radix-ui/react-slider";
import SliderCompnent from "./components/Slider";
import { useState } from "react";
// var generator = require('generate-password');
import generator from "generate-password";
import { cn } from "@/lib/utils";

export default function Home() {
  const [isCopied, setCopied] = useState(false);
  const [length, setLength] = useState(10);
  const [numbers, setNumbers] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [generatedPasswowrd, setGeneratedPasswowrd] = useState("");

  //
  // const password = generator.generate({
  //   length: length,
  //   numbers: numbers,
  //   uppercase: uppercase,
  //   lowercase: lowercase,
  //   symbols: symbols
  // });

  const password =
    !numbers && !uppercase && !lowercase && !symbols
      ? "0"
      : generator.generate({
          length: length,
          numbers: numbers,
          uppercase: uppercase,
          lowercase: lowercase,
          symbols: symbols
        });
  console.log("passwordStrength", passwordStrength(password).value);

  const handleSilderChange = (newValue: number[]) => {
    setLength(newValue[0]);
  };

  function handleCopy() {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  function handlePassword() {
    if (!numbers && !uppercase && !lowercase && !symbols) {
      alert("At least one rule for pools must be true");
    } else setGeneratedPasswowrd(password);
  }

  return (
    <div className="bg-stone-900 min-h-screen w-full p-5 text-white flex items-center justify-center">
      <main className="w-full  max-w-[500px] flex flex-col gap-6  ">
        <p className="font-bold text-2xl text-gray-500 text-center">
          Password Generator
        </p>
        <div className="flex flex-col gap-7">
          {/* output  container */}
          <div className=" bg-zinc-700 flex justify-between items-center  gap-5 p-4">
            <p className="font-bold text-3xl text-white overflow-x-auto pr-2 ">
              {generatedPasswowrd}
            </p>
            <div className="flex items-center gap-3">
              {isCopied && <div className="font-bold text-Green">COPIED</div>}
              <FaRegCopy
                onClick={handleCopy}
                className={cn(
                  "text-2xl min-h-8 min-w-8 hover:text-Green text-white cursor-pointer",
                  { "text-Green": isCopied }
                )}
              />
            </div>
          </div>
          {/* section */}
          <section className="bg-zinc-700 py-6 px-8 flex gap-4 flex-col">
            {/* Character Length */}
            <div className="flex justify-between items-center font-bold">
              <p className=" text-lg">Character Length</p>
              <p className="text-3xl text-Green">{length} </p>
            </div>
            <SliderCompnent
              onValueChange={handleSilderChange}
              defaultValue={[length]}
              value={[length]}
            />

            {/*  */}
            {/* PasswordType section */}
            <div className="flex flex-col gap-3">
              <PasswordType
                onClick={() => setUppercase(!uppercase)}
                isChecked={uppercase}
                text="Include Uppercase Letters"
              />

              <PasswordType
                onClick={() => setLowercase(!lowercase)}
                isChecked={lowercase}
                text="Include Lowercase Letters"
              />
              <PasswordType
                onClick={() => setNumbers(!numbers)}
                isChecked={numbers}
                text="Include Numbers"
              />
              <PasswordType
                onClick={() => setSymbols(!symbols)}
                isChecked={symbols}
                text="Include Symbols"
              />
            </div>

            {/*  STRENGTH*/}
            <div className=" items-center bg-stone-900 h-16 flex gap-3 justify-between px-8 font-bold">
              <p className="text-gray-500">STRENGTH</p>
              {/* right div */}
              <div className="flex gap-3">
                <p className=" text-lg">
                  {passwordStrength(generatedPasswowrd).value}
                </p>

                <div className="flex gap-1 ">
                  <PasswordStrength
                    type={passwordStrength(generatedPasswowrd).value}
                  />
                </div>
              </div>
            </div>

            {/* button */}
            <button
              onClick={handlePassword}
              className="w-full h-16 bg-Green text-stone-900 text-lg items-center justify-center font-bold flex gap-2 hover:bg-zinc-700 border-2 border-Green hover:text-Green transition-all"
            >
              <span>GENERATE</span>

              <FaArrowRight />
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
// MEDIUM
function PasswordStrength({
  type
}: {
  type: "Too weak" | "Weak" | "Medium" | "Strong" | string;
}) {
  const stylist = [
    {
      color: "bg-red-500",
      type: "Too weak"
    },
    {
      color: "bg-orange-700",
      type: "Weak"
    },
    {
      color: "bg-green-500",
      type: "Medium"
    },
    {
      color: "bg-orange-400",
      type: "Strong"
    }
  ];

  let color;

  if (type === "Too weak")
    return (
      <>
        {stylist.map((d, i) => (
          <div
            className={clsx(
              "h-7 w-[10px] border border-white",
              i == 0 && "bg-red-500"
            )}
          />
        ))}
      </>
    );
  else if (type === "Weak")
    return (
      <>
        {stylist.map((d, i) => (
          <div
            className={clsx(
              "h-7 w-[10px] border border-white",
              i <= 1 && "bg-orange-700"
            )}
          />
        ))}
      </>
    );
  else if (type === "Medium")
    return (
      <>
        {stylist.map((d, i) => (
          <div
            className={clsx(
              "h-7 w-[10px] border border-white",
              i <= 2 && "bg-orange-400"
            )}
          />
        ))}
      </>
    );
  else if (type === "Strong")
    return (
      <>
        {stylist.map((d, i) => (
          <div
            className={clsx(
              "h-7 w-[10px] border border-white",
              i <= stylist.length - 1 && "bg-green-500"
            )}
          />
        ))}
      </>
    );
}

function PasswordType({
  text,
  isChecked = true,
  onClick
}: {
  isChecked: boolean;
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  return (
    <div className="flex gap-5 font-bold">
      {/* checkbox */}
      <button
        onClick={onClick}
        className={clsx(
          "border-2  flex items-center justify-center  p-1 cursor-pointer  h-6 w-6",
          {
            "bg-Green border-transparent": isChecked,
            "border-white hover:border-Green ": !isChecked
          }
        )}
      >
        {isChecked && <FaCheck className="text-xs text-zinc-700" />}
      </button>

      <p>{text}</p>
    </div>
  );
}

// return (
//   <>
//     <div
//       className={clsx("h-7 w-[10px] border border-white", {
//         "bg-red-500": type === "Too weak",
//         "bg-orange-700": type === "Weak",
//         "bg-orange-400": type === "Medium",
//         "bg-green-500": type === "Strong"
//       })}
//     />
//     <div
//       className={clsx("h-7 w-[10px] border border-white", {
//         "bg-red-500": type === "Too weak",
//         "bg-orange-700": type === "Weak",
//         "bg-orange-400": type === "Medium",
//         "bg-green-500": type === "Strong"
//       })}
//     />
//   </>
// );
