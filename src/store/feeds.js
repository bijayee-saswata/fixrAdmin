import { firestoreAction } from "vuexfire";
import db from "../firebaseinit";
import firebase from "firebase";

const state = {
  feedbacks: [],
  locked: false,
  loading: true,
};
const actions = {
  init: firestoreAction(({ state, bindFirestoreRef }) => {
    state.loading = true;
    bindFirestoreRef(
      "feedbacks",
      db
        .collection("feedBacks")
        .orderBy("createdDate", "desc")
        .where("status", "==", "issue")
    )
      .then(() => {
        state.loading = false;
      })
      .catch((err) => {
        alert(err);
      });
  }),
  resolved: firestoreAction(({ state }, id) => {
    state.locked = true;
    db.collection("feedBacks")
      .doc(id)
      .set(
        {
          status: "resolved",
          updatedDate: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      )
      .then(() => {
        state.locked = false;
      })
      .catch((err) => {
        alert(err);
      });
  }),
};

export default {
  namespaced: true,
  state,
  actions,
};
