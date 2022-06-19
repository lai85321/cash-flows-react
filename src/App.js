import "./App.css";
import Menu from "./components/menu/menu";
import Nav from "./components/nav/nav";
import AddAccount from "./components/add-account/addAccount";

function App() {
  return (
    <div style={{ backgroundColor: "#fef4de" }}>
      <Menu />
      <Nav />
      <AddAccount />
    </div>
  );
}

export default App;
