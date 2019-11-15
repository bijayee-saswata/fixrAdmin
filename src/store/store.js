
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
//database 
import db from "../firebaseinit";
//import firebase from 'firebase';

export const store = new Vuex.Store({
    state: {
        feedBacks: [],
        users: [],
        orders: [],
        transactions: [],
        color: 0
    },
    getters: {
        loadFeedData: state=> {
            return state.feedBacks;
        },
        loadUserData: state => {
          return state.users;
          // console.log(state.users);
          
        },
        loadOrderData: state =>{
          return state.orders;
        },
        loadTranData: state => {
          return state.transactions;
        }
    },
    mutations: {
        feedDatas(state, payload) {
            state.feedBacks=payload;
        },
        userDatas(state,payload){
          state.users.push(payload) ;
        },
        deleteUser(state, id){
        state.users.splice(id, 1);
        
         },
        orderDatas(state,payload){
          state.orders.push(payload);
        },
        deleteOrder(state,id){
          state.orders.splice(id,1);
        },
        tranDatas(state,payload){
          state.transactions.push(payload);
        }

    },
    actions: {
      //feedback datas
        fetchFeedDatas(context) {
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
                context.commit("feedDatas", data);
        }
        )
    },

  //users data
  fetchUserDatas(context) {
    db.collection("users").onSnapshot(querySnapshot => {
      let changes = querySnapshot.docChanges();
        changes.forEach(change => {
          if(change.type == 'added'){
           let data= {
            id: change.doc.id,
            name: change.doc.data().name,
            phone: change.doc.data().phone,
            address: change.doc.data().areaAndStreet,
            locality: change.doc.data().locality,
            pin: change.doc.data().pincode
          };
          
          context.commit("userDatas", data);
          }
          else if(change.type == 'removed'){
          //  state.users.splice(change.doc.id,1);
           context.commit('deleteUser', change.doc.id);
          }
          
        });
      }
      );
},
  //remove user
  removeUser(context, key){
    if (confirm("Are you sure to delete this user!!!")) {
        db.collection("users").doc(key).delete()
  }
},

//orders
  fetchOrderDatas(context){
    db.collection("transactions").where("responseStatus","==","none").onSnapshot(querySnapshot => {
      let changes = querySnapshot.docChanges();
      changes.forEach(data => {
        if(data.type == 'added'){
            let locData ={
           tid:   data.doc.data().paymentDetails.txnId,
           oid: data.doc.data().paymentDetails.txnRef,
          date:   data.doc.data().transactionDate,
          trSta:  data.doc.data().paymentDetails.status,
          msg:    data.doc.data().notes,
          resSta: data.doc.data().responseStatus,
          ser:    data.doc.data().serviceDetails.name,
          name:   data.doc.data().serviceAddress.name,
          ph:     data.doc.data().serviceAddress.phone,
          altPh:  data.doc.data().serviceAddress.altPhone,
          pin:    data.doc.data().serviceAddress.pincode,
          loc:    data.doc.data().serviceAddress.locality+" "+data.doc.data().serviceAddress.areaAndStreet+" "+data.doc.data().serviceAddress.landmark,

        }
          context.commit('orderDatas',locData);
        }
        if(data.type == 'removed'){
        //  this.datas.splice(data.doc.data().paymentDetails.txnRef,1);
         context.commit('deleteOrder', data.doc.data().paymentDetails.txnRef);
        }
        if (data.type === "modified") {
          console.log("Modified city: ",  data.doc.data().paymentDetails.txnRef);
      }
      })
      }
    )
  },
//transactions
  fetchTranDatas(context){
    db.collection("transactions")
.get()
.then(querySnapshot => {
  const allDatas = querySnapshot.docs.map(doc => doc.data());
  allDatas.forEach(data=>{
    if(data.paymentDetails.status === "SUCCESS"){

      context.color = 1;
    }
    else
      context.color = 0;
    let loc ={
      tid: data.paymentDetails.txnId,
      oid: data.paymentDetails.txnRef,
      date: data.transactionDate,
      trSta: data.paymentDetails.status,
      resSta: data.responseStatus,
      ser: data.serviceDetails.name,
      name:data.serviceAddress.name,
      ph:data.serviceAddress.phone,
      pin: data.serviceAddress.pincode,
      color: this.color
    }
      context.commit('tranDatas',loc);
  })
}
);
  }

}});