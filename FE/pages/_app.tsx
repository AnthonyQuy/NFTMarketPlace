// import App from "next/app";
import type { AppProps /*, AppContext */ } from "next/app";
import Layout from "../components/Layout";
import { nftMarketAddress } from "../config";
import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout title="NFT MarketPlace" marketAddress={nftMarketAddress}>
      <Component {...pageProps} />
    </Layout>
  );
}


export default MyApp;
