/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
module.exports = {
  solidity: "0.8.28",
  networks: { localhost: { url: "http://localhost:8545" } }
};
