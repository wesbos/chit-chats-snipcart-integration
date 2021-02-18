import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styled, { createGlobalStyle } from 'styled-components';
import 'normalize.css';
import { useIsFetching } from 'react-query';
import nProgress from 'nprogress';
import { useSession } from 'next-auth/client';
import { Scanner } from './Scanner';

type Props = {
  children?: ReactNode;
  title?: string;
};

const GlobalStyles = createGlobalStyle`
  :root {
    --black: black;
    --yellow: #ffc600;
    --light: #ffffff;
    --dark: #000000;
    --lightGrey: #d8d8d8;
    --backgroundGrey: #f7f7f7;
    --lightGray: var(--lightGrey);
    --imGoingToFaint: #fbfbfb;
    --maxWidth: 1200px;
  }

  html {
    box-sizing: border-box;
    font-family: 'Operator Mono', --apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
  }
  a {
    text-decoration-color: var(--yellow);
    color: var(--black);
  }
  button {
    background: var(--yellow);
    border: 0;
    padding: 5px;
    border-radius: 2px;
  }
  *,
  &::before,
  *::after {
    box-sizing: inherit;
  }

  @media print {
    header,
    footer {
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
  // Base Table styles
  table {
    width: 100%;
    border: 1px solid black;
    font-family: sans-serif;
    img {
      float: left;
      border-radius: 50%;
      margin-right: 10px;
    }
    td {
      padding: 2px;
      vertical-align: middle;
      max-width: 150px;
      overflow: scroll;
      text-overflow: ellipsis;
    }
  }
  tr:nth-child(even) {
    background: var(--backgroundGrey);
  }

  // nprogress
  #nprogress {
    @media print {
      display: none;
    }
    .bar {
      height: 4px;
      background: var(--yellow);
    }
    .peg {
      box-shadow: 0 0 10px var(--yellow), 0 0 5px var(--yellow);
    }
    .spinner-icon {
      border-top-color: var(--yellow);
      border-left-color: var(--yellow);
    }
  }
`;

const LayoutStyles = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr auto;
  max-width: 1000px;
  margin: 0 auto;
  border: 5px solid var(--black);
  padding: 2rem;
  @media print {
    border: 0;
    min-height: none;
    padding: 0;
  }
`;

const Logo = styled.h1`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: start;
  gap: 2rem;
`;

const Nav = styled.nav`
  display: grid;
  grid-template-columns: auto auto auto 1fr;
  gap: 1rem;
  align-items: center;
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
  const [session, loading] = useSession();
  if (loading) return <p>Loading..</p>;
  // dont worry we also lock down the data in the API endpoints, this is just visual.
  if (!session)
    return (
      <div>
        <h2>{process.env.NODE_ENV}</h2>
        <Link href="/auth">
          <a>Login</a>
        </Link>
      </div>
    );
  return (
    <LayoutStyles>
      <GlobalStyles />
      <Head>
        <title>
          {isFetching} {title}
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Logo>
          <img
            width="100"
            src="https://wesbos.com/static/46c8f12c015f9bdd7cccd17d294da646/497c6/logo.png"
            alt=""
          />
          Swag Shop.
        </Logo>
        <Nav>
          <Link href="/">Orders</Link>
          <Link href="/orders">Labels</Link>
          <Link href="/batches">Batches</Link>
          <Scanner />
        </Nav>
      </header>
      <div>{children}</div>
      <footer />
    </LayoutStyles>
  );
}
