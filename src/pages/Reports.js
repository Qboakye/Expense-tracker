import "../css/reports.css";
import Side from "../components/layout/Side";
import ReportsMain from "../components/reports/ReportsMain";
import NavBar from "../components/layout/NavBar";

function Reports() {
  return (
    <>
      <NavBar />
      <ReportsMain />
      <Side />
    </>
  );
}

export default Reports;
