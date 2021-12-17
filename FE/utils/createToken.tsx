import { getNFTContract } from "./getNFTContract";

export async function createToken(client: any, data: string): Promise<string> {
  try {
    const addedData = await client.add(data);
    const itemUrl = `https://ipfs.infura.io/ipfs/${addedData.path}`;

    let nftContract = await getNFTContract();
    let trx = await nftContract.createToken(itemUrl);
    trx = await trx.wait();

    const transferEvent = trx.events.find((e: any) => e.event === "Transfer");
    return transferEvent.args.tokenId.toString();
  } catch (error) {
    throw error;
  }
}
