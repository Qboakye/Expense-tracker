export const walletChanger = (name) => {
  return {
    type: "CHANGE_WALLET",
    name,
  };
};
