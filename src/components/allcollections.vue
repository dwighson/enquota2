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
      <div class="custom-select">
        <select name="" id="">
          <option v-for="(collection, i) in collections" v-bind:key="i" v-on:click="selectCollection(i)">{{collection.title}}</option>
    
        </select>
      </div>
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
  mounted() {
      setTimeout(function() {
        var x, i, j, selElmnt, a, b, c;
        /*look for any elements with the class "custom-select":*/
        x = document.getElementsByClassName("custom-select");
        for (i = 0; i < x.length; i++) {
          selElmnt = x[i].getElementsByTagName("select")[0];
          /*for each element, create a new DIV that will act as the selected item:*/
          a = document.createElement("DIV");
          a.setAttribute("class", "select-selected");
          a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
          x[i].appendChild(a);
          /*for each element, create a new DIV that will contain the option list:*/
          b = document.createElement("DIV");
          b.setAttribute("class", "select-items select-hide");
          for (j = 1; j < selElmnt.length; j++) {
            /*for each option in the original select element,
          create a new DIV that will act as an option item:*/
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function() {
              /*when an item is clicked, update the original select box,
              and the selected item:*/
              var y, i, k, s, h;
              s = this.parentNode.parentNode.getElementsByTagName("select")[0];
              h = this.parentNode.previousSibling;
              for (i = 0; i < s.length; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                  s.selectedIndex = i;
                  h.innerHTML = this.innerHTML;
                  y = this.parentNode.getElementsByClassName(
                    "same-as-selected"
                  );
                  for (k = 0; k < y.length; k++) {
                    y[k].removeAttribute("class");
                  }
                  this.setAttribute("class", "same-as-selected");
                  break;
                }
              }
              h.click();
            });
            b.appendChild(c);
          }
          x[i].appendChild(b);
          a.addEventListener("click", function(e) {
            /*when the select box is clicked, close any other select boxes,
          and open/close the current select box:*/
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
          });
        }
        function closeAllSelect(elmnt) {
          /*a function that will close all select boxes in the document,
          except the current select box:*/
          var x,
            y,
            i,
            arrNo = [];
          x = document.getElementsByClassName("select-items");
          y = document.getElementsByClassName("select-selected");
          for (i = 0; i < y.length; i++) {
            if (elmnt == y[i]) {
              arrNo.push(i);
            } else {
              y[i].classList.remove("select-arrow-active");
            }
          }
          for (i = 0; i < x.length; i++) {
            if (arrNo.indexOf(i)) {
              x[i].classList.add("select-hide");
            }
          }
        }
        /*if the user clicks anywhere outside the select box,
          then close all select boxes:*/
        document.addEventListener("click", closeAllSelect);
      }, 1000);
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

};
</script>

<style scoped>
/** {
  outline: 1px solid red;
}*/
.allcollections {
  display: flex;
  /*width: calc(100% - 100px);*/
  max-width: 1750px;
  margin: 0 auto;
}
.custom-select {
  display: none
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
  position: relative;
  /* overflow-y: auto; */

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
@media only screen and (max-width: 1200px) {
  .filter {
    display: none;
  }
  .collections {
  padding-top: 50px;

  }
  .custom-select {
    display: block;
    height: 40px;
    min-width: 240px;
    position: absolute;
    top: 0px;
    border: 0px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
