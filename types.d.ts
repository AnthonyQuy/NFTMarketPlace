type NFTContract = {
  createToken: (tokenURI: string) => Promise<any>;
};

type MarketContract = {
  getListingFee: () => any;
  createMarketItem: (...any) => Promise<any>;
  saleItem: (...any) => Promise<any>;
  fetchMarketItems: () => any;
  fetchMyNFTs: () => any;
  fetchMyCreatedItems: () => any;
};

type MarketContractItem = {
  listingId: number;
  address: string;
  tokenId: number;
  creator: string;
  owner: string;
  price: number;
  sold: boolean;
};

type ListingItem = {
  price: string;
  listingId: number;
  creator: string;
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
