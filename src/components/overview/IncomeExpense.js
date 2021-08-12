import { Link } from "react-router-dom";
import SecondaryComponent from "./SecondaryComponent";

function IncomeExpense() {
  return (
    <div className="income-expense-container">
      <section className="income-section similar-container">
        <header className="flex-space">
          <h3>Income</h3>
          <small>
            <Link to="/transactions">View All</Link>
          </small>
        </header>
        <div className="income-container">
          <SecondaryComponent element="income" />
        </div>
      </section>
      <section className="expense-container similar-container">
        <header className="flex-space">
          <h3>Expenses</h3>
          <small>
            <Link to="/transactions">View All</Link>
          </small>
        </header>
        <div className="expense-container">
          <SecondaryComponent element="expense" />
        </div>
      </section>
    </div>
  );
}

export default IncomeExpense;
