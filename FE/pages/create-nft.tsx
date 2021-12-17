import CreateToken from "../components/CreateToken";
import LoadToken from "../components/LoadToken";
import CreateMarketItem from "../components/CreateMarketItem";
import LoadMarketItem from "../components/LoadMarketItem";

const CreateNFT = () => {
  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col p-5 rounded mt-5">
        <CreateToken />
        <LoadToken />
        <CreateMarketItem />
        <LoadMarketItem />
      </div>
    </div>
  );
};

export default CreateNFT;
