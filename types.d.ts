type NFTContract = {
  createToken: (tokenURI: string) => Promise<any>;
};

type MarketContract = {
  getListingFee: () => any;
  createMarketItem: (...any) => Promise<any>;
  saleItem: void;
  fetchMarketItems: () => any;
  fetchMyNFTs: () => any;
  fetchMyCreatedItems: () => any;
};

type MarketContractItem = {
  itemId: number;
  address: string;
  tokenId: number;
  seller: string;
  owner: string;
  price: number;
  sold: boolean;
};

type ListingItem = {
  price: string;
  tokenId: number;
  seller: string;
  owner: string;
  image: any;
  name: string;
  description: string;
};

type NftViewItem = {
  tokenId: number;
  image: any;
  name: string;
  description: string;
};
