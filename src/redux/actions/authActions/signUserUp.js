import { auth } from "../../../auth/firebase";
import { db } from "../../../auth/firebase";
import { v4 as uuidv4 } from "uuid";
import { getUserData } from "../../../utils/getUserData";
import { getUserCategory } from "../../../utils/getUserCategory";

export const signUserUp = (details) => {
  return (dispatch) => {
    auth
      .createUserWithEmailAndPassword(details.email, details.password)
      .then((resp) => {
        db.collection("users")
          .doc(resp.user.uid)
          .collection("banks")
          .doc(details.account)
          .set({
            id: uuidv4(),
            active: false,
            bankName: details.account,
            bankStatements: {
              income: [],
              expense: [],
            },
          });
        db.collection("users")
          .doc(resp.user.uid)
          .collection("banks")
          .doc("cal bank")
          .set({
            id: 1,
            bankName: "cal bank",
            active: true,
            bankStatements: {
              income: [
                {
                  id: 1,
                  name: "family",
                  date: "2021-11-12",
                  price: 50,
                  category: "gift",
                },
                {
                  id: 2,
                  name: "january",
                  date: "2021-11-01",
                  price: 500,
                  category: "salary",
                },
                {
                  id: 3,
                  name: "dividend",
                  date: "2021-12-02",
                  price: 30,
                  category: "investment",
                },
                {
                  id: 4,
                  name: "capital appreciation",
                  date: "2021-11-15",
                  price: 50,
                  category: "investment",
                },
              ],
              expense: [
                {
                  id: 5,
                  name: "fuel",
                  date: "2021-10-15",
                  price: 50,
                  category: "automobile",
                },
                {
                  id: 6,
                  name: "pizza",
                  date: "2021-11-15",
                  price: 12,
                  category: "food",
                },
                {
                  id: 7,
                  name: "tomatoes",
                  date: "2021-12-02",
                  price: 3,
                  category: "grocery",
                },
                {
                  id: 8,
                  name: "utensils",
                  date: "2021-12-20",
                  price: 50,
                  category: "household",
                },
              ],
            },
          });

        db.collection("users")
          .doc(resp.user.uid)
          .collection("categories")
          .doc("categories")
          .set({
            income: ["gift", "salary", "investment"],
            expense: ["household", "food", "automobile", "grocery"],
          });
      })
      .then(() => {
        dispatch({ type: "SIGNING_UP" });
        getUserData(db, dispatch, auth.currentUser.uid);
        getUserCategory(db, dispatch, auth.currentUser.uid);
      })
      .catch((error) => {
        dispatch({ type: "ERROR_SIGNING_UP", error });
      });
  };
};
