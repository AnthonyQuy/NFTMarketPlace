type User = {
  id: number;
  name: string;
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

type ListingNFT = {
  price: string;
  tokenId: number;
  seller: string;
  owner: string;
  image: any;
  name: string;
  description: string;
};
