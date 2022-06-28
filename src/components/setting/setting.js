import "./setting.css";
const Setting = () => {
  return (
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
  );
};

export default Setting;
