import React from 'react'
import ReactDOM from 'react-dom'

const Alert: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="block absolute top-9 z-30 w-full transition-all duration-500 ease-in-out translate-y-0">
      <div className="flex w-full">
        <div className="flex justify-between py-3 px-5 m-auto text-red-900 bg-red-400">
          <div className="text-2xl i-heroicons-information-circle-20-solid"></div>
          <div className="px-2">{children}</div>
        </div>
      </div>
    </div>
  )
}

const node = document.createElement('div')
export const showAlert = (message: string, options?: { timeout?: number }) => {
  document.body.appendChild(node)
  const AlertContent = () => {
    return <Alert>{message}</Alert>
  }

  const clear = () => {
    ReactDOM.unmountComponentAtNode(node)
    node.remove()
  }

  ReactDOM.render(<AlertContent />, node)
  setTimeout(() => clear(), options?.timeout ?? 3000)
}

export default Alert
