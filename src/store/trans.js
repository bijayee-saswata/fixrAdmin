import { firestoreAction } from "vuexfire";
import db from "../firebaseinit";

const state = {
  transactions: [],
  loading: true,
};
const actions = {
  init: firestoreAction(({ state, bindFirestoreRef }) => {
    bindFirestoreRef(
      "transactions",
      db
        .collection("Orders")
        .orderBy("transactionDate", "desc")
        .limit(10)
    ).then(() => {
      state.loading = false;
    });
  }),
  search: firestoreAction(({ state, bindFirestoreRef }, query) => {
    state.loading = true;
    if (query) {
      bindFirestoreRef(
        "transactions",
        db
          .collection("Orders")
          .orderBy("transactionDate", "desc")
          .where("serviceAddress.phone", "==", query)
      ).then(() => {
        state.loading = false;
      });
    } else {
      bindFirestoreRef(
        "transactions",
        db
          .collection("Orders")
          .orderBy("transactionDate", "desc")
          .limit(10)
      ).then(() => {
        state.loading = false;
      });
    }
  }),
};

export default {
  namespaced: true,
  state,
  actions,
};
