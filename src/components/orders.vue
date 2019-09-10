<template>
  <main>
    <h2>Order Lists</h2>

    <div class="container-fluid">
      <div class="search">
        <input type="text" v-model="query" placeholder="Type here" />
        <i class="fa fa-search"></i>
      </div>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>OID</th>
              <th>Name</th>
              <th>Phone No.</th>
              <th>Alt. Phone</th>
              <th>Service</th>
              <th>Message</th>
              <th>Address</th>
              <th>Date-Time</th>
              <!-- <th>Payment Status</th> -->
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <div v-if="datas.length === 0" class="loading">Loading...</div>
            <tr v-for="data in filteredList" v-bind:key="data.oId">
              <td>{{data.oid || '1234'}}</td>
              <td>{{data.name}}</td>
              <td>{{data.ph}}</td>
              <td>{{data.altPh}}</td>
              <td>{{data.ser}}</td>
              <td>{{data.msg || "Good"}}</td>
              <td><address>{{data.loc}}</address></td>
              <td>{{data.date}}</td>

              <td>
                <span style="color: green;" data-toggle="modal" data-target="#acceptModal" v-on:click="update(data.oid)">
                  <i class="fa fa-check"></i>
                </span>
                <span style="color: red;" data-toggle="modal" data-target="#rejectModal" v-on:click="update(data.oid)">
                  <i class="fa fa-times"></i>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="modal fade"
        id="acceptModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="acceptModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="acceptModalLabel"><b>Accept Order</b></h5>
              <input type="text" v-model="oId" disabled>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <span v-if="sent">Order Accepted</span>
              <form class="form-horizontal" v-else>
                <p v-if="errors.length">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                  </ul>
                </p>
                <div class="form-group">
                  <label class="control-label col-sm-2" for="cName">*Name:</label>
                  <div class="col-sm-10">
                    <input
                      type="text"
                      class="form-control"
                      id="cName"
                      placeholder="Enter Name"
                      name="cName"
                      v-model="cName"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-sm-2" for="cPhone">*Phone:</label>
                  <div class="col-sm-10">
                    <input
                      type="text"
                      class="form-control"
                      id="cPhone"
                      placeholder="Enter Mobile"
                      name="cPhone"
                      v-model="cPhone"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-sm-2" for="caPhone">Alternate Phone:</label>
                  <div class="col-sm-10">
                    <input
                      type="text"
                      class="form-control"
                      id="caPhone"
                      placeholder="Enter Alternate Mobile"
                      name="caPhone"
                      v-model="caPhone"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-success" @click="accept" v-if="!sent">Accept</button>
            </div>
          </div>
        </div>
      </div>
      <!-- acceptes modal end -->
      <!-- Rejected mode  -->
      <div
        class="modal fade"
        id="rejectModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="rejectModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="rejectModalLabel"><b>Reject Order</b></h5>
              <input type="text" v-model="oId" disabled>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <span v-if="sent">Order Rejected</span>
              <form class="form-horizontal" v-else>
                 <p v-if="rErrors.length">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li v-for="error in rErrors" v-bind:key="error">{{ error }}</li>
                  </ul>
                </p>
                <div class="form-group">
                  <label class="control-label col-sm-2" for="reason">*Reason:</label>
                  <div class="col-sm-10">
                    <textarea
                      type="text"
                      class="form-control"
                      id="reason"
                      placeholder="Enter Reason"
                      name="reason"
                      v-model="rMsg"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-danger" @click="reject" v-if="!sent">Reject</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import db from "../firebaseinit.js";

export default {
  data() {
    return {
      datas: [],
      oId: 1,
      query: "",
      sent: false,
      errors: [],
      rErrors:[],
      rMsg: null,
      cName: null,
      cPhone: null,
      caPhone: null,
      notification : 5
    };
  },
  created() {
    // db.collection("feedBacks")
    //   .get()
    //   .then(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //       let data = {
    //         id: doc.id,
    //         name: doc.data().name,
    //         phone: doc.data().phone,
    //         msg: doc.data().message
    //       };
    //       this.datas.push(data);
    //     });
    //   });
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
          this.datas.push(locData);
        }
        if(data.type == 'removed'){
         this.datas.splice(data.doc.data().paymentDetails.txnRef,1);

        }
      })
      }
    )
  },
  computed: {
    filteredList: function() {
      return this.datas.filter((user) =>{
        return user.name.toLowerCase().match(this.query.toLowerCase());
    })
  }},
  methods: {
    update(id){
      this.oId = id;
    },
    accept(e) {
      if (this.cName && this.cPhone) {
        // return true;
              let del = {
                delivery:{
                  status: "Accepted",
        name: this.cName,
        phone: this.cPhone,
        alPhone: this.caPhone
                }
      }
      let ref = db.collection("users").doc("EV6gulUlD7YBOF1tbejogqOvKd33").collection("orders").doc(`${this.oId}`);
      ref.set(del,{merge: true}).then(() =>{
        this.sent = true;
        db.collection("transactions").doc(`${this.oId}`).set({responseStatus: "Accepted"},{merge: true}); 
      });
      //console.log(d);
      this.sent = false;
      }

      this.errors = [];

      if (!this.cName) {
        this.errors.push('Name required.');
      }
      if(!this.cPhone){
        this.errors.push('Number required.');
      }

      e.preventDefault();
    },
    reject(e) {
      if (this.rMsg) {
                let del = {
                delivery:{
                  status: "Rejected",
                  msg: this.rMsg
                }
      }
      let ref = db.collection("users").doc("EV6gulUlD7YBOF1tbejogqOvKd33").collection("orders").doc(`${this.oId}`);
      ref.set(del,{merge: true}).then(() =>{
        this.sent = true;
        db.collection("transactions").doc(`${this.oId}`).set({responseStatus: "Rejected"},{merge: true});
      });

      }

      this.rErrors = [];

      if (!this.rMsg) {
        this.rErrors.push('message required.');
      }
      let delivery = {
        msg: this.rMsg
      }
      this.sent = false;
      e.preventDefault();
    }
  }
}
</script>

<style lang="css" scoped>
/* @import "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.css";  */
table th,
td {
  text-align: center;
}
td span {
  padding: 0.5em;
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