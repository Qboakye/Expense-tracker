import { auth } from "../../../auth/firebase";
import { db } from "../../../auth/firebase";
import { getUserCategory } from "../../../utils/getUserCategory";
import { getUserData } from "../../../utils/getUserData";

export const logUserIn = (details) => {
  return (dispatch) => {
    auth
      .signInWithEmailAndPassword(details.email, details.password)
      .then(() => {
        getUserData(db, dispatch, auth.currentUser.uid);
        getUserCategory(db, dispatch, auth.currentUser.uid);
      })
      .catch((error) => {
        dispatch({ type: "ERROR_LOGGING_IN", error });
      });
  };
};
