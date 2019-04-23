<template>
  <div class="cartpage">
    <button>doorgaan met shoppen!</button>
    <h1>Winkelwagen</h1>
    <ul>
      <li v-for="i in 2" v-bind:key="i">
        <div class="thumbnail"></div>
        <div class="iteminfo">
          <p class="title">
            key to succes
            <span>&euro;75,00</span>
          </p>
          <div class="aantal"></div>
          <div class="formaat"></div>
          <div class="diepte"></div>
          <div class="lijst"></div>
          <p>verwijder product</p>
        </div>
      </li>
    </ul>
    <div class="total">
      <p>
        subtotaal:
        <span>&euro;150,00</span>
      </p>
      <p>
        verzendkosten:
        <span>gratis</span>
      </p>

      <p>kortingscode invoeren:</p>
      <input type="text" placeholder="ENQUOTA2019">
      <button>+</button>

      <p>
        Totaal:
        <span>&euro;150,00</span>
      </p>

      <button>bestellen</button>
      <p>niet tevreden? Geld terug!</p>
    </div>
  </div>
</template>
<script>
import dropdown from './dropdown.js'
export default {
  data() {
    return {
      checkoutid: localStorage.getItem("checkoutid"),
      cart: null,
      checkoutobj: null,
      chosenOptions: ""
    };
  },
  methods: {
    toggleDropdown(index) {
      this.dropdowns[index] = !this.dropdowns[index];
      let value = this.product[index].option[index];
      this.chosenOption = value;
    },
    togglebutton() {
      this.dropdowns[index] = !this.dropdowns[index];
    }
  },
  mounted() {
    console.log(this.cart);
    let checkid = this.checkoutid;
    client.checkout.fetch(checkid).then(checkout => {
      // Do something with the checkout
      this.checkoutobj = checkout
      // console.log(this.checkoutobj);
      // for(let i = 0; i <= checkout.lineItems.length - 2; i++) {

      // }
      console.log(this.checkoutobj)
    });
  }
};
</script>

<style scoped>
.cartpage {
  min-height: 500px;
  width: 100%;
  text-align: center;
  background: #f0f0f0;
}
ul {
  display: inline-block;
  padding: 0;
}
li {
  display: flex;
  background: green;
  margin: 10px;
  width: 600px;
}
.thumbnail {
  height: 250px;
  width: 250px;
  background: black;
}
.iteminfo {
  background: grey;
  width: 300px;
  padding: 20px;
  box-sizing: border-box;
}
p {
  font-size: 20px;
}

.total {
  display: inline-block;
  margin: 10px;
  vertical-align: top;
  height: 400px;
  width: 500px;
  background: purple;
}
</style>
