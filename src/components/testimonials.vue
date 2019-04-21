<template>
  <div class="testimonials">
    <div v-for="i in 10" v-bind:key="i">
      <div class="card">
        <div class="pic"></div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import slick from "slick-carousel";
export default {
  mounted() {
    $(".testimonials").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      swipeToSlide: true,
      dots: false,
      centerMode: true,
      focusOnSelect: true,
      arrows: false
    });
  }
};
</script>
<style>
.testimonials {
  height: 330px;
  width: calc(100% - 100px);
  margin: 0 auto;
  padding-top: 65px;
  background: #F7F7F7;
}
.testimonials .card {
  height: 200px;
  background: white;
  margin: 0 auto;
  padding-top: 35px;
  box-sizing: border-box;
  margin-top: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  width: calc(33.33vw - 100px);
  max-width: 550px;
  min-width: 400px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}
.testimonialswrap {
  width: calc(100% - 100px);
  background: purple;
  min-height: 10px;
  margin: 0 auto;
}
.card .pic {
  height: 130px;
  width: 130px;
  border-radius: 5px;
  margin: 0px 20px 0px 35px;
  background: #f0f0f0;
}
</style>
