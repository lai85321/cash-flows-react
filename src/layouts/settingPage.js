import Menu from "../components/menu/menu";
import Setting from "../components/setting/setting";
import userDefaultPic from "../images/user.png";
function SettingPage() {
  const userId = localStorage.getItem("id");
  const username = localStorage.getItem("username");
  const userPicture =
    localStorage.getItem("picture") || `url(${userDefaultPic})`;
  return (
    <div>
      <Menu />
      <Setting userId={userId} username={username} userPicture={userPicture} />
    </div>
  );
}

export default SettingPage;
