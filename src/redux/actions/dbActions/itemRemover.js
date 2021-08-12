import { db } from "../../../auth/firebase";
import { auth } from "../../../auth/firebase";

export const itemRemover = (id, filter, bankName) => {
  let name = "bankStatements." + filter;

  return async (dispatch) => {
    let doc = await db
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("banks")
      .doc(bankName);

    let data = await doc.get().then((doc) => {
      let newArr = doc.data().bankStatements[filter];
      return newArr.filter((statement) => statement.id !== id);
    });

    doc
      .update({
        [name]: data,
      })
      .then(() =>
        dispatch({
          type: "REMOVE_ITEM",
          data,
          filter,
        })
      );
  };
};
