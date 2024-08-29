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

    }catch(err){
        console.error("Error during deployment:", err);
        process.exit(1);
    }
}

Deployer("EtherWallet");
