import "./menu.css";
import user from "../../images/user.png";
import { Link } from "react-router-dom";
const sidebarMenu = [
  {
    id: "Account",
    icon: `account-icon`,
    link: `/book`
  },
  {
    id: "Dashboard",
    icon: `dashboard-icon`,
    link: `/book`
  },
  {
    id: "Settings",
    icon: `settings-icon`,
    link: `/book`
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
            <Link to = {item.link}>
              <div key={index} className="menu-list">
                <div className={`menu-image ${item.icon}`}></div>
                {item.id}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
