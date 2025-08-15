import Form from './form'

export default function Page() {
  return (
    <div className="container mx-auto h-screen flex flex-col p-4">
      <main className="container mx-auto flex-grow flex flex-col items-center mt-10 sm:mt-0 sm:justify-center">
        <h1 className="text-accent text-4xl sm:text-5xl">
          schort<span className="text-accent-light">.me</span>
        </h1>
        <p className="text-xl sm:text-2xl text-accent text-opacity-90 mb-5">just another URL shortener.</p>
        <Form />
      </main>
      <footer className="text-center text-accent">
        <a target="_blank" rel="noopener noreferrer" href="https://jonathanwieben.com" className="mr-5">
          Author
        </a>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/JonathanWbn/schort" className="mr-5">
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
