import "./setting.css";
const Setting = () => {
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
          <hr></hr>
          <>
            <div className="setting-list-details">
              <div className="setting-list-detail">name</div>
              <button className="setting-list-settle">change</button>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default Setting;
