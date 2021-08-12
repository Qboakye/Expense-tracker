export const getUserCategory = (db, dispatch, user) => {
  db.collection("users")
    .doc(user)
    .collection("categories")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(() => {
        let val = querySnapshot.docs.map((doc) => {
          return doc.data();
        });
        dispatch({ type: "FETCHED_CATEGORY", doc: val });
      });
    });
};
