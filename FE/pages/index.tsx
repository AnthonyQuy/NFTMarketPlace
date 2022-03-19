import { useEffect, useState } from "react";

import { getMarketContract } from "../utils/getMarketContract";
import ItemList from "../components/MarketItemList";
import { marketContractItemToListingItem } from "../utils/marketContractItemToListingItem";
import { ethers } from "ethers";
import { nftAddress } from "../config";

const IndexPage = () => {
  const [nfts, setNfts] = useState([] as ListingItem[]);
  const [loading, setLoading] = useState("not-loaded");

  async function loadNFs() {
    const marketContract = await getMarketContract();
    const marketItems = await marketContract.fetchMarketItems();
    const items = await marketContractItemToListingItem(marketItems);

    setNfts(items);
    setLoading("loaded");
  }

  async function saleNFT(item: ListingItem) {

    const marketContract = await getMarketContract();
    console.log("item", item);

    const value = ethers.utils.parseUnits(item.price, "ether");

    await marketContract.saleItem(nftAddress, item.itemId, {
      value: value,
    });
    await loadNFs();
  }

  useEffect(() => {
    loadNFs();
  }, []);

  if (loading === "loaded" && !nfts.length) {
    return <h1 className="px-20 py-19 text-3xl">Market is empty </h1>;
  }

  return <ItemList items={nfts} action={{ name: "Buy", fn: saleNFT }} />;
};

export default IndexPage;
