import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import routes from "./routes";
import firebase from "firebase";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

require("./firebaseConfig");
require("./firebaseinit");

global.jQuery = require("jquery");
require("bootstrap");
global.$ = require("jquery");
import "bootstrap/dist/css/bootstrap.css";

Vue.use(VueRouter);
// 1. Define route components.

const router = new VueRouter({
  routes, // short for `routes: routes`
  mode: "history"
});

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      render: h => h(App),
      router
    }).$mount("#app");
  }
});

//navGuard
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (!to.matched.length) {
    next("/notFound");
    NProgress.done();
  } else {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      //check if logged in
      if (!firebase.auth().currentUser) {
        next({
          path: "/admin",
          query: {
            redirect: to.fullPath
          }
        });
        NProgress.done();
      } else {
        next();
        NProgress.done();
      }
    } else if (to.matched.some(record => record.meta.requiresGuest)) {
      if (firebase.auth().currentUser) {
        next({
          path: "/admin/v/dashboard",
          query: {
            redirect: to.fullPath
          }
        });
        NProgress.done();
      } else {
        next();
        NProgress.done();
      }
    } else {
      next();
      NProgress.done();
    }
  }
});

Vue.config.productionTip = false;
