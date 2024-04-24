import { Socialmedia } from '@/models'
import { getSocialMediaUrl } from '@/utils/common'
import { FC } from 'react'
import { SocialMediaIcon } from './social-media-icon'

interface SocialMediaTagProps extends Socialmedia {
  withName?: boolean
}

export const SocialMediaTag: FC<SocialMediaTagProps> = ({
  social_media,
  username,
  withName,
}) => {
  return (
    <a
      href={getSocialMediaUrl(username, social_media)}
      className={`${social_media} flex gap-2`}
      target="_blank"
    >
      <SocialMediaIcon socialMedia={social_media} />
      {withName && <span>{username}</span>}
    </a>
  )
}

type SocialMediaProps = {
  socialMedia: Socialmedia[]
}

export const SocialMedia: FC<SocialMediaProps> = ({ socialMedia }) => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {socialMedia.map((platform) => (
        <SocialMediaTag {...platform} key={platform.id} />
      ))}
    </div>
  )
}
