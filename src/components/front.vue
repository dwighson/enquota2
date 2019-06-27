<template>
  <div class="front">
    <newstock/>
    <h1>Shop</h1>
    <allcollections/>
    <!-- <testimonials/> -->
    <div class="aboutuswrap">
      <aboutus/>
      <instagram/>
    </div>
    <shipping/>
    <contact/>
  </div>
</template>
<script>
import newstock from "./newstock";
import allcollections from "./allcollections";
import testimonials from "./testimonials";
import aboutus from "./aboutus";
import instagram from "./instagram";
import contact from "./contact";
import shipping from "./shippingbanner";

export default {
  components: {
    newstock,
    allcollections,
    testimonials,
    aboutus,
    instagram,
    shipping,
    contact
  }
};
</script>

<style scoped>
.front {
  /* min-height: 100vh; */
  flex: 1;
}
.aboutuswrap {
  margin: 0 auto;
  text-align: center;
  width: 100%;
  max-width: 1750px;
  min-height: 600px;
}

h1 {
  margin-left: 80px;
  margin-top: 40px;
}
</style>
