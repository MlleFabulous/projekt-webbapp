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
        @dragend="handleDrag"
    ></GmapMap>
  </div>
</template>

<script>
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
      handleDrag(){
        let center = {
          lat: this.map.getCenter().lat(),
          lng: this.map.getCenter().lng()
        };
        let zoom = this.map.getZoom();

        localStorage.center = JSON.stringify(center);
        localStorage.zoom = zoom;
      }
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
