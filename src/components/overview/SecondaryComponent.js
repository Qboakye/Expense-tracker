import { useState, useEffect } from "react";
import { connect } from "react-redux";

import { overviewLogo } from "../../utils/logoReturner";

function SecondaryComponent({ bankStatements, currency }) {
  const [bankStatement, setbankStatement] = useState(bankStatements);

  useEffect(() => {
    setbankStatement(bankStatements);
  }, [bankStatements]);

  let newArr = [];
  for (let i = 0; i < bankStatement.length; i++) {
    newArr.push(
      <article key={bankStatement[i].id} className="item flex-space">
        <div className="item-details flex">
          <div className="item-logo">{bankStatement[i].img}</div>
          <div className="item-name">
            <p>{bankStatement[i].name}</p>
            <small>{bankStatement[i].category}</small>
          </div>
        </div>
        <p>
          {currency}
          {bankStatement[i].price}
        </p>
      </article>
    );
  }

  newArr.length = 4;

  return <>{newArr}</>;
}

const mapStateToProps = (state, ownProps) => {
  let selectedBank = state.project.allBanks.find(({ active }) => active);

  for (const key of Object.keys(selectedBank.bankStatements)) {
    if (key === ownProps.element) {
      selectedBank = selectedBank.bankStatements[key];
    }
  }

  selectedBank = overviewLogo(selectedBank);

  return {
    bankStatements: selectedBank.reverse(),
    currency: state.project.currency,
  };
};

export default connect(mapStateToProps, null)(SecondaryComponent);
