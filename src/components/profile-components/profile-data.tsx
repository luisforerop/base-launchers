import React, { FC, useState } from 'react'
import { UpdateForm, UpdateFormProps } from './update-form'

interface ProfileDataProps extends UpdateFormProps {
  placeholder?: string
}

export const ProfileData: FC<ProfileDataProps> = ({
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
