<template>
  <main>
    <h2>Transaction Lists</h2>

    <div class="container">
      <div class="search">
        <input type="text" v-model="query" placeholder="Type here" />
        <i class="fa fa-search"></i>
      </div>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>TID</th>
              <th>OID</th>
              <th>Tr.Date-Time</th>
              <th>Tr.Status</th>
              <th>Res.Status</th>
              <th>Serice</th>
              <th>Name</th>
              <th>Phone</th>
              <th>PIN</th>
            </tr>
          </thead>
          <tbody>
            <div v-if="datas.length === 0" class="loading">Loading...</div>
            <div v-if="error.length != 0" class="error">{{error}}</div>
             <tr v-for="tr in filteredList" v-bind:key="tr.id">
              <td>{{tr.tid || '123456'}}</td>
              <td>{{tr.oid }}</td>
              <td>{{tr.date}}</td>
              <td :class="[ tr.color ? 'green' : 'red' ]">{{tr.trSta}}</td>
              <td>{{tr.resSta}}</td>
              <td>{{tr.ser}}</td>
              <td>{{tr.name}}</td>
              <td>{{tr.ph}}</td>
              <td>{{tr.pin}}</td>
            </tr>
          </tbody>
        </table>  
      </div>
    </div>
  </main>
</template>

<script>
import db from "../firebaseinit";

export default {
  data() {
    return {
      datas: [],
      query: '',
      color: 0,
      error: ''
    };
  },
  created() {
    // db.collection("transactions").onSnapshot(querySnapshot => {
    //   let changes = querySnapshot.docChanges();
        // changes.forEach(change => {
        //   if(change.type == 'added'){
        //     let data = {
        //     id: change.doc.id,
        //     name: change.doc.data().name,
        //     phone: change.doc.data().phone,
        //     address: change.doc.data().areaAndStreet,
        //     locality: change.doc.data().locality,
        //     pin: change.doc.data().pincode
        //   };
        //   this.datas.push(data);
          
        //   }
        //   else if(change.type == 'removed'){
        //     this.datas.splice(change.doc.id,1);
        //   }
          
        // });

db.collection("transactions")
.get()
.then(querySnapshot => {
  const allDatas = querySnapshot.docs.map(doc => doc.data());
  allDatas.forEach(data=>{
    if(data.paymentDetails.status === "SUCCESS"){

      this.color = 1;
    }
    else
      this.color = 0;
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
      this.datas.push(loc);
  })
}
);
// console.log(this.datas);

  },
  computed:{
    filteredList: function(){
      
      return this.datas.filter((user) =>{
        return user.name.toLowerCase().match(this.query.toLowerCase());
       //console.log(user.name);
      } )
    }
  },
  methods:{
   removeUser(key){
      if (confirm("Are you sure to delete this user!!!")) {
        db.collection("users").doc(key).delete();
    }
  } 
    }
}
</script>

<style lang="css" scoped>

table th,
td {
  text-align: center;
}
.red{
  color: red;
  font-weight: bold;
}
.green{
  color: green;
   font-weight: bold;
}
/* Start search */
.search {
  text-align: center;
  padding: 15px 30px;
  margin: 15px 0;
  position: relative;
}

.search > input {
  width: 100%;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid blue;
  padding: 7px 0 7px;
  font-size: 1.5em;
  font-weight: 600;
  font-family: monospace;
}
.search > input ~ i {
  position: absolute;
  top: 22px;
  right: 40px;
  display: block;
  color: #2b2f3a;
  font-size: 19px;
}
</style>