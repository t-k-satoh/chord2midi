import Document from 'next/document'
import NextDocument, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import React from 'react'
import { ServerStyleSheet } from 'styled-components'
import { version } from '../../../package.json'

export class MyDocument extends NextDocument {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<{
    styles: JSX.Element
    html: string
    head?: JSX.Element[]
  }> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render(): JSX.Element {
    return (
      <Html className={'spectrum'}>
        <Head>
          <title>Chord to MIDI v.{version}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
