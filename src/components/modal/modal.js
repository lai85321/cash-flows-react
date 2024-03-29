import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./modal.css";
import getStrLength from "../../method/getStrLength";

const REACT_APP_HOST = process.env.REACT_APP_HOST;
const REACT_APP_API_VERSION = process.env.REACT_APP_API_VERSION;
const REACT_APP_CLOUDFRONT_PATH = process.env.REACT_APP_CLOUDFRONT_PATH;
const PaidModal = (props) => {
  const { details, paidBtnShow, setPaidBtnShow } = props;
  const modalStyle = ["modal-none", "modal-block"];
  const [modalStyleIdx, setModalStyleIdx] = useState(0);
  return (
    <>
      <button
        className="modal-btn"
        onClick={() => {
          setModalStyleIdx(modalStyleIdx ^ 1);
        }}
      >
        {paidBtnShow}
      </button>
      <div className={`modal ${modalStyle[modalStyleIdx]}`}>
        <div className="modal-content">
          <span
            className="close"
            onClick={() => {
              setModalStyleIdx(0);
            }}
          >
            &times;
          </span>
          <div className="modal-window">
            <p style={{ fontWeight: "500", fontSize: "18px" }}>Choose payer</p>
            {details.map((item, index) => {
              return (
                <div
                  key={index}
                  className="paid-option"
                  onClick={(e) => {
                    setPaidBtnShow(e.target.textContent);

                    setModalStyleIdx(0);
                  }}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
const SplitModal = (props) => {
  const {
    users,
    details,
    amount,
    splitBtnShow,
    paid,
    setPaid,
    setSplitBtnShow,
  } = props;
  const modalStyle = ["modal-none", "modal-block"];
  const [modalStyleIdx, setModalStyleIdx] = useState(0);
  const [unequal, setUnequal] = useState(0);

  return (
    <>
      <button
        className="modal-btn"
        onClick={() => {
          setModalStyleIdx(modalStyleIdx ^ 1);
        }}
      >
        {splitBtnShow}
      </button>
      <div className={`modal ${modalStyle[modalStyleIdx]}`}>
        <div className="modal-content">
          <span
            className="close"
            onClick={() => {
              setModalStyleIdx(0);
            }}
          >
            &times;
          </span>
          <div className="split-options">
            <button
              className="split-option"
              onClick={(e) => {
                setUnequal(0);
                setSplitBtnShow(e.target.textContent);
                let newPaid = paid.map((item, idx) =>
                  (amount / paid.length).toFixed(2)
                );
                setPaid(newPaid);
              }}
            >
              {details[0].label}
            </button>
            <button
              className="split-option"
              onClick={(e) => {
                setSplitBtnShow(e.target.textContent);
                setUnequal(unequal ^ 1);
              }}
            >
              {details[1].label}
            </button>
          </div>
          <div
            className={`paid-unequal-none ${
              unequal === 1 && "paid-unequal-container"
            }`}
          >
            <hr style={{ marginBottom: "5px" }}></hr>
            <div style={{ marginLeft: "20px" }}>
              <label style={{ marginBottom: "10px", fontWeight: "bolder" }}>
                Please type how much each person owes
              </label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "10px",
                }}
              >
                {users.map((item, idx) => (
                  <div key={idx}>
                    <div
                      style={{
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <label
                        style={{
                          width: "60px",
                          display: "inline-block",
                        }}
                      >
                        {item.label}
                      </label>
                      <input
                        style={{ height: "40%", marginLeft: "10px" }}
                        value={paid[idx]}
                        onChange={(e) => {
                          let newPaid = [...paid]; // copying the old datas array
                          newPaid[idx] = e.target.value;
                          setPaid(newPaid);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const AddMemberModal = (props) => {
  let navigate = useNavigate();
  const { setMemberData } = props;
  let { bookId } = useParams();
  const modalStyle = ["modal-none", "modal-block"];
  const [modalStyleIdx, setModalStyleIdx] = useState(0);
  const [email, setEmail] = useState("");
  const addMember = (bookId, email) => {
    const body = {
      bookId: bookId,
      email: email,
    };
    fetch(`${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status === 401) {
          // alert("Please log in");
          navigate(`/signIn`, { replace: true });
        }
        return response.json();
      })
      .then((json) => {
        if (json.error) {
          alert(json.error);
        } else {
          setMemberData(json.data);
        }
        setModalStyleIdx(0);
        setEmail("");
      });
  };
  return (
    <>
      <div
        className="modal-add-member"
        onClick={() => {
          setModalStyleIdx(modalStyleIdx ^ 1);
        }}
      ></div>
      <div className={`modal ${modalStyle[modalStyleIdx]}`}>
        <div className="modal-content">
          <span
            className="close"
            onClick={() => {
              setModalStyleIdx(0);
            }}
          >
            &times;
          </span>
          <div className="modal-window">
            <div>
              <p>Add Member</p>
              <div className="modal-add-member-container">
                <input
                  className="modal-add-member-input"
                  placeholder="Enter an Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <button
                  className="modal-add-member-btn"
                  onClick={() => {
                    addMember(bookId, email);
                  }}
                >
                  add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const DeleteBookModal = (props) => {
  let navigate = useNavigate();
  const { bookId, userId, setBooks } = props;
  const modalStyle = ["modal-none", "modal-block"];

  const [modalStyleIdx, setModalStyleIdx] = useState(0);
  const deleteBook = (userId, bookId) => {
    fetch(
      `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/members?bookId=${bookId}&userId=${userId}`,
      {
        method: "DELETE",
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
      .then((json) => {
        setModalStyleIdx(0);
        setBooks(json.data);
        navigate(`/book`, { replace: true });
      });
  };
  return (
    <>
      <div
        className="modal-delete-book"
        onClick={() => {
          setModalStyleIdx(modalStyleIdx ^ 1);
        }}
      ></div>
      <div className={`modal ${modalStyle[modalStyleIdx]}`}>
        <div className="modal-content">
          <span
            className="close"
            onClick={() => {
              setModalStyleIdx(0);
            }}
          >
            &times;
          </span>
          <div className="modal-window">
            <div>
              <h3>Delete Account Book</h3>
              <p>Are you sure you want to delete this Book?</p>

              <div className="delete-bookcheck-btns">
                <Link to="/book">
                  <button
                    onClick={() => {
                      setModalStyleIdx(0);
                    }}
                    className="cancelbtn"
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  onClick={() => deleteBook(userId, bookId)}
                  className="deletebtn"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const EditNameModel = (props) => {
  let navigate = useNavigate();
  const { userId, name, setName, setShowName } = props;
  const modalStyle = ["modal-none", "modal-block"];

  const [modalStyleIdx, setModalStyleIdx] = useState(0);
  const editName = (userId) => {
    if (name.trim() === "") {
      alert("Please type a valid name");
      return;
    }
    const body = {
      name: name,
    };
    fetch(`${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/user?id=${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status === 401) {
          alert("Please log in");
          navigate(`/`, { replace: true });
        }
        return response.json();
      })
      .then((json) => {
        setShowName(name);
        localStorage.setItem("username", name);
        setModalStyleIdx(0);
        navigate(`/settings`, { replace: true });
      });
  };
  return (
    <>
      <div
        className="name-edit"
        onClick={() => {
          setModalStyleIdx(modalStyleIdx ^ 1);
        }}
      >
        edit
      </div>
      <div className={`modal ${modalStyle[modalStyleIdx]}`}>
        <div className="modal-content">
          <span
            className="close"
            onClick={() => {
              setModalStyleIdx(0);
            }}
          >
            &times;
          </span>
          <div className="modal-window">
            <div>
              <h3>Name</h3>
              <input
                type="text"
                value={name.trim()}
                onChange={(e) => {
                  e.target.value.trim();
                  let len = getStrLength(e.target.value);
                  if (len <= 16) {
                    setName(e.target.value);
                  } else {
                    alert("You have received maximun number of this field");
                  }
                }}
              />
              <div className="name-edit-btns">
                <Link to="/settings">
                  <button
                    onClick={() => {
                      setModalStyleIdx(0);
                    }}
                    className="name-cancel-btn"
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  onClick={() => editName(userId)}
                  className="name-save-btn"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const EditPictureModel = (props) => {
  let navigate = useNavigate();
  const { userId, setPicture } = props;
  const [uploadFile, setUploadFile] = useState(null);
  const modalStyle = ["modal-none", "modal-block"];

  const [modalStyleIdx, setModalStyleIdx] = useState(0);
  const editPic = (userId) => {
    if (uploadFile === null) {
      alert("Please select a picture to upload");
      return;
    }
    let formData = new FormData();
    formData.append("picture", uploadFile);
    fetch(`${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/user?id=${userId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: formData,
    })
      .then((response) => {
        if (response.status === 401) {
          // alert("Please log in");
          navigate(`/signIn`, { replace: true });
        }
        return response.json();
      })
      .then((json) => {
        setPicture(
          `${REACT_APP_CLOUDFRONT_PATH}/user/${userId}/${json.data.picture}`
        );
        localStorage.setItem(
          "picture",
          `${REACT_APP_CLOUDFRONT_PATH}/user/${userId}/${json.data.picture}`
        );
        setModalStyleIdx(0);
        navigate(`/settings`, { replace: true });
      });
  };
  return (
    <>
      <div
        className="name-edit"
        onClick={() => {
          setModalStyleIdx(modalStyleIdx ^ 1);
        }}
      >
        edit
      </div>
      <div className={`modal ${modalStyle[modalStyleIdx]}`}>
        <div className="modal-content">
          <span
            className="close"
            onClick={() => {
              setModalStyleIdx(0);
            }}
          >
            &times;
          </span>
          <div className="modal-window">
            <div>
              <h3>Picture</h3>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setUploadFile(e.target.files[0]);
                }}
              />

              <div className="name-edit-btns">
                <Link to="/settings">
                  <button
                    onClick={() => {
                      setModalStyleIdx(0);
                    }}
                    className="name-cancel-btn"
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  onClick={() => editPic(userId)}
                  className="name-save-btn"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const EditBudgetModel = (props) => {
  let navigate = useNavigate();
  const { bookId, budget, setBudget } = props;
  const [showBudget, setShowBudget] = useState(parseInt(budget));
  const modalStyle = ["modal-none", "modal-block"];

  const [modalStyleIdx, setModalStyleIdx] = useState(0);
  const editBudget = (bookId) => {
    const body = {
      budget: parseInt(showBudget),
    };
    fetch(`${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/books?id=${bookId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status === 401) {
          // alert("Please log in");
          navigate(`/signIn`, { replace: true });
        }
        return response.json();
      })
      .then((json) => {
        setBudget(parseInt(showBudget));
        setModalStyleIdx(0);
        navigate(`/book/${bookId}`, { replace: true });
      });
  };
  return (
    <>
      <div
        className="budget-edit"
        onClick={() => {
          setModalStyleIdx(modalStyleIdx ^ 1);
        }}
      ></div>
      <div className={`modal ${modalStyle[modalStyleIdx]}`}>
        <div className="modal-content">
          <span
            className="close"
            onClick={() => {
              setModalStyleIdx(0);
            }}
          >
            &times;
          </span>
          <div className="modal-window">
            <div>
              <h3>Budget</h3>
              <input
                min="0"
                max="1000000"
                type="number"
                value={parseInt(showBudget)}
                onChange={(e) => {
                  if (e.target.value < 0) {
                    e.target.value = 0;
                    alert("Minimum number is 0");
                  }
                  if (e.target.value >= 1000000) {
                    e.target.value = 1000000;
                    alert("Maximum number is 1000000");
                  }
                  setShowBudget(e.target.value);
                }}
              />
              <div className="budget-edit-btns">
                <Link to={`/book/${bookId}`}>
                  <button
                    onClick={() => {
                      setModalStyleIdx(0);
                    }}
                    className="budget-cancel-btn"
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  onClick={() => editBudget(bookId)}
                  className="budget-save-btn"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export {
  PaidModal,
  SplitModal,
  AddMemberModal,
  DeleteBookModal,
  EditNameModel,
  EditPictureModel,
  EditBudgetModel,
};
