import Translation from "@/components/Features/Translation";
import Header from "@/components/Navbar/Header";
import "@/styles/globals.css";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-poppins)',
  },
  palette: {
    primary: {
      main: '#E6AB09',
    },
    secondary: {
      main: '#FFD86C',
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppCacheProvider>
      <ThemeProvider theme={theme}>
        <main className={poppins.variable}>
          <section className="sticky top-0 z-50">
            <Translation />
            <Header />
          </section>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </AppCacheProvider>
  );
}
