<template>
  <div class="instagram">
    <div id="instafeed">
      
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import Instafeed from "instafeed.js";
export default {
  mounted() {
    var userFeed = new Instafeed({
      get: 'user',
      userId: '8987997106',
      clientId: '8e0a0bea66524e04aa333a04c0637d9a',
      accessToken: '8987997106.924f677.8555ecbd52584f41b9b22ec1a16dafb9',
      resolution: 'standard_resolution',
      template: '<a href="{{link}}" target="_blank" id="{{id}}"><div class="instapic"><img src="{{image}}" /></div></a>',
      sortBy: 'most-recent',
      limit: 4,
      links: false
    });
    userFeed.run();
    let instapic = $(".instapic");
    let width = instapic.width();
    instapic.height(width);
    instapic.css({
      "line-height": width + "px"
    });
    window.onresize = function() {
      let instapic = $(".instapic");
      let width = instapic.width();
      instapic.height(width);
      instapic.css({
        "line-height": width + "px"
      });
    };
  }
};
</script>

<style>
.instagram {
  margin: 5px;
  max-width: 850px;
  vertical-align: top;
  display: inline-block;
  min-height: 400px;
}
.instapic {
  width: calc(50% - 30px);
  min-width: 300px;
  max-width: 415px;
  float: left;
  margin: 10px;
}

.instapic img {
  height: 100%;
  width: 100%;
}
</style>
