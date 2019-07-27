import { ToastContext } from '../pages'

const useAutoHideToast = ({ toast, setShowToast, setToast }) => {
  React.useEffect(() => {
    setShowToast(Boolean(toast))

    const timeoutIds = []
    if (toast) {
      const timeoutId = setTimeout(() => {
        setShowToast(false)
        const timeoutId = setTimeout(() => setToast(null), 300)
        timeoutIds.push(timeoutId)
      }, 1500)
      timeoutIds.push(timeoutId)
    }
    return () => timeoutIds.forEach(clearTimeout)
  }, [toast])
}

export default () => {
  const { toast, setToast } = React.useContext(ToastContext)
  const [showToast, setShowToast] = React.useState(false)

  useAutoHideToast({ toast, setToast, setShowToast })

  return (
    <>
      <div className={`toast ${!showToast ? 'hide' : ''}`}>{toast && toast.message}</div>
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
      `}</style>
    </>
  )
}
