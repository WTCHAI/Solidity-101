import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css'


import {
  Home,
  EtherWallet,
} from './pages/index'



function App() {
  return (
    <>
      <div className='p-5 bg-gray-50'>
        Main pages 
      </div>
      <Router>
        <Routes>
          <Route path="/EtherWallet" element={<EtherWallet />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
