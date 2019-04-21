<template>
  <div class="front">
    <newstock/>
    <allcollections/>
    <testimonials/>
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

<style>
.front {
  min-height: 100vh;
}
.aboutuswrap {
  /* display: flex; */
  text-align: center;
  width: 100%;
  min-height: 600px;
}
</style>
