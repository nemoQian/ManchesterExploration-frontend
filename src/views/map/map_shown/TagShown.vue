<template>
  <div>
    <h3>{{ name }}</h3>
    <p>website: {{ description.website ? description.website : 'Unknown' }}</p>
    <p>Open Hours: {{ description.opening_hours ? description.opening_hours : 'Unknown' }}</p>
    <a-button @click="manage">New Tag</a-button>
  </div>
</template>

<script lang="ts" setup>
  import { Message } from "@arco-design/web-vue";
  import { addTagWaitingList } from "@/api/tags";
  import { ref } from "vue";

  const errorMessage = ref('');

  const props = defineProps<{
    name: string;
    description: object;
    osmId: number;
  }>();

  const placeData = {
    placeName: props.name,
    osmId: props.osmId,
  }

  const manage = async () => {
    try {
      await addTagWaitingList(placeData);
      Message.success("add successful")
    } catch (err) {
      errorMessage.value = (err as Error).message;
    }
  };
</script>
