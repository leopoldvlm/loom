import { notFound } from "next/navigation";
import { Suspense } from "react";
import { client } from "../client";
import { ProfilePictureLoading } from "./loading";
import ProfileHeader from "./profile";
import { Thread } from "./thread";

export default async function Page({ params }: any) {
  const uid = await client.getUserIDfromUsername(params.username);
  if (!uid) {
    notFound();
  }
  const user = await client.getUserProfile(uid);
  const posts = await client.getUserProfileThreads(uid);

  return (
    <div className="lg:w-4/6 xl:w-1/2 w-5/6 mx-auto mt-3">
      <header className="">
        <ProfileHeader user={user}/>
      </header>
      <main className=" mt-5">
        {posts.map((thread) => (
          <Suspense key={thread.id} fallback={<ProfilePictureLoading />}>
            <Thread thread={thread.thread_items.at(0)?.post!} key={thread.id} quoted={false} />
          </Suspense>
        ))}
      </main>
    </div>
  );
}
