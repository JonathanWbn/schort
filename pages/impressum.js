import Head from 'next/head'

export default function Impressum() {
  return (
    <>
      <Head>
        <title>btfl.link | Impressum</title>
        <link href="https://fonts.googleapis.com/css?family=Quicksand:500" rel="stylesheet" />
      </Head>
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
          Telefon: <a href="tel:+4917655501946">+49 17655501946</a>
          <br />
          E-Mail: <a href="mailto:jwieben@hey.com">jwieben@hey.com</a>
          <br />
        </p>
      </main>
      <style jsx>
        {`
          :global(body) {
            background-color: white !important;
            font-family: Quicksand;
          }

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
