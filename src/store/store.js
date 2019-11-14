
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
//database 
import db from "../firebaseinit";
//import firebase from 'firebase';

export const store = new Vuex.Store({
    state: {
        feedBacks: [],
        users: []
    },
    getters: {
        loadFeedData: state=> {
            return state.feedBacks;
        },
        loadUserData: state => {
          return state.users;
          // console.log(state.users);
          
        }
    },
    mutations: {
        feedDatas(state, payload) {
            state.feedBacks=payload;
        },
        userDatas(state,payload){
          state.users = payload;
        }

    },
    actions: {
      //feedback datas
        fetchFeedDatas({ commit }) {
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
                commit("feedDatas", data);
        }
        )
    },

  //users data
  fetchUserDatas({ commit }) {
    db.collection("users").onSnapshot(querySnapshot => {
      let changes = querySnapshot.docChanges();
      let data = [];
        changes.forEach(change => {
          if(change.type == 'added'){
            data.push( {
            id: change.doc.id,
            name: change.doc.data().name,
            phone: change.doc.data().phone,
            address: change.doc.data().areaAndStreet,
            locality: change.doc.data().locality,
            pin: change.doc.data().pincode
          });
          
          }
          else if(change.type == 'removed'){
            this.data.splice(change.doc.id,1);
          }
          
        });
        commit("userDatas", data);
      }
      );
}

}
});