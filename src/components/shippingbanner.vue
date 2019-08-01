<template>
  <div class="shippingbanner">
    <div class="items">
      <img src="@/assets/auto.png"/>
      <br>
      <b>Gratis verzendkosten</b>
      <p>Gratis verzendkosten binnen Nederland en Belgie</p>
    </div>
    <div class="items">
      <img src="@/assets/vlag.png"/>
      <img src alt>
      <br>
      <b>Geproduceerd in NL</b>
      <p>Onze producten zijn alleen geproduceerd in Nederland!</p>
    </div>
    <div class="items">
      <img src="@/assets/geldterug.png"/>
      <br>
      <b>Niet tevreden? Geld terug!</b>
      <p>U krijgt uw geld 100% bij een ontevreden kosten!</p>
    </div>
  </div>
</template>
<style scoped>
.shippingbanner {
  min-height: 250px;
  width: 100%;
  padding-top: 50px;
  background: #f0f0f0;
  text-align: center;
}
img {
  max-height: 50px;
}
.items {
  padding: 10px;
  height: 100%;
  width: 300px;
  color: black;
  vertical-align: top;
  margin: 5px;
  display: inline-block;
}
</style>
