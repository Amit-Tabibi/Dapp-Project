import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Campaign from "./views/Campaign";
import Home from "./views/Home";
import { useEffect } from "react";
import { isWalletConnected } from "./services/blockchain";

const App = () => {
  useEffect(async() => {
    await isWalletConnected()
  }, [])
  
  return (
    <div className="min-h-screen relative">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campaigns/:id" element={<Campaign />} />
      </Routes>
    </div>
  );
};

export default App;
