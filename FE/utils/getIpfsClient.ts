export function getIpfsClient() {
  const ipfsClient = require("ipfs-http-client");
  const client = ipfsClient.create({
    url: "https://ipfs.infura.io:5001/api/v0",
  });
  return client;
}
