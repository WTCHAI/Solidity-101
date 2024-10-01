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

        userInfo.provider?.destroy()
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

    // Dive in to all properties in provider & signer 
    const OnGetProviderProperties = async () => {
        try {
            if(userInfo.provider){
                // Detect the network
                const detectNetwork = await userInfo.provider?.getNetwork();
                console.log("Network: ", detectNetwork);
        
                // // Fetch balance from a specific address
                const walletAddress = "0x41649a1F8B2499e2F7884184D062639CEF9d0601";
                const walletBalance = await userInfo.provider?.getBalance(walletAddress);
                console.log("Wallet Balance (wei): ", walletBalance?.toString());
                console.log("Wallet balance formatEth  (eth): ", ethers.formatEther(walletBalance))
                console.log("Wallet balance format uint(eth): ", ethers.formatUnits(walletBalance))
        
                // Fetch the block number
                const currentBlockNumber = await userInfo.provider.getBlockNumber();
                console.log("Current Block Number: ", currentBlockNumber);
                
                // Fetch the transaction count (nonce) for the address
                const transactionCount = await userInfo.provider?.getTransactionCount(walletAddress);
                console.log("Transaction Count: ", transactionCount);
        
                // Get code from the address (in case it's a contract)
                // Contract address from solidity example simple ether wallet 
                const contractAddress = "0x5d3d7bb5228F9Ef3624eB8E43BF6f0a68B5B9848"
                const code = await userInfo.provider.getCode(contractAddress);
                console.log("Code at Address (if contract): ", code);
        
                // Get storage at the address (e.g., slot 0) use for test variable values
                const storageValueSlot1 = await userInfo.provider.getStorage(contractAddress,0);
                console.log("Storage at Address (slot 0): ", storageValueSlot1);
                // console.log("Storage convert slot 0 : ",parseInt(storageValue))
                //  Considering next what slot mean storage value of what contract only? 

                // // Fetch fee data (such as gas prices)
                const feeData = await userInfo.provider.getFeeData();
                console.log("Fee Data : ", feeData);
                if (feeData){
                    if(feeData.gasPrice){
                        console.log("Fee gas price : ",ethers.formatUnits(feeData.gasPrice))
                    }
                    if(feeData.maxFeePerGas){
                        console.log("Fee fee per gas : ",ethers.formatUnits(feeData.maxFeePerGas))
                    }
                    if(feeData.maxPriorityFeePerGas){
                        console.log("Fee gas price : ",ethers.formatUnits(feeData.maxPriorityFeePerGas))
                    }
                }

                // // Fetch logs for a filter (example filter for events)
                const filter = {
                    address: walletAddress,
                    fromBlock: currentBlockNumber - 100,
                    toBlock: currentBlockNumber,
                }
                const logs = await userInfo.provider.getLogs(filter);
                console.log("Logs: ", logs);
        
                // // Get block details (example fetching the latest block)
                const block = await userInfo.provider.getBlock(currentBlockNumber);
                console.log("Block Details : ",block);
                
                // // Simulate a call to a contract (example)

                // data inthis case not being just values but also can be function too 
                // Calling encoded data to hex16 patterns in this case contract having withdraw methods
                //     function getBalance() external view returns (uint256) {
                //     return address(this).balance;
                // } 

                // Wrong methods 
                // const ValuesWantedToBeCalled = 'function getBalance()'
                // const encodedValues = ethers.encodeBase64(ValuesWantedToBeCalled)
                // console.log("test encoded : ",encodedValues)

                // Practicing is 
                const methodsAbi = [
                    "function getBalance() view returns (uint256)",
                    // "address payable public owner"
                ]
                const interfaceMethodAbi = new ethers.Interface(methodsAbi)
                const valuesWantedToKnow = interfaceMethodAbi.encodeFunctionData("getBalance")
                
                const callData = {
                    to: contractAddress,
                    data: valuesWantedToKnow
                }
                const callResult = await userInfo.provider.call(callData);
                console.log("Simulated Call Result : ", callResult);
                const decodedResult = interfaceMethodAbi.decodeFunctionResult("getBalance", callResult);
                console.log("Decoded result : ",decodedResult)

                // // Estimate gas for a transaction
                const estimateGasData = {
                    to: contractAddress,
                    // value: ethers.parseEther("0.01")
                };
                const gasEstimate = await userInfo.provider.estimateGas(estimateGasData);
                console.log("Gas Estimate: ",ethers.formatUnits(gasEstimate))
        
                // // Wait for a specific transaction to be mined (example)
                // Transaction hashed of deploying of the contractAddress 
                const txHash = "0x67a38c3211ef6605ed33a1612cb0cb50c04fe1935c298e34fe9e9ec3525a6468"; // Replace with actual transaction hash
                const receipt = await userInfo.provider.waitForTransaction(txHash);
                console.log("Transaction Receipt: ", receipt);
        
                // // Wait for a specific block to be mined
                const minedBlock = await userInfo.provider?.waitForBlock(currentBlockNumber + 1)
                // console.log("Next Mined Block: ", minedBlock)
            }

        } catch (error) {
            console.error("Error fetching provider properties: ", error);
        }
    };
    
    return {
        OnConnectToWallet,
        OnDisconnectWallet,
        userInfo : userInfo,
        OnGetProviderProperties,
    }
}