import hh from 'hardhat'  ;
 
async function main ( )  {
    const ethers = await hh.ethers ; 
    //having three account 
    const deployers = await ethers.getSigners() ;

    const Contract = await hh.ethers.getContractFactory('Token',deployers[1]) ; 
    const TokenContract = await Contract.deploy() ;
    const ContractAddress = await TokenContract.getAddress() ;
    console.log("Token deployed to:", ContractAddress);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });