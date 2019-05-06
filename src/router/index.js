import Vue from "vue";
import Router from "vue-router";
const Index = () => import("../views/Index");
const Login = () => import("../views/Login");
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      component: Index,
      name: "index"
    },
    {
      path: "/login",
      component: Login,
      name: "Login"
    }
  ]
});