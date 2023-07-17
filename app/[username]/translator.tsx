import { Dispatch, SetStateAction } from "react";
import * as deepl from 'deepl-node';

export default function Translator({
  text,
  setText,
  isTranslated,
  setIsTranslated
}: {
  text: string
  setText: Dispatch<SetStateAction<string>>
  isTranslated: boolean
  setIsTranslated: Dispatch<SetStateAction<boolean>>
}) {

  async function translate(toTranslate: string) {
    const authKey = '';
    const translator = new deepl.Translator(authKey);
    if (!isTranslated) {
      setText((await translator.translateText(toTranslate, null, 'fr')).text);
      setIsTranslated(false);
    }
  }

  return <button onClick={() => translate(text)} ></button>
}
