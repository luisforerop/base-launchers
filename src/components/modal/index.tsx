import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { CustomClasses, ModalContainer } from './modal-container'

export type ModalProps = {
  selector: string
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  customClases?: CustomClasses
}

export const Modal: FC<PropsWithChildren<ModalProps>> = (props) => {
  const { children, selector, isOpen, setIsOpen } = props
  const container = useRef<Element | null>(null)

  useEffect(() => {
    container.current = document.querySelector(selector)

    return () => setIsOpen(false)
  }, [selector])

  return isOpen && container.current
    ? createPortal(
        <ModalContainer {...props}>{children}</ModalContainer>,
        container.current
      )
    : null
}
