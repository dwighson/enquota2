<template>
  <div class="cartpage">
    <button>doorgaan met shoppen!</button>
    <h1>Winkelwagen</h1>
    <ul class="cartitem">
      <li v-for="(item, i) in checkoutobj" v-bind:key="i">
        <div class="thumbnail"></div>
        <div class="iteminfo">
          <p class="title">
            {{item.title}}
            <span>&euro;{{item.variant.price}}</span>
          </p>

          <div class="aantal">
            <button class="optionbutton">{{item.quantity}}</button>
            <ul class="dropdown" v-for="option in fetchproduct(item.variant.product.id, item.customAttributes, i).format">
              <li>{{option}}</li>
            </ul>
          </div>
          <div class="formaat">
            <button class="optionbutton">20x40</button>
            <ul class="dropdown">
              <li
                v-for="option in fetchproduct(item.variant.product.id, item.customAttributes, i).format"
              >{{option}}</li>
            </ul>
          </div>
          <div class="diepte">
            <button class="optionbutton">2 cm</button>
            <ul class="dropdown">
              <li
                v-for="option in fetchproduct(item.variant.product.id, item.customAttributes, i).depth"
              >{{option}}</li>
            </ul>
          </div>
          <div class="lijst">
            <button class="optionbutton">geen lijst</button>
            <ul class="dropdown">
              <li
                v-for="option in fetchproduct(item.variant.product.id, item.customAttributes, i).border"
              >{{option}}</li>
            </ul>
          </div>

          <p v-on:click="removeproduct(item.id)">verwijder product</p>
        </div>
      </li>
    </ul>
    <div class="total">
      <p>
        subtotaal:
        <!-- <span>&euro;{{ checkoutraw.lineItemsSubtotalPrice.amount}}</span> -->
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
import dropdown from "./dropdown.js";
import $ from 'jquery'
export default {
  data() {
    return {
      checkoutid: localStorage.getItem("checkoutid"),
      cart: null,
      checkoutobj: [],
      checkoutraw: [],
      chosenOptions: "",
      products: [],
      options: []
    };
  },

  methods: {
    removeproduct(id) {
      const checkoutId = this.checkoutid; // ID of an existing checkout
      const lineItemIdsToRemove = [
        id
      ];

      // Remove an item from the checkout
      this.$shopify.checkout
        .removeLineItems(checkoutId, lineItemIdsToRemove)
        .then(checkout => {
          // Do something with the updated checkout
          console.log(checkout.lineItems); // Checkout with line item 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=' removed
        });
    },
    fetchproduct(id, custom, key) {
      // console.log(id);
      // console.log(key);



      // if (key == 0) {
      let objj = Object.values(JSON.parse(custom[0].value));

      let options = {
        format: [],
        depth: [],
        border: []
      };
      // console.log(objj[1][0].value);
      for (let i = 0; i <= objj[0].length - 1; i++) {
        options.format.push(objj[0][i].value);
      }
      for (let i = 0; i <= objj[1].length - 1; i++) {
        options.depth.push(objj[1][i].value);
      }
      for (let i = 0; i <= objj[2].length - 1; i++) {
        options.border.push(objj[2][i].value);
      }

      return options;
      // this.options.push({objj});
      // console.log(this.options);
      // }
    }
  },
  mounted() {
    // console.log(this.cart);
    let checkid = this.checkoutid;
    this.$shopify.checkout.fetch(checkid).then(checkout => {
      // Do something with the checkout
      this.checkoutraw = checkout;
      // console.log(this.checkoutobj);
      for (let i = 0; i <= checkout.lineItems.length - 1; i++) {
        this.checkoutobj.push(checkout.lineItems[i]);

        // console.log(checkout.lineItems[i].variant.title)

        const productId = this.checkoutobj[i].variant.product.id;

        // this.$shopify.product.fetch(productId).then(product => {
        //   // Do something with the product
        //   // console.log(product);
        // });
      }
      // console.log(this.checkoutobj[0].variant.product.id);

      // console.log(this.checkoutobj)
      $("body").on("click", ".optionbutton", function(e) {
        $(this)
          .parent()
          .find("ul.dropdown");
        console.log(e.target);
        let dropdown = $(this)
          .parent()
          .find("ul.dropdown");
        console.log(dropdown)
        if (dropdown.css("display") == "none") {
          dropdown.css({
            display: "block"
          });
        } else {
          dropdown.css({
            display: "none"
          });
        }
      });

      $("body").on("click", ".dropdown li", function(e) {
        let index = $(this).index();
        let text = $(this).text();
        $(this)
          .parent()
          .parent()
          .find(".optionbutton")
          .text(text);
        // console.log($(this).parent()[0]);
        $(this)
          .parent()
          .css({
            display: "none"
          });
      });
    });
    console.log(this.checkoutobj);
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
ul.cartitem {
  display: inline-block;
  padding: 0;
}
.cartitem li {
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
.dropdown {
  padding: 0;
  display: none;
  margin: 0;
  width: 200px;
  background: yellow;
}
.optionbutton {
  width: 200px;
  margin: 0;
}
.dropdown li {
  display: block;
  width: 100%;
  margin: 0;
}
</style>
