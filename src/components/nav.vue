<template>
  <div class="nav">
    <div class="shipping">Gratis verzending voor Nederland en België</div>
    <div class="announcement" v-show="close == false">
      Kempi Collectie staat nu online!
      <button class="closeBanner" v-on:click="closebanner">&times;</button>
    </div>
    <div class="logo"></div>
    <ul class="navlist">
      <span class="navwrap">
        <routerlink tag="li" to="/">Shop</routerlink>
        
        <li>over ons</li>
        <li>Contact</li>
        <li>testimonials</li>

        <li class="cart">
          <div class="carticon"></div>
        </li>
      </span>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      close: false
    }
  },
  methods: {
    closebanner() {
      this.close =! this.close
    }
  }
};
</script>
<style >
.nav {
  position: fixed;
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
}
.announcement {
  height: 50px;
  color: white;
  line-height: 50px;
  position: relative;
  background: #22E7AF;
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
</style>
