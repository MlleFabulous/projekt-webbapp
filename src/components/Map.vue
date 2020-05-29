<template>
  <div >
    <h1>My Coordinates</h1>
    <p>Lat: {{myCoordinates.lat}} , Lng: {{myCoordinates.lng}}</p>
    <h1>Map Coordinates</h1>
    <p>Lat: {{mapCoordinates.lat}} , Lng: {{mapCoordinates.lng}}</p>

    <div id="map"></div>
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
        markers: []
      }
    },
    created(){
      console.log('* created');


      /*
      axios.get(URL).then(response => {
        console.log(response.data);
      }).catch (error =>{
        console.log(error.message);
      });

      if(localStorage.center){
        this.myCoordinates = JSON.parse(localStorage.center);
      }else {
        this.$getLocation({}).then(coordinates =>{
          this.myCoordinates = coordinates;
        }).catch(error => alert(error));
      }

      if(localStorage.zoom) {
        this.zoom = parseInt(localStorage.zoom);
      }


      */
    },

    mounted(){
      console.log('* mounted');

      this.$getLocation()
        .then(coordinates => {
          //this.myCoordinates;

          this.myCoordinates.lat = coordinates.lat;
          this.myCoordinates.lng = coordinates.lng;
          console.log(this.myCoordinates);

          this.map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: this.myCoordinates.lat, lng: this.myCoordinates.lng},
            zoom: 14
          });
          this.map.setOptions({draggable: true});




          this.getResturants();
        });




      /* */
    //  new window.google.maps.Marker()
    //console.log(map);

    },

    methods: {
      getResturants() {
          const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.myCoordinates.lat},${this.myCoordinates.lng}&radius=500&types=restaurant&key=AIzaSyCbwY4V6vtsmGZKGm8ezOnSXrQaE7qKLFg`;
            console.log(URL);
          axios.get(URL).then(response => {
            console.log(response.data);
            this.resturants = response.data;

            console.log(this.resturants);

            this.setResturants();
          }).catch (error =>{
            console.log(error.message);
          });

      },

      showNearbyFood(){
        console.log('* showNearbyFood');

      },

      handleDrag(){
        console.log('* handleDrag');

        let center = {
          lat: this.map.getCenter().lat(),
          lng: this.map.getCenter().lng()
        };
        let zoom = this.map.getZoom();

//console.log(this.myCoordinates.lat);

        localStorage.center = JSON.stringify(center);
        localStorage.zoom = zoom;
      },

      setResturants() {
        /*
        this.resturants.results.forEach((restaurant) => {
            //this.markers.setMap(null);
        });
        */

        //this.markers = [];

        this.resturants.results.forEach((restaurant) => {
          console.log(restaurant);
            const marker = new window.google.maps.Marker({
              position: restaurant.geometry.location,
              title: restaurant.name
            });
            marker.setMap(this.map);

            this.markers.push(marker);
        });
      },
/*
      public float getZoomLevel(Circle circle) {
        float zoomLevel=0;
        if (circle != null){
            double radius = circle.getRadius();
            double scale = radius / 500;
            zoomLevel =(int) (16 - Math.log(scale) / Math.log(2));
        }
        return zoomLevel +.5f;
      }


*/
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

/* Always set the map height explicitly to define the size of the div
 * element that contains the map. */
#map {
  height: 300px;
  width: 300px;
}

/* Optional: Makes the sample page fill the window. */
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

</style>
