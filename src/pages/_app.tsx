import { AppProps } from 'next/app';
import { Global } from '@emotion/react';
import 'focus-visible';
import { QueryClientProvider, QueryClient } from 'react-query';
import { globalStyle } from '@/styles/globals';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Global styles={globalStyle} />
      <Component {...pageProps} />;
    </QueryClientProvider>
  );
}

export default MyApp;
