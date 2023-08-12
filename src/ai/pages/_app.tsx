import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProps } from 'next/app';
import '#/styles/reset.scss';
import '#/styles/tailwind.css';
import '#/styles/colors.scss';
import '#/styles/layout.scss';
import '#/styles/classes.scss';
import '#/styles/global.scss';
import '#/styles/responsive.scss';
import '@fontsource/public-sans';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <div className={inter.className}>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </div>
  );
}
