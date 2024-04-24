import React, { FC, useState } from 'react'
import { UpdateForm, UpdateFormProps } from './update-form'

interface ProfileDataProps extends UpdateFormProps {
  placeholder?: string
  description?: string
}

const ProfileDataContent: FC<ProfileDataProps> = ({
  placeholder,
  ...updatedProps
}) => {
  const [showForm, setShowForm] = useState(false)

  const handlerShowForm = () => setShowForm(true)

  if (showForm) {
    return <UpdateForm {...updatedProps} onClose={() => setShowForm(false)} />
  }

  if (!updatedProps.initialValue)
    return (
      <button
        className="w-full text-start hover:bg-gray-200 py-1 px-2 rounded"
        onClick={handlerShowForm}
      >
        {placeholder}
      </button>
    )

  return (
    <button
      className="w-full text-start hover:bg-gray-200 py-1 px-2 rounded"
      onClick={handlerShowForm}
    >
      {updatedProps.initialValue}
    </button>
  )
}

export const ProfileData: FC<ProfileDataProps> = ({
  description,
  ...props
}) => {
  return (
    <div className="flex flex-col">
      <ProfileDataContent {...props} />
      {description && (
        <span className="text-sm ml-2 text-gray-600">{description}</span>
      )}
    </div>
  )
}
