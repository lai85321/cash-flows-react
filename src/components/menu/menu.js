import "./menu.css";
import user from "../../images/user.png";
const sidebarMenu = [
  {
    id: "Account",
    icon: `account-icon`,
  },
  {
    id: "Dashboard",
    icon: `dashboard-icon`,
  },
  {
    id: "Settings",
    icon: `settings-icon`,
  },
];
const Menu = () => {
  const name = localStorage.getItem("username") || "name";
  console.log(localStorage.getItem("picture"));
  const picture = JSON.parse(localStorage.getItem("picture")) || user;
  console.log(picture);

  return (
    <div className="menu">
      <div className="user">
        <div
          className="user-image"
          style={{ backgroundImage: `url(${picture})` }}
        ></div>
        <div className="user-name">{name}</div>
      </div>
      <div className="menu-lists">
        {sidebarMenu.map((item, index) => {
          return (
            <div key={index} className="menu-list">
              <div className={`menu-image ${item.icon}`}></div>
              {item.id}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
