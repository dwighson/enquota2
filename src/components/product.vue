<template>
  <div class="product">
    
    <div class="slider">
      <div class="carousel"></div>
      <div class="carouselnav"></div>
    </div>
    <div class="productinfo">
      <div class="title">{{title}}</div>
      <div class="designedby">designed by Enquota</div>
      <div class="instock">op voorraad</div>
      <div class="description" v-html="description"/>

      <div class="price">&euro;75,00</div>
      <hr>
      <div class="formaat">Formaat:</div>
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
    </div>
  </div>
</template>
<script>
import slick from "slick-carousel";
import "slick-carousel/slick/slick.css";
import $ from "jquery";

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
      checkoutid:
        ""
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
      console.log(this.chosenvariant);
    },
    selectdepth(index) {
      this.selecteddepth = index;

      let format = this.options.format[this.selectedformat];
      let depth = this.options.depth[index];
      let border = this.options.border[this.selectedborder];
      let query = format + " / " + depth + " / " + border;

      this.chosenvariant = query;

      console.log(this.chosenvariant);
    },
    selectborder(index) {
      this.selectedborder = index;

      let format = this.options.format[this.selectedformat];
      let depth = this.options.depth[this.selecteddepth];
      let border = this.options.border[index];
      let query = format + " / " + depth + " / " + border;

      console.log(this.chosenvariant);
    },
    add() {
      this.amount++;
    },
    remove() {
      if (this.amount >= 2) {
        this.amount--;
      }
    },
    addtocart() {
      let chosenvariant = this.chosenvariant;
      let snapshot = this.options
      let variantobj = this.products.variants.filter(function(variant) {
        return variant.title == chosenvariant;
      });
      
      const lineItemsToAdd = [
        {
          variantId: variantobj[0].id,
          quantity: this.amount,
          customAttributes: [{key: "MyKey", value: JSON.stringify(snapshot)}]
        }
      ];
      console.log(lineItemsToAdd);
      // Add an item to the checkout
      this.$shopify.checkout
        .addLineItems(this.checkoutid, lineItemsToAdd)
        .then(checkout => {
          // Do something with the updated checkout
          console.log(checkout.lineItems); // Array with one additional line item
        });
    }
  },
  mounted() {
    $(".carousel").slick({
      lazyLoad: "ondemand",
      slidesToShow: 1,
      dots: false,
      arrows: false,
      centerMode: false
    });

    $(".carouselnav").slick({
      lazyLoad: "ondemand",
      slidesToShow: 4,
      dots: false,
      arrows: false,
      asNavFor: ".carousel",
      focusOnSelect: true,
      centerMode: false
    });

    const collectionId = this.$route.params.collectionid;
    console.log(collectionId)
    const productId = this.$route.params.productid
    this.$shopify.collection.fetchWithProducts(collectionId).then(collection => {
      let products = collection.products.filter(function(product){ return product.handle == productId});
      console.log(products)
      this.products = products[0];
      this.description = products[0].descriptionHtml;
      this.title = products[0].title;
      this.options.format = products[0].options[0].values;
      this.options.depth = products[0].options[1].values;
      this.options.border = products[0].options[2].values;
      // this.images = products.images.src
      // console.log(products.variants[12].title)

      // console.log(variantobj[0].id);
      let imgg = this.images;
      for (let i = 0; i <= products[0].images.length - 1; i++) {
        // console.log(products.images[i].src)
        imgg.push(products[0].images[i].src);

        if (i == products[0].images.length - 1) {
          for (let x = 0; x <= imgg.length - 1; x++) {
            $(".carousel").slick(
              "slickAdd",
              "<div class='slide'><img draggable'false' data-lazy=" + imgg[x] + "/></div>"
            );

            $(".carouselnav").slick(
              "slickAdd",
              "<div class='slide'><img draggable'false' data-lazy=" + imgg[x] + "/></div>"
            );
          }
        }
      }
    });
    this.checkoutid = localStorage.getItem('checkoutid')

    this.chosenvariant = "30x40 / 2 cm / geen lijst";
  }
};
</script>

<style >
.product {
  padding-top: 50px;
  min-height: 400px;
  text-align: center;
}
.slider {
  min-height: 800px;
  width: calc(50% - 20px);
  min-width: 350px;
  max-width: 500px;
  display: inline-block;
  vertical-align: top;
}
.productinfo {
  min-height: 800px;
  text-align: left;
  width: calc(50% - 20px);
  min-width: 350px;
  max-width: 500px;
  display: inline-block;
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
.carousel {
  width: 400px;

  overflow: hidden;
  height: 400px;
}
.carousel .slide {
  height: 400px;
  width: 400px;
  overflow: hidden;
  min-height: 400px;
}
.slide img {
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
  user-select: none;
  user-drag: none; 
}
.carouselnav {
  height: 100px;
  width: 400px;
}
.carouselnav .slide {
  height: 90px !important;
  overflow: hidden;

  width: 90px;
}

.carouselnav .slick-slide {
  margin: 5px;
}
.formaten {
  height: 150px;
  width: 100%;
  margin-bottom: 20px;
}
.formats {
  height: 140px;
  margin: 5px;
  width: 100px;
  text-align: center;
  line-height: 140px;
  color: black;
  float: left;
  border: 2px solid black;
}
.diepte {
  width: 100%;
  height: 100px;
}
.depths {
  text-align: center;
  line-height: 50px;
  height: 50px;
  border: 2px solid black;
  margin: 5px;

  width: 100px;
  float: left;
}
.border {
  text-align: center;
  line-height: 50px;
  height: 50px;
  border: 2px solid black;
  margin: 5px;

  width: 100px;
  float: left;
}
.addtocart {
  outline: 2px solid black;
  margin: 5px;

  height: 60px;
  width: 100%;
  display: flex;
}
.addtocart button {
  flex: 1;
  border: none;
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
