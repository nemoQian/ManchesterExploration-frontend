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
      @click="loadTagTreeData"
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
  import { ref, createSSRApp, h} from "vue";
  import mapboxgl from 'mapbox-gl';
  import { getPlaceTagTree, getSelectTree, searchPlace } from "@/api/map";
  import { renderToString } from '@vue/server-renderer';
  import tagShown from'./TagShown.vue'

  const errorMessage = ref('');

  const categoriesData = ref([{}]);

  const tagData = ref([]);

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

  const loadTagTreeData = async () => {
    try {
      const res = await getPlaceTagTree();
      tagData.value = JSON.parse(res.data);
    } catch (err) {
      errorMessage.value = (err as Error).message;
    }
  }

  const createPopupContent = async (name, description, osmId) => {
    const app = createSSRApp({
      render() {
        return h(tagShown, { name, description, osmId });
      }
    });
    const htmlMark = await renderToString(app);
    return htmlMark;
  };

  const addMarker = async (lnglat: [number, number], name: string, description: [], osmId: number) => {
    const htmlContent = await createPopupContent(name, description, osmId);

    const popup = new mapboxgl.Popup().setHTML(htmlContent)
    const marker = new mapboxgl.Marker()
      .setLngLat(lnglat)
      .setPopup(popup)
      .addTo(props.map);

    popup.on('open', () => {
      const el = document.createElement('div');
      el.innerHTML = htmlContent;
      const app = createSSRApp({
        render() {
          return h(tagShown, { name, description, osmId });
        }
      });
      app.mount(el);
      popup.setDOMContent(el);
    });

    mapMarker.value.push(marker);
  };

  const clearMarkers = () => {
    mapMarker.value.forEach((marker: any) => marker.remove());
    mapMarker.value = [];
  };
  const search = async () => {
    console.log(searchForm.value);
    clearMarkers();
    try {
      const res = await searchPlace(searchForm.value);
      markData.value = res.data;
      console.log(res);
      markData.value.forEach((item: any) => {
        const { placeName, lnglat, description, osmId } = item;
        addMarker(lnglat, placeName, description, osmId);
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
