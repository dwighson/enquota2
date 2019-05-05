<template>
  <div id="app">
    <navbar/>
    <div class="container">
      <transition name="fade">
        <router-view/>
      </transition>
      <footerlinks/>
    </div>
  </div>
</template>

<script>
import navbar from "./components/nav";
import products from "./components/products";
import footerlinks from "./components/footerlinks";
export default {
  name: "App",
  components: { navbar, footerlinks },
  mounted() {
    // localStorage.removeItem('checkoutid')
    // console.log(localStorage.getItem('checkoutid'))
    this.$shopify.checkout
      .fetch(localStorage.getItem("checkoutid"))
      .then(checkout => {
        // Do something with the checkout
        // console.log(checkout);
      });

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
        c.addEventListener("click", function(e) {
          /*when an item is clicked, update the original select box,
        and the selected item:*/
          var y, i, k, s, h;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          h = this.parentNode.previousSibling;
          for (i = 0; i < s.length; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
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
  }
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
  /* outline:1px solid red; */
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  height: 100vh;
  flex-direction: column;
}

.container {
  flex: 1;
  overflow: auto;
}
/* ::-webkit-scrollbar-button { 
  display: block; 
  height: 13px; 
  border-radius: 0px; 
  background-color: #1efbdd; 
}  */
/* ::-webkit-scrollbar-button:hover{ background-color: #22E7AF; }  */

::-webkit-scrollbar-thumb {
  background-color: #ccc;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #22e7af;
}
::-webkit-scrollbar-track {
  background-color: white;
}
::-webkit-scrollbar {
  width: 13px;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: .2s;
  transition-property: height, opacity, transform;
  transition-timing-function: ease;
  overflow: hidden;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateY( -20px);
}

.custom-select {
  position: relative;
  font-family: Arial;
  float: left;
  border: 1px solid black;
  width: 130px;
}

.custom-select select {
  display: none; /*hide original SELECT element:*/
}

.select-selected {
  color: black;
  background: white;
  /* background-color: DodgerBlue; */
}

/*style the arrow inside the select element:*/
.select-selected:after {
  position: absolute;
  content: "";
  top: 14px;
  right: 10px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-color: #25ceff transparent transparent transparent;
}

/*point the arrow upwards when the select box is open (active):*/
.select-selected.select-arrow-active:after {
  border-color: transparent transparent #fff transparent;
  top: 7px;
}

/*style the items (options), including the selected item:*/
.select-items div,
.select-selected {
  color: black;
  padding: 8px 16px;
  border: 1px solid black;
  border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
  cursor: pointer;
  user-select: none;
}

/*style items (options):*/
.select-items {
  position: absolute;
  background-color: white;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 99;
}

/*hide the items when the select box is closed:*/
.select-hide {
  display: none;
}

.select-items div:hover,
.same-as-selected {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
