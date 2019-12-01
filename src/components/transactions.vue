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
              <th>Service Date</th>
              <th>Name</th>
              <th>Phone</th>
              <th>PIN</th>
            </tr>
          </thead>
          <tbody>
            
            <!-- <div v-if="error.length != 0" class="error">{{error}}</div> -->
             <tr v-for="tr in filteredList" v-bind:key="tr.id">
              <td>{{tr.paymentDetails.txnId || '123456'}}</td>
              <td>{{tr.paymentDetails.txnRef || '12345'}}</td>
              <td>{{tr.transactionDate || 'no date'}}</td>
              <td :class="[ tr.color ? 'green' : 'red' ]">{{tr.paymentDetails.status || 'noStatus'}}</td>
              <td>{{tr.responseStatus || 'noRes'}}</td>
              <td>{{tr.serviceDateandTime||'nodate'}}</td>
              <td>{{tr.serviceAddress.name || 'noname'}}</td>
              <td>{{tr.serviceAddress.phone || '1234567890'}}</td>
              <td>{{tr.serviceAddress.pincode||'123456'}}</td>
            </tr>
          </tbody>
        </table>  
      </div>
    </div>
    <!-- <pre>{{transactions}}</pre> -->
  </main>
</template>

<script>
// import db from "../firebaseinit";
import {mapState,mapActions} from 'vuex';
export default {
  data() {
    return {
      datas: [],
      query: '',
      color: 0,
      error: ''
    };
  },
  mounted(){
    this.init();
  },
  created() {


  },
  computed: {
    ...mapState('trans',['transactions']),
       filteredList(){
      
      return this.transactions.filter((tr) =>{
        return tr.serviceAddress.name.toLowerCase().match(this.query.toLowerCase());
       //console.log(user.name);
      } )
    }
    },
    // ...mapGetters(['loadUserData']),
  methods: mapActions('trans',['init']),
 

  
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
@media (min-width: 1200px){
  .container {
    width: 100%;
}
}
</style>