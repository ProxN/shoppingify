/* eslint-disable */
import 'normalize.css';
import { AppProps, AppContext } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { ReactQueryCacheProvider, QueryCache } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { Hydrate } from 'react-query/hydration';
import { AuthProvider, ProtectRoute } from '../context/authProvider';
import { Theme, GlobalStyles } from '../styles';

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <ThemeProvider theme={Theme}>
        <ReactQueryCacheProvider queryCache={queryCache}>
          <GlobalStyles />
          <ProtectRoute>
            <Component {...pageProps} />
          </ProtectRoute>
          <ReactQueryDevtools />
        </ReactQueryCacheProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
