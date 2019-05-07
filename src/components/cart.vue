<template>
  <div class="cartpage">

    <ul class="cartitem">
 
   
      <hr>
      <li v-for="(item, x) in checkoutobj" v-bind:key="x">
        <div class="thumbnail">
          <img v-bind:src="item.variant.image.src" alt>
        </div>
        <div class="iteminfo">
          <p class="title">
            {{item.title}}
            <span class="pricespan">&euro;{{item.variant.price}}</span>
          </p>

          <div class="aantal dropdownwrap">
            <p>Aantal:</p>
            <div class="custom-select">
              <select name id>
                <option value>2</option>
              </select>
            </div>
          </div>
          <div class="formaat dropdownwrap">
            <p>formaat:</p>
            <div class="custom-select">
              <select name id>
                <option value="1">30x40</option>

                <option
                  v-bind:value="i"
                  v-for="(option, i) in options[0].values[0].values"
                  v-bind:key="i"
                >{{option}}</option>
              </select>
            </div>
          </div>
          <div class="diepte dropdownwrap">
            <p>Diepte:</p>
            <div class="custom-select">
              <select name id>
                <option value="1">2 cm</option>

                <option
                  v-bind:value="i + 1"
                  v-for="(option, i) in options[0].values[1].values"
                  v-bind:key="i"
                >{{option}}</option>
              </select>
            </div>
          </div>
          <div class="lijst dropdownwrap">
            <p>Lijst</p>
            <div class="custom-select">
              <select name id>
                <option value="1">met lijst</option>
                <option
                  v-bind:value="i + 1"
                  v-for="(option, i) in options[0].values[2].values"
                  v-bind:key="i"
                >{{option}}</option>
              </select>
            </div>
          </div>
          <p class="deleteitem" v-on:click="removeproduct(item.id, x)">verwijder product &times;</p>
        </div>
      </li>
    </ul>

    <div class="total">
      <p>
        subtotaal:
        <!-- <span>&euro;{{ checkoutraw.lineItemsSubtotalPrice.amount}}</span> -->
      </p>
      <p>
        verzendkosten:
        <span>gratis</span>
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
        // console.log()
        this.$shopify.product
          .fetch(this.checkoutobj[y].variant.product.id)
          .then(product => {
            // Do something with the product
            // console.log(product.options);
            this.options.push({ values: product.options });
            console.log(this.checkoutobj[y]);
            console.log(this.options);
          });
      }
    },
    gotocheckout() {
      let checkid = this.checkoutid;
      this.$shopify.checkout.fetch(checkid).then(checkout => {
        window.location.href = checkout.webUrl;
      });
    },
    removeproduct(id, index) {
      const checkoutId = this.checkoutid; // ID of an existing checkout
      const lineItemIdsToRemove = [id];

      // Remove an item from the checkout
      this.$shopify.checkout
        .removeLineItems(checkoutId, lineItemIdsToRemove)
        .then(checkout => {
          // Do something with the updated checkout
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
      // this.options.push({objj});
      // }
    }
  },
  mounted() {
    let checkid = this.checkoutid;
    this.$shopify.checkout.fetch(checkid).then(checkout => {
      // Do something with the checkout
      // console.log(checkout)
      this.checkoutraw = checkout;
      for (let i = 0; i <= checkout.lineItems.length - 1; i++) {
        this.checkoutobj.push(checkout.lineItems[i]);
        if (i == checkout.lineItems.length - 1) {
          // console.log(this.checkoutobj[0].variant.product.id);
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
  min-height: 500px;
  padding-top: 100px;
  width: 100%;
  flex: 1;
  text-align: center;
}
.cartpage h1 {
  background: purple;
  text-align: left;
  width: 1390px;
  margin: 0 auto;
}
.pricespan {
  float: right;
  font-weight: normal
}
ul.cartitem {
  display: inline-block;
  text-align: left;
  /* background: purple; */
  margin: 0px 150px 0px 0px;
  padding: 0;
}
hr {
  /* background: rgba(0,0,0, .9); */
  border: 1px solid rgba(0,0,0, .1);
}
.cartitem li {
  display: flex;
  margin-bottom: 10px;
  text-align: left;
  /* outline: 1px solid red; */
  width: 770px;
  height: 270px;
}
.thumbnail {
  height: 270px;
  min-width: 270px;
  max-width: 270px;
  background: black;
}
.thumbnail img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: 50% 50%;
}
.iteminfo {
  min-width: 300px;
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
  margin: 0;
}
p {
  font-size: 20px;
}

.total {
  display: inline-block;
  margin: 10px;
  /* visibility: hidden; */
  vertical-align: top;
  height: 400px;
  width: 500px;
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
  background: yellow;
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
</style>
