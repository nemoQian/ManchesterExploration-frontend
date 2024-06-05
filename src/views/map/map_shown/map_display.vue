<template>
  <div id="mapbox" class="mapbox"></div>
  <div>
    <a-button type="primary" shape="round" class="map-button" @click="toUserCenter">
      User Center
    </a-button>
    <MapSearch :map="map" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import mapboxgl from 'mapbox-gl';
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  import MapSearch from '@/views/map/map_shown/search.vue';
  import 'mapbox-gl/dist/mapbox-gl.css';

  const router = useRouter();

  const map = ref();

  onMounted(() => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoibmVtb3EiLCJhIjoiY2xzMHI2NWh1MDNrcTJucXg1NXlkOWU2dyJ9.Va5XAlIO46kde8I1yg6mtA';

    const mapOption: mapboxgl = {
      container: 'mapbox',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-2.240722, 53.478422],
      zoom: 13,
    };

    map.value = new mapboxgl.Map(mapOption);
  });

  const toUserCenter = () => {
    router.push({ path: '/user/setting' });
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
</style>
