<template>
  <div id="mapbox" class="mapbox">
    <a-button type="primary" shape="round" class="map-button" @click="toLogin">
      Login
    </a-button>
    <MapSearch />
  </div>
</template>

<script lang="ts" setup>
  import mapboxgl from 'mapbox-gl';
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  import MapSearch from '@/views/map/map_shown/search.vue';

  const router = useRouter();

  onMounted(() => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoibmVtb3EiLCJhIjoiY2xzMHI2NWh1MDNrcTJucXg1NXlkOWU2dyJ9.Va5XAlIO46kde8I1yg6mtA';

    const mapOption: mapboxgl = {
      container: 'mapbox',
      style: 'mapbox://styles/nemoq/clthhxvix008o01qx9ti925fx',
      center: [-2.240722, 53.478422],
      zoom: 13,
    };

    const map = new mapboxgl.Map(mapOption);
  });

  const toLogin = () => {
    router.push({ path: '/login' });
  };
</script>

<style scoped>
  .mapbox {
    height: 100vh;
    width: 100vw;
  }

  .map-button {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
    border: none;
    padding: 10px 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  /deep/ .mapboxgl-control-container {
    display: none !important;
  }
</style>
