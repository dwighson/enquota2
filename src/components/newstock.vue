<template>
  <div class="newstock">
    <h1>nieuwe canvassen op voorraad</h1>
      <router-link to="product" v-for="i in 4" v-bind:key="i">
        <div class="newstockitem" >item</div>
      </router-link>
  </div>
</template>
<style>
.newstock {
  min-height: 400px;
  padding-top: 25px;
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
  outline: 1px solid black;
  height: calc(300px - 30px);
  width: calc(25% - 20px);
  max-width: 300px;
  min-width: 200px;

  background: white;
  display: inline-block;
  margin: 10px;
}
</style>
