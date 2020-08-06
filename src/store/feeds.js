import { firestoreAction } from "vuexfire";
import db from "../firebaseinit";

const state = {
  feedbacks: [],
  locked: false,
};
const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef(
      "feedbacks",
      db
        .collection("feedBacks")
        .orderBy("createdDate", "desc")
        .where("status", "==", "issue")
    );
  }),
  resolved: firestoreAction(({ state }, id) => {
    state.locked = true;
    db.collection("feedBacks")
      .doc(id)
      .set({ status: "resolved" }, { merge: true })
      .then(() => {
        state.locked = false;
      });
  }),
};

export default {
  namespaced: true,
  state,
  actions,
};
