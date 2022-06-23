import "./App.css";

import { Routes, Route } from "react-router-dom";
import HomePage from "./layouts/homePage";
import AccountPage from "./layouts/accountPage";
import AddAccountPage from "./layouts/addAccountPage";
import BalancePage from "./layouts/balancePage";
import DashBoardPage from "./layouts/dashboardPage";
import SignUpPage from "./layouts/signUpPage";
import SignInPage from "./layouts/signInPage";
function App() {
  return (
    <div style={{ backgroundColor: "#fef4de" }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/addAccount" element={<AddAccountPage />} />
        <Route path="/balance" element={<BalancePage />} />
        <Route path="/dashboard" element={<DashBoardPage />} />
      </Routes>
    </div>
  );
}

export default App;
