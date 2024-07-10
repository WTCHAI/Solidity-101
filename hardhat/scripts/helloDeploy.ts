import hh from "hardhat"


async function main(){
    const Contract = await hh.ethers.getContractFactory("HelloWorld");
    await Contract.deploy("Hello World Solidity!");
    console.log("Hello world contract deployed");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });