import { ethers } from "ethers";
 
export interface UserInfoInterface {
    signers : ethers.Signer | undefined ,
    provider : ethers.BrowserProvider | undefined 
    walletAddress : string | undefined
    accounts : string[] | undefined 
}