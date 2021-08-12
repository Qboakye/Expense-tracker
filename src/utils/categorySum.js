const selectCat = (cat, filter) => {
  if (filter === "overall") {
    return cat.income.concat(cat.expense);
  } else {
    return cat[filter];
  }
};

export const categorySum = (bankStatements, cat, filter) => {
  function catReturn() {
    let arr = selectCat(cat, filter) || [];
    let newArr = [];
    for (let index = 0; index < arr.length; index++) {
      newArr.push({ category: arr[index], price: 0 });
    }
    return newArr;
  }

  return bankStatements.reduce((acc, statement) => {
    for (let i = 0; i < acc.length; i++) {
      if (statement.category === acc[i].category) {
        acc[i].price += +statement.price;
      }
    }
    return acc;
  }, catReturn());
};
