const hre = require("hardhat");

async function main() {
  const Hello = await hre.ethers.getContractFactory("HelloWorld");
  const hello = await Hello.deploy();
  await hello.deployed();
  console.log("Hello deployed to:",);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });