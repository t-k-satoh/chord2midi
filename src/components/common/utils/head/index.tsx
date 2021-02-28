import { GoogleFonts } from "next-google-fonts";
import { NextSeo } from 'next-seo'
import NextHead from 'next/head'
import * as React from 'react'

export type Props = {
  title: string
}

export const Head: React.FC<Props> = React.memo(function Component({ children, title }) {
  // const ogImage = 'https://dzworks.s3-ap-northeast-1.amazonaws.com/og.png'
  const ogImage = ''

  return (
    <React.Fragment>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" />
      <NextHead>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>

        {children}
      </NextHead>
      <NextSeo
        title={title}
        description="An application that plays and generates MIDI files from code"
        canonical="https://chord2midi.vercel.app"
        openGraph={{
          url: 'https://chord2midi.vercel.app',
          title: title,
          description: 'An application that plays and generates MIDI files from code',
          images: [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
          site_name: title,
        }}
      />
    </React.Fragment>
  )
})
