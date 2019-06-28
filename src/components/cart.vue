<template>
  <div class="cartpage">
    <ul class="cartitem">
      <li v-for="(item, x) in checkoutobj" v-bind:key="x">
        <div class="thumbnail">
          <img v-bind:src="item.variant.image.src" alt>
        </div>
        <div class="iteminfo">
          <p class="title">
            {{item.title}}
            {{item.variant.price}}
          </p>

         <p class="productdetails"> {{item.variant.title}}</p>
          <button v-on:click="removeproduct(item.id, x)">verwijder product</button>
        </div>
      </li>
    </ul>

    <div class="total">
      <p>
        subtotaal:
        <span class="pricespan">&euro;2</span>
      </p>
      <p>
        verzendkosten:
        <span class="pricespan">gratis</span>
      </p>

      <p>kortingscode invoeren:</p>
      <input type="text" placeholder="ENQUOTA2019">
      <button class="discountbutton">+</button>

      <p>
        Totaal:
        <span>&euro;150,00</span>
      </p>

      <button class="checkoutbutton">bestellen</button>
      <p class="geldterug">niet tevreden? Geld terug!</p>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line
import $ from "jquery";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      checkoutid: localStorage.getItem("checkoutid"),
      cart: null,
      checkoutobj: [],
      checkoutraw: [],
      chosenOptions: "",
      products: [],
      options: []
    };
  },

  methods: {
    fetchoptions() {
      for (let y = 0; y <= this.checkoutobj.length - 1; y++) {
        this.$shopify.product
          .fetch(this.checkoutobj[y].variant.product.id)
          .then(product => {
            this.options.push({ values: product.options });
            console.log(this.checkoutobj[y]);
            console.log(this.options);
          });
      }
    },
    fetchChosenOptions(variant){
      
    },
    gotocheckout() {
      let checkid = this.checkoutid;
      this.$shopify.checkout.fetch(checkid).then(checkout => {
        window.location.href = checkout.webUrl;
      });
    },
    removeproduct(id, index) {
      const checkoutId = this.checkoutid; 
      const lineItemIdsToRemove = [id];

      this.$shopify.checkout
        .removeLineItems(checkoutId, lineItemIdsToRemove)
        .then(checkout => {
          this.checkoutobj.splice(index, 1);
          this.options.splice(index, 1);
          alert("Het product is uit uw winkelwagel verwijdert");
        });
    },
    fetchproduct(id, custom) {
      let decodeddata = window.atob(custom[0].value);
      let objj = Object.values(JSON.parse(decodeddata));

      let options = {
        format: [],
        depth: [],
        border: []
      };
      for (let i = 0; i <= objj[0].length - 1; i++) {
        options.format.push(objj[0][i].value);
      }
      for (let i = 0; i <= objj[1].length - 1; i++) {
        options.depth.push(objj[1][i].value);
      }
      for (let i = 0; i <= objj[2].length - 1; i++) {
        options.border.push(objj[2][i].value);
      }

      return options;
    }
  },
  mounted() {
    let checkid = this.checkoutid;
    this.$shopify.checkout.fetch(checkid).then(checkout => {

      this.checkoutraw = checkout;
      for (let i = 0; i <= checkout.lineItems.length - 1; i++) {
        this.checkoutobj.push(checkout.lineItems[i]);
        if (i == checkout.lineItems.length - 1) {
          this.fetchoptions();
        }
      }
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
    });
  }
};
</script>

<style scoped>

.cartpage {
  padding-top: 100px;
  width: 100vw;
  flex: 1;
  text-align: center;
}
.cartpage h1 {
  text-align: left;
  width: 1390px;
  margin: 0 auto;
}
li p {
  width: 100%;
}
.pricespan {
  float: right;
  font-weight: normal
}
ul.cartitem {
  display: inline-block;
  width: 700px;
  margin-top: 0px;
  text-align: left;
  padding: 0;

}
hr {
  border: 1px solid rgba(0,0,0, .1);
}

.cartitem li {
  display: flex;
  margin-bottom: 10px;
  text-align: left;
  width: 100%;
  max-width: 600px;
  min-height: 10px;
}
.thumbnail {
  height: 170px;
  width: 170px;
  
  background: black;
}
.thumbnail img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: 50% 50%;
}
.iteminfo {
  /*width: calc(100% - 20px);*/
  width: 400px;
  position: relative;
  padding: 0px 0px 0px 20px;
  box-sizing: border-box;
}
.iteminfo .deleteitem {
  position: absolute;
  bottom: 0px;
  left: 30px;
}
.iteminfo .title {
  font-size: 30px;
  padding: 0;
  width: 100%;
  margin: 0;
}
p {
  font-size: 20px;
}

.total {
  display: inline-block;
  margin: 0 auto;
  vertical-align: top;
  height: 400px;
  width: 100%;
  border: 1px solid rgba(0,0,0, .2);
  text-align: left;
  padding: 20px;
  max-width: 450px;
  box-sizing: border-box;
}
.total .checkoutbutton {
  width: 100%;
  background: #22E7AF;
  font-weight: bolder;
  color: white;
  height: 40px;
  font-size: 20px;;
  border: none;
}
.total .discountbutton {
  background: #22E7AF;
  color: white;
  border: none;
  height: 40px;
  width: 40px;  
  font-weight: bolder;
  font-size: 30px;
  line-height: 30px;
}
.total .geldterug {
 text-align: center;
 font-size: 15px;
 font-weight: lighter;
}
.total input {
  width: calc(100% - 40px);
  background: #F2F2F2;
  border: none;
  vertical-align: top;
  height: 40px;
  box-sizing: border-box;
  padding: 10px;
}
.dropdown {
  padding: 0;
  margin: 0;
  position: absolute;
  width: 140px;
}
.optionbutton {
  width: 140px;
  margin: 0;
}
.dropdownwrap p {
  padding: 0;
  margin: 0;
}
.dropdownwrap {
  float: left;
  width: 150px;
  margin: 5px;
  max-height: 70px;
  position: relative;
}
.dropdown li {
  display: block;
  width: 100%;
  margin: 0;
}
@media only screen and (max-width: 1155px) {
  .cartitem li {
    width: 450px;
  }
  .cartitem {
    max-width: 500px;
  }
  .iteminfo .title {
    font-size: 22px;
  }
  .thumbnail {
    width: 170px;
  }
}
@media only screen and (max-width: 920px) {
  ul.cartitem {
    margin: 0px 50px 50px 50px;
  }
  .cartitem {
    max-width: 450px;
  }
}
@media only screen and (max-width: 550px) {
  .cartpage {
    overflow-x: hidden;

    width: 100vw;
  }
  .total {
    margin: 10px;
    width: calc( 100% - 10px);
  }
  .cartitem {
    margin: 0 !important;
    width: 100vw;
    
  }
  .cartitem li {
    margin: 0 auto;
    margin-bottom: 10px;
    min-width: 100%;

  }
  .thumbnail {
    margin-left: 10px;
    min-width: 120px ;
    height: 120px;
  }
  .iteminfo .title {
    font-size: 15px;
    width: 200px;
    text-transform: uppercase;
  }
  .iteminfo button {
    height: 35px;
    font-size: 15px;
    line-height: 35px;
    width: calc(100% - 20px);

  }
  .productdetails {
    margin: 10px 0px;
    font-size: 15px;

  }
}
</style>
