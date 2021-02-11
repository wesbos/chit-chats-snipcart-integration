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

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <Provider
      // Provider options are not required but can be useful in situations where
      // you have a short session maxAge time. Shown here with default values.
      options={{
        // Client Max Age controls how often the useSession in the client should
        // contact the server to sync the session state. Value in seconds.
        // e.g.
        // * 0  - Disabled (always use cache value)
        // * 60 - Sync session state with server if it's older than 60 seconds
        clientMaxAge: 0,
        // Keep Alive tells windows / tabs that are signed in to keep sending
        // a keep alive request (which extends the current session expiry) to
        // prevent sessions in open windows from expiring. Value in seconds.
        //
        // Note: If a session has expired when keep alive is triggered, all open
        // windows / tabs will be updated to reflect the user is signed out.
        keepAlive: 0,
      }}
      session={pageProps.session}
    >
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
