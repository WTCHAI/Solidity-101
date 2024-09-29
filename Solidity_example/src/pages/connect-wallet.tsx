import { useEffect } from "react"
import { useConnectWallet } from "../custom-hooks/useConnectWallet"

export default function ConnectWallet() {
    const { userInfo , OnConnectToWallet ,OnDisconnectWallet } = useConnectWallet()    

    useEffect(()=>{
      // OnConnectToWallet()
    },[window.ethereum])
    
    return (
      <div className="flex flex-col ">

          connect wallet metamask 
        <button
          className="p-5 bg-green-400"
          onClick={OnConnectToWallet}
        >
          Connnect to wallet
        </button>
        <button 
          className="p-5 bg-red-300"
          onClick={OnDisconnectWallet}
        >
          Disconnect wallet 
        </button>
        <div>
              <h3>Connected Wallet Info</h3>
              <p>Address: {userInfo.walletAddress}</p>
              <p>
                Chain Id : {userInfo.provider?._network.chainId.toLocaleString()}
              </p>
              <p>Provider: {userInfo.provider ? "Connected" : "Not Connected"}</p>
          </div>
      </div>
    )
  }
  