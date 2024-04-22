import { PossibleSocialMedia, PossibleSocialMediaType } from '@/models'
import { FC } from 'react'
import { Facebook } from './facebook'
import { Instagram } from './instagram'
import { Tiktok } from './tiktok'
import { Twitch } from './twitch'
import { X } from './x'
import { Youtube } from './youtube'
import { SocialNetwork } from './socialNetwork'
import { Threads } from './threads'

const icons: PossibleSocialMediaType<FC> = {
  facebook: Facebook,
  instagram: Instagram,
  tiktok: Tiktok,
  twitch: Twitch,
  x: X,
  youtube: Youtube,
  threads: Threads,
}

export const SocialMediaIcon = ({
  socialMedia,
}: {
  socialMedia: PossibleSocialMedia
}) => {
  const Icon = icons[socialMedia] ?? SocialNetwork
  return <Icon />
}
