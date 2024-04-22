import { PossibleSocialMedia, Socialmedia } from '@/models'
import React, { FC } from 'react'
import { SocialMediaIcon } from './social-media-icon'

const getSocialMediaUrl = (
  username: string,
  social_media: PossibleSocialMedia
) => {
  const urlBase: { [key in PossibleSocialMedia]: string } = {
    instagram: 'https://www.instagram.com/',
    x: 'https://twitter.com/',
    tiktok: 'https://www.tiktok.com/@',
    facebook: 'https://www.facebook.com/',
    youtube: 'https://www.youtube.com/@',
    twitch: 'https://www.twitch.tv/',
    threads: 'https://www.threads.net/@',
  }

  return `${urlBase[social_media]}${username}`
}

const SocialMediaTag: FC<Socialmedia> = ({ social_media, username }) => {
  return (
    <a
      href={getSocialMediaUrl(username, social_media)}
      className={`${social_media} flex gap-1 px-2 py-1`}
      target="_blank"
    >
      <SocialMediaIcon socialMedia={social_media} />
      <span>{username}</span>
    </a>
  )
}

type SocialMediaProps = {
  socialMedia: Socialmedia[]
}

export const SocialMedia: FC<SocialMediaProps> = ({ socialMedia }) => {
  return (
    <div className="flex flex-wrap max-w-[600px]">
      {socialMedia.map((platform) => (
        <SocialMediaTag {...platform} key={platform.id} />
      ))}
    </div>
  )
}
