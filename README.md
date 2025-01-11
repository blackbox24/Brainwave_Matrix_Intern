# Voting dapp using solidity and React + Typescript + vite

## STAGES IN THS TUTORIAL

- Solidity smart contract
- Setup Hardhat
- Setup Frontend
- setup Meta Mask
- Connect frontend with Contract

### Solidity Smart Contract

- [x] Visit [Remix](https://remix.ethereum.org/#lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.26+commit.8a97fa7a.js) to create a test solidity contract
- [x] Create a file with name `Ballot.sol`
- [x] Created contract in this file
- [x] Compile the scripts in the `Ballot.sol`
- [x] Lastly deploy the smart contract on Remix VM first after deploy it on your network.

### SETUP HARDHAT

- [x] Install nodejs
- [x] create a folder called `hardhat_tutorial`
- [x] Install hardhat in currenty directory in your terminal by doing the following:
  ```sh
  npm init
  npm install --save-dev hardhat
  ```
- [x] Install hardhat plugin by typing `npm install --save-dev @nomicfoundation/hardhat-toolbox`
- [x] Add `require("@nomicfoundation/hardhat-toolbox");` to `hardhat.config.cjs`
- [x] Type `npx hardhat init` in your terminal and select `empty hardhat.config.js`
- [x] Visit [HardHat tutorial](https://hardhat.org/tutorial/) for more details

#### CREATE AND DEPLOY SMART CONTRACT USING HARDHAT

- [x] Create a folder called `contracts` in the root directory
- [x] Next create a smart contract called `Ballot.sol` and write smart contract script in it
- [x] In the root directory create a file called `scripts`
- [x] Create a file called `deploy.js` inside scripts directory and paste followin init
  ```js
  async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
    const Token = await ethers.getContractFactory("Ballot");
    const token = await Token.deploy([
      "0x696d70726f76652d64656d6f6372616379000000000000000000000000000000",
      "0x6b6565702d64656d6f6372616379000000000000000000000000000000000000",
      "0x676f6f642d6469746163746f7200000000000000000000000000000000000000",
      "0x616e617263687900000000000000000000000000000000000000000000000000",
    ]);
    console.log("Token address:", token.address);
  }
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  ```
- [x] Since we will have to convert string to bytes32, we need to create a file that performs that task for us
- [x] Create file called `createBytes.cjs` in root directory and paste the following code inside it
  ```js
  const ethers =  require('ethers');

  async function createBytes(args) {
      const name = args[0];
      const bytes = ethers.encodeBytes32String(name);
      // ether v6
      console.log('Bytes:', bytes);
  }

  createBytes(process.argv.slice(2));

  ```
- [x] To compile the contract run `npx hardhat compile` in your terminal
- [x] In your project directory your will see new folder add in that directory.
- [x] Visit [HardHat tutorial](https://hardhat.org/tutorial/) for more details

#### TESTING THE SMART CONTRACT

- [x] We're going to use [ether.js](https://docs.ethers.org/v6/) to interact with the Ethereum contract and we'll use [Moncha](https://mochajs.org/) as our test runner.
- [x] Install ether by typing `npm install ethers` in your terminal
- [x] install Mocah by typing `npm install --save-dev mocha` in your terminal
- [x] Copy and paste the following code into `Token.cjs`

  ```js
  const { expect } = require("chai");

  describe("Token contract", function () {
    it("Deployment should assign the total supply of tokens to the owner", async function () {
      const [owner] = await ethers.getSigners();

      const hardhatToken = await ethers.deployContract("Token");

      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });
  ```

- [x] In your terminal run `npx hardhat test`
- [x] Create a new folder called `test` and create a file called `Token.js` inside it.

* _Note_: If your end up getting this result it means test pass

```sh
$ npx hardhat test

  Token contract
    ✓ Deployment should assign the total supply of tokens to the owner (654ms)


  1 passing (663ms)
```

### SETUP FRONTEND
- [X] create a react project in the root directory
- [x] Type `npm create-react-app frontend` or `npm create-react-app .`
- [x] create a `components` folder in the `./src` directory
- [x] create a file called `Dapp.js` inside the component folder
- [x] Create a folder called `ABI` into `./src` directory
- [x] copy the compiled contract (`./artifacts/contracts/Ballot.sol/Ballot.json`) file into that direcotry
- [x] next create`contract-address.json` in `./ABI/` directory and paste `{"Token":""}`
- [x] open first terminal and type `npx hardhat node`
- [x] open another terminal and type `npx hardhat --network localhost run scripts/deploy.cjs` inside 
- [x] copy token address displayed in the second terminal and paste it inside `contract-address.json`
- [x]  
