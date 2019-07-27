import Form from '../components/form'
import Title from '../components/title'

export default () => (
  <>
    <main>
      <Title />
      <Form />
    </main>
    <footer>
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
      }
    `}</style>
  </>
)
