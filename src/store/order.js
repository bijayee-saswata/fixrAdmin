import { firestoreAction } from 'vuexfire';
import db from "../firebaseinit";

const state = {
    orders: [],
}
const getters = {

}
const actions = {
    init: firestoreAction(({bindFirestoreRef})=>{
        bindFirestoreRef('orders', db.collection("transactions").where("responseStatus","==","none"))
    })
}

export default{
    namespaced : true,
    state,
    actions
}