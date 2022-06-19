import "./account-list.css";
const AmountList = (props) => {
  //const {date, total, amount, details }=props
  // const data = {
  //   date: "6/17",
  //   total: 300,
  //   details: [
  //     {
  //       amount: 100,
  //       detail: "早餐",
  //     },
  //     {
  //       amount: 200,
  //       detail: "午餐",
  //     },
  //   ],
  // };

  return (
    <div className="list">
      <div className="header">
        <div className="date">{data.date}</div>
        <div className="total">{data.total}</div>
      </div>
      <hr></hr>
      {data.details.map((item, index) => {
        return (
          <div className="details">
            <div className="item">
              <div className="tag"></div>
              <div className="detail">{item.detail}</div>
            </div>
            <div className="amount">{item.amount}</div>
          </div>
        );
      })}
    </div>
  );
};

export default AmountList;
