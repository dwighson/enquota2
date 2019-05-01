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


  });
}

Vue.prototype.$shopify  = client
Vue.prototype.$jquery = $

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: front },
    { path: '/product/:collectionid/:productid', component: product },
    { path: '/cart', component: cart },

  ],
  scrollBehavior (to, from, savedPosition) {
    // return { x: 0, y: 0 }
    // document.querySelector('.container').scrollTop = 0
    document.querySelector('.container').scroll({top: 0, left: 0, behavior: 'smooth' });
    return null
  }
})
new Vue({
  router,
  
  render: h => h(App)
}).$mount('#app')
