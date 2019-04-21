<template>
  <div class="products">
    <div class="product" v-for="(item, index) in products" v-bind:key="index">
      {{ item.productId }}
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      products: [
        {
          productId: "nyutnytb",
          imagesrc: ""
        },
        {
          productId: "nyutn54ytb",
          imagesrc: ""
        }
      ]
    };
  },
  mounted() {
    let product = $(".product");
    let width = product.width();
    product.height(width);
    product.css({
      "line-height": width + "px"
    });
    window.onresize = function() {
      let product = $(".product");
      let width = product.width();
      product.height(width);
      product.css({
        "line-height": width + "px"
      });
    };
  }
};
</script>

<style scoped>
.products {
  height: calc(100vh - 100px);
  width: 100vw;
  text-align: center;
  background: blue;
}
.product {
  height: 200px;
  width: calc(50vw - 50px);
  max-width: 750px;
  min-width: 300px;

  margin: 10px;
  background: purple;
  display: inline-block;
}
</style>
