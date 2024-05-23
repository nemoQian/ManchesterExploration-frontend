<template>
  <div class="map-controls">
    <a-button class="map-button" @click="toggleSearch">{{
      searchVisible ? 'Hide' : 'Search'
    }}</a-button>
    <input
      v-if="searchVisible"
      type="text"
      class="map-search"
      placeholder="Search..."
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  const searchVisible = ref(false);
  const toggleSearch = () => {
    searchVisible.value = !searchVisible.value;
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
    background-color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .map-search {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
</style>
