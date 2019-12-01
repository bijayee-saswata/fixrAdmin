import { firestoreAction } from 'vuexfire';
import db from "../firebaseinit";

const state = {
    feedbacks: [],
}
const getters = {

}
const actions = {
    init: firestoreAction(({bindFirestoreRef})=>{
        bindFirestoreRef('feedbacks', db.collection('feedBacks'))
    })
}

export default{
    namespaced : true,
    state,
    actions
}