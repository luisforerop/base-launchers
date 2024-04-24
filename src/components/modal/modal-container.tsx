import React, { FC, PropsWithChildren, useEffect } from 'react'
import { ModalProps } from '.'
import styles from './Modal.module.css'
import { useGetClasses } from '@/hooks'
export type CustomClasses = {
  modalContainer?: string
  modalSubContainer?: string
  modalCloseButton?: string
}

export const ModalContainer: FC<PropsWithChildren<ModalProps>> = ({
  children,
  setIsOpen,
  selector,
  customClases,
}) => {
  const { modalContainer, modalSubContainer, modalCloseButton } = useGetClasses(
    styles,
    customClases
  )

  const escapeListener = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false)
  }

  useEffect(() => {
    document.addEventListener('keydown', escapeListener)

    return () => {
      document.removeEventListener('keydown', escapeListener)
    }
  }, [])

  return (
    <div
      id={`modal-container-${selector}`}
      onClick={(e) => {
        const { id } = e.target as HTMLDivElement
        if (id === `modal-container-${selector}`) {
          setIsOpen(false)
        }
      }}
      className={modalContainer}
    >
      <div className={modalSubContainer}>
        <div className={modalCloseButton}>
          <button onClick={() => setIsOpen(false)}>x</button>
        </div>
        {children}
      </div>
    </div>
  )
}
