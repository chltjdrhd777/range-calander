import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "./redux/store";
import "../styles/globals.scss";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>케어닥</title>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
