import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  Home,
  EtherWallet,
  ConnectWallet
} from './pages/index'


import './App.css'


function App() {
  return (
    <>
      <nav>
        Navigation        
      </nav>
      <main>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ether-wallet" element={<EtherWallet />} />
              <Route path="/connect-wallet" element={<ConnectWallet />} />
            </Routes>
          </Router>   
      </main>
      <footer>
        footer layout
      </footer>
    </>
  )
}

export default App
