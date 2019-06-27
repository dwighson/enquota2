<template>
  <div class="product" v-show="title != ''">
    <div class="slider">
      <div class="carousel"></div>
      <div class="carouselnav"></div>
    </div>
    <div class="productinfo">
      <div class="title">{{title}}</div>
      <div class="designedby">designed by Enquota</div>
      <div class="instock">op voorraad</div>
      <div class="description" v-html="description"/>

      <div class="price">&euro;{{variantprice}}</div>
      <hr>
      <div class="formaat">
        <b>Formaat:</b>
      </div>
      <p>afmetingen zijn in centimeters</p>
      <div class="formaten">
        <div
          v-bind:class="{formats: true, selectedformat:selectedformat == index}"
          v-for="(item, index) in options.format"
          v-on:click="selectformat(index)"
          v-bind:key="index"
        >{{item}}</div>
      </div>
      <p>diepte:</p>
      <div class="diepte">
        <div
          v-bind:class="{depths: true, selectedformat:selecteddepth == index}"
          v-for="(item, index) in options.depth"
          v-on:click="selectdepth(index)"
          v-bind:key="index"
        >{{item}}</div>
      </div>
      <p>lijst:</p>
      <div class="lijst">
        <div
          v-bind:class="{border: true, selectedformat:selectedborder == index}"
          v-for="(item, index) in options.border"
          v-on:click="selectborder(index)"
          v-bind:key="index"
        >{{item}}</div>
      </div>
      <div class="addtocart">
        <div class="counter">
          <div class="remove" v-on:click="remove()">-</div>
          <div class="count">{{ amount }}</div>
          <div class="add" v-on:click="add">+</div>
        </div>
        <button v-on:click="addtocart">in mijn winkelmandje</button>
      </div>
      <p>Veilig en makkelijk betalen met:</p>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line
import slick from "slick-carousel";
import "slick-carousel/slick/slick.css";
import $ from "jquery";
import { setTimeout } from "timers";

export default {
  data() {
    return {
      amount: 1,
      options: {
        format: [],
        depth: [],
        border: []
      },
      selectedformat: 0,
      selecteddepth: 0,
      selectedborder: 0,
      description: "",
      title: "",
      images: [],
      collectionId: "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzEyOTMyMjQ1MTAyMg",
      chosenvariant: "",
      products: null,
      checkoutid: "",
      productid: "",
      variantprice: ""
    };
  },
  methods: {
    selectformat(index) {
      this.selectedformat = index;

      let format = this.options.format[index];
      let depth = this.options.depth[this.selecteddepth];
      let border = this.options.border[this.selectedborder];
      let query = format + " / " + depth + " / " + border;

      this.chosenvariant = query;
      this.changeprice(query);
    },
    selectdepth(index) {
      this.selecteddepth = index;

      let format = this.options.format[this.selectedformat];
      let depth = this.options.depth[index];
      let border = this.options.border[this.selectedborder];
      let query = format + " / " + depth + " / " + border;

      this.chosenvariant = query;
    },
    selectborder(index) {
      this.selectedborder = index;

      let format = this.options.format[this.selectedformat];
      let depth = this.options.depth[this.selecteddepth];
      let border = this.options.border[index];
      let query = format + " / " + depth + " / " + border;

      this.chosenvariant = query;
    },
    add() {
      this.amount++;
    },
    remove() {
      if (this.amount >= 2) {
        this.amount--;
      }
    },
    changeprice(query) {
      let pId = this.productid;

      this.$shopify.product.fetch(pId).then(product => {
        // Do something with the product
        // console.log(product)
        let initvariant = product.variants.find(function(variant) { return variant.title == query})
        this.variantprice = initvariant.price
      });
    },
    addtocart() {
      let chosenvariant = this.chosenvariant;
      let variantobj = this.products.variants.filter(function(variant) {
        return variant.title == chosenvariant;
      });

      if (typeof variantobj[0] == "undefined") {
        alert("Variant niet beschikbaar!");
      } else {

        const lineItemsToAdd = [
          {
            variantId: variantobj[0].id,
            quantity: this.amount
            // customAttributes: [{ key: "MyKey", value: encodeddata }]
          }
        ];
        this.$shopify.checkout.addLineItems(this.checkoutid, lineItemsToAdd)
        .then(checkout => {
          // console.log(checkout)
          alert('toegevoegd aan de winkelwagen!')
        });
      }

      // if (typeof variantobj[0].id == 'undefined') {
      //   alert("gekozen variant is niet beschikbaar!");
      // } else {
      //   const lineItemsToAdd = [
      //     {
      //       variantId: variantobj[0].id,
      //       quantity: this.amount,
      //       customAttributes: [
      //         { key: "MyKey", value: JSON.stringify(snapshot) }
      //       ]
      //     }
      //   ];
      //   // Add an item to the checkout
      //   this.$shopify.checkout
      //     .addLineItems(this.checkoutid, lineItemsToAdd)
      //     .then(checkout => {
      //       // Do something with the updated checkout
      //     });
      // }
    }
  },
  mounted() {
    $(window).resize(function() {
      $(".carousel").css({
        height: $(".carousel").width() + "px"
      });

      $(".carousel .slide").css({
        height: $(".carousel .slide").width() + "px"
      });
      $(".carouselnav .slide").css({
        height: $(".carouselnav .slide").width() + "px"
      });
    });
    $(".carousel").slick({
      // lazyLoad: "ondemand",
      slidesToShow: 1,
      dots: false,
      arrows: false,
      centerMode: false
    });

    $(".carouselnav").slick({
      // lazyLoad: "ondemand",

      slidesToShow: 5,
      dots: false,
      arrows: false,
      asNavFor: ".carousel",
      focusOnSelect: true,
      centerMode: false
      // responsive: [
      //   {
      //     breakpoint: 1024,
      //     settings: {
      //       slidesToShow: 3,
      //       slidesToScroll: 3,
      //       infinite: true,
      //     }
      //   }
      // ]
    });

    const collectionId = this.$route.params.collectionid;

    this.$shopify.collection.fetchAllWithProducts().then(collections => {
      let id = collections.find(function(singlecollection) {
        return singlecollection.handle == collectionId;
      }).id;
      const productId = this.$route.params.productid;
      // this.productid =
      this.$shopify.collection.fetchWithProducts(id).then(collection => {
        let products = collection.products.filter(function(product) {
          return product.handle == productId;
        });
        this.productid = products[0].id;
        this.products = products[0];
        this.description = products[0].descriptionHtml;
        this.title = products[0].title;
        this.options.format = products[0].options[0].values;
        this.options.depth = products[0].options[1].values;
        this.options.border = products[0].options[2].values;
        // this.images = products.images.src

        let format = this.options.format[this.selectedformat];
        let depth = this.options.depth[this.selecteddepth];
        let border = this.options.border[this.selectedborder];
        let query = format + " / " + depth + " / " + border;
        let initvariant = products[0].variants.find(function(variant) { return variant.title == query})
        this.variantprice = initvariant.price
        let imgg = this.images;

        for (let i = 0; i <= products[0].images.length - 1; i++) {
          imgg.push(products[0].images[i].src);
          if (i == products[0].images.length - 1) {
            for (let x = imgg.length - 1; x >= 0; x--) {
              setTimeout(function() {
                $(".carousel").slick(
                  "slickAdd",
                  "<div class='slide' style='background: url(" +
                    imgg[x] +
                    ") no-repeat center center; background-size: cover; '></div>"
                );
                $(".carouselnav").slick(
                  "slickAdd",
                  "<div class='slide' style='background: url(" +
                    imgg[x] +
                    ") no-repeat center center; background-size: cover; '></div>"
                );

                $(".carousel").css({
                  height: $(".carousel").width() + "px"
                });

                $(".carousel .slide").css({
                  height: $(".carousel .slide").width() + "px"
                });
                $(".carouselnav .slide").css({
                  height: $(".carouselnav .slide").width() + "px"
                });
              }, 500);
            }
          }
        }
      });
    });

    this.checkoutid = localStorage.getItem("checkoutid");

    this.chosenvariant = "30x40 / 2 cm / geen lijst";
  }
};
</script>

<style >
.product {
  padding-top: 50px;
  flex: 1;
  /* display: inline-block; */
  /* background: green; */
  text-align: center;
}
.product * {
  /* outline: 1px solid red; */
}
.designedby {
  color: rgba(0,0,0, .4);
}
.slider {
  min-height: 300px;
  width: calc(50% - 20px);
  min-width: 350px;
  max-width: 800px;
  display: inline-block;
  vertical-align: top;
}
.productinfo {
  min-height: 800px;
  text-align: left;
  width: calc(50% - 150px);
  min-width: 350px;
  /* max-width: 500px; */
  display: inline-block;
  padding: 20px;
  box-sizing: border-box;
  vertical-align: top;
}
.title {
  font-size: 40px;
  font-weight: bolder;
}
.selectedformat {
  background: black;
  color: white !important;
}
.lijst {
  min-height: 100px;
}
.carousel {
  width: calc(100% - 100px);
  max-width: 560px;

  overflow: hidden;
  margin: 0 auto;
  height: 560px;
}
.carousel .slide {
  max-height: 560px;
  height: 560px;
  background: black;
  width: 100%;

  overflow: hidden;
  min-height: 100%;
}

.slide img {
  height: 100%;
  width: 100%;
  position: relative;
  object-fit: cover;
  object-position: 50% 50%;
  user-select: none;
}
.description {
  font-size: 20px;
}
.productinfo .price {
  font-size: 48px;
}
.carouselnav {
  height: 100px;
  width: 100%;
  max-width: 555px;
  margin: 0 auto;
}
.carouselnav .slide {
  max-height: 90px;
  overflow: hidden;
  width: 25%;
  height: 100%;
  max-width: 90px;
}

.carouselnav .slick-slide {
  margin: 5px;
}
.formaten {
  height: 100px;

  width: 100%;
  margin-bottom: 10px;
  display: flex;
}
.formaat b {
  font-size: 21px;
}
.formats {
  height: 140px;
  margin: 10px;
  width: 100px;
  text-align: center;
  line-height: 120px;
  color: black;
  flex: 1;
  /* float: left; */
  transition: all 0.3s ease;
  border: 2px solid black;

  padding: 4px;
  box-sizing: border-box;
}
.formats:first-of-type {
  max-width: 100px;
  height: 50px;
  line-height: 40px;
}
.formats:nth-of-type(2) {
  max-width: 135px;
  height: 70px;
  line-height: 60px;
}
.formats:nth-of-type(3) {
  max-width: 150px;
  height: 90px;
  line-height: 70px;
  position: relative;
  border: 2px solid red;
}
.formats:nth-of-type(3)::before {
  content: "Meest gekozen";
  color: white;
  line-height: 20px;
  position: absolute;
  height: 20px;
  width: calc(100% + 1px);
  background: red;
  bottom: 0;
  left: 0;
}
.formats:nth-of-type(4) {
  max-height: 100px;
  line-height: 100px;
  max-width: 200px;
}
.diepte {
  width: 100%;
  height: 100px;
}
.depths {
  text-align: center;
  line-height: 42px;
  height: 50px;
  border: 2px solid black;
  margin: 5px;
  transition: all 0.3s ease;

  padding: 4px;
  box-sizing: border-box;
  width: 80px;
  float: left;
}
.border {
  text-align: center;
  line-height: 50px;
  height: 50px;
  border: 2px solid black;
  margin: 5px;
  transition: all 0.3s ease;

  width: 100px;
  float: left;
}
.addtocart {
  outline: 2px solid black;
  margin: 30px 0px 40px 0px;

  height: 60px;
  width: 100%;
  margin: 5px;
  display: flex;
}
.addtocart button {
  flex: 1;
  border: none;
  height: 100%;
  background: black;
  color: white;
}
.addtocart .counter {
  flex: 1;
  display: flex;
  text-align: center;
  color: black;
  max-width: 150px;
}
.counter .add {
  flex: 1;
  line-height: 60px;
}
.counter .count {
  line-height: 60px;
  flex: 1;
}
.counter .remove {
  flex: 1;
  line-height: 60px;
}
</style>
