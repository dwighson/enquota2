<template>
  <div class="nav">
    <div class="shipping">Gratis verzending voor Nederland en België</div>
    <!-- <div class="announcement" v-show="close == false">
      Kempi Collectie staat nu online!
      <button class="closeBanner" v-on:click="closebanner">&times;</button>
    </div>-->
    <div class="logo"></div>
     <router-link tag="div" to="/cart" class="cartmobile">
          <div class="carticon"></div>
        </router-link>
    <button class="navbutton">=</button>
    <ul class="navlist">
      <span class="navwrap">
        <router-link tag="li" to="/">Shop</router-link>
        <li>over ons</li>
        <li>Contact</li>
        <li>testimonials</li>

        <router-link tag="li" to="/cart" class="cart">
          <div class="carticon"></div>
        </router-link>
        <!-- <li>({{getCartItems}})</li> -->
      </span>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartitems: 0,
      close: false,
      checkoutid: localStorage.getItem("checkoutid")
    };
  },
  methods: {
    closebanner() {
      this.close = !this.close;
    }
  },

  computed: {
    getCartItems() {
      let checkid = this.checkoutid;

      var counter = 0;
      this.$shopify.checkout.fetch(checkid).then(checkout => {
        for (let x = 0; x <= checkout.lineItems.length - 1; x++) {
          counter = counter + checkout.lineItems[x].quantity;

          if (x == checkout.lineItems.length - 1) {
            console.log(counter);
            this.cartitems = counter;
          }
        }
        // console.log(checkout.lineItems);
      });
      return this.cartitems;
    }
  },
  mounted() {
    let checkid = this.checkoutid;
    // this.$shopify.checkout.fetch(checkid).then(checkout => {
    //   var counter = 0;
    //   for (let x = 0; x <= checkout.lineItems.length - 1; x++) {
    //     counter = counter + checkout.lineItems[x].quantity;

    //     if (x == checkout.lineItems.length - 1) {
    //       console.log(counter);
    //     }
    //   }

    //   // console.log(checkout.lineItems);
    // });
  }
};
</script>
<style  scoped>
.nav {
  /* position: fixed; */
  background: white;
  top: 0;
  left: 0;
  color: black;
  display: flex;
  min-height: 50px;
  width: 100vw;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);
  text-align: center;
  z-index: 9999;
  flex-direction: column;
  overflow: hidden;
}
.announcement {
  height: 50px;
  color: white;
  line-height: 50px;
  position: relative;
  background: #22e7af;
}
.closeBanner {
  position: absolute;
  right: 20px;
  top: 50%;
  cursor: pointer;
  color: white;
  font-size: 20px;
  background: none;
  border: none;
  transform: translateY(-50%);
}
.logo {
  text-align: center;
  font-size: 80px;
  float: left;

  height: 100px;
  background: url("https://media.discordapp.net/attachments/546084619339038741/564534422595174411/Group.png")
    no-repeat center center;

  text-transform: uppercase;
}
.navlist {
  display: block;
  padding: 0px;
  text-align: center;
  height: 50px;
  margin: 0px;
  flex: 1;
}
.navwrap {
  min-width: 600px;
  display: inline-block;
}
.navlist li {
  display: block;
  float: left;
  flex: 1;

  font-size: 25px;
  /* background: purple; */
  line-height: 50px;
  text-align: center;
  font-weight: lighter;
  text-transform: capitalize;
  min-width: 125px;
}
.cart {
  height: 50px;
  max-width: 90px;
}
.carticon {
  display: inline-block;
  background: url("https://media.discordapp.net/attachments/546084619339038741/564536432841064478/Vector.png")
    no-repeat center center;
  background-size: contain;
  height: 50px;
  margin: 0 auto;
  margin: 0;
  padding: 0;
  width: 30px;
}
.shipping {
  line-height: 30px;
  height: 30px;
  color: white;
  font-size: 15px;

  background: #141414;
}
.cartmobile, .navbutton {
  display: none;
}

@media only screen and (max-width: 600px) {
  .navlist {
    display: none;
  }
  .logo {
    width: 200px;
    /* margin-left:30px; */
    /* float: left; */
    float: none;
    display: block;
    height: 50px;
    margin: 0 auto;
    background-size: contain;
  }
  .nav {
    display: block;
    position: relative;
  }
  .cartmobile {
    display: block;
    position: absolute;
    right: 50px;
    top: 0px;
  }
  .navbutton {
    background: green;
    position: absolute;
    top: 0px;
    line-height: 50px;
    right: 10px;
    border: 0px;

    display: block;
    font-size: 40px;
    float: left;
    width: 40px;
    height: 100%;
  }
  .shipping {
    display: none;
  }
}
</style>
