import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
  marketAddress?: string;
};

const Layout = ({
  children,
  title = "This is the default title",
  marketAddress = "",
  
}: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <header>
      <nav className="border-b p-6">
        <div className="flex justify-between">
          <p className="text-4xl font-bold"> NFT Marketplace </p>
          {!!marketAddress && (
            <p className="text-right text-gray-400 text-xs">Market Address: {marketAddress}</p>
          )}
        </div>
        <div className="flex mt-4">
          <Link href="/">
            <a className="mr-6 text-blue-500">Home</a>
          </Link>
          <Link href="/my-listing-nft">
            <a className="mr-6 text-blue-500">My Listing NFT</a>
          </Link>
          <Link href="/sell-nft">
            <a className="mr-6 text-blue-500">Sell NFT</a>
          </Link>
          <Link href="/my-nft">
            <a className="mr-6 text-blue-500">My NFT</a>
          </Link>
          <Link href="/create-nft">
            <a className="mr-6 text-blue-500">Create NFT</a>
          </Link>
        </div>
      </nav>
    </header>

    {children}

    {/* <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer> */}
  </div>
);

export default Layout;
