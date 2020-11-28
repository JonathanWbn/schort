import Head from 'next/head'
import React from 'react'

import Form from '../components/form'
import Title from '../components/title'
import Toast from '../components/toast'

export const ToastContext = React.createContext()

export default function Page() {
  const [toast, setToast] = React.useState(null)

  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      <Head>
        <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="The last URL shortener you will ever need." />
        <meta name="keywords" content="btfl url shortener" />
        <meta name="author" content="Jonathan Wieben" />
        <title>btfl.link</title>
        <link href="https://fonts.googleapis.com/css?family=Quicksand:500" rel="stylesheet" />
      </Head>

      <div className="container mx-auto h-screen flex flex-col">
        <Toast />
        <main className="container mx-auto flex-grow flex flex-col items-center justify-center">
          <Title />
          <Form />
        </main>
        <footer className="text-center text-white p-5">
          <a target="_blank" rel="noopener noreferrer" href="https://jonathanwieben.com" className="mr-5">
            Author
          </a>
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/JonathanWbn/btfl.link">
            GitHub
          </a>
        </footer>
      </div>
    </ToastContext.Provider>
  )
}
