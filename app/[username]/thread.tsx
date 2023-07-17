import Image from "next/image";
import { Post, QuotedPost, RepostedPost } from "threads-api";
import { client } from "../client";
import { Suspense } from "react";
import { ThreadLoading } from "./loading";
import Link from "next/link";
import moment from "moment";
import PostText from "./postText";

const getRepost = (thread: Post) =>
  thread.text_post_app_info.share_info.reposted_post;

const getQuoted = (thread: Post) =>
  thread.text_post_app_info.share_info.quoted_post;

type ThreadType = Post | RepostedPost | QuotedPost;

export async function Thread({
  thread,
  quoted,
}: {
  thread: ThreadType;
  quoted: boolean;
}) {
  let isRepost = false;
  let quotedPost: QuotedPost | undefined;
  if (!quoted) {
    const repost = getRepost(thread as Post);
    quotedPost = getQuoted(thread as Post);
    if (repost) {
      thread = repost;
      isRepost = true;
    }
  }

  const post = await client.getThreads(thread.pk);

  return (
    <section
      className={`${
        isRepost && `before:content-['↻🧵']`
      } py-5 border-lines border-y ${quoted && "border-x rounded-lg px-5"}`}
    >
      <header className="flex flex-row w-full justify-between">
        <div className="flex flex-row">
          <Suspense fallback={<ThreadLoading />}>
            <Image
              src={thread.user.profile_pic_url}
              height={30}
              width={30}
              alt="user"
              className="mr-3 rounded-full"
            />
          </Suspense>
          <Link
            href={`/${thread.user.username}`}
            className="my-auto hover:underline"
          >
            {thread.user.username}
          </Link>
        </div>
        <p className="my-auto text-greyText">
          {moment(thread.taken_at, "X").fromNow()}
        </p>
      </header>

      {/* <PostText text={thread.caption?.text || ''}/> */}

      <p className="my-3">{thread.caption?.text}</p>

      {quotedPost && (
        <Link href={`/${quotedPost.pk}`} className=" w-11/12">
          {" "}
          <Thread thread={quotedPost} quoted={true} />
        </Link>
      )}

      {/* action section : like / reply / repost / share */}
      <footer className="flex flex-row text-greyText mt-2">
        <p className="after:content-['·'] after:mx-2">
          {post.reply_threads?.length} repl
          {post.reply_threads?.length ? "ies" : "y"}
        </p>
        <p>
          {thread.like_count} like{thread.like_count ? "s" : ""}
        </p>
      </footer>
    </section>
  );
}