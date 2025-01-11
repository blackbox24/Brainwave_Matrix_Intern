const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const deployer_address = deployer.address;
  const deployer_balance = await deployer.provider.getBalance(deployer_address);
  console.log("Deploying contracts with the account:", deployer_address);
  console.log("Account balance:", deployer_balance.toString());

  const Token = await hre.ethers.getContractFactory("Ballot");
  console.log("Deploying Token contract...");

  try {
    const token = await Token.deploy([
      "0x696d70726f76652d64656d6f6372616379000000000000000000000000000000",
      "0x6b6565702d64656d6f6372616379000000000000000000000000000000000000",
      "0x676f6f642d6469746163746f7200000000000000000000000000000000000000",
      "0x616e617263687900000000000000000000000000000000000000000000000000",
    ]);

    // Wait for the contract deployment to be confirmed
    // await token.deployed();
  
    console.log("Token: ",token.target)
    console.log("Token address:", token.address);
  } catch (error) {
    console.error("Error during deployment:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
