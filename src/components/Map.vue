<template>

  <div id="container-wrapper">
    <h2>Foodify</h2>

    <div id="container">

      <div id="map-wrapper" class="card">
        <div id="map"></div>
      </div>

    <div id="nearby-list-wrapper" class="card">
      <div id="nearby-list">
        <ul id="places-ul">
          <!-- <div id="bitch" style="width: 20px; height: 20px; background: orange;"></div> -->
          <li v-for="place in places" :key="place.name">
            <img class="placeimg" v-bind:src="'https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyCbwY4V6vtsmGZKGm8ezOnSXrQaE7qKLFg&photoreference='+place.img+'&maxwidth=200'"/>
            <br>{{ place.name }}
          </li>
        </ul>
      </div>
    </div>


    </div>

  </div>

</template>

<script>
import axios from "axios"

  export default {

    data(){
      return {
        map: null,
        myCoordinates: {
          lat: 0,
          lng: 0
        },

        zoom: 7,
        resturantsObject: {},
        places: []
      }
    },

    created(){
      console.log('* created');
      //
      // if(localStorage.center){
      //   this.myCoordinates = JSON.parse(localStorage.center);
      // }else {
      //   this.$getLocation({}).then(coordinates =>{
      //     this.myCoordinates = coordinates;
      //   }).catch(error => alert(error));
      // }
      //
      // if(localStorage.zoom) {
      //   this.zoom = parseInt(localStorage.zoom);
      // }

    },

    mounted(){
      console.log('* mounted');

      if(localStorage.center){
        this.myCoordinates = JSON.parse(localStorage.center);
        this.zoom = parseInt(localStorage.zoom)
        console.log("Mounted, Zoom:" + this.zoom);
      } else {
        this.$getLocation().then(coordinates => {
            //this.myCoordinates;
            this.myCoordinates.lat = coordinates.lat;
            this.myCoordinates.lng = coordinates.lng;
          }).catch(error => alert(error));
        }

          console.log(this.myCoordinates);

          this.map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: this.myCoordinates.lat, lng: this.myCoordinates.lng},
            zoom: this.zoom
          });
          this.map.setOptions({draggable: true});
          this.map.addListener('dragend', this.handleDrag);
          this.getResturants();

    },

    methods: {



      getResturants() {
          const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.myCoordinates.lat},${this.myCoordinates.lng}&radius=500&types=restaurant&key=AIzaSyCbwY4V6vtsmGZKGm8ezOnSXrQaE7qKLFg`;
            console.log(URL);
          axios.get(URL).then(response => {
            this.resturants = response.data;
            this.setResturants();
          }).catch (error =>{
            console.log(error.message);
          });

      },

      showNearbyFood(){
        console.log('* showNearbyFood');
      },

      handleDrag(){
        let center = {
          lat: this.map.getCenter().lat(),
          lng: this.map.getCenter().lng()
        };
        let zoom = this.map.getZoom();
        this.myCoordinates.lat = this.map.getCenter().lat();
        this.myCoordinates.lng = this.map.getCenter().lng();
        localStorage.center = JSON.stringify(center);
        localStorage.zoom = zoom;
        console.log("handledrag Zoom "+zoom);

        this.getResturants();

      },

      setResturants() {

        this.places.forEach((item) => {
          item.marker.setMap(null);
        });

        this.places = [];

        this.resturants.results.forEach((restaurant) => {
          console.log(restaurant);
            const marker = new window.google.maps.Marker({
              position: restaurant.geometry.location,
              title: restaurant.name
            });
            marker.setMap(this.map);
              // const photoURL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyCbwY4V6vtsmGZKGm8ezOnSXrQaE7qKLFg&photoreference=${restaurant.photos[0].photo_reference}&maxwidth=100`;
              //
              // axios.get(photoURL).then(response => {
              //   console.log(response);
              //
              // });

              this.places.push( {
                marker,
                img: restaurant.photos[0].photo_reference ,
                name: restaurant.name
              });


        });
      },
    },

    computed: {
      mapCoordinates(){
        if(!this.map){
          return{
            lat: 0,
            lng: 0
          };
        }
        return {
          lat: this.map.getCenter().lat(),
          lng: this.map.getCenter().lng()
        }
      }
    }

}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');

.card {
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
}

h2{
  margin: 0;
  padding: 0;
  font-size: 36px;
}
ol, ul {
    list-style: none outside none;
    display: flex;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-inline-start: 0;
}

/* Always set the map height explicitly to define the size of the div
 * element that contains the map. */



/* Optional: Makes the sample page fill the window. */
html, body {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 100%;
  margin: 0;
  padding: 20px;
  background: blue;


}

/* ///////////////////////////////////////////////////////////// desktop */
/* @media only screen and (min-width: 1200px) {
  #nearby-list-wrapper{
    display: flex;
    flex-direction: row;
    width: 20%;
    background: purple;
    overflow: scroll;
  }

  #nearby-list-wrapper{
    display: flex;

  }


} */
/* ///////////////////////////////////////////////////////////// tablet */
@media only screen and (min-width: 900px) {

    #container{
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }

    #map-wrapper{
      display: flex;
      height: 400px;
      width: 60%;
      margin: 20px;
      align-items: center;
      justify-content: center;
      /* background: pink; */
      padding: 50px;
    }

    #map {
      width:100%;
      height:400px;
      /* background: lime; */
    }

  /* /////////// */

    #nearby-list-wrapper{
      height: 400px;
      display: flex;
      flex-direction: column;
      /* background: purple; */
      /* overflow: hidden; */
      align-items: center;
      padding: 50px;
      margin: 20px;
      }

      #nearby-list{
        /* background: red; */
        display: flex;
        flex-direction: column;
        align-items: center;
        /* justify-content: center; */
        display: flex;
        overflow: scroll;
      }

     #places-ul {
      display: flex;
      flex-direction: column;
      list-style-type: none;
      /* background: silver; */
      align-items: center;
      justify-content: center;
    }

    li{

      /* background: green; */
      align-self: center;

    }

}
/* ///////////////////////////////////////////////////////////// mobile */
@media only screen and (max-width: 899px) { mobile

  #container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  #map-wrapper{
    display: flex;
    height: 500px;
    width: 90%;
    align-items: center;
    justify-content: center;
    /* background: pink; */
    margin: 5%;
    margin-bottom: 25px;

  }

  #map {
    width:80%;
    height:80%;
    /* background: lime; */
    padding: 20px;
    margin: 5%;
  }

/* /////////// */

  #nearby-list-wrapper{
    display: flex;
    flex-direction: column;
    width: 80%;
    /* background: purple; */
    overflow: scroll;
    align-items: center;
    justify-content: center;
    margin: 5%;
    padding: 5%;


    }

    #nearby-list{
      /* background: red; */
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      display: flex;
    }

   #places-ul {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    /* background: silver; */
    align-items: center;
    justify-content: center;
  }

  li{

    /* background: green; */
    align-self: center;

  }



}





</style>
