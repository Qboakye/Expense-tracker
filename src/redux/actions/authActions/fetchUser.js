import { auth } from "../../../auth/firebase";
import { db } from "../../../auth/firebase";
import { getUserCategory } from "../../../utils/getUserCategory";
import { getUserData } from "../../../utils/getUserData";

export const fetchUser = () => {
  return (dispatch) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        getUserData(db, dispatch, user.uid);
        getUserCategory(db, dispatch, user.uid);
      } else {
        dispatch({ type: "CHECKED" });
        dispatch({ type: "FETCH_USER", user: null });
      }
    });
  };
};
