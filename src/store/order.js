import { firestoreAction } from "vuexfire";
import db from "../firebaseinit";

const state = {
  orders: [],
  loading: true,
};
const actions = {
  init: firestoreAction(({ state, bindFirestoreRef }) => {
    state.loading = true;
    bindFirestoreRef(
      "orders",
      db.collection("Orders").where("responseStatus", "==", "none")
    )
      .then(() => {
        state.loading = false;
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
