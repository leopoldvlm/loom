import { client } from "../client";
import { notFound } from "next/navigation";
import { Thread } from "./thread";
import { Suspense } from "react";
import Loading from "./threadloading";

export default async function Page({ params }: any) {
  const uid = await client.getUserIDfromUsername(params.username);
  if (!uid) {
    notFound();
  }
  const user = await client.getUserProfile(uid);
  const posts = await client.getUserProfileThreads(uid);

  return (
    <>
      <h1>{user.username}</h1>
      <main className=" w-5/6 mx-auto mt-5">
        {posts.map((thread) => (
          <Suspense fallback={<Loading />}>
            <Thread thread={thread.thread_items.at(0)?.post!} key={thread.id} />
          </Suspense>
        ))}
      </main>
    </>
  );
}
