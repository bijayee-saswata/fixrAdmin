<template>
  <main>
    <h2>Order Lists</h2>

    <div class="container">
      <div class="search">
        <input type="text" v-model="query" placeholder="Type here" />
        <i class="fa fa-search"></i>
      </div>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone No.</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <div v-if="datas.length === 0" class="loading">Loading...</div>
            <tr v-for="data in filteredList" v-bind:key="data.id">
              <td>{{data.name}}</td>
              <td>{{data.phone}}</td>
              <td>
                <article>{{data.msg}}</article>
              </td>
              <td>
                <a style="color: green;" data-toggle="modal" data-target="#acceptModal">
                  <i class="fa fa-check"></i>
                </a>
                <a style="color: red;" data-toggle="modal" data-target="#rejectModal">
                  <i class="fa fa-times"></i>
                </a>
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
              <h5 class="modal-title" id="acceptModalLabel">Accept Order</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form class="form-horizontal">
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
              <button type="button" class="btn btn-success" @click="accept">Accept</button>
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
              <h5 class="modal-title" id="rejectModalLabel">Reject Order</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                 <p v-if="errors.length">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li v-for="error in rErrors" v-bind:key="error">{{ error }}</li>
                  </ul>
                </p>
              <form class="form-horizontal">
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
              <button type="submit" class="btn btn-danger" @click="reject">Reject</button>
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
      query: "",
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
    db.collection("transactions").onSnapshot(querySnapshot => {
      let changes = querySnapshot.docChanges();
      let all = changes.forEach(change => {
        if(change.type == 'added'){
        console.log(change.doc.data());
        console.log("added");
        }
        if(change.type == 'removed'){
        //console.log(change.doc.data());
         this.datas.splice(change.doc.id,1);
        console.log("Removed");
        }
      })
      }
    )
  },
  computed: {
    filteredList: function() {
      return this.datas.filter(num => {
        return num.name.match(this.query);
      });
    }
  },
  methods: {
    accept(e) {
      if (this.cName && this.cPhone) {
        return true;
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
      if (this.msg) {
        return true;
      }

      this.rErrors = [];

      if (!this.msg) {
        this.rErrors.push('message required.');
      }
      e.preventDefault();
    }
  }
};
</script>

<style lang="css" scoped>
table th,
td {
  text-align: center;
}
td a {
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