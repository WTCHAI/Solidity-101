const hre = require("hardhat");

async function deployHello(){
    const Hello = await hre.ethers.getContractFactory("HelloWorld0");
    const hello = await Hello.deploy();
    await hello.deployed();
    console.log("Hello deployed to:", hello.address);
}