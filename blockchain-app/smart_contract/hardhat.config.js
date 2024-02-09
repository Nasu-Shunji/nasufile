//https://eth-sepolia.g.alchemy.com/v2/Db7GTqEqmjzMzGwei1mblu-xD6Cu-_WA
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "sepolia",
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/Db7GTqEqmjzMzGwei1mblu-xD6Cu-_WA",
      accounts: [
        "2f726ad62c665f11ab885e065b566509908a9b4467d07ba1fe5c19a8e1132ab2"
      ],
    },
  },
};
