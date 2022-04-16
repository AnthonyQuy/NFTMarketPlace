import { useEffect, useState } from "react";

import { getNFTContract } from "../utils/getNFTContract";
import { getSignerAddress } from "../utils/getSelectedAddress";
import axios from "axios";
import ItemList from "../components/MarketItemList";

const MyNFT = () => {
  const [nfts, setNfts] = useState([] as ListingItem[]);
  const [loading, setLoading] = useState("not-loaded");

  async function loadNFs() {
    const nftContract = await getNFTContract();
    const currentAddress = await getSignerAddress();
    console.log("Current Address:", currentAddress);
    const totalItems = await nftContract.totalItemCount();
    console.log("totalItems", totalItems.toString());
    const items: ListingItem[] = [];
    for (let i = 1; i <= totalItems; i++) {
      const owner = await nftContract.ownerOf(i);
      console.log("Owner of ", i, owner);
      if (owner === currentAddress) {
        const tokenUri = await nftContract.tokenURI(i);
        const meta = await axios.get(tokenUri);
        meta.data.tokenId = i;
        items.push(meta.data);
      }
    }
    console.log("items", items);
    setNfts(items);
    setLoading("loaded");
  }

  useEffect(() => {
    loadNFs();
  }, []);

  if (loading === "loaded" && !nfts.length) {
    return <h1 className="px-20 py-19 text-3xl">Nothing to display... </h1>;
  }

  // return (
  //   <div className="flex justify-center">
  //     <div className="px-4" style={{ maxWidth: "1600px" }}>
  //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
  //         {nfts.map((nft, i) => (
  //           <div
  //             key={i}
  //             className="border shadow rounded-xl overflow-hidden bg-gray-50"
  //           >
  //             <img src={nft.image} alt={nft.name} />
  //             <p style={{ height: "64px" }} className="text-xl p-2">
  //               #{nft.tokenId}
  //             </p>
  //             <p
  //               style={{ height: "64px" }}
  //               className="text-2xl font-semibold p-2"
  //             >
  //               {nft.name}
  //             </p>
  //             <div style={{ height: "70px", overflow: "hidden" }}>
  //               <p className="text-gray-400 p-5">{nft.description}</p>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );

  return <ItemList items={nfts} />;
};

export default MyNFT;
