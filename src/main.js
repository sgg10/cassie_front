import Vue from 'vue';
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';

// router setup
import router from './routes/router';
// Store setup
import store from './store'
// plugin setup
Vue.use(DashboardPlugin);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  methods: {
    init () {
      store.dispatch('auth/refreshToken', null, { root: true })
    }
  },
  mounted () {
    this.init()
  },
  render: h => h(App)
}).$mount('#app');
