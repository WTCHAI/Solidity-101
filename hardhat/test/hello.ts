import hh from "hardhat"
import { expect } from "chai";



describe('Hello world contract tester', async () => { 
    const Contract = await hh.ethers.getContractFactory("HelloWorld");
    await Contract.deploy("Hello World Solidity!");

    const owner = await hh.ethers.getSigners() ; 
    // console.log(owner[0].address);
    // console.log("Hello world contract tester");
    
    // console.log(Contract.interface);
    // console.log(Contract.runner);
    
    
 })
