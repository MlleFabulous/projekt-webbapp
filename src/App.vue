<template>
  <div id="app">
    <Map></Map>
  </div>
</template>

<script type="text/javascript">
import Map from "./components/Map.vue";

export default{
  name: "App",
  components: {
    Map,

  }
}


</script>


<style>
#app {
  /* font-family: 'Indie Flower', bold; */
  font-family: 'Cinzel', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
