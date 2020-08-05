import { firestoreAction } from "vuexfire";
import db from "../firebaseinit";

const state = {
  orders: [],
};
const getters = {};
const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef(
      "orders",
      db.collection("Orders").where("responseStatus", "==", "none")
    );
  }),
};

export default {
  namespaced: true,
  state,
  actions,
};
