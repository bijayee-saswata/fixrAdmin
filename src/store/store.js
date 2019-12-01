
import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations } from 'vuexfire';
import users from './users';
import trans from './trans';
import feeds from './feeds';
import orders from './order';

Vue.use(Vuex);
//database 
import db from "../firebaseinit";
//import firebase from 'firebase';

export const store = new Vuex.Store({
  mutations : vuexfireMutations,
  modules: {
    users,
    trans,
    feeds,
    orders
  },
  /*  state: {
       
        orders: [],
    },
    getters: {

        loadOrderData: state =>{
          return state.orders;
        },
    },
    mutations: {
        deleteUser(state, id){
        state.users.splice(id, 1);
        
         },
        orderDatas(state,payload){
          state.orders.push(payload);
        },
        deleteOrder(state,id){
          state.orders.splice(id,1);
        },

    }, 
    actions: {
      //feedback datas

 
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
      //   if (data.type === "modified") {
      //     console.log("Modified city: ",  data.doc.data().paymentDetails.txnRef);
      // }
      })
      }
    )
  },

  }

}*/

});