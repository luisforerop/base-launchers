import { Socialmedia } from '@/models'
import { getSocialMediaUrl } from '@/utils/common'
import { FC } from 'react'
import { SocialMediaIcon } from './social-media-icon'

export const SocialMediaTag: FC<Socialmedia> = ({ social_media, username }) => {
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
    <div className="flex flex-wrap">
      {socialMedia.map((platform) => (
        <SocialMediaTag {...platform} key={platform.id} />
      ))}
    </div>
  )
}
