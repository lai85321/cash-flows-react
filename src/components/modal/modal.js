import { useState } from "react";
import "./modal.css";

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
                  <div>
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
export { PaidModal, SplitModal };
