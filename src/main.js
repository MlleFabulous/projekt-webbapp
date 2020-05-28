import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueGeolocation from 'vue-browser-geolocation'

Vue.config.productionTip = false;
Vue.use(VueGeolocation);

import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDQfhBxR1Bde0lzxYecZaaBr07vTZEZNjc'
  }
})

Vue.component('product', {

  props: {

  },

  template: `
  <div class="product">
    <h1>{{title}}</h1>
    <ul>
      <li v-for="detail in details"> {{detail}}</li>
    </ul>
    <button v-on:click="addToCart">Add to Cart</button>
    <button v-on:click="removeFromCart">Remove from Cart</button>

  </div>
  `,
  data(){
    return{
      brand: 'Superfly',
      product: 'Socks',
      details: ["1","2","3","4","5"],

    }
  },

  methods: {
     addToCart: function(){
       this.$emit('add-to-cart')
     },
     removeFromCart: function(){
       this.cart--;
     }
   },
   computed: {
     title() {
       return this.brand + ' ' + this.product
     }
   }


 }),

Vue.component('google-map',{
    props:{
    },

    template: `
    <div class="">
      <h1>My Coordinates:</h1>
      <p>Latitude: {{coordinates.lat}}, Longitude: {{coordinates.lng}}</p>
    </div>

    `,
    data(){
      return{
        coordinates: {
          lat: 6,
          lng: 9
        },
      }
    },

    methods: {
       addToCart: function(){
         this.$emit('add-to-cart')
       },
    },

     computed: {
       title() {
         return this.brand + ' ' + this.product
       }
     },

     created(){
       this.$getLocation({})
       .then(coordinates =>{
         this.coordinates = coordinates;
       })
     }
 })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
