const options = { month: "short" };

export function monthFixer(statements) {
  let arr = [];
  for (const value of Object.values(statements)) {
    let date = new Date(value.date);
    arr.push({
      price: value.price,
      month: new Intl.DateTimeFormat("en-US", options).format(date),
    });
  }

  return arr;
}
