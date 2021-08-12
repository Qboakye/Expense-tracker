export const currencyChanger = (currency) => {
  return (dispatch) => {
    localStorage.setItem("currency", currency);
    dispatch({ type: "CURRENCY_SELECTED", currency });
  };
};
