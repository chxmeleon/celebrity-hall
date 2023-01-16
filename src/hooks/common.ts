import { useEffect, useState } from 'react'

export const useClickOutside = (
  clickRef: HTMLDivElement | null,
  isShow: boolean,
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!clickRef?.contains(e.target as Node | null)) {
        setIsShow(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [clickRef, isShow, setIsShow])
}
