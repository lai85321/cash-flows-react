import Menu from "../components/menu/menu";
import Setting from "../components/setting/setting";
import userDefaultPic from "../images/user.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const { REACT_APP_HOST, REACT_APP_API_VERSION } = process.env;

function SettingPage() {
  let navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const username = localStorage.getItem("username");
  const userPicture =
    localStorage.getItem("picture") || `url(${userDefaultPic})`;
  useEffect(() => {
    const fetchAccountDetail = (userId) => {
      fetch(
        `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/user?id=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
        .then((response) => {
          if (response.status === 401) {
            alert("Please log in");
            navigate(`/signIn`, { replace: true });
          }
          return response.json();
        })
        .then((response) => {});
    };

    fetchAccountDetail(userId);
  }, [userId, navigate]);
  return (
    <div>
      <Menu />
      <Setting userId={userId} username={username} userPicture={userPicture} />
    </div>
  );
}

export default SettingPage;
