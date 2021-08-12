import Title from "../title/Title";
import HighestValue from "./HighestValue";
import BarChart from "./BarChart";

function ReportsMain() {
  return (
    <main className="main-view">
      <Title title="Reports" />
      <section>
        <section className="chart">
          <BarChart />
        </section>
        <section className="highest-values">
          <HighestValue />
        </section>
      </section>
    </main>
  );
}

export default ReportsMain;
