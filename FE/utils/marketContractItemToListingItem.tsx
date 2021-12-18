import { ethers } from "ethers";
import axios from "axios";
import { getNFTContract } from "./getNFTContract";

export async function marketContractItemToListingItem(myItems: any) {
  const nftContract = await getNFTContract();
  const items: ListingItem[] = await Promise.all(
    myItems.map(async (item: any) => {
      const tokenUri = await nftContract.tokenURI(item.tokenId);
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
  return items;
}