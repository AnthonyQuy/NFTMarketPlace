import { useEffect, useState } from "react";

import { getMarketContract } from "../utils/getMarketContract";
import ItemList from "../components/MarketItemList";
import { marketContractItemToListingItem } from "../utils/marketContractItemToListingItem";

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

  useEffect(() => {
    loadNFs();
  }, []);

  if (loading === "loaded" && !nfts.length) {
    return <h1 className="px-20 py-19 text-3xl">Market is empty </h1>;
  }

  return <ItemList nfts={nfts} action="Buy" />;
};

export default IndexPage;
