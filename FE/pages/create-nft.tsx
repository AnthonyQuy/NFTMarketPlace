import CreateToken from "../components/CreateToken";
import LoadToken from "../components/LoadToken";

const CreateNFT = () => {
  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col p-5 rounded mt-5">
        <CreateToken />
        <LoadToken />
      </div>
    </div>
  );
};

export default CreateNFT;
