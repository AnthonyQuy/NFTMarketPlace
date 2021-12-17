import React, { useState } from "react";
import { getIpfsClient } from "../utils/getIpfsClient";
import { createToken } from "../utils/createToken";
import { isAllItemsExist } from "../utils/isAllItemsExist";

const CreateToken = () => {
  const client = getIpfsClient();

  const [formInput, updateFormInput] = useState({
    name: "",
    description: "",
  });
  const [fileUrl, setFileUrl] = useState("");
  const [newTokenId, setNewTokenId] = useState("");

  async function onUploadFileChange(e: any) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const fileUrl = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(fileUrl);
    } catch (error) {
      console.log(error);
    }
  }

  async function createTokenFromInput() {
    const { name, description } = formInput;
    if (!isAllItemsExist(name, description, fileUrl)) {
      alert("Please fill all the fields");
    } else {
      const data = JSON.stringify({ name, description, image: fileUrl });

      const tokenId = await createToken(client, data);
      setNewTokenId(tokenId);
    }
  }

  return (
    <div className="flex flex-col bg-gray-50 p-5 rounded mt-5">
      <input
        placeholder="Token Name"
        className="mt-8 border rounded p-4"
        onChange={(e) =>
          updateFormInput({ ...formInput, name: e.target.value })
        }
      />
      <textarea
        placeholder="Token Description"
        className="mt-2 border rounded p-4"
        onChange={(e) =>
          updateFormInput({ ...formInput, description: e.target.value })
        }
      />
      <input
        type="file"
        name="Token"
        className="my-4"
        onChange={onUploadFileChange}
      />
      {!!fileUrl && <img className="rounded mt-4" width="350" src={fileUrl} />}
      <button
        onClick={createTokenFromInput}
        className="font-bold mt-4 bg-blue-500 text-white rounded p-4 shadow-lg"
      >
        Create Token
      </button>
      {!!newTokenId && (
        <label className="text-blue-400">New Token ID: {newTokenId}</label>
      )}
    </div>
  );
};

export default CreateToken;
