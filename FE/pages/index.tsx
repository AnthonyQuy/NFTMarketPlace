import { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.css";
import Spinner from "react-bootstrap/Spinner";
import { getMarketContract } from "../utils/getMarketContract";
import ItemList from "../components/MarketItemList";
import { marketContractItemToListingItem } from "../utils/marketContractItemToListingItem";
import { ethers } from "ethers";
import { nftAddress } from "../config";
import timeout from "../utils/timeout";

const IndexPage = () => {
  const [items, setItems] = useState([] as ListingItem[]);
  const [loading, setLoading] = useState("not-loaded");

  async function loadNFs() {
    console.log("LOADING NFT...");
    setLoading("not-loaded");
    const marketContract = await getMarketContract();
    const marketItems: MarketContractItem[] =
      await marketContract.fetchMarketItems();
    console.log("marketItems");
    console.log(marketItems);
    const items = await marketContractItemToListingItem(marketItems);
    console.log("ListingItems");
    console.log(items);
    setItems(items);
    setLoading("loaded");
  }

  async function buyNFT(item: ListingItem) {
    const marketContract = await getMarketContract();
    const value = ethers.utils.parseUnits(item.price, "ether");
    const saleTrx = await marketContract.saleItem(nftAddress, item.listingId, {
      value: value,
    });
    console.log("saleTrx", saleTrx);
    setLoading("not-loaded");
    await timeout(5000);
    await loadNFs();
    console.log("saleTrx", saleTrx);
  }

  useEffect(() => {
    loadNFs();
  }, []);

  if (loading === "not-loaded") {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (loading === "loaded" && !items.length) {
    return <h1 className="px-20 py-19 text-3xl">Market is empty </h1>;
  }

  return <ItemList items={items} action={{ name: "Buy", fn: buyNFT }} />;
};

export default IndexPage;
