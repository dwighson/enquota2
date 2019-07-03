<template>
  <div class="instagram">
    <div class="instatitle">
       <h1>Instagram</h1> <button>Follow ons nu!</button>
    </div>
    <div class="instafeed">
      <div class="instapic"></div>
      <div class="instapic"></div>
      <div class="instapic"></div>
      <div class="instapic"></div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import Instafeed from "instafeed.js";
export default {
  mounted() {
 
  }
};
</script>

<style scoped>
 * {
  /*outline: 1px solid red;*/
 }
  .instagram {
    width: calc(50% - 200px);  
    margin: 80px;
    min-height: 400px;
    box-sizing: border-box;
    /*float: left;*/
    display: inline-block;
    vertical-align: top;
  }
  .instatitle {
    height: 100px;
    margin: 50px 0px 0px 0px;
    width: 100%;
  }
  .instafeed {
    min-height: 200px;
    width: 100%;
    text-align: left;
  }
  .instatitle h1 {
    width: 250px;
    float: left;
    font-size: 48px;
    margin: 0;
  }
  .instafeed .instapic {
    width: 300px;
    display: inline-block;
    margin: 5px;
    height: 300px;
    background: black;
  }
  .instatitle button {
    height: 70px;

    width: 250px;
    border: none;
    background: #00f8b0;
    font-weight: bolder;
    color: white;
    font-size: 20px;
    float: left;
  }




  @media only screen and (max-width: 1600px) {

    .instafeed {
      width: 100%;
      text-align: center;
    }
    .instafeed .instapic {
      width: 220px;
      height: 220px;
      background: black;
    }
  }
  @media only screen and (max-width: 1450px) {
    .instagram {
      width: 600px;
      margin: 0;
      text-align: center;
    }
  }


  @media only screen and (max-width: 650px) {
    .instafeed .instapic {
      width: 220px;
      height: 220px;
    }
    .instagram, .instafeed{
      width: 100% !important;
    }
    .instatitle {
      width: 100%;
      min-height: 200px;
    }
    .instatitle h1 {
      width: 100%;
    } 
    .instatitle button{
      float: none;
      margin: 0 auto;
      width: calc(100% - 50px);
    }
  }
  @media only screen and (max-width: 420px) { 
    .instafeed .instapic {
      width: 130px;
      height: 130px;
    }
  }

</style>
