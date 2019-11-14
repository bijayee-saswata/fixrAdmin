<template>
  <main>
    <h2>Users List</h2>

    <div class="container">
      <div class="search">
        <input type="text" v-model="query" placeholder="Type here" />
        <i class="fa fa-search"></i>
      </div>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>UID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Locality</th>
              <th>PIN</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <!-- <div v-if="datas.length === 0" class="loading">Loading...</div>
            <div v-if="error.length != 0" class="error">{{error}}</div> -->
             <tr v-for="user in filteredList" v-bind:key="user.id">
              <td>{{user.id}}</td>
              <td>{{user.name}}</td>
              <td>{{user.email || "no@email.com"}}</td>
              <td>{{user.phone}}</td>
              <td><address>{{user.address}}</address></td>
              <td>{{user.locality}}</td>
              <td>{{user.pin}}</td>
              <td>
                <a @click="removeUser(user.id)">
                  <i class="fa fa-trash"></i>
                </a>
              </td>
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
      error: ''
    };
  },
  created() {
    // this.$store.dispatch('fetchUserDatas');
  },
  computed:{
    filteredList: function(){
      
      // return this.datas.filter((user) =>{
      //   return user.name.toLowerCase().match(this.query.toLowerCase());
      // } )
       console.log("usname");
      return this.$store.getters.loadUserData;
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