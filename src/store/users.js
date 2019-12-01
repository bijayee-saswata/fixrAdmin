import { firestoreAction } from 'vuexfire';
import db from "../firebaseinit";

const state = {
    users: [],
}
const getters = {

}
const actions = {
    init: firestoreAction(({bindFirestoreRef})=>{
        bindFirestoreRef('users', db.collection('users'))
    })
}

export default{
    namespaced : true,
    state,
    actions
}