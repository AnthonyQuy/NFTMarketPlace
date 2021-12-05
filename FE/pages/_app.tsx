// import App from "next/app";
import type { AppProps /*, AppContext */ } from "next/app";
import Layout from "../components/Layout";
import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout title="NFT MarketPlace">
      <Component {...pageProps} />
    </Layout>
  );
}


export default MyApp;
