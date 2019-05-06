import Vue from 'vue';
import App from './App.vue';
import router from "./router";
import 'ant-design-vue/dist/antd.css';
import { Button } from "ant-design-vue";
Vue.use(Button);
new Vue({
  el:'#app',
  router,
  template:'<App/>',
  components:{
    App
  }
})

