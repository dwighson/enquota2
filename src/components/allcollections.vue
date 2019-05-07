<template>
  <div class="allcollections">
    <div class="filter">
      <p>Collections</p>
      <ul>
        <li v-for="(collection, i) in collections" v-bind:key="i" v-on:click="selectCollection(i)">
          <div class="checkbox">
            <div class="checked" v-if="selectedCollection == i"></div>
          </div>
          {{collection.title}}
        </li>
      </ul>
    </div>
    <div class="collections">
      <div
        class="item"
        v-on:click="gotoproduct(product)"
        v-for="(product, i) in  collections[selectedCollection].products"
        v-bind:key="i"
      >
        <div class="thumbnail">
          <img v-bind:src="product.images[0].src" alt>
          <div class="newtag">NIEUW</div>
        </div>
        <div class="titleAndPrice">
          <div class="title">{{product.title}}</div>
          <div class="price">&euro;{{product.variants[0].price}}</div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      collectionss: [],
      selectedCollection: 0
    };
  },
  computed: {
    collections() {
      this.$shopify.collection.fetchAllWithProducts().then(collections => {
        // Do something with the collections
        this.collectionss = collections;
      });
      return this.collectionss;
    }
  },
  methods: {
    newcollection() {
      let newcollection = this.collections.filter(function(newcollect) {
        return newcollect.handle == "nieuw";
      });
      return newcollection[0];
    },
    limitedcollection() {
      let limitedcollection = this.collections.filter(function(limitedcollect) {
        return limitedcollect.handle == "limited-edition";
      });
      return limitedcollection[0];
    },
    selectCollection(index) {
      this.selectedCollection = index;
      console.log(this.collections[this.selectedCollection]);
    },
    gotoproduct(product) {
      let collectionhandle = this.collections[this.selectedCollection].handle;
      let producthandle = product.handle;

      this.$router.push("product/" + collectionhandle + "/" + producthandle);
    }
  },
  mounted() {}
};
</script>

<style scoped>
.allcollections {
  display: flex;
  width: calc(100% - 100px);
  margin: 0 auto;
}
.filter {
  flex: 1;
  margin: 20px;
  min-height: 500px;
  max-height: 600px;
  padding: 10px 0px 0px 25px;
  box-sizing: border-box;
  max-width: 350px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 30px;
}
.checkbox {
  height: 20px;
  border: 1px solid #22e7af;
  margin: 5px;
  width: 20px;
  margin-right: 30px;
}

ul {
  padding: 0px;
  height: calc(100% - 100px);
  overflow: auto;

  margin: 0px;
}
.checkbox .checked {
  background: #22e7af;
  margin: 2px;
  height: 16px;
  width: 16px;
}
.collections {
  margin: 20px;
  flex: 1;
  min-height: 500px;
  /* max-height: 800px; */
  /* overflow-y: auto; */

  text-align: center;
}
.collections .item {
  height: 400px;
  margin: 10px;
  width: 300px;
  float: left;
  /* display: inline-block; */
}
.item .titleAndPrice {
  display: flex;
  padding: 5px;
}
.titleAndPrice .title {
  flex: 1;
  text-align: left;
  font-size: 18px;
  font-weight: normal;
}
.filter li {
  display: flex;
  margin-bottom: 5px;
}
.item .thumbnail {
  height: 295px;
  width: 295px;
  position: relative;
  background: #f6f6f6;
  margin: 0px 5px 5px 5px;
}
.thumbnail .newtag {
  height: 25px;
  width: 90px;
  color: white;
  position: absolute;
  bottom: 0px;
  left: 0px;
  background: #22e7af;
}
.thumbnail img {
  height: 100%;
  width: 100%;

  object-fit: cover;
}
</style>
