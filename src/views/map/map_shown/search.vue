<template>
  <div class="map-controls">
    <a-button type="primary" shape="round" @click="toggleSearch">{{
      searchVisible ? 'Hide' : 'Search'
    }}</a-button>

    <a-input
      v-if="searchVisible"
      v-model="searchForm.searchName"
      type="text"
      class="map-search"
      placeholder="Search Name"
      allow-clear
    />

    <a-select
      v-if="searchVisible"
      v-model="searchForm.searchCategories"
      placeholder="Filter By Categories"
      style="width: 300px; border-radius: 25px"
      allow-clear
      allow-search>
      <a-option
        v-for="item of categoriesData"
        :key="item.label"
        :value="item.value"
        :label="item.label"
      />
    </a-select>

    <a-tree-select
      v-if="searchVisible"
      v-model="searchForm.searchTag"
      border
      :allow-search="true"
      :allow-clear="true"
      :data="tagData"
      :filter-tree-node="filterTreeNode"
      placeholder="Filter By Tag"
      style="width: 300px; border-radius: 25px;" />

    <a-button v-if="searchVisible" type="primary" shape="round" @click="search">
      Search
    </a-button>
    <a-button v-if="searchVisible" shape="round" @click="clearMarkers">
      Clear
    </a-button>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import mapboxgl from 'mapbox-gl';
  import { getSelectTree, searchPlace } from "@/api/map";

  const errorMessage = ref('');

  const categoriesData = ref([{}]);

  const tagData = ref([
    {
      title: 'Trunk 0-0',
      key: '0-0',
      children: [
        {
          title: 'Branch 0-0-1',
          key: '0-0-1',
          children: [
            {
              title: 'Leaf 0-0-1-1',
              key: '0-0-1-1'
            },
            {
              title: 'Leaf 0-0-1-2',
              key: '0-0-1-2'
            }
          ]
        },
      ],
    },
    {
      title: 'Trunk 0-1',
      key: '0-1',
      children: [
        {
          title: 'Branch 0-1-1',
          key: '0-1-1',
          children: [
            {
              title: 'Leaf 0-1-1-0',
              key: '0-1-1-0',
            }
          ]
        },
        {
          title: 'Branch 0-1-2',
          key: '0-1-2',
          children: [
            {
              title: 'Leaf 0-1-2-0',
              key: '0-1-2-0',
            }
          ]
        },
      ],
    },
  ]);

  const markData = ref();

  const searchVisible = ref(false);

  const mapMarker = ref([]);

  const props = defineProps<{ map: null }>();

  const searchForm = ref({
    searchName: null,
    searchCategories: null,
    searchTag: null,
  });

  const handleSelectGet = async () => {
    const res = await getSelectTree();
    categoriesData.value = res.data;
  }
  const toggleSearch = () => {
    searchVisible.value = !searchVisible.value;
    handleSelectGet()
  };

  const filterTreeNode = (searchValue, nodeData) => {
    return nodeData.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
  };

  const addMarker = async (lnglat: [number, number], name: string, description: []) => {
    const marker = new mapboxgl.Marker()
      .setLngLat(lnglat)
      .setPopup(new mapboxgl.Popup().setHTML(
        `<div>
          <h2>${name}</h2>
          <p> website: ${description.website} </p>
          <p> Open Hours: ${description.opening_hours} </p>
          <a href="#" onclick="addPlan()">Manage</>
        </div>`))
      .addTo(props.map);
    mapMarker.value.push(marker);
  };

  const clearMarkers = () => {
    mapMarker.value.forEach((marker: any) => marker.remove());
    mapMarker.value = [];
  };
  const search = async () => {
    console.log(searchForm.value.searchName);
    clearMarkers();
    try {
      const res = await searchPlace(searchForm.value);
      markData.value = res.data;
      console.log(res);
      markData.value.forEach((item: any) => {
        const { placeName, lnglat, description } = item;
        addMarker(lnglat, placeName, description);
      });
    } catch (err) {
      errorMessage.value = (err as Error).message;
    }
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
