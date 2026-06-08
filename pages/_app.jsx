import Head from 'next/head';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>ICONIC HUB LMS</title>
        <link rel="icon" type="image/png" href="/iconic_logo.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
