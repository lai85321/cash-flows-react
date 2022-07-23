import Menu from "../components/menu/menu";
import Nav from "../components/nav/nav";
import AddAccount from "../components/add_account/addAccount";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
const { REACT_APP_HOST, REACT_APP_API_VERSION } = process.env;

function AddAccountPage() {
  let { bookId } = useParams();
  const [member, setMember] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    const fetchMember = (bookId) => {
      fetch(
        `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/members/?bookId=${bookId}`,
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
            // alert("Please log in");
            navigate(`/signIn`, { replace: true });
          }
          return response.json();
        })
        .then((response) => {
          setMember(response.data);
        });
    };
    fetchMember(bookId);
  }, [bookId, navigate]);
  return (
    <div>
      <Menu />
      <Nav />
      <AddAccount member={member} />
    </div>
  );
}

export default AddAccountPage;
