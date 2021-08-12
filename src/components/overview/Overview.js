import IncomeExpense from "./IncomeExpense";
import Title from "../title/Title";
import PieChart from "./PieChart";
import PieSummary from "./PieSummary";

function Overview() {
  return (
    <main className="main-view">
      <Title title="Overview" />
      <section>
        <section className="chart">
          <PieChart />
          <PieSummary />
        </section>
        <IncomeExpense />
      </section>
    </main>
  );
}

export default Overview;
