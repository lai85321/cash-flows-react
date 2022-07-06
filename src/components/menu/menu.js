import "./menu.css";
import user from "../../images/user.png";
import { Link, useNavigate } from "react-router-dom";
const sidebarMenu = [
  {
    id: "Book",
    icon: `account-icon`,
    link: `/book`,
  },
  {
    id: "Overview",
    icon: `dashboard-icon`,
    link: `/book`,
  },
  {
    id: "Settings",
    icon: `settings-icon`,
    link: `/settings`,
  },
];
const Menu = () => {
  let navigate = useNavigate();
  const name = localStorage.getItem("username") || "name";
  const picture = localStorage.getItem("picture") || `url(${user})`;
  const logout = () => {
    localStorage.clear();
    navigate(`/`, { replace: true });
  };
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
            <Link to={item.link} key={index}>
              <div className="menu-list">
                <div className={`menu-image ${item.icon}`}></div>
                {item.id}
              </div>
            </Link>
          );
        })}
      </div>
      <div className="logout" onClick={() => logout()}>
        <div className="logout-image"></div>
        logout
      </div>
    </div>
  );
};

export default Menu;
