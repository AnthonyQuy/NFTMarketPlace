// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTMarket is ReentrancyGuard {
    using Counters for Counters.Counter;

    Counters.Counter private _listingIds;
    Counters.Counter private _itemsSold;

    address payable owner;

    uint256 listingFee = 0.025 ether;

    constructor() {
        owner = payable(msg.sender);
    }

    struct MarketItem {
        uint256 listingId;
        address nftContract;
        uint256 tokenId;
        address payable creator;
        address payable owner;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => MarketItem) private marketItemMap;

    event MarketItemCreated(
        uint256 indexed listingId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address creator,
        address owner,
        uint256 price,
        bool sold
    );

    function getListingFee() public view returns (uint256) {
        return listingFee;
    }

    function createMarketItem(
        address nftContractAddress,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        require(price > 0, "Price must be set");
        require(
            msg.value >= listingFee,
            "Price must be greater than listing fee"
        );

        _listingIds.increment();
        uint256 newlistingId = _listingIds.current();

        marketItemMap[newlistingId] = MarketItem(
            newlistingId,
            nftContractAddress,
            tokenId,
            payable(msg.sender),
            payable(msg.sender),
            price,
            false
        );

        IERC721(nftContractAddress).transferFrom(
            msg.sender,
            address(this),
            tokenId
        );

        emit MarketItemCreated(
            newlistingId,
            nftContractAddress,
            tokenId,
            msg.sender,
            address(0),
            price,
            false
        );
    }

    function getMarketItem(uint256 marketlistingId)
        public
        view
        returns (MarketItem memory)
    {
        return marketItemMap[marketlistingId];
    }

    function saleItem(address nftContract, uint256 listingId)
        public
        payable
        nonReentrant
    {
        uint256 price = marketItemMap[listingId].price;
        uint256 tokenId = marketItemMap[listingId].tokenId;
        require(msg.value == price, "Price must match");

        marketItemMap[listingId].creator.transfer(msg.value);
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        marketItemMap[listingId].owner = payable(msg.sender);
        marketItemMap[listingId].sold = true;
        _itemsSold.increment();
        payable(owner).transfer(listingFee);
    }

    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _listingIds.current();
        uint256 unsoldCount = itemCount - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldCount);

        for (uint256 i = 1; i <= itemCount; i++) {
            if (!marketItemMap[i].sold) {
                items[currentIndex] = marketItemMap[i];
                currentIndex++;
            }
        }

        return items;
    }

    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _listingIds.current();
        uint256 myItemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 1; i <= totalItemCount; i++) {
            if (marketItemMap[i].owner == msg.sender) {
                myItemCount++;
            }
        }

        MarketItem[] memory items = new MarketItem[](myItemCount);
        for (uint256 i = 1; i <= totalItemCount; i++) {
            if (marketItemMap[i].owner == msg.sender) {
                items[currentIndex] = marketItemMap[i];
                currentIndex++;
            }
        }

        return items;
    }

    function fetchMyCreatedItems() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _listingIds.current();
        uint256 myCreatedItemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (marketItemMap[i].creator == msg.sender) {
                myCreatedItemCount++;
            }
        }

        MarketItem[] memory items = new MarketItem[](myCreatedItemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (marketItemMap[i].creator == msg.sender) {
                items[currentIndex] = marketItemMap[i];
                currentIndex++;
            }
        }

        return items;
    }
}
