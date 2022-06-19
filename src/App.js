import "./App.css";

import { Routes, Route } from "react-router-dom";
import AccountPage from "./layouts/accountPage";
import AddAccountPage from "./layouts/addAccountPage";

function App() {
  return (
    <div style={{ backgroundColor: "#fef4de" }}>
      <Routes>
        <Route path="/" element={<AccountPage />} />
        <Route path="/addAccount" element={<AddAccountPage />} />
      </Routes>
    </div>
  );
}

export default App;
