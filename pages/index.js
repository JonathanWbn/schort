import Form from '../components/form'
import Title from '../components/title'
import Toast from '../components/toast'

export const ToastContext = React.createContext()

export default function Page() {
  const [toast, setToast] = React.useState(null)

  return (
    <>
      <ToastContext.Provider value={{ toast, setToast }}>
        <Toast />
        <main>
          <Title />
          <Form />
        </main>
      </ToastContext.Provider>
      <footer>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/JonathanWbn/btfl.link">
          GitHub
        </a>
        <a href="/impressum">Impressum</a>
      </footer>
      <style jsx>{`
        main {
          height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        footer {
          height: 10vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        footer a {
          color: white;
          margin: 0px 10px;
          text-decoration: none;
        }

        footer a:focus {
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}
