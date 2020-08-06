<template>
  <main>
    <h2>Transaction Lists</h2>

    <div class="container" v-if="!loading">
      <div class="search">
        <input type="text" v-model="query" placeholder="Phone number" />
        <i class="fa fa-search" @click="search(query)"></i>
      </div>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>TID</th>
              <th>Tr.Date</th>
              <th>Payment Mode</th>
              <th>Service.Status</th>
              <th>Service Date</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Area</th>
              <th>PIN</th>
              <th>Delivered By</th>
            </tr>
          </thead>
          <tbody>
            <!-- <div v-if="error.length != 0" class="error">{{error}}</div> -->
            <tr v-for="tr in filteredList" v-bind:key="tr.id">
              <td>{{tr.id || '123456'}}</td>
              <td>{{tr.transactionDate.toDate()|| 'no date'}}</td>
              <td>{{tr.paymentMode || 'No Mode'}}</td>
              <td
                :class="[ tr.responseStatus == 'delivered' ? 'green' : 'red' ]"
              >{{tr.responseStatus || 'noRes'}}</td>
              <td>{{tr.serviceDateandTime||'nodate'}}</td>
              <td>{{tr.serviceAddress.name || 'noname'}}</td>
              <td>{{tr.serviceAddress.phone || '1234567890'}}</td>
              <td>{{tr.serviceAddress.areaAndStreet || 'area'}}</td>
              <td>{{tr.serviceAddress.pincode||'123456'}}</td>
              <td
                v-if="tr.responseStatus == 'delivered' || tr.responseStatus == 'accepted'"
              >{{tr.delivery.name+' '+ tr.delivery.phone}}</td>
              <td v-if="tr.responseStatus == 'rejected'">{{tr.delivery.msg}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="loader" v-if="loading">
      <i class="fa fa-spinner fa-spin fa-5x"></i>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      query: "",
      error: "",
    };
  },
  mounted() {
    this.init();
  },
  created() {},
  computed: {
    ...mapState("trans", ["transactions", "loading"]),
    filteredList() {
      return this.transactions.filter((tr) => {
        return (
          tr.serviceAddress.name
            .toLowerCase()
            .match(this.query.toLowerCase()) ||
          tr.serviceAddress.phone.match(this.query)
        );
        //console.log(user.name);
      });
    },
  },
  methods: {
    ...mapActions("trans", ["init", "search"]),
  },
};
</script>

<style lang="css" scoped>
table th,
td {
  text-align: center;
}
.red {
  color: red;
  font-weight: bold;
}
.green {
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
.search .fa-search {
  cursor: pointer;
}
@media (min-width: 1200px) {
  .container {
    width: 100%;
  }
}
</style>
