let selectedStatement;

export const selectFilter = (bankStatements, filter) => {
  if (filter === "overall") {
    return bankStatements.income.concat(bankStatements.expense);
  } else {
    for (const key of Object.keys(bankStatements)) {
      if (key === filter) {
        selectedStatement = bankStatements[key];
      }
    }
    return selectedStatement;
  }
};
