import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import 'nprogress/nprogress.css';
import { Router } from 'next/dist/client/router';
import nProgress from 'nprogress';
import { Provider } from 'next-auth/client';
import { ReactQueryDevtools } from 'react-query/devtools';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeComplete', nProgress.done);
Router.events.on('routeChangeError', nProgress.done);

// important: create the query client outside the _app component

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
