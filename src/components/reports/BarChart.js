import { useState, useEffect, useRef } from "react";
import { select } from "d3";
import { connect } from "react-redux";
import { selectFilter } from "../../utils/selectFilter";
import { renderBarChart } from "../../utils/renderBarChart";
import { categorySum } from "../../utils/categorySum";

let statementss;

function BarChart({ bankStatements, cat, filter, currency }) {
  statementss = categorySum(bankStatements, cat, filter);

  const [statements, setStatements] = useState(statementss);
  const myRef = useRef();

  useEffect(() => {
    setStatements(statementss);
  }, [bankStatements]);

  useEffect(() => {
    select(myRef.current).selectAll("*").remove();
    renderBarChart(statements, myRef, currency);
  }, [statements, currency]);

  return (
    <div id="demo">
      <svg ref={myRef}></svg>
    </div>
  );
}

const mapStateToProps = ({ project }) => {
  let selectedBank = project.allBanks.find(({ active }) => active);
  selectedBank = selectFilter(selectedBank.bankStatements, project.filter).map(
    (statement) => ({
      category: statement.category,
      price: statement.price,
    })
  );

  return {
    bankStatements: selectedBank,
    filter: project.filter,
    cat: project.categories,
    currency: project.currency,
  };
};

export default connect(mapStateToProps, null)(BarChart);
