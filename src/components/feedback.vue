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
            <tr v-for="user in feedbacks" v-bind:key="user.id">
              <td>{{user.name}}</td>
              <td>{{user.phone}}</td>
              <td>
                <article>{{user.message}}</article>
              </td>
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

      <!-- <pre>{{feedbacks}}</pre>   -->
    </div>
  </main>
</template>

<script>
//import db from "../firebaseinit.js";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      query: "",
      error: ""
    };
  },
  mounted() {
    this.init();
  },
  computed: { ...mapState("feeds", ["feedbacks"]) },
  // ...mapGetters(['loadUserData']),
  methods: {
    ...mapActions("feeds", ["init"]),
    dislike() {
      alert("Removed User...");
    },
    like() {
      alert("Love User...");
    }
  }

  // return this.datas.filter((num) =>{
  //      return (num.name.toLowerCase().match(this.query.toLowerCase()));
  //})

  // methods:{
  //   dislike(){
  //     alert('Removed User...');
  //   },
  //   like(){
  //     alert('Love User...');
  //   }
  // }
};
</script>

<style lang="css" scoped>
td {
  text-align: left;
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
}
.search > input ~ i {
  position: absolute;
  top: 22px;
  right: 40px;
  display: block;
  color: #2b2f3a;
  font-size: 19px;
}
@media (min-width: 1200px) {
  .container {
    width: 80%;
  }
}
</style>
