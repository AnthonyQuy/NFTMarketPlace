import React from "react";

type Props = {
  nfts: ListingItem[];
  action?: string;
};

const ItemList = ({ nfts, action }: Props) => (
  <div className="flex justify-center">
    <div className="px-4" style={{ maxWidth: "1600px" }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {nfts.map((nft, i) => (
          <div
            key={i}
            className="border shadow rounded-xl overflow-hidden bg-gray-50"
          >
            <img
              style={{ height: "250px", width: "100%" }}
              className="object-center"
              src={nft.image}
              alt={nft.name}
            />
            <p
              style={{ height: "64px" }}
              className="text-2xl font-semibold p-2"
            >
              {nft.name}
            </p>
            <div style={{ height: "70px", overflow: "hidden" }}>
              <p className="text-gray-400 p-5">{nft.description}</p>
            </div>
            <div className="p-4 bg-black">
              <p className="text-2xl mb-4 font-bold text-white">
                {nft.price} ETH
              </p>
              {!!action && (
                <button className="w-full bg-green-500 text-white font-bold py-2 px-12 rounded">
                  {action}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ItemList;
