export default function Impressum() {
  return (
    <>
      <main>
        <h1>Impressum</h1>
        <p>
          Jonathan Wieben
          <br />
          Alfredstr. 61
          <br />
          20535 Hamburg
        </p>
        <p>
          Telefon: +49 17655501946
          <br />
          E-Mail: <a href="mailto:joni.wieben@icloud.com">joni.wieben@icloud.com</a>
          <br />
        </p>
      </main>
      <style jsx>
        {`
          main {
            max-width: 800px;
            margin: 0px auto;
            padding: 40px 20px;
            height: 100vh;
          }

          h1 {
            font-size: 32px;
          }

          p {
            margin-top: 20px;
            font-size: 14px;
            line-height: 24px;
          }

          a {
            color: black;
            text-decoration: none;
            transition: all 0.2s ease 0s;
          }

          a:hover {
            text-decoration: underline;
          }
        `}
      </style>
    </>
  )
}
