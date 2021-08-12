export const getUserData = (db, dispatch, user) => {
  dispatch({ type: "CHECKING" });
  db.collection("users")
    .doc(user)
    .collection("banks")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(() => {
        let val = querySnapshot.docs.map((doc) => {
          return doc.data();
        });

        dispatch({ type: "FETCHED_DATA", doc: val });
        dispatch({ type: "LOGGING_IN", user: user });
        dispatch({ type: "CHECKED" });
      });
    });
};
