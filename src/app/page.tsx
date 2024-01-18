"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [file, setFile] = useState<File>();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-5xl items-center justify-between font-mono text-sm lg:flex pt-2">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          DeDuplicates
        </p>
      </div>

      <div className="mt-10">
        <div>
          <textarea
            rows={10}
            cols={100}
            value={textAreaValue}
            className="border-solid border-2 border-gray-300 rounded-lg outline-none p-2"
            onChange={(e) => {
              e.preventDefault();
              setTextAreaValue(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="BottomArea mt-8">
          <div className="Buttons grid grid-cols-2 gap-4">
            <div className="LeftButtons col-start-0">
              <input
                className="hidden"
                type="file"
                id="file"
                onChange={(e) => {
                  if (e.target.files == null || e.target.files.length === 0)
                    return;

                  const fileObj = e.target.files[0];
                  setFile(fileObj);
                  if (fileObj == null) return;
                  const reader = new FileReader();
                  reader.readAsText(fileObj);
                  reader.onload = () => {
                    if (typeof reader.result !== "string") return;
                    setTextAreaValue(reader.result);
                  };
                }}
              />
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => {
                  const element = document.getElementById("file");
                  element?.click();
                }}
              >
                Upload File
              </button>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => {
                  const element = document.createElement("a");
                  const file = new Blob([textAreaValue], {
                    type: "text/plain",
                  });
                  element.href = URL.createObjectURL(file);
                  element.download = "duplicates.txt";
                  document.body.appendChild(element); // Required for this to work in FireFox
                  element.click();
                }}
              >
                Download File
              </button>
            </div>
            <div className="RightButtons col-end-12">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => {
                  const unique = [...new Set(textAreaValue.split("\n"))];
                  setTextAreaValue(unique.join("\n"));
                }}
              >
                Remove Duplicates
              </button>

              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => {
                  setTextAreaValue("");
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
