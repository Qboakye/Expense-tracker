import "../css/overview.css";
import Side from "../components/layout/Side";
import Overview from "../components/overview/Overview";
import NavBar from "../components/layout/NavBar";

function Dashboard() {
  return (
    <>
      <NavBar />
      <Overview />
      <Side />
    </>
  );
}

export default Dashboard;
