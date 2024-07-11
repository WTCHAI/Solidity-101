
// import hh from 'hardhat' ; 

// import { TokenAbi } from '../assets/abi/tokenabi';

// // 0x948B3c65b89DF0B4894ABE91E6D02FE579834F8F 
// // current contract address wanted to see 

// async function main() {
//     // telling script to use hardhat local environtment npx hardhat node
//     const RPCProvider = new hh.ethers.JsonRpcProvider('http://127.0.0.1:8545/')

//     //seeing list of account in local dev signers that having in this software environment
//     const signer = await RPCProvider.getSigner(1) ;
//     console.log("Seeing signer address : ",signer.address) ;

//     const balance = await RPCProvider.getBalance(signer.address) ;
//     console.log("Seeing signer balance : ",hh.ethers.formatEther(balance.toString()) ) ;

//     const contractAddress = "0x712516e61c8b383df4a63cfe83d7701bce54b03e" ;
//     // console.log("Token abi ", TokenAbi) ;

//     const Contract = new hh.ethers.Contract(contractAddress,TokenAbi) ;
//     // console.log("Contract properties : " , Contract)
//     console.log("Contract fragments : " , Contract.interface.fragments) ;     
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });