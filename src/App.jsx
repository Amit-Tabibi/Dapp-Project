import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Campaign from "./views/Campaign";
import Home from "./views/Home";

const App = () => {
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
