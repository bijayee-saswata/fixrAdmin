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
              <th>Type</th>
              <th>Created Date</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredList" v-bind:key="user.id">
              <td>{{user.name}}</td>
              <td>{{user.phone}}</td>
              <td>{{user.msgType}}</td>
              <td>{{user.createdDate.toDate()}}</td>
              <td>
                <article>{{user.message}}</article>
              </td>
              <td v-if="!locked">
                <i class="fa fa-edit" @click="resolved(user.id)"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
      error: "",
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapState("feeds", ["feedbacks", "locked"]),
    filteredList() {
      return this.feedbacks.filter((feed) => {
        return (
          feed.name.toLowerCase().match(this.query.toLowerCase()) ||
          feed.phone.match(this.query)
        );
        //console.log(user.name);
      });
    },
  },
  // ...mapGetters(['loadUserData']),
  methods: {
    ...mapActions("feeds", ["init", "resolved"]),
  },
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
