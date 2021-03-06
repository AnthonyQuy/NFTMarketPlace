import React, { useState } from "react";
import { getNFTContract } from "../utils/getNFTContract";
import axios from "axios";
import { getMarketContract } from "../utils/getMarketContract";

const LoadMarketItem = () => {
  const [listingId, setlistingId] = useState("");
  const [itemMeta, updateItemMeta] = useState({
    listingId: "",
    price: "",
    tokenId: "",
    sold: false,
    nftContract: "",
    owner: "",
    creator: "",
  });

  async function loadItem() {
    try {
      let marketContract = await getMarketContract();
      console.log("marketContract", marketContract);
      const item = await marketContract.getMarketItem(listingId);
      console.log("item", item);

      updateItemMeta({
        listingId: item.listingId,
        price: item.price.toString(),
        tokenId: item.tokenId,
        sold: item.sold,
        nftContract: item.nftContract,
        owner: item.owner,
        creator: item.creator,
      });
      // const meta = await axios.get(tokenUri);
      // console.log("meta", meta);
      // setTokenUrl(meta.data.image);
    } catch (error) {
      console.log(error);
      alert(JSON.stringify(error));
    }
  }

  return (
    <div className="flex flex-col bg-gray-50 p-5 rounded mt-5 h-full">
      <input
        placeholder="Load Market Item ID"
        className="mt-8 border rounded p-4"
        onChange={(e) => setlistingId(e.target.value)}
      />
      <button
        onClick={loadItem}
        className="font-bold mt-4 bg-blue-500 text-white rounded p-4 shadow-lg"
      >
        Load Market Item
      </button>
      {!!itemMeta.listingId && (
        <textarea disabled={true} value={JSON.stringify(itemMeta)} />
      )}
    </div>
  );
};

export default LoadMarketItem;
