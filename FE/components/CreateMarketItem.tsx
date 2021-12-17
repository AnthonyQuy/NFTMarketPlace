import React, { useState } from "react";
import { getMarketContract } from "../utils/getMarketContract";
import { ethers } from "ethers";
import { useRouter } from "next/dist/client/router";
import { nftAddress } from "../config";

const CreateMarketItem = () => {
  const router = useRouter();

  const [saleTokenInput, updateSaleTokenInput] = useState({
    saleTokenId: "",
    price: "",
  });

  async function createMarketItem() {
    const { saleTokenId, price } = saleTokenInput;
    if (!price || !saleTokenId) {
      alert("Please fill all the fields");
      return;
    }
    const marketContract = await getMarketContract();
    let trx = await marketContract.getListingFee();
    const listingFee = trx.toString();
    const etherPrice = ethers.utils.parseUnits(saleTokenInput.price, "ether");
    trx = await marketContract.createMarketItem(
      nftAddress,
      saleTokenId,
      etherPrice,
      {
        value: listingFee,
      }
    );
    await trx.wait();
    router.push("/");
  }

  return (
    <div className="flex flex-col bg-gray-50 p-5 rounded mt-5">
      <input
        placeholder="Sale Token ID"
        className="mt-8 border rounded p-4"
        onChange={(e) =>
          updateSaleTokenInput({
            ...saleTokenInput,
            saleTokenId: e.target.value,
          })
        }
      />
      <input
        placeholder="Token Price"
        className="mt-2 border rounded p-4"
        onChange={(e) =>
          updateSaleTokenInput({ ...saleTokenInput, price: e.target.value })
        }
      />
      <button
        onClick={createMarketItem}
        className="font-bold mt-4 bg-blue-500 text-white rounded p-4 shadow-lg"
      >
        Sale on Market
      </button>
    </div>
  );
};

export default CreateMarketItem;
