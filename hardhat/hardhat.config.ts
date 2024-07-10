import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("@nomicfoundation/hardhat-chai-matchers");


const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    sepolia : {
      url : `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      chainId : 11155111
      
    }

  }
};

export default config;
