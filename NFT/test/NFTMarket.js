const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarket", function () {
  it("Should create and execute market sales", async function () {
    const Market = await ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy();
    await market.deployed();
    const marketAddress = market.address;

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(marketAddress);
    await nft.deployed();
    const nftContractAddress = nft.address;

    let listingFee = await market.getListingFee();
    listingFee = listingFee.toString();

    const auctionPrice = ethers.utils.parseUnits("1", "ether");

    await nft.createToken("https://www.mytoken1.com");
    await nft.createToken("https://www.mytoken2.com");

    await market.createMarketItem(nftContractAddress, 1, auctionPrice, {
      value: listingFee,
    });
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, {
      value: listingFee,
    });

    const [_, buyerAddress] = await ethers.getSigners();

    await market
      .connect(buyerAddress)
      .saleItem(nftContractAddress, 1, { value: auctionPrice });

    let items = await market.fetchMarketItems();

    items = await Promise.all(
      items.map(async (item) => {
        return {
          price: item.price.toString(),
          tokenId: item.tokenId.toString(),
          seller: item.seller,
          owner: item.owner,
          tokenURI: await nft.tokenURI(item.tokenId),
        };
      })
    );

    console.log("Items: ", items);
  });
});
