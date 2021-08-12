import { useState, useEffect } from "react";
import { connect } from "react-redux";

import Title from "../title/Title";
import EditItem from "./EditItem";
import RemoveItem from "./RemoveItem";

import { selectFilter } from "../../utils/selectFilter";

function TransactionsMain({ bankStatements, filter, bankName, currency }) {
  const [bankStatement, setBankStatement] = useState(bankStatements);

  useEffect(() => {
    setBankStatement(bankStatements);
  }, [bankStatements]);

  return (
    <main className="main-view">
      <Title title="Transactions" />
      <section className="transactions-container">
        <aside className="transactions-header">
          <div className="transactions-number">
            No. of Transactions ({filter}): {bankStatement.length}
          </div>
          <div className="transactions-value">
            Value: {currency}
            {bankStatement.reduce((acc, curr) => {
              return (acc += +curr.price);
            }, 0)}
          </div>
        </aside>
        <div className="scroll">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {bankStatement.reverse().map((data, index) => (
                <tr key={data.id}>
                  <td>{index + 1}</td>
                  <td>{data.name}</td>
                  <td>{data.date}</td>
                  <td>{data.category}</td>
                  <td>
                    {currency}
                    {data.price}
                  </td>
                  <td>
                    <RemoveItem
                      id={data.id}
                      filter={filter}
                      bankName={bankName}
                    />
                    <EditItem data={data} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

const mapStateToProps = (state) => {
  let selectedBank = state.project.allBanks.find(({ active }) => active);
  let newBankStatements = selectFilter(
    selectedBank.bankStatements,
    state.project.filter
  );

  return {
    bankStatements: newBankStatements,
    filter: state.project.filter,
    bankName: selectedBank.bankName,
    currency: state.project.currency,
  };
};

export default connect(mapStateToProps, null)(TransactionsMain);
