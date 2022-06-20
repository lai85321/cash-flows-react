import "./App.css";

import { Routes, Route } from "react-router-dom";
import AccountPage from "./layouts/accountPage";
import AddAccountPage from "./layouts/addAccountPage";
import BalancePage from "./layouts/balancePage";
function App() {
  return (
    <div style={{ backgroundColor: "#fef4de" }}>
      <Routes>
        <Route path="/" element={<AccountPage />} />
        <Route path="/addAccount" element={<AddAccountPage />} />
        <Route path="/balance" element={<BalancePage />} />
      </Routes>
    </div>
  );
}

export default App;
