import { User } from '@/models'
import React, { FC } from 'react'
import { SocialMedia } from './social-media'
import Link from 'next/link'

export const UserCard: FC<User> = ({
  avatar_url,
  id,
  name,
  social_media,
  username,
  description,
}) => {
  return (
    <section className="w-full flex flex-col gap-2">
      <div className="flex gap-2" key={id}>
        <img className="h-[80px] w-[80px]" src={avatar_url} alt={name} />
        <div className="flex flex-col justify-start gap-1">
          <Link className="text-lg" href={`/user/${id}`}>
            {username ?? name}
          </Link>
          {username && <span className="text-sm text-gray-700">{name}</span>}
          <SocialMedia socialMedia={social_media} />
        </div>
      </div>
      {description && <p>{description}</p>}
    </section>
  )
}
