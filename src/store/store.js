
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
//database 
import db from "../firebaseinit";
//import firebase from 'firebase';

export const store = new Vuex.Store({
    state: {
        feedBacks: [],
    },
    getters: {
        loadData: state=> {
            return state.feedBacks;
        }
    },
    mutations: {
        Datas(state, payload) {
            state.feedBacks=payload;
        }
    },
    actions: {
        fetchDatas({ commit }) {
                // db.collection("feedBacks").onSnapshot(querySnapshot => {
                //     let changes = querySnapshot.docChanges();
                db.collection("feedBacks")
              .get()
              .then(querySnapshot => {
                //  console.log(querySnapshot.docs);
                  let data=[];
                querySnapshot.docs.forEach(doc => {
                  data.push({
                    id: doc.id,
                    name: doc.data().name,
                    phone: doc.data().phone,
                    msg: doc.data().message
                  });
                 
                 // this.$store.state.feedBacks.push(data);
                });
                commit("Datas", data);
        }
        )
    }
}
});