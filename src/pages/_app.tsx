import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/store";
import { Inter } from "next/font/google";
import { Layout } from "@/components";
import "../styles/global.scss";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout classes={inter.className}>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
