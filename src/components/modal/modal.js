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
  const { details, splitBtnShow, setSplitBtnShow } = props;
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
          {details.map((item, index) => {
            return (
              <div
                className="paid-option"
                onClick={(e) => {
                  setSplitBtnShow(e.target.textContent);

                  setModalStyleIdx(0);
                }}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export { PaidModal, SplitModal };
