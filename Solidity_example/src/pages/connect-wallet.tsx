import { useConnectWallet } from "../custom-hooks/useConnectWallet"

export default function ConnectWallet() {
    const { address , OnConnectToWallet ,OnDisconnectWallet } = useConnectWallet()
    
    
    return (
      <div className="flex flex-col ">

          connect wallet metamask 
        <h1>
          Address : {address}
        </h1>
        <button
          className="p-5 bg-slate-300"
          onClick={OnConnectToWallet}
        >
          Connnect to wallet
        </button>
      </div>
    )
  }
  