import { PossibleSocialMedia } from '@/models'

export const getSocialMediaUrl = (
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
