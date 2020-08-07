import { firestoreAction } from "vuexfire";
import db from "../firebaseinit";

const state = {
  users: [],
  loading: true,
};
const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef("users", db.collection("users").limit(20)).then(() => {
      state.loading = false;
    });
  }),
  search: firestoreAction(({ state, bindFirestoreRef }, query) => {
    state.loading = true;

    if (query) {
      query = query.trim();
      bindFirestoreRef(
        "users",
        db
          .collection("users")
          .where("phone", "==", query.includes("+91") ? query : `+91${query}`)
      ).then(() => {
        state.loading = false;
      });
    } else {
      bindFirestoreRef("users", db.collection("users").limit(20)).then(() => {
        state.loading = false;
      });
    }
  }),
  removeUser: firestoreAction(({ state }, id) => {
    const res = confirm(
      `Are you sure to delete the user ${id} ? Once done can't be retrieve back..!`
    );
    if (res) {
      db.collection("users")
        .doc(id)
        .delete()
        .then(() => {
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
