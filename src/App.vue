<template>
  <div id="app">
    <navbar/>
    <router-view/>
    <footerlinks/>

  </div>
</template>

<script>
import navbar from "./components/nav";
import products from "./components/products";
import footerlinks from "./components/footerlinks";
export default {
  name: "App",
  components: { navbar, products, footerlinks },
  methods: {}
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c:300,400,500");

body {
  margin: 0;
  height: 100vh;
  width: 100vw;

  overflow-x: hidden;
}
* {
  font-family: "M PLUS Rounded 1c";
}
#app {
  padding-top: 230px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-right: 13px;
}

/* ::-webkit-scrollbar-button { 
  display: block; 
  height: 13px; 
  border-radius: 0px; 
  background-color: #1efbdd; 
}  */
/* ::-webkit-scrollbar-button:hover{ background-color: #22E7AF; }  */

::-webkit-scrollbar-thumb {
  background-color: #CCC;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #22E7AF;
}
::-webkit-scrollbar-track {
  background-color: white;
}
::-webkit-scrollbar {
  width: 13px;
}
</style>
