<template>
  <div class="nav" v-bind:class="{'open': menutoggle == true}">
    <div class="shipping">Gratis verzending voor Nederland en België</div>
<!--     <div class="announcement" v-show="close == false">
      Kempi Collectie staat nu online!
      <button class="closeBanner" v-on:click="closebanner">&times;</button>
    </div> -->
      <div class="logo big"></div>

    <div class="logowrap">
      <div class="navbutton" v-on:click="togglemenu">
        <div class="buttonstripe"></div>
        <div class="buttonstripe"></div>
        <div class="buttonstripe"></div>
      </div>
      <div class="logo"></div>
      <router-link tag="button" to="/cart" class="cartmobile">
        <div class="carticon"></div>
      </router-link>

    </div>
    <ul class="navlist">
      <span class="navwrap">
        <li v-on:click="gotoAnchor('.newstock')">Shop</li>
        <li v-on:click="gotoAnchor('.aboutus')">over ons</li>
        <li v-on:click="gotoAnchor('.contact')">Contact</li>
        <!-- <li>testimonials</li> -->
        <router-link tag="li" to="/cart" class="cart">
        <div class="carticon"></div>
        </router-link>
        <!-- <li>({{getCartItems}})</li> -->
      </span>
    </ul>
    <div class=""></div>
    <div class="mobilemenu" v-show="menutoggle == true">
      <ul>
          <div class="closemenu" v-on:click="togglemenu">&times;</div>

      <span class="navwrap">
        <li v-on:click="togglemenu();gotoAnchor('.newstock')">Shop</li>
        <li v-on:click="togglemenu();gotoAnchor('.aboutus')">over ons</li>
        <li v-on:click="togglemenu();gotoAnchor('.contact')">Contact</li>
       
      </span>
    </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menutoggle: false,
      cartitems: 0,
      close: false,
      checkoutid: localStorage.getItem("checkoutid")
    };
  },
  methods: {
    gotoAnchor(cssclass) {
     this.$router.push('/')
      document.querySelector(cssclass).scrollIntoView({ 
        behavior: 'smooth' 
      });
    },
    closebanner() {
      this.close = !this.close;
    },
    togglemenu() {
      this.menutoggle = !this.menutoggle
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
  box-shadow: 0px 0px 7px rgba(0, 0, 0, .05);
  text-align: center;
  z-index: 9999;
  flex-direction: column;
  overflow: hidden;
}
li {
  cursor: pointer;
}
.open {
  min-height: 100vh;
}
.buttonstripe {
  height: 5px;
  width: 100%;
  background: black;
  border-radius: 10px;
  float: left;

  margin: 2px;
}
.buttonstripe:nth-of-type(2) {
  width: calc(100% - 8px);
}

.announcement {
  height: 50px;
  color: white;
  line-height: 50px;
  position: relative;
  background: #22e7af;
}
.closemenu {
  position: absolute;
  left: 7px;
  top: 0;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 30px;
  width: 50px
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
.mobilemenu {
  width: 100vw;
  min-height: 100%;
  position: fixed;
  z-index: 9999;
  background: white;
  left: 0;
  top: 0;

}


.mobilemenu ul {
  text-align: left;
  padding: 0;
  position: absolute;
  z-index: 1;
  transform: translateX(-50%);
  left: 50%;

  width: 100%;
  margin: 0;
}
.mobilemenu li {
  height: 40px;
  padding: 0px 20px;
  box-sizing: border-box;
  width: 100%;
  display: block;
  line-height: 40px;
  border-bottom: 1px solid rgba(0,0,0, .2);
}
 .logo {
  text-align: center;
  font-size: 80px;
  float: left;
  height: 100px;
  background: url("https://media.discordapp.net/attachments/546084619339038741/564534422595174411/Group.png") no-repeat center center;
  text-transform: uppercase;
}

.navlist {
  display: block;
  padding: 0px;
  text-align: center;
  height: 50px;
  max-height: 80px;
  margin: 0px;
  flex: 1;
}

.navwrap {
  min-width: 600px;
  display: inline-block;
}

.mobilemenu .navwrap {
  margin-top: 40px;

}
.navlist li {
  display: block;
  float: left;
  flex: 1;
  font-size: 25px;
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
  background: url("https://media.discordapp.net/attachments/546084619339038741/564536432841064478/Vector.png") no-repeat center center;
  background-size: contain;
  height: 50px;
  margin: 0;
  margin-right: 5px;
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

.cartmobile,
.navbutton {
  display: none;
}
.logowrap {
  height: 50px;
  position: relative;
  width: 100%;
  display: none;
}
@media only screen and (max-width: 600px) {
  .navlist {
    display: none;
  }
  .mobilemenu {
    display: block;
  }
  .big {
    display: none;
  }
  .logowrap {
    display: block;
  }
  .logowrap .logo {
    width: 150px;
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
    right: 10px;
    border: none;
    background: none;
    top: 0px;
  }
  .navbutton {
    color: black;
    position: absolute;
    top: 0px;
    background: none;
    line-height: 50px;
    left: 10px;
    border: 0px;
    padding: 10px;
    display: block;
    font-size: 40px;
    float: left;
    width: 40px;
    height: 100%;
  }

}
</style>