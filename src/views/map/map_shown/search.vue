<template>
  <div class="map-controls">
    <a-button class="map-button" type="primary" shape="round" @click="toggleSearch">{{
      searchVisible ? 'Hide' : 'Search'
    }}</a-button>

    <a-input
      v-if="searchVisible"
      v-model="buildingSearchName"
      type="text"

      class="map-search"
      placeholder="Search..."
      allow-clear
    />

    <a-button v-if="searchVisible" type="primary" shape="round" @click="search"> Search </a-button>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import mapboxgl from 'mapbox-gl';
  import { searchBuilding } from "@/api/map";
  import { Message } from '@arco-design/web-vue';

  const buildingSearchName = ref();
  const markData = ref();

  const searchVisible = ref(false);
  const mapMarker = ref([]);
  const toggleSearch = () => {
    searchVisible.value = !searchVisible.value;
  };

  const props = defineProps<{ map: null }>();

  const addMarker = (lnglat: [number, number], name: string) => {
    const marker = new mapboxgl.Marker()
      .setLngLat(lnglat)
      .setPopup(new mapboxgl.Popup().setHTML(`<h3>${name}</h3>`))
      .addTo(props.map);
    mapMarker.value.push(marker);
  };

  const clearMarkers = () => {
    mapMarker.value.forEach((marker: any) => marker.remove());
    mapMarker.value = [];
  };
  const search = async () => {
    if(!buildingSearchName.value) {
      Message.error('Please input your search query.');
      return;
    }
    console.log(buildingSearchName.value);
    clearMarkers();
    const res = await searchBuilding(buildingSearchName.value);
    markData.value = res.data;
    console.log(res);

    markData.value.forEach((item: any) => {
      const { buildingName, lnglat } = item;
      addMarker(lnglat, buildingName);
    })
  };
</script>

<style scoped>
  .map-controls {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .map-button {
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .map-search {
    border-radius: 25px;
  }
</style>
