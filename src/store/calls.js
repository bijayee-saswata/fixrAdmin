import { firestoreAction } from 'vuexfire';
import db from "../firebaseinit";

const state = {
    calls: [],
}

const actions = {
    init: firestoreAction(({bindFirestoreRef})=>{
        bindFirestoreRef('calls', db.collection("callBack").where("responseStatus","==","none"))
    })
}

export default{
    namespaced : true,
    state,
    actions
}