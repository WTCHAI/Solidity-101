import hh from 'hardhat'  ;
 
async function main ( )  {
    const Contract = await hh.ethers.getContractFactory('Token') ; 
    const TokenContract = await Contract.deploy() ;
    const ContractAddress = await TokenContract.getAddress() ;
    console.log("Token deployed to:", ContractAddress);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });