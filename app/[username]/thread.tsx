import Image from "next/image";
import { Post, RepostedPost } from "threads-api";
import { client } from "../client";

const getRepost = (thread: Post) =>
  thread.text_post_app_info.share_info.reposted_post;

const hasQuoted = (thread: Post) =>
  !!thread.text_post_app_info.share_info.quoted_post;

export async function Thread({ thread }: { thread: Post | RepostedPost }) {
  let isRepost = false;
  const repost = getRepost(thread as Post);
  if (repost) {
    thread = repost;
    isRepost = true;
  }

  const post = await client.getThreads(thread.pk);
  

  return <section className={`${isRepost && "before:content-['↻🧵']"} py-5 border-y-lines border-y`}>
    <header className="flex flex-row">
      <Image src={thread.user.profile_pic_url} height={20} width={20} alt="user" className="mr-5 rounded-full"/>
      {thread.user.username}
    </header>
    {thread.caption?.text}
    {/* action section : like / reply / repost / share */}
    <footer className="flex flex-row text-greyText">
      <p className="after:content-['·'] after:mx-2">{post.reply_threads?.length} repl{post.reply_threads?.length ? 'ies' : 'y'}</p><p>{thread.like_count} like{thread.like_count ? 's' : ''}</p>
    </footer>
  </section>
}
