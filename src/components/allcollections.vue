<template>
  <div class="allcollections">
    <div class="filter">
      <p>Collections</p>
      <ul>
        <li v-for="i in 30" v-bind:key="i">
          <input type="checkbox">
          collection
        </li>
      </ul>
    </div>
    <div class="collections">
      <div class="item" v-for="i in 8" v-bind:key="i">
        <div class="thumbnail"></div>
        <div class="titleAndPrice">
          <div class="title">product title</div>
          <div class="price">&euro; 73 ,-</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
.allcollections {
  padding-top: 100px;
  display: flex;
}
.filter {
  flex: 1;
  margin: 20px;
  min-height: 500px;
  padding: 10px 0px 0px 25px;
  box-sizing: border-box;
  max-width: 350px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}
.collections {
  margin: 20px;
  flex: 1;
  min-height: 500px;
  text-align: center;
}
.collections .item {
  height: 400px;
  margin: 10px;
  width: 300px;
  display: inline-block;
}
.item .titleAndPrice {
  display: flex;
  padding: 5px;
}
.titleAndPrice .title {
  flex: 1;
  text-align: left;
}
.filter li {
  display: flex;
}
.item .thumbnail {
  height: 295px;
  width: 295px;
  background: #f6f6f6;
  margin: 0px 5px 5px 5px;
}
</style>
