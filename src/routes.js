// These can be imported from other files
const admin = () => import("./components/admin.vue");
const dashboard = () => import("./components/dashboard");
const users = ()=> import('./components/users');
const orders = ()=> import('./components/orders');
const PageNotFound = () => import("./components/fallBack");
const transactions = () => import("./components/transactions");
const feedbacks = () => import("./components/feedback");
const NavAdmin =() => import ("./components/NavAdmin");
const callbacks = () => import("./components/callBack");

export default [
  {
    path: "/admin",
    alias: "/",
    component: admin,
    meta: { requiresGuest: true, showProgressBar: true }
  },
  {
    path: "/admin/v",
    component: NavAdmin,
    meta: { requiresAuth: true, showProgressBar: true },
    children : [

      {
        path: "dashboard",
        component: dashboard,
        meta: { requiresGuest: true, showProgressBar: true }
      },
      {
        path: "transactions",
        component: transactions
      },
      {
        path: "users",
        component: users
      },
      {
        path: "orders",
        component: orders
      },
      {
        path: "feedbacks",
        component: feedbacks
      },
      {
        path: "callbacks",
        component: callbacks
      },
    ]
  },
  
  { path: "*", component: PageNotFound }
];
