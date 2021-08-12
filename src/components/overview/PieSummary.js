import { connect } from "react-redux";
import { pieSum } from "../../utils/aggregator";

function PieSummary({ bankStatements, currency }) {
  const { expense, income } = bankStatements;

  return (
    <div className="pieSum">
      <p>
        Net Value {currency}
        {+income - +expense}
      </p>
      <p>
        Total Expense {currency}
        {expense}
      </p>
      <p>
        Total Income {currency}
        {income}
      </p>
    </div>
  );
}

const mapStateToProps = (state) => {
  let selectedBank = state.project.allBanks.find(({ active }) => active);

  return {
    bankStatements: pieSum(selectedBank.bankStatements),
    currency: state.project.currency,
  };
};

export default connect(mapStateToProps, null)(PieSummary);
