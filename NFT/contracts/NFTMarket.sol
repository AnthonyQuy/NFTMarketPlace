// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTMarket is ReentrancyGuard {
    using Counters for Counters.Counter;

    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    address payable owner;

    uint256 listingFee = 0.025 ether;

    constructor() {
        owner = payable(msg.sender);
    }

    struct MarketItem {
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => MarketItem) private marketItemMap;

    event MarketItemCreated(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    function getListingFee() public view returns (uint256) {
        return listingFee;
    }

    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        require(price > 0, "Price must be set");
        require(
            msg.value >= listingFee,
            "Price must be greater than listing fee"
        );

        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        marketItemMap[itemId] = MarketItem(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            false
        );

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit MarketItemCreated(
            itemId,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            false
        );
    }

    function saleItem(address nftContract, uint256 itemId)
        public
        payable
        nonReentrant
    {
        uint256 price = marketItemMap[itemId].price;
        uint256 tokenId = marketItemMap[itemId].tokenId;
        require(msg.value == price, "Price must match");

        marketItemMap[itemId].seller.transfer(msg.value);
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        marketItemMap[itemId].owner = payable(msg.sender);
        marketItemMap[itemId].sold = true;
        _itemsSold.increment();
        payable(owner).transfer(listingFee);
    }

    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint itemCount = _itemIds.current();
        uint unsoldCount = itemCount - _itemsSold.current();
        uint currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldCount);

        for(uint i = 1; i <= itemCount; i++) {
            if(!marketItemMap[i].sold) {
                items[currentIndex] = marketItemMap[i];
                currentIndex++;
            }
        }

        return items;
    }

    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint totalItemCount = _itemIds.current();
        uint myItemCount = 0;
        uint currentIndex = 0;

        for(uint i = 0; i < totalItemCount; i++) {
            if(marketItemMap[i].owner == msg.sender) {
                myItemCount++;
            }
        }

        MarketItem[] memory items = new MarketItem[](myItemCount);
        for(uint i = 0; i < totalItemCount; i++) {
            if(marketItemMap[i].owner == msg.sender) {
                items[currentIndex] = marketItemMap[i];
                currentIndex++;
            }
        }

        return items;
    }

    function fetchMyCreatedItems() public view returns (MarketItem[] memory) {
        uint totalItemCount = _itemIds.current();
        uint myCreatedItemCount = 0;
        uint currentIndex = 0;

        for(uint i = 0; i < totalItemCount; i++) {
            if(marketItemMap[i].seller == msg.sender) {
                myCreatedItemCount++;
            }
        }

        MarketItem[] memory items = new MarketItem[](myCreatedItemCount);
        for(uint i = 0; i < totalItemCount; i++) {
            if(marketItemMap[i].seller == msg.sender) {
                items[currentIndex] = marketItemMap[i];
                currentIndex++;
            }
        }

        return items;
    }
}
