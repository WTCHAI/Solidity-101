import { useState } from "react";

import { ethers } from "ethers";
 

export const useConnectWallet = () =>{
    const [connected,SetConnection] = useState(false)
    const [address,SetSigner] = useState('null')
    // const [provider ]
    const OnConnectToWallet = async ()=>{
        if (!connected){
            try { 
                const provider = new ethers.BrowserProvider(window.ethereum)
                const signers = await provider.getSigner();
                console.log('provider : ',provider._network)
                console.log('signers  : ',signers)
                console.log()
                SetSigner(await signers.getAddress())
                SetConnection(true)
            }catch(error){
                SetConnection(false)
            }
        }
    }

    const OnDisconnectWallet = async ()=>{
        SetConnection(false)
    }

    return {
        OnConnectToWallet,
        OnDisconnectWallet,
        address
    }
}