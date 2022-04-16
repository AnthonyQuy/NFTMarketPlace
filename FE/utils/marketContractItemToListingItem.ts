import { ethers } from "ethers";
import axios from "axios";
import { getNFTContract } from "./getNFTContract";

export async function marketContractItemToListingItem(
  myItems: MarketContractItem[]
) {
  const nftContract = await getNFTContract();
  const items: ListingItem[] = await Promise.all(
    myItems.map(async (item: any) => {
      const tokenUri = await nftContract.tokenURI(item.tokenId);
      const meta = await axios.get(tokenUri);

      let price = ethers.utils.formatUnits(item.price.toString(), "ether");
      const result: ListingItem = {
        price,
        listingId: item.listingId.toNumber(),
        creator: item.creator,
        owner: item.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
        sold: item.sold,
        tokenId: item.tokenId.toString(),
      };
      return result;
    })
  );
  return items;
}
