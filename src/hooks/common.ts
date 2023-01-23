import { useEffect, useRef, useState } from 'react'

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

export const useAnimationFrame = (cb: any, deps: any) => {
  const frame = useRef<number>(0);
  const last = useRef(performance.now());
  const init = useRef(performance.now());

  const animate = () => {
    const now = performance.now();
    const time = (now - init.current) / 1000;
    const delta = (now - last.current) / 1000;
    // In seconds ~> you can do ms or anything in userland
    cb({ time, delta });
    last.current = now;
    frame.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    frame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame?.current);
  }, [deps, animate]);
}
