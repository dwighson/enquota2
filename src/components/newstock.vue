<template>
  <div class="newstock">
    <h1>nieuwe canvassen op voorraad</h1>
    <router-link to="product" v-for="(product,i) in collections.products" v-bind:key="i">
      <div class="newstockitem">
        <img v-bind:src="product.images[0].src" alt>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      collectionss: []
    };
  },
  computed: {
    collections() {
      var coll;
      this.$shopify.collection.fetchAllWithProducts().then(collections => {
        // Do something with the collections
        // console.log(collections);
        // console.log(collections[0].products)
        this.collectionss = collections;
      });
      let findnew = this.collectionss.find(function(collect) {
        return collect.handle == "nieuw";
      });
      return findnew;
    }
  }
};
</script>

<style>
.newstock {
  min-height: 400px;
  /* padding-top: 25px; */
  width: 100%;
  padding-bottom: 50px;
  text-align: center;
  background: #f7f7f7;
}

.newstock h1 {
  font-size: 64px;
  color: black;
  text-transform: capitalize;
}
.newstockitem {
  line-height: calc(300px - 30px);
  height: calc(300px - 30px);
  width: calc(25% - 20px);
  max-width: 300px;
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
