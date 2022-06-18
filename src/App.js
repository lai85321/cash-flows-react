import "./App.css";
import Menu from "./components/menu/menu";
import Nav from "./components/nav/nav";
import Balance from "./components/balance/balance";

function App() {
  return (
    <div style={{ backgroundColor: "#fef4de" }}>
      <Menu />
      <Nav />
      <Balance />
    </div>
  );
}

export default App;
