import { SSRProvider, Provider, defaultTheme } from '@adobe/react-spectrum'
import App, { AppInitialProps, AppContext } from 'next/app'
import React from 'react'
import { Reset } from 'styled-reset'
import { wrapper } from '../src/store/store'

class WrappedApp extends App<AppInitialProps> {
  public static getInitialProps = async ({
    Component,
    ctx,
  }: AppContext): Promise<{
    pageProps: {
      appProp: string
    }
  }> => {
    return {
      pageProps: {
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
        appProp: ctx.pathname,
      },
    }
  }

  public render(): JSX.Element {
    const { Component, pageProps } = this.props

    return (
      <>
        <Reset />
        <SSRProvider>
          <Component {...pageProps} />
        </SSRProvider>
      </>
    )
  }
}

export default wrapper.withRedux(WrappedApp)
