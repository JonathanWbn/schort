import App, { Container } from 'next/app'
import Head from 'next/head'
import React from 'react'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Head>
          <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="description" content="The last URL shortener you will ever need." />
          <meta name="keywords" content="btfl url shortener" />
          <meta name="author" content="Jonathan Wieben" />
          <title>btfl.link</title>
          <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500" rel="stylesheet" />
        </Head>
        <Component {...pageProps} />
        <style global jsx>{`
          html {
            font-family: 'Montserrat', sans-serif;
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
      </Container>
    )
  }
}

export default MyApp
