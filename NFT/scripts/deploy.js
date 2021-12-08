const { writeFileSync } = require("fs");
const hre = require("hardhat");

async function main() {
  const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
  const nftMarket = await NFTMarket.deploy();

  await nftMarket.deployed();

  let result = {
    nftMarketAddress: nftMarket.address,
  };
  console.log("NFTMarket deployed to: ", nftMarket.address);

  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(nftMarket.address);
  await nft.deployed();

  result.nftAddress = nft.address;
  console.log("NFT deployed to: ", nft.address);

  await writeFileSync("output.json", JSON.stringify(result));
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
