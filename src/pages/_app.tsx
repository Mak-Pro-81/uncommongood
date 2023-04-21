import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Layout } from "@/components";
import "../styles/global.scss";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout classes={inter.className}>
      <Component {...pageProps} />
    </Layout>
  );
}
