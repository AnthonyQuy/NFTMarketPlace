import { useEffect, useState } from "react";

import { getMarketContract } from "../utils/getMarketContract";
import ItemList from "../components/MarketItemList";
import { marketContractItemToListingItem } from "../utils/marketContractItemToListingItem";

const MyListingNFT = () => {
  const [nfts, setNfts] = useState([] as ListingItem[]);
  const [loading, setLoading] = useState("not-loaded");

  async function loadNFs() {
    const marketContract = await getMarketContract();
    const myItems = await marketContract.fetchMyNFTs();
    const items: ListingItem[] = await marketContractItemToListingItem(myItems);

    setNfts(items);
    setLoading("loaded");
  }

  useEffect(() => {
    loadNFs();
  }, []);

  if (loading === "loaded" && !nfts.length) {
    return <h1 className="px-20 py-19 text-3xl">Nothing to display... </h1>;
  }

  return <ItemList nfts={nfts} />;
};

export default MyListingNFT;
