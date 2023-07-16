import { client } from "./client";

export default async function Home() {
  const threadURL = "https://www.threads.net/t/CuqbBI8h19H";
  const postIDToQuote = await client.getPostIDfromURL(threadURL); // or use `getPostIDfromThreadID`
  return <div></div>;
}
