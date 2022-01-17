import '../styles/globals.css'
import * as React from 'react'
import { Provider } from 'react-redux'
import App, { AppProps } from 'next/app'
import Store from '../store'

import IndexLayout from '../layout/IndexLayout'

import '../styles/style.sass'

class BaseApp extends App {

  render(): JSX.Element {
  
    const { Component, pageProps }: AppProps = this.props
    return (   
      <Provider store={Store()}>
        <IndexLayout>
        <div className="content" suppressHydrationWarning>
        {typeof window === 'undefined' ? null :<Component {...pageProps} />}
        </div>
        </IndexLayout>
      </Provider>
    )
  }
}

export default BaseApp
