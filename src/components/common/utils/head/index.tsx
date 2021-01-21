import GoogleFonts from 'next-google-fonts'
import NextHead from 'next/head'
import * as React from 'react'

export type Props = {
  title: string
}

export const Head: React.FC<Props> = React.memo(function Component({ children, title }) {
  return (
    <React.Fragment>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" />
      <NextHead>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />

        <title>{title}</title>

        {children}
      </NextHead>
    </React.Fragment>
  )
})
