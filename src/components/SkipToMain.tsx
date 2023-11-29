"use client";

import { ReactElement, useEffect } from "react";

export default function SkipToMain(): ReactElement {
  useEffect(() => {
    // Add "main" id to main element if it exists
    const main = document.querySelector("main");
    if (main) {
      main.id = "main";
    }
  }, []);

  return (
    <a
      href="#main"
      className="absolute -top-96 left-0 z-50 flex w-min whitespace-nowrap bg-black p-2 text-white focus:top-0"
    >
      Skip to main
    </a>
  );
}
