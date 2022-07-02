import "./App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./layouts/homePage";
import BookPage from "./layouts/bookPage";
import AddBookPage from "./layouts/addBookPage";
import AccountPage from "./layouts/accountPage";
import AddAccountPage from "./layouts/addAccountPage";
import BalancePage from "./layouts/balancePage";
import DashBoardPage from "./layouts/dashboardPage";
import SignUpPage from "./layouts/signUpPage";
import SignInPage from "./layouts/signInPage";
import SettingPage from "./layouts/settingPage";
import EditAccountPage from "./layouts/editAccountPage";
function App() {
  useEffect(() => {
    document.title = "Cash flows";
  });
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/addBook" element={<AddBookPage />} />
        <Route path="/book/:bookId/account/:id" element={<EditAccountPage />} />
        <Route path="/book/:bookId" element={<AccountPage />} />
        <Route path="/addAccount/:bookId" element={<AddAccountPage />} />
        <Route path="/book/:bookId/balance" element={<BalancePage />} />
        <Route path="/book/:bookId/dashboard" element={<DashBoardPage />} />
        <Route path="/setting" element={<SettingPage />} />
      </Routes>
    </div>
  );
}

export default App;
