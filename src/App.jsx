import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Campaign from "./views/Campaign";
import Home from "./views/Home";
import { useEffect } from "react";
import { isWalletConnected } from "./services/blockchain";
import { ToastContainer } from "react-toastify";

const App = () => {
  useEffect(() => {
    (async () => {
      await isWalletConnected()
    })();
  }, [])
  
  return (
    <div className="min-h-screen relative">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campaigns/:id" element={<Campaign />} />
      </Routes>

      <ToastContainer
        position="bottom-center"
        autoClose = {5000}
        hideProgressBar = {false}
        newestOnTop = {false}
        closeOnClick
        rtl = {false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default App;
