import "./setting.css";
import { useState } from "react";
import { EditNameModel, EditPictureModel } from "../modal/modal";
const Setting = (props) => {
  const { userId, username, userPicture } = props;
  const [name, setName] = useState(username);
  const [showName, setShowName] = useState(username);
  const [picture, setPicture] = useState(userPicture);
  return (
    <div>
      <div className="setting-nav-container">
        <div className="setting-nav">
          <div className="setting-page-logo"></div>
          <div></div>
        </div>
      </div>
      <div className="setting-container">
        <div className="setting-list">
          <div className="setting-list-header">
            <div style={{ fontSize: "22px" }}>Setting</div>
          </div>
          <div className="setting-list-details">
            <div className="setting-list-detail-key-name">Name: </div>
            <div className="setting-list-detail-value">{showName}</div>
            <div>
              <EditNameModel
                name={name}
                userId={userId}
                setName={setName}
                setShowName={setShowName}
              />
            </div>
          </div>

          <div className="setting-list-details">
            <div className="setting-list-detail-key-pic">Picture: </div>
            <div className="setting-list-detail-value">
              <div
                className="setting-list-detail-pic"
                style={{ backgroundImage: `url(${picture})` }}
              ></div>
            </div>
            <div>
              <EditPictureModel setPicture={setPicture} userId={userId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
