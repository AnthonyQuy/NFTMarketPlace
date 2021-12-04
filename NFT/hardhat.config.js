require("@nomiclabs/hardhat-waffle");

const projectId = "6d161e10d3b94727a16e2de9eebc298f";
const fs = require("fs");

const privateKey = fs.readFileSync("./.secretAcc1").toString();

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${projectId}`,
      accounts: [privateKey]
    },
    mainNet: {
      url: `https://mainnet.infura.io/v3/${projectId}`,
      accounts: [privateKey]
    },
  },
  solidity: "0.8.4",
};
