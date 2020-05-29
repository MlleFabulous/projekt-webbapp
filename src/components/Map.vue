<template>
  <div >
    <h1>My Coordinates</h1>
    <p>Lat: {{myCoordinates.lat}} , Lng: {{myCoordinates.lng}}</p>
    <h1>Map Coordinates</h1>
    <p>Lat: {{mapCoordinates.lat}} , Lng: {{mapCoordinates.lng}}</p>

    <GmapMap
        :center="myCoordinates"
        :zoom="zoom"
        style="width:640px; height:360px; margin: 32px auto"
        ref="mapRef"
        @dragend="handleDrag, showNearbyFood"
    ></GmapMap>
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
        zoom: 7

      }
    },
    created(){

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



    },

    mounted(){
         this.$refs.mapRef.$mapPromise.then(map => this.map = map);
    },

    methods: {
      showNearbyFood(){

      },

      handleDrag(){
        let center = {
          lat: this.map.getCenter().lat(),
          lng: this.map.getCenter().lng()
        };
        let zoom = this.map.getZoom();

        const URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${mapCoordinates.lat},${mapCoordinates.lng}&radius=50000&types=food&key=AIzaSyDQfhBxR1Bde0lzxYecZaaBr07vTZEZNjc";
        axios.get(URL).then(response => {
          console.log(response.data);
        }).catch (error =>{
          console.log(error.message);
        });


        localStorage.center = JSON.stringify(center);
        localStorage.zoom = zoom;


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

<style lang="css" scoped>
</style>
