'use client'

import React, { FC, createElement, useEffect, useRef, useState } from 'react'
import { useUserProvider } from '@/providers/user-provider'
import { IconCheck, IconX } from '@tabler/icons-react'

export type UpdateFormProps = {
  property: string
  initialValue: string
  onClose?: () => void
  container?: 'textarea' | 'input'
}

export const UpdateForm: FC<UpdateFormProps> = ({
  property,
  onClose,
  initialValue,
  container = 'input',
}) => {
  const { updateUserData } = useUserProvider()
  const [text, setText] = useState(initialValue)
  const input = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  const handlerOnSave = async () => {
    if (!text) onClose?.()

    if (text === initialValue) return

    await updateUserData(property, text)
    onClose?.()
  }

  useEffect(() => {
    input.current?.focus()
  }, [])

  return (
    <div className="w-full relative">
      {createElement(container, {
        value: text,
        onChange: (e: any) => setText(e.target.value),
        className: 'w-full py-1 px-2 rounded',
        ref: input,
        // onBlur: () => onClose?.(),
      })}
      <div className="flex gap-2 absolute right-[0] mt-1">
        <button
          className="bg-gray-200 rounded p-2"
          disabled={!text}
          onClick={handlerOnSave}
        >
          <IconCheck />
        </button>
        <button onClick={onClose} className="bg-gray-200 rounded p-2">
          <IconX />
        </button>
      </div>
    </div>
  )
}
