import Vue from 'vue'
import App from './App.vue'
import front from './components/front'
import product from './components/product'
import cart from './components/cart'
import VueRouter from 'vue-router'
import $ from "jquery";
import Client from 'shopify-buy';

Vue.use(VueRouter)
Vue.config.productionTip = false

var client = Client.buildClient({
  storefrontAccessToken: 'd227c91ea2dec0f4ae3a9257ab3b7d41',
  domain: 'enquotatest.myshopify.com'
});

if (!localStorage.getItem('checkoutid')) {
  // create new checkoutid
  client.checkout.create().then(checkout => {
    // Do something with the checkout
    let check = checkout.id
    localStorage.setItem('checkoutid', check)

    console.log(localStorage)

  });
}

Vue.prototype.$shopify  = client
Vue.prototype.$jquery = $

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
