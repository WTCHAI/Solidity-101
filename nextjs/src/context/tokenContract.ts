import { createContext, useContext, useState } from "react";

import { ethers } from "ethers";

//abi of the contract
import tokenAbi from "../../public/abis/tokenAbi.json";

//after deployment get the contract address and paste it here
const contractAddress = '0x8464135c8f25da09e49bc8782676a84730c318bc'
const token_abi = tokenAbi.abi;

// and after having abis & target contract address we would create getting contract funciton

// const OnGettingContract = async ()=>{
//     // const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/')
//     // const signer = await provider.getSigner() ;

//     const contract = new ethers.Contract('0x8464135c8f25da09e49bc8782676a84730c318bc', token_abi ,);
//     console.log(contract)
// }

export const TokenContractContext = createContext({})

export const TokenContractProvider = ({ children } : any) => {
    const title = 'Basic Token Contract'
    const [currentAccount  , OnSetCurrentAccount ] = useState('')
   
    function OnCreatingToken (token : string ){
        const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/')
    }
}   