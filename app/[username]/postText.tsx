"use client";

import { useState } from "react";
import Translator from "./translator";

export default function PostText({ text: threadText }: { text: string }) {
  const [text, setText] = useState(threadText);
  const [isTranslated, setIsTranslated] = useState(false);

  return <>
    <p>{text}</p>
    <Translator text={text} setText={setText} isTranslated={isTranslated} setIsTranslated={setIsTranslated}/>
  </>
}
