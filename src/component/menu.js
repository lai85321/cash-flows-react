import "./menu.css";
// import home from '../../images/home.png';
// import account from '../../images/account.png'
// import dashboard from '../../images/dashboard.png';
// import settings from '../../images/settings.png'
import user from "../../images/user.png";
const sidebarMenu = [
  {
    id: "Home",
    icon: `home-icon`,
  },
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
  // useEffect call api 取得 img url
  // useState 幫 img 建立 state
  // setState 設定 img
  return (
    <div className="menu">
      <div className="user">
        <div
          className="user-image"
          style={{ backgroundImage: `url(${user})` }}
        ></div>
        <div className="user-name">name</div>
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
