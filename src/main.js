import Vue from 'vue'
import App from './App.vue'
import front from './components/front'
import product from './components/product'
import cart from './components/cart'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    // { path: '/', component: front },
    { path: '/', component: product },
    { path: '/cart', component: cart },

  ]
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
