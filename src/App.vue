<template>
  <div id="app">
    <transition name="moveInUp"> <router-view/>  </transition>
  </div>
</template>

<script>

export default {
  name: "app",
  // created(){
  //     this.$store.dispatch('fetchUserDatas');
  //     this.$store.dispatch('fetchFeedDatas');
  //     this.$store.dispatch('fetchOrderDatas');
  //     this.$store.dispatch('fetchTranDatas');
  //     this.$store.dispatch('fetchServDatas');
  // },
 
};
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
/* @import "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.css";  */
:root {
  --main-bg-color: #1abc9c;
  --main-txt-color: #fff;
  --main-heading-color: rgb(95, 95, 95);
  --main-padding: 1em;
  --main-margin: 0.5em;
}
.moveInUp-enter-active{  animation: fadeIn 1s ease-in;}@keyframes fadeIn{  0%{    opacity: 0;  }  50%{    opacity: 0.5;  }  100%{    opacity: 1;  }}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-family: 'Open Sans', sans-serif;

}
</style>
