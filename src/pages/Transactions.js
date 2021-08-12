import "../css/transactions.css";
import Side from "../components/layout/Side";
import TransactionsMain from "../components/transactions/TransactionsMain";
import NavBar from "../components/layout/NavBar";

function Transactions() {
  return (
    <>
      <NavBar />
      <TransactionsMain />
      <Side />
    </>
  );
}

export default Transactions;
