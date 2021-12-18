import CreateMarketItem from "../components/CreateMarketItem";
import LoadMarketItem from "../components/LoadMarketItem";

const SellNFT = () => {
  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col p-5 rounded mt-5">
        <CreateMarketItem />
        <LoadMarketItem />
      </div>
    </div>
  );
};

export default SellNFT;
