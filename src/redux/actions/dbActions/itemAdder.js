import { db } from "../../../auth/firebase";
import { auth } from "../../../auth/firebase";
import firebase from "firebase/app";

export const itemAdder = (details) => {
  let newValues = {
    id: details.id,
    name: details.transactionName,
    date: details.date,
    price: details.transactionAmount,
    category: details.category,
  };
  let secName = details.filter;
  let name = "bankStatements." + secName;
  return async (dispatch) => {
    let doc = await db
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("banks")
      .doc(details.bankName);

    doc.update({
      [name]: firebase.firestore.FieldValue.arrayUnion(newValues),
    });

    await db
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("categories")
      .doc("categories")
      .update({
        [secName]: firebase.firestore.FieldValue.arrayUnion(details.category),
      });

    await doc.get().then((doc) => {
      let data = doc.data().bankStatements[details.filter];
      dispatch({
        type: "ADD_ITEM",
        details,
        data,
      });
    });
  };
};
