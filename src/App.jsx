import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Campaign from "./views/Campaign";
import Home from "./views/Home";
import { useEffect, useState } from "react";
import { isWalletConnected } from "./services/blockchain";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      await isWalletConnected();
      setLoaded(true);
    })();
  }, []);

  return (
    <div className="min-h-screen relative">
      <Header />
      {loaded ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campaigns/:id" element={<Campaign />} />
        </Routes>
      ) : null}

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default App;
