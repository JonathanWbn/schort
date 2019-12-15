import Head from 'next/head'

import Form from '../components/form'
import Title from '../components/title'
import Toast from '../components/toast'

export const ToastContext = React.createContext()

export default function Page() {
  const [toast, setToast] = React.useState(null)

  return (
    <>
      <Head>
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="The last URL shortener you will ever need." />
        <meta name="keywords" content="btfl url shortener" />
        <meta name="author" content="Jonathan Wieben" />
        <title>btfl.link</title>
        <link href="https://fonts.googleapis.com/css?family=Quicksand:500" rel="stylesheet" />
      </Head>

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
      <style global jsx>{`
        html {
          font-family: 'Quicksand', sans-serif;
          font-size: 16px;
          word-spacing: 1px;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          box-sizing: border-box;
        }

        *,
        *:before,
        *:after {
          box-sizing: border-box;
          margin: 0;
          outline: none;
        }

        button,
        input {
          font-family: 'Quicksand', sans-serif;
        }

        body {
          background-color: var(--main-accent);
        }

        :root {
          --main-accent: #f26e03;
          --white: white;
          --light-white: rgba(255, 255, 255, 0.5);
          --background-light: rgba(255, 255, 255, 0.2);
          --background-white: rgba(255, 255, 255, 0.8);
          --success: #15bf7a;
          --error: #f9300a;
        }
      `}</style>
    </>
  )
}
