import Image from "next/image";
import { ThreadsUser } from "threads-api";

type HeaderProps = {
  user: ThreadsUser;
};

export default function ProfileHeader({ user }: HeaderProps) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  return (
    <header className="flex flex-row h-fit">
      <Image width={150} height={150} src={user.profile_pic_url} alt={`${user.username} profile picture`} className={`rounded-full mr-5 aspect-square h-20 w-20 my-auto`} />
      <div className="flex-grow">
        <div className="flex flex-row">
          <h1 className=" text-4xl">{user.full_name}</h1>
          {user.is_verified && <Image width={16} height={16} src={"/verified.svg"} alt="Verified checkmark" className="ml-1" />}
        </div>
        <h2 className=" text-sm">{user.username}</h2>
        <p>{user.biography}</p>
        <p className="text-greyText">
          {formatter.format(user.follower_count)} follower
          {user.follower_count ? "s" : ""}
        </p>
        {/* {user.bio_links.map(link => <p key={crypto.randomUUID()}>{link.url}</p>)} */}
      </div>
    </header>

  );
}