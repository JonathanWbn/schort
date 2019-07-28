import classnames from 'classnames'

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
    <>
      <div
        className={classnames('toast', !showToast && 'hide', toast && toast.onClick && 'is-clickable')}
        onClick={toast && toast.onClick}
      >
        {toast && toast.message}
      </div>
      <style jsx>{`
        .toast {
          position: absolute;
          top: 25px;
          right: 25px;
          background-color: var(--white);
          padding: 15px 20px;
          font-size: 15px;
          color: var(--main-accent);
          font-weight: 500;
          transition: top 0.3s ease;
        }

        .toast.hide {
          top: -50px;
        }

        .toast.is-clickable {
          cursor: pointer;
        }
      `}</style>
    </>
  )
}
