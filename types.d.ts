type NFTContract = {
  createToken: (tokenURI: string) => Promise<any>;
};

type MarketContract = {
  getListingFee: () => any;
  createMarketItem: (...any) => Promise<any>;
  saleItem: (...any) => Promise<any>;
  fetchMarketItems: () => Promise<MarketContractItem[]>;
  fetchMyNFTs: () => Promise<MarketContractItem[]>;
  fetchMyCreatedItems: () => any;
};

type MarketContractItem = {
  price: number;
  listingId: number;
  creator: string;
  owner: string;
  tokenId: number;
  sold: boolean;
};

type ListingItem = {
  price: string;
  listingId: number;
  tokenId: number;
  creator: string;
  owner: string;
  image: any;
  name: string;
  description: string;
  sold: boolean;
};

type NftViewItem = {
  tokenId: number;
  image: any;
  name: string;
  description: string;
};
