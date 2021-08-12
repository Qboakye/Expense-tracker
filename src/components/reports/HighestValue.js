import { useState, useEffect } from "react";
import { connect } from "react-redux";

import { reportsLogo } from "../../utils/logoReturner";
import { selectFilter } from "../../utils/selectFilter";
import { categorySum } from "../../utils/categorySum";

let highest;

function ReportsMain({ bankStatements, filter, cat, currency }) {
  let statements = categorySum(bankStatements, cat, filter);

  highest = reportsLogo(statements).sort((a, b) => b.price - a.price);

  const [data, setData] = useState(highest);

  useEffect(() => {
    setData(highest);
  }, [filter, cat, bankStatements]);

  let newArr = [];
  for (let i = 0; i < data.length; i++) {
    newArr.push(
      <article key={i} className="highest-value-item">
        <div className="value-item-logo">{data[i].img}</div>
        <p>{data[i].category}</p>
        <p>
          {currency}
          {data[i].price}
        </p>
      </article>
    );
  }

  newArr.length = 4;

  let value;
  if (filter === "income") {
    value = "Categories with highest income";
  } else if (filter === "expense") {
    value = "Categories with highest expenditure";
  } else {
    value = "Categories with high values";
  }

  return (
    <>
      <h3> {value}</h3>
      <div className="highest-value-container">{newArr}</div>
    </>
  );
}

const mapStateToProps = (state) => {
  let selectedBank = state.project.allBanks.find(({ active }) => active);
  selectedBank = selectFilter(
    selectedBank.bankStatements,
    state.project.filter
  ).map((statement) => ({
    category: statement.category,
    price: statement.price,
  }));

  return {
    bankStatements: selectedBank,
    filter: state.project.filter,
    cat: state.project.categories,
    currency: state.project.currency,
  };
};

export default connect(mapStateToProps, null)(ReportsMain);
