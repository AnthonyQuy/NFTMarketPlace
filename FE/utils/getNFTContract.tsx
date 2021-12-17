import { Contract, ethers } from "ethers";
import { nftAddress as nftContractAddress } from "../config";
import NFT from "../../NFT/artifacts/contracts/NFT.sol/NFT.json";
import { getSigner } from "./getSigner";

export async function getNFTContract() {
  const signer = await getSigner();

  let nftContract = new ethers.Contract(
    nftContractAddress,
    NFT.abi,
    signer
  ) as Contract & NFTContract;
  return nftContract;
}
