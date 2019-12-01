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
              <th>Adds</th>
              <th>Locality</th>
              <th>PIN</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
             <tr v-for="user in filteredList" v-bind:key="user.id">
              <td>{{user.id || 1234}}</td>
              <td>{{user.name || "unknown"}}</td>
              <td>{{user.email || "no@email.com"}}</td>
              <td>{{user.phone || 1234567890}}</td>
              <td><address>{{user.areaAndStreet || 'no address'}}</address></td>
              <td>{{user.locality || 'no locality'}}</td>
              <td>{{user.pincode || 100001}}</td>
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
    <!-- <pre>{{users}}</pre> -->
  </main>
</template>

<script>
import {mapState,mapActions} from 'vuex';
export default {
  data() {
    return {
      datas: [],
      query: '',
      error: ''
    };
  },
  mounted() {
         this.init();
  },
  computed:{
     ...mapState('users',['users']),
     filteredList(){
       return this.users.filter((obj) =>{
           return (obj.name.toLowerCase().match(this.query.toLowerCase()));
    })
     }
     },
  methods: {
    ...mapActions('users',['init']),
}
}
</script>

<style lang="css" scoped>

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
@media (min-width: 1200px){
  .container {
    width: 100%;
}
}
</style>