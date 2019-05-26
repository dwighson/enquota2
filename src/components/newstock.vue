<template>
  <div class="newstock">
    <h1>nieuwe canvassen op voorraad</h1>
    <div class="stockwrap"></div>
  </div>
</template>
<script>
import $ from "jquery";
import slick from "slick-carousel";
import "slick-carousel/slick/slick.css";
export default {
  data() {
    return {
      collectionss: [],
      images: []
    };
  },
  computed: {
    collections() {
      this.$shopify.collection.fetchAllWithProducts().then(collections => {
        // Do something with the collections
        this.collectionss = collections;
      });
      let findnew = this.collectionss.find(function(collect) {
        return collect.handle == "nieuw";
      });

      return findnew;
    }
  },
  methods: {
    gotoproduct(product) {
      let collectionhandle = this.collections.handle;

      let producthandle = product.handle;
      this.$router.push("product/" + collectionhandle + "/" + producthandle);
    }
  },
  mounted() {
    $(".stockwrap").slick({
      // lazyLoad: "ondemand",
      slidesToShow: 4,
      dots: false,
      arrows: false,
      centerMode: false
    });

    this.$shopify.collection.fetchAllWithProducts().then(collections => {
      // Do something with the collections
      this.collectionss = collections;
      let imgg = this.images;
      let findnew = this.collectionss.find(function(collect) {
        return collect.handle == "nieuw";
      });
      console.log(findnew.products);
      for (let i = 0; i <= findnew.products.length - 1; i++) {
        console.log("<router-link to='/products/" + findnew.handle + "/" + findnew.products[i].handle +" '>")
        imgg.push(findnew.products[i].images[0].src);
        if (i == findnew.products.length - 1) {
          for (let x = imgg.length - 1; x >= 0; x--) {
            setTimeout(function() {
              $(".stockwrap").slick(
                "slickAdd",
                "<a href='/product/" + findnew.handle + "/" + findnew.products[i].handle +" '><div class='newstockitem' style='background: url(" +
                  imgg[x] +
                  ") no-repeat center center; background-size: cover; '></div> </a>"
              );
            }, 500);
          }
        }
      }
    });
  }
};
</script>

<style>
.newstock {
  min-height: 300px;
  /* padding-top: 25px; */
  width: 100%;
  text-align: center;
  background: #f7f7f7;
}

.newstock h1 {
  font-size: 64px;
  color: black;
  margin-top: 0;
  text-align: center;
  height: 150px;
  line-height: 150px;
  text-transform: capitalize;
}
.stockwrap {
  margin: 0 auto;
  width: calc(100% - 100px);
}
.stockwrap a {
  display: inline-block;
}
.newstockitem {
  height: calc(300px - 30px);
  width: calc(100% - 100px);
  /* max-width: 400px; */
  min-width: 200px;
  position: relative;
  background: white;
  display: inline-block;
  margin: 10px;
}
.newstockitem img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: 50% 50%;
}
.newstockitem::before {
  content: "NIEUW";
  height: 20px;
  width: 100px;
  background: #22e7af;

  position: absolute;
  bottom: 0;
  left: 0;
  line-height: 20px;
  color: white;
}
</style>
