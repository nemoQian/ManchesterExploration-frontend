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

    <a-tree-select
      v-if="searchVisible"
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
  import { ref } from 'vue';
  import mapboxgl from 'mapbox-gl';
  import { searchPlace } from "@/api/map";
  import { Message } from '@arco-design/web-vue';

  const errorMessage = ref('');

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
    searchName: '',
    searchTag: '',
  });
  const toggleSearch = () => {
    searchVisible.value = !searchVisible.value;
  };
  const filterTreeNode = (searchValue, nodeData) => {
    return nodeData.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
  };

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
    if(!searchForm.value.searchName) {
      Message.error('Please input your search query.');
      return;
    }
    console.log(searchForm.value.searchName);
    clearMarkers();
    try {
      const res = await searchPlace(searchForm.value);
      markData.value = res.data;
      console.log(res);
      markData.value.forEach((item: any) => {
        const { placeName, lnglat } = item;
        addMarker(lnglat, placeName);
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
