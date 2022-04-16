import React from "react";

type Props = {
  items: ListingItem[];
  action?: {
    name: string;
    fn: (item: ListingItem) => void;
  };
};

const ItemList = ({ items, action }: Props) => (
  <div className="flex justify-center">
    <div className="px-4" style={{ maxWidth: "1600px" }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="border shadow rounded-xl overflow-hidden bg-gray-50"
          >
            <img
              // style={{ height: "250px", width: "100%" }}
              // className="object-center"
              src={item.image}
              alt={item.name}
            />
            <b
              style={{ height: "64px" }}
              className="text-2xl font-semibold p-2"
            >
              #{item.tokenId}
            </b>

            <p
              style={{ height: "64px" }}
              className="text-2xl font-semibold p-2"
            >
              {item.name}
            </p>
            <div style={{ height: "70px", overflow: "hidden" }}>
              <p className="text-gray-400 p-5">{item.description}</p>
            </div>
            <div className="p-4 bg-black">
              {!!item.price && (
                <p className="text-2xl mb-4 font-bold text-white">
                  {item.price} ETH
                </p>
              )}

              {!!action && (
                <button
                  className="w-full bg-green-500 text-white font-bold py-2 px-12 rounded"
                  onClick={() => action.fn(item)}
                >
                  {action.name}
                </button>
              )}
              {!!item.listingId && (
                <b className="text-right text-gray-400 text-xs">
                  Listing ID: {item.listingId} {!!item.sold && "(SOLD)"}
                </b>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ItemList;
