import classnames from 'classnames'
import React from 'react'

import { ToastContext } from '../pages'

const useToast = () => {
  const { toast, setToast } = React.useContext(ToastContext)
  const [showToast, setShowToast] = React.useState(false)

  React.useEffect(() => {
    setShowToast(Boolean(toast))

    let timeoutId
    if (toast && toast.disappear) timeoutId = setTimeout(() => setShowToast(false), toast.disappear)
    return () => clearTimeout(timeoutId)
  }, [toast])

  React.useEffect(() => {
    let timeoutId
    if (!showToast) {
      timeoutId = setTimeout(() => setToast(null), 300)
    }
    return () => clearTimeout(timeoutId)
  }, [showToast, setToast])

  return [toast, showToast]
}

export default function Toast() {
  const [toast, showToast] = useToast()

  return (
    <div
      className={classnames(
        'absolute top-7 right-7 bg-white text-white px-4 py-3 transition-top duration-300',
        !showToast && '-top-12',
        toast?.type === 'error' && 'bg-red-500',
        toast?.type === 'success' && 'bg-green-500',
        toast?.type === 'info' && 'bg-gray-500',
        toast?.onClick && 'cursor-pointer'
      )}
      onClick={toast?.onClick}
    >
      {toast?.message}
    </div>
  )
}
