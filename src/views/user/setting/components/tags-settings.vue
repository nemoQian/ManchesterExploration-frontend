<template>
  <a-space wrap>
    <a-tag
      v-for="(tag) of userTags"
      :key="tag"
      closable
      color="blue"
      :style="{
        cursor: 'pointer',
      }"
      @close="handleRemove(tag)"
    >
      {{ tag }}
    </a-tag>
    <a-tree-select
      v-model="newTag"
      :data="treeData"
      placeholder="Please select"
      style="width: 130px"
      size="mini"
      allow-clear
      :load-more="loadTreeChildData"
      @change="handleEdit"
      @click="loadTreeRootData"
    ></a-tree-select>
    <a-button v-if="showEdit" type="primary" size="mini" @click="confirmEdit">
      confirm
    </a-button>
    <a-button v-if="showEdit" size="mini" @click="cancelEdit">
      cancel
    </a-button>
  </a-space>
</template>

<script lang="ts" setup>
  import { ref, nextTick } from 'vue';
  import { useUserStore } from '@/store';
  import { getChildTags, getRootTags } from "@/api/tags";
  import useLoading from "@/hooks/loading";

  const userStore = useUserStore();
  const userTags = ref(userStore.tags);
  const originalTags = ref(userStore.tags);
  const newTag = ref('');

  const showEdit = ref(false);
  const errorMessage = ref('');
  const { setLoading } = useLoading();

  const treeData = ref([{}]);
  const loadTreeRootData = async () => {
    try {
      const res = await getRootTags();
      treeData.value = JSON.parse(res.data);
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };
  const loadTreeChildData = async (nodeData: any) => {
    console.log(nodeData);
    const res = await getChildTags(nodeData.key);
    console.log(res);
    return new Promise((resolve) => {
      nodeData.children = JSON.parse(res.data);
      resolve(nodeData);
    });
  };

  const handleEdit = () => {
    showEdit.value = true;
  };

  const handleRemove = (key: string) => {
    userTags.value = userTags.value.filter((tag: string) => tag !== key);
    showEdit.value = true;
    console.log(key);
  };

  const cancelEdit = () => {
    userTags.value = originalTags.value;
    showEdit.value = false;
  };

  const confirmEdit = () => {
    if (newTag.value !== '') {
      userTags.value.push(newTag.value);
    }
    console.log(userTags.value);
    showEdit.value = false;
    newTag.value = '';
  }
</script>

<style lang="scss" scoped></style>
