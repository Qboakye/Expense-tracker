import { db } from "../../../auth/firebase";
import { auth } from "../../../auth/firebase";

export const itemEditer = (details) => {
  let newValues = {
    id: details.id,
    name: details.transactionName,
    date: details.date,
    price: details.transactionAmount,
    category: details.category,
  };
  let name = "bankStatements." + details.filter;

  return async (dispatch) => {
    let doc = await db
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("banks")
      .doc(details.bankName);

    let data = await doc.get().then((doc) => {
      let newArr = doc.data().bankStatements[details.filter];
      return newArr.map((statement) => {
        if (statement.id === details.id) {
          return { ...statement, ...newValues };
        }
        return statement;
      });
    });

    doc
      .update({
        [name]: data,
      })
      .then(() =>
        dispatch({
          type: "EDIT_ITEM",
          details,
          data,
        })
      );
  };
};
