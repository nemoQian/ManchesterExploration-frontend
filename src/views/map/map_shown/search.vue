<template>
  <div class="map-controls">
    <a-button class="map-button" type="primary" shape="round" @click="toggleSearch">{{
      searchVisible ? 'Hide' : 'Search'
    }}</a-button>

    <input
      v-if="searchVisible"
      v-model="buildingSearchName"
      type="text"
      class="map-search"
      placeholder="Search..."
    />

    <a-button v-if="searchVisible" type="primary" shape="round" @click="search"> Search </a-button>/
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import mapboxgl from 'mapbox-gl';
  import { searchBuilding } from "@/api/map";

  const buildingSearchName = ref();
  const markData = ref();

  const searchVisible = ref(false);
  const toggleSearch = () => {
    searchVisible.value = !searchVisible.value;
  };

  const props = defineProps<{ map: null }>();
  const search = async () => {
    console.log(buildingSearchName.value);
    const res = await searchBuilding(buildingSearchName.value);
    markData.value = res.data;
    console.log(res);

    markData.value.forEach(item => {
      const { buildingName, lnglat } = item;

      new mapboxgl.Marker()
        .setLngLat(lnglat)
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(buildingName))
        .addTo(props.map);
    })
  }
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
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 25px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
</style>
