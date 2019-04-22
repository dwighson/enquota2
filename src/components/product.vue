<template>
  <div class="product">
    <div class="slider">
      <div class="singlepic">
  <div>
    <div class="slide"></div>
  </div>
  <div>
    <div class="slide"></div>
  </div>
  <div>
    <div class="slide"></div>
  </div>


      </div>
      <div class="slidernav">
  <div>
    <div class="slide"></div>
  </div>
  <div>
    <div class="slide"></div>
  </div>
  <div>
    <div class="slide"></div>
  </div>

      </div>
    </div>
    <div class="productinfo">
      <div class="title"></div>
      <div class="designedby"></div>
      <div class="instock"></div>
      <div class="description"></div>
      <div class="price"></div>
      <hr>
      <div class="formaat"></div>
      <div class="diepte"></div>
    </div>
  </div>
</template>
<script>
import slick from 'slick-carousel'
import $ from 'jquery'

export default {
  mounted() {
    $('.singlepic').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.slidernav'
    });
    $('.slidernav').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.singlepic',
      dots: true,
      centerMode: true,
      focusOnSelect: true
    });
  }
}
</script>

<style scoped>
.product {
  background: purple;
  text-align: center;
}
.slider {
  min-height: 800px;
  width: calc(50% - 20px);
  background: indianred;
  display: inline-block;
  vertical-align: top;
}
.productinfo {
  min-height: 800px;
  background: green;
  width: calc(50% - 20px);
  display: inline-block;
  vertical-align: top;
}
.singlepic {
  height: 400px;
  width: 400px;
  background: blue;
}
.slidernav {
  height: 100px;
  width: 400px;
  background: purple;
}
</style>
