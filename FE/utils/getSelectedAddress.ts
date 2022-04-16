import Web3Modal from "web3modal";
import { ethers } from "ethers";

export async function getSignerAddress() {
  const web3modal = new Web3Modal();
  const web3connection = await web3modal.connect();
  const provider = new ethers.providers.Web3Provider(web3connection);
  const signer = provider.getSigner();
  return await signer.getAddress();
}
