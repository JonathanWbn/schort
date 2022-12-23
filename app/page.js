import React from 'react'

import Form from '../components/form'
import Title from '../components/title'

export default function Page() {
  return (
    <div className="container mx-auto h-screen flex flex-col p-4">
      <main className="container mx-auto flex-grow flex flex-col items-center mt-10 sm:mt-0 sm:justify-center">
        <Title />
        <Form />
      </main>
      <footer className="text-center text-accent">
        <a target="_blank" rel="noopener noreferrer" href="https://jonathanwieben.com" className="mr-5">
          Author
        </a>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/JonathanWbn/btfl.link" className="mr-5">
          GitHub
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://jwieben.notion.site/Impressum-7be1b0e1a1384c1cb9362bd1aef963d1"
        >
          Impressum
        </a>
      </footer>
    </div>
  )
}
