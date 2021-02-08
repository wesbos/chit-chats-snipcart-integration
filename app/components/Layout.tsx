import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styled, { createGlobalStyle } from 'styled-components';
import { ReactQueryDevtools } from 'react-query/devtools';
import 'normalize.css';
import { useIsFetching } from 'react-query';
import nProgress from 'nprogress';
import { Scanner } from './Scanner';
import ProgressBar from './ProgressBar';

type Props = {
  children?: ReactNode;
  title?: string;
};

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
    .no-print {
      display: none;
    }

  }
`;

const LayoutStyles = styled.div`
  margin-top: 100px;
`;

export default function Layout({
  children,
  title = 'This is the default title',
}: Props) {
  const isFetching = useIsFetching();
  if (isFetching) {
    nProgress.start();
  } else {
    nProgress.done();
  }

  return (
    <LayoutStyles>
      <GlobalStyles />
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
          <p>Fetching: {isFetching}</p>
        </nav>
      </header>
      {children}
      <footer>
        <Scanner />
      </footer>
      <ReactQueryDevtools initialIsOpen={false} />
    </LayoutStyles>
  );
}
