import React, { useState } from "react";
import { getNFTContract } from "../utils/getNFTContract";
import axios from "axios";

const LoadToken = () => {
  const [loadTokenId, setLoadTokenId] = useState("");
  const [tokenUrl, setTokenUrl] = useState("");
  const [errorMessage, setErrormessage] = useState("");

  async function loadToken() {
    try {
      setErrormessage("");
      setTokenUrl("");
      let nftContract = await getNFTContract();
      const tokenUri = await nftContract.tokenURI(loadTokenId);
      console.log("tokenUri", tokenUri);

      const meta = await axios.get(tokenUri);
      console.log("meta", meta);
      setTokenUrl(meta.data.image);
    } catch (error: any) {
      console.log(error);
      if (error.data.message.includes("URI query for nonexistent token")) {
        setErrormessage(`Token with ID ${loadTokenId} is not exist`);
      } else {
        alert(JSON.stringify(error));
      }
    }
  }

  return (
    <div className="flex flex-col bg-gray-50 p-5 rounded mt-5">
      <input
        placeholder="Load Token ID"
        className="mt-8 border rounded p-4"
        onChange={(e) => setLoadTokenId(e.target.value)}
      />
      <button
        onClick={loadToken}
        className="font-bold mt-4 bg-blue-500 text-white rounded p-4 shadow-lg"
      >
        Load Token
      </button>
      {!!errorMessage && <a className="text-red-400">{errorMessage}</a>}
      {!!tokenUrl && (
        <img className="rounded mt-4" width="350" src={tokenUrl} />
      )}
    </div>
  );
};

export default LoadToken;
