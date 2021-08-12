import { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { select } from "d3";
import { aggregator } from "../../utils/aggregator";
import { renderPieChart } from "../../utils/renderPieChart";

function PieChart({ bankStatements }) {
  const myRef = useRef();
  const [statements, setStatements] = useState(bankStatements);

  useEffect(() => {
    setStatements(bankStatements);
  }, [bankStatements]);

  useEffect(() => {
    select(myRef.current).selectAll("*").remove();
    renderPieChart(statements, myRef);
  }, [statements]);

  return (
    <div id="pie">
      <svg ref={myRef}></svg>
    </div>
  );
}

const mapStateToProps = (state) => {
  let selectedBank = state.project.allBanks.find(({ active }) => active);

  return {
    bankStatements: aggregator(selectedBank.bankStatements),
  };
};

export default connect(mapStateToProps, null)(PieChart);
