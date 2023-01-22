import React from 'react'

export const FormItem: React.FC<
  React.PropsWithChildren<{ errorMessage?: string }>
> = ({ errorMessage, children }) => {
  return (
    <div className="relative w-full mb-6">
      <div>{children}</div>
      {errorMessage && <div className='mt-1 ml-1 text-red-700 text-sm'>{errorMessage}</div>}
    </div>
  )
}
