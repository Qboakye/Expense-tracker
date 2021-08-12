import { auth } from "../../../auth/firebase";
import { db } from "../../../auth/firebase";

export const walletAdder = (account) => {
  let newBank = {
    id: account.id,
    active: false,
    bankName: account.accountName,
    bankStatements: {
      income: [],
      expense: [],
    },
  };
  return (dispatch) => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("banks")
      .doc(account.accountName)
      .set(newBank)
      .then(() => {
        dispatch({ type: "ADD_WALLET", newBank });
      });
  };
};
