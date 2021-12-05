import { useEffect, useState } from "react";

import { ethers } from "ethers";
import { nftAddress, nftMarketAddress } from "../config";
import NFT from "../../NFT/artifacts/contracts/NFT.sol/NFT.json";
import Market from "../../NFT/artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import axios from "axios";

const IndexPage = () => {
  const [nfts, setNfts] = useState([] as ListingNFT[]);
  const [loading, setLoading] = useState("not-loaded");

  async function loadNFs() {
    const provider = new ethers.providers.JsonRpcProvider();
    const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      nftMarketAddress,
      Market.abi,
      provider
    );

    const data: MarketContractItem[] = await marketContract.fetchMarketItems();

    const items: ListingNFT[] = await Promise.all(
      data.map(async (item) => {
        const tokenUri = await tokenContract.tokenURI(item.tokenId);
        const meta = await axios.get(tokenUri);

        let price = ethers.utils.formatUnits(item.price.toString(), "ether");

        return {
          price,
          tokenId: item.tokenId,
          seller: item.seller,
          owner: item.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
      })
    );
    setNfts(items);
    setLoading("loaded");
  }

  useEffect(() => {
    loadNFs();
  }, []);

  if (loading === "loaded" && !nfts.length) {
    return <h1 className="px-20 py-19 text-3xl">Market is empty </h1>;
  }
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: "1600px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img src={nft.image} alt={nft.name} />
              <p style={{ height: "64px" }} className="text-2xl font-semibold">
                {nft.name}
              </p>
              <div style={{ height: "70px", overflow: "hidden" }}>
                <p className="text-gray-400">{nft.description}</p>
              </div>
              <div className="p-4 bg-black">
                <p className="text-2xl mb-4 font-bold text-white">
                  {nft.price} ETH
                </p>
                <button className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded">
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
