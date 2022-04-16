import { Contract, ethers } from "ethers";
import { nftMarketAddress } from "../config";
import Market from "../../NFT/artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import { getSigner } from "./getSigner";

export async function getMarketContract() {
  const signer = await getSigner();
  const marketContract = new ethers.Contract(
    nftMarketAddress,
    Market.abi,
    signer
  ) as MarketContract & Contract;
  return marketContract;
}
