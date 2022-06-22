import "./balance.css";

const Balance = (props) => {
  const { data } = props;
  return (
    <div className="bal-container">
      {data.map((userBalance, index) => {
        return (
          <div key={index} className="bal">
            <div className="bal-user">
              <div className="bal-user-image"></div>
              <div className="bal-user-name">{userBalance.name}</div>
            </div>
            <div className="bal-details">
              {userBalance.balance.details.map((item, index) => {
                return (
                  <div key={index} className="bal-detail">
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Balance;
