// const hre = require("hardhat");

// async function main() {
//   try {
//     // Get the ContractFactory of your EtherWallet
//     const EtherWallet = await hre.ethers.getContractFactory("EtherWallet");

//     // Get the list of accounts available from Hardhat
//     const [deployer] = await hre.ethers.getSigners();

//     console.log("Deploying contract with the account:", deployer.address);

//     // Deploy the contract using the deployer's signer
//     // const contract = await EtherWallet.connect(deployer).deploy();

//     // // Wait for the deployment transaction to be mined

//     // console.log("EtherWallet contract deployed to:", contract.address);

//   } catch (error) {
//     console.error("Error during deployment:", error);
//     process.exit(1);
//   }
// }

// main();


import hre from "hardhat";

async function Deployer(contractName:string){
    try{

        //Getting contract object wth specified contract 
        const ContractFactory = await hre.ethers.getContractFactory(contractName);
        
        // Getting list of accounts avaliable from hardhat 
        const deployers = await hre.ethers.getSigners() ; 
        console.log("Deploying contract with the account : ",deployers)
        
        // Deploying the contract using the deployer's signer [0] related on hardhat config
        // Which contract is require owner so we have to connect owner = msg.sender  
        const contract = await ContractFactory.connect(deployers[0]).deploy();
        console.log("Contract deployed to : ",contract);
    }catch(err){
        console.error("Error during deployment:", err);
        process.exit(1);
    }
}

// running script 
// npx hardhat run scripts/deploy.ts --network sepolia
// contract address : 0x5d3d7bb5228F9Ef3624eB8E43BF6f0a68B5B9848
Deployer("EtherWallet");

// Verifying conract running script 
// npx hardhat verify --network mainnet DEPLOYED_CONTRACT_ADDRESS "Constructor argument 1"
// npx hardhat verify --network sepolia 0x5d3d7bb5228F9Ef3624eB8E43BF6f0a68B5B9848 
