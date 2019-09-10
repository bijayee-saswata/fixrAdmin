<template>
  <main>
    <h2>Feedback List</h2>

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
            <tr v-for="user in filteredList" v-bind:key="user.id">
              <td>{{user.name}}</td>
              <td>{{user.phone}}</td>
              <td><article>{{user.message}}</article></td>
              <td>
                <a @click="like()">
                  <i class="fa fa-thumbs-up"></i>
                </a>
                <a @click="dislike()">
                  <i class="fa fa-thumbs-down"></i>
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
import db from "../firebaseinit.js";
export default {
  data() {
    return {
      datas: [],
      query: '',
      error: ''
    };
  },
 created() {
    db.collection("feedBacks")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let data = {
            id: doc.id,
            name: doc.data().name,
            phone: doc.data().phone,
            msg: doc.data().message
          };
          this.datas.push(data);
        });
    //    console.log(this.datas);
      }
      );
  },
  computed:{
    filteredList: function(){
      
      return this.datas.filter((num) =>{
           return (num.name.toLowerCase().match(this.query.toLowerCase()));
    })}
  },
  methods:{
    dislike(){
      alert('Removed User...');
    },
    like(){
      alert('Love User...');
    }
  }
};
</script>

<style lang="css" scoped>

table th,
td {
  text-align: center;
}
td a{
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