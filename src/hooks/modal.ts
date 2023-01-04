import { useState } from 'react'

export const useModal = () => {
  const [isShow, setIsShow] = useState(false)
  const onOpenModal = () => setIsShow(true)
  const onCloseModal = () => setIsShow(false)
  return { isShow, onOpenModal, onCloseModal }
}
