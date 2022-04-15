import { useEffect, useState } from "react";

import { getMarketContract } from "../utils/getMarketContract";
import ItemList from "../components/MarketItemList";
import { marketContractItemToListingItem } from "../utils/marketContractItemToListingItem";
import { ethers } from "ethers";
import { nftAddress } from "../config";

const IndexPage = () => {
  const [items, setItems] = useState([] as ListingItem[]);
  const [loading, setLoading] = useState("not-loaded");

  async function loadNFs() {
    const marketContract = await getMarketContract();
    const marketItems = await marketContract.fetchMarketItems();
    const items = await marketContractItemToListingItem(marketItems);
    console.log(items);
    setItems(items);
    setLoading("loaded");
  }

  async function buyNFT(item: ListingItem) {
    console.log("Buying item", item);
    const marketContract = await getMarketContract();
    const value = ethers.utils.parseUnits(item.price, "ether");
    console.log("Price", value);
    console.log("Price", value.toString());
    await marketContract.saleItem(nftAddress, item.itemId, {
      value: value,
    });
    await loadNFs();
  }

  useEffect(() => {
    loadNFs();
  }, []);

  if (loading === "loaded" && !items.length) {
    return <h1 className="px-20 py-19 text-3xl">Market is empty </h1>;
  }

  return <ItemList items={items} action={{ name: "Buy", fn: buyNFT }} />;
};

export default IndexPage;
