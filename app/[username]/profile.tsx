import { ThreadsUser } from "threads-api";

type HeaderProps = {
  user: ThreadsUser
}

export default function ProfileHeader({user}: HeaderProps) {
  const formatter = Intl.NumberFormat('en', {notation: 'compact'})

  return <>
    <h1 className=" text-4xl">{user.full_name}</h1>
    <h2 className=" text-sm">{user.username}</h2>
    <p>{user.biography}</p>
    <p>{formatter.format(user.follower_count)} follower{user.follower_count ? 's' : ''}</p>
    {/* {user.bio_links.map(link => <p key={crypto.randomUUID()}>{link.url}</p>)} */}

  </>;
}
