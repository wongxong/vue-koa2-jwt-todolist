import Vue from 'vue';
import App from './App.vue';
import router from './router';
import {
  Message,
  Form,
  FormItem,
  Input,
  Button,
  Tabs,
  TabPane
} from 'element-ui';

[
  Form,
  FormItem,
  Input,
  Button,
  Tabs,
  TabPane
].forEach(component => {
  Vue.use(component);
});

Vue.config.productionTip = false;
Vue.prototype.$message = Message;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
