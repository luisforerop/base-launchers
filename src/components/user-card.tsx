import { User } from '@/models'
import React, { FC } from 'react'
import { SocialMedia } from './social-media'
import Link from 'next/link'

export const UserCard: FC<User> = ({ avatar_url, id, name, social_media }) => {
  return (
    <div className="flex gap-2" key={id}>
      <img className="h-[60px] w-[60px]" src={avatar_url} alt={name} />
      <div className="flex flex-col justify-center gap-1">
        <Link href={`/user/${id}`}>{name}</Link>
        <SocialMedia socialMedia={social_media} />
      </div>
    </div>
  )
}
