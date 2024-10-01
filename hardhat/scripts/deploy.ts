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
        // Deployer in case didn't set the account private key in hardhat config & env
        // const deployers = await hre.ethers.getSigners() ; 
        // console.log("Deploying contract with the account : ",deployers)

        // Deploying the contract using the deployer's signer [0] related on hardhat config
        // Which contract is require owner so we have to connect owner = msg.sender  
        // Refactor deploying without telling who is signers cause already declare in env & hardhat config
        const etherWalletContract = await ContractFactory.deploy()
        await etherWalletContract.deploymentTransaction()?.wait(3)

        // Verifing contract 
        const etherWalletContractAddress = await etherWalletContract.getAddress();
        console.log("Contract deployed to : ",await etherWalletContract.getAddress());
        try {
            await hre.run("verify:verify", {
                address : etherWalletContractAddress,
                // contract optinal for organization teelign where contract is 
                // contract: 'contracts/Calendar.sol:Calendar'

            })

        }catch(err){
            console.error("Error during verification:",err);
            process.exit(1);
        }        
        // Schema from documents
        // await hre.run("verify:verify", {
        //     address: contractAddress,
        //     constructorArguments: [
        //       50,
        //       "a string argument",
        //       {
        //         x: 10,
        //         y: 5,
        //       },
        //       "0xabcdef",
        //     ],
        //   });
    }catch(err){
        console.error("Error during deployment:", err);
        process.exit(1);
    }
}
// After deploy
// running script 
// npx hardhat run scripts/deploy.ts --network holesky
// contract address : 0x441e0bFe7Dbe3f7aA995d7d87880F4DFe4FdeD97
Deployer("EtherWallet");
