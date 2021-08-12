export function aggregator(statements) {
  let arr = [];
  for (const [key, value] of Object.entries(statements)) {
    arr.push({
      name: key,
      values: value.reduce((acc, val) => (acc += +val.price), 0),
    });
  }
  return arr;
}

export function pieSum(statements) {
  let arr = [];

  for (const [key, value] of Object.entries(statements)) {
    arr.push({
      name: key,
      values: value.reduce((acc, val) => (acc += +val.price), 0),
    });
  }

  return arr.reduce(
    (acc, cur) => {
      acc[cur.name] = cur.values;
      return acc;
    },
    { income: 0, expense: 0 }
  );
}
