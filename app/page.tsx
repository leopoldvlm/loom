import { client } from './client';

export default async function Home() {
  const threadsAPI = client;
  const username = "leovlmm";
  const userId = await threadsAPI.getUserIDfromUsername(username);
  const posts = await threadsAPI.getUserProfileThreads(userId!);
  console.log(posts);

  return <></>
}
