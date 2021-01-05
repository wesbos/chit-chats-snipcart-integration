import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'
import { ReactQueryDevtools } from 'react-query/devtools'
import 'normalize.css';
type Props = {
  children?: ReactNode
  title?: string
}

const GlobalStyles = createGlobalStyle`
  :root {
    --black: black;
  }

  html {
    box-sizing: border-box;
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  *, &::before, *::after {
    box-sizing: inherit;
  }



  @media print {
    header, footer {
      display: none;
    }
    @page {
      size: 4in 6in;
      margin: 0;
    }

  }
`;
const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <GlobalStyles/>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/orders">Orders</Link>
        <Link href="/batches">Batches</Link>
      </nav>
    </header>
    {children}
    <footer>
      {/* ? */}
    </footer>
    <ReactQueryDevtools initialIsOpen={false} />
  </div>
)

export default Layout
