import "./App.css";
import Menu from "./components/menu/menu";
import Nav from "./components/nav/nav";
import Account from "./components/account/account";

function App() {
  return (
    <div style={{ backgroundColor: "#fef4de" }}>
      <Menu />
      <Nav />
      <Account />
    </div>
  );
}

export default App;
