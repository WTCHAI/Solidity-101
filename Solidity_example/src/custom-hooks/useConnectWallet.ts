import { useEffect, useState } from "react";

import { ethers } from "ethers";

import { UserInfoInterface } from "../interface/ConnectWallet/InterfaceUserInfo";

export const useConnectWallet = () =>{
    const [connected,SetConnection] = useState(false)
    const [ userInfo , SetUserInfo] = useState({} as UserInfoInterface)

    const OnConnectToWallet = async ()=>{
        if (!connected){
            try { 
                console.log("Connect clicked ")
                const provider = new ethers.BrowserProvider(window.ethereum)
                const signer = await provider.getSigner();
                const accounts = await provider.send("eth_requestAccounts",[])

                SetUserInfo({
                    ...userInfo,
                    walletAddress: await signer.getAddress(),
                    accounts: accounts,
                    provider : provider,
                    signers : signer
                })
                SetConnection(true)

                
                window.ethereum.on("accountsChanged",handleAccountsChanged)
                window.ethereum.on("chainChanged",handleChainChanged)

            }catch(error){
                SetConnection(false)
            }
        }
    }

    const OnDisconnectWallet = async ()=>{
        SetConnection(false);
        SetUserInfo({
            ...userInfo,
            walletAddress:undefined,
            accounts: undefined,
            signers: undefined,
            provider: undefined,
        })
        
        if (window.ethereum) {
            window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
            window.ethereum.removeListener("chainChanged", handleChainChanged);
        }
    }

    const handleAccountsChanged = async (accounts : any ) => {
        try{
            if(accounts.length > 0){
                // user change account to new current which keep in account[0]
                // console.log("Change account to ",accounts[0])

                // considering using this practice chaging account doesn't get new provider and signers which might address unbehavior when compare walletAddress & signers.getAddress so considering using below approch 
                // SetUserInfo({
                //     ...userInfo,
                //     walletAddress: accounts[0],
                //     accounts: accounts
                // })
                
                const provider = new ethers.BrowserProvider(window.ethereum)
                const signer = await provider.getSigner();
                const curWalletAddress  = await signer.getAddress();
                SetUserInfo({
                    ...userInfo,
                    provider: provider,
                    walletAddress: curWalletAddress,
                    accounts: accounts,
                    signers: signer
                });                     
                
            }else {
                OnDisconnectWallet()
            }
        }catch(err){
            throw new Error("An error occurred while checking wallet change");
        }
    }

    const handleChainChanged = (chainId : any)=>{
        try{
            console.log("Network change to :",chainId)
            window.location.reload();
        }catch(err){
            throw new Error("An error occurred while checking wallet change");
        }
    }

    useEffect(()=>{
        return () => {
            // Clean up event listeners when the component unmounts
            if (window.ethereum) {
                window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
                window.ethereum.removeListener("chainChanged", handleChainChanged);
            }
        };
    },[])

    return {
        OnConnectToWallet,
        OnDisconnectWallet,
        userInfo : userInfo,

    }
}