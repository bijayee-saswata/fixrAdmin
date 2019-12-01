import { firestoreAction } from 'vuexfire';
import db from "../firebaseinit";

const state = {
    transactions: [],
}
const getters = {

}
const actions = {
    init: firestoreAction(({bindFirestoreRef})=>{
        bindFirestoreRef('transactions', db.collection('transactions'))
    })
}

export default{
    namespaced : true,
    state,
    actions
}