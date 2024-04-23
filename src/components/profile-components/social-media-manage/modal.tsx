import { Modal } from '@/components/modal'
import { SocialMediaIcon } from '@/components/social-media-icon'
import { socialMediaClients } from '@/constants'
import { PossibleSocialMedia, Socialmedia } from '@/models'
import { useUserProvider } from '@/providers/user-provider'
import { IconDeviceFloppy, IconEdit, IconX } from '@tabler/icons-react'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import styles from './SocialMedia.module.css'
import { getSocialMediaUrl } from '@/utils/common'

interface UpdateSocialMediaUnitProps extends Partial<Socialmedia> {
  action: 'update' | 'create'
  onClose: () => void
}

const UpdateSocialMediaUnit: FC<UpdateSocialMediaUnitProps> = ({
  social_media,
  username: usernameFromProps = '',
  onClose,
  action,
  id,
}) => {
  const { createSocialMedia, updateSocialMedia } = useUserProvider()
  const [username, setUsername] = useState(usernameFromProps)
  const [selectedSocialMedia, setSelectedSocialMedia] =
    useState<PossibleSocialMedia>(social_media ?? 'instagram')

  const handlerOnSave = async () => {
    if (action === 'create') {
      if (!selectedSocialMedia || !username) return onClose()

      await createSocialMedia({ social_media: selectedSocialMedia, username })
      onClose()
    }

    if (action === 'update') {
      if (!id) return onClose()

      await updateSocialMedia(
        { social_media: selectedSocialMedia, username },
        id
      )
      console.log('termine')

      onClose()
    }
  }

  return (
    <div className="flex justify-between items-center gap-3">
      <div className="flex gap-2 w-full">
        <select
          onChange={(e) =>
            setSelectedSocialMedia(e.target.value as PossibleSocialMedia)
          }
        >
          {socialMediaClients.map((socialMedia) => (
            <option
              value={socialMedia}
              selected={socialMedia === selectedSocialMedia}
            >
              {socialMedia}
            </option>
          ))}
        </select>
        <label className="flex items-center">
          {getSocialMediaUrl('', selectedSocialMedia).replace(
            'https://www.',
            ''
          )}
          <input
            className="p-2 pl-[1px] w-full"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={`Nombre de usuario en ${selectedSocialMedia}`}
          />
        </label>
      </div>
      <div className="flex gap-2">
        <button onClick={onClose}>
          <IconX />
        </button>
        <button onClick={handlerOnSave}>
          <IconDeviceFloppy />
        </button>
      </div>
    </div>
  )
}

interface SocialMediaUnitProps extends Socialmedia {
  action: 'update' | 'create'
}

const SocialMediaUnit: FC<SocialMediaUnitProps> = (props) => {
  const { social_media, username } = props
  const [update, setUpdate] = useState(false)

  if (update) {
    return <UpdateSocialMediaUnit onClose={() => setUpdate(false)} {...props} />
  }

  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <SocialMediaIcon socialMedia={social_media} />
        <span>
          {getSocialMediaUrl(username, social_media).replace(
            'https://www.',
            ''
          )}
        </span>
      </div>
      <button onClick={() => setUpdate(true)}>
        <IconEdit />
      </button>
    </div>
  )
}

type SocialMediaModalProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const SocialMediaModal: FC<SocialMediaModalProps> = ({
  open,
  setOpen,
}) => {
  const {
    user: { social_media },
  } = useUserProvider()
  const [create, setCreate] = useState(false)

  return (
    <Modal
      isOpen={open}
      selector="#edit-social-media"
      setIsOpen={setOpen}
      customClases={{ modalSubContainer: styles.modalSubContainer }}
    >
      <h2 className="text-xl w-full mb-4">Edita tus redes sociales</h2>
      <div className="flex flex-col gap-2">
        {social_media.map((socialMediaUnit) => (
          <SocialMediaUnit
            key={socialMediaUnit.id}
            {...socialMediaUnit}
            action="update"
          />
        ))}
        {create ? (
          <UpdateSocialMediaUnit
            action="create"
            onClose={() => setCreate(false)}
          />
        ) : (
          <button
            className="p-2 border-gray-200 border-2 rounded-md"
            onClick={() => setCreate(true)}
          >
            Agrega una red social
          </button>
        )}
      </div>
    </Modal>
  )
}
