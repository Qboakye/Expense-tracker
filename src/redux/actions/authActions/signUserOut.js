import { auth } from "../../../auth/firebase";

export const signUserOut = () => (dispatch) => {
  auth
    .signOut()
    .then(() => {
      dispatch({ type: "SIGN_OUT" });
      dispatch({ type: "EMPTY_BANKS" });
      dispatch({ type: "CHECKED" });
    })
    .catch((error) => {
      console.log(error);
    });
};
