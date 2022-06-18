import "./balance.css";

const Balance = () => {
  const balanceData = [
    {
      name: "User 1",
      balance: [
        {
          name: "User 2",
          amount: 100,
        },
        {
          name: "User 3",
          amount: 100,
        },
      ],
    },
    {
      name: "User 2",
      balance: [
        {
          name: "User 1",
          amount: -100,
        },
      ],
    },
    {
      name: "User 3",
      balance: [
        {
          name: "User 1",
          amount: -100,
        },
      ],
    },
  ];
  return (
    <div className="bal-container">
      {/* <div className='bal'>
                <div className='bal-user'>
                    <div className='bal-user-image'>
                    </div>
                    <div className='bal-user-name'>
                        name
                    </div>
                </div>
                <div className='bal-details'>
                    <div className='bal-detail'>
                    </div>
                </div>
            </div> */}
      {balanceData.map((balance, index) => {
        return (
          <div key={index} className="bal">
            <div className="bal-user">
              <div className="bal-user-image"></div>
              <div className="bal-user-name">{balance.name}</div>
            </div>
            <div className="bal-details">
              {balance.balance.map((item, index) => {
                const owe = item.amount > 0;
                if (owe) {
                  return (
                    <div key={index} className="bal-detail">
                      Owe {item.name} {Math.abs(+item.amount)}
                    </div>
                  );
                } else {
                  return (
                    <div className="bal-detail">
                      Lend {item.name} {Math.abs(+item.amount)}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Balance;
