<template>
  <div class="container">
    <Breadcrumb :items="['menu.tag', 'menu.tag.create']" />

    <a-card class="general-card" title="New Tag Management">
      <a-row style="margin-bottom: 16px">
        <a-col
          :span="12"
          style="display: flex; align-items: center; justify-content: end"
        >
          <a-tooltip :content="$t('searchTable.actions.refresh')">
            <div class="action-icon" @click="search"
              ><icon-refresh size="18"
            /></div>
          </a-tooltip>
          <a-tooltip :content="$t('searchTable.actions.columnSetting')">
            <a-popover
              trigger="click"
              position="bl"
              @popup-visible-change="popupVisibleChange"
            >
              <div class="action-icon"><icon-settings size="18" /></div>
              <template #content>
                <div id="tableSetting">
                  <div
                    v-for="(item, index) in showColumns"
                    :key="item.dataIndex"
                    class="setting"
                  >
                    <div style="margin-right: 4px; cursor: move">
                      <icon-drag-arrow />
                    </div>
                    <div>
                      <a-checkbox
                        v-model="item.checked"
                        @change="
                          handleChange($event, item as TableColumnData, index)
                        "
                      >
                      </a-checkbox>
                    </div>
                    <div class="title">
                      {{ item.title }}
                    </div>
                  </div>
                </div>
              </template>
            </a-popover>
          </a-tooltip>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :columns="(cloneColumns as TableColumnData[])"
        :data="renderData"
        :bordered="false"
        :size="size"
        @page-change="onPageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #placeName="{ record }">
          {{ record.placeName }}
        </template>
        <template #tagName="{ record }">
          <a-input v-model="record.tagName"/>
        </template>
        <template #tagVisibility="{ record }">
          <a-space>
            <a-select
              v-model="record.tagVisibility"
              :options="options"
            >
            </a-select>
          </a-space>
        </template>
        <template #tagBelongs="{ record }">
          <a-space>
            <a-select
              v-model="record.tagBelongs"
              :options="groupOption"
              :disabled="record.tagVisibility !== 1"
              allow-search
              allow-clear
              @click="queryUserGroups"
            >
            </a-select>
          </a-space>
        </template>
        <template #parentTag="{ record }">
          <a-space>
            <a-select
              v-model="record.parentTag"
              :options="groupTagOption"
              :disabled="!record.tagBelongs && record.tagVisibility === 1"
              allow-search
              allow-clear
              @click="queryGroupTags(record.tagBelongs, record.tagVisibility)"
            >
            </a-select>
          </a-space>
        </template>
        <template #operation="{ record }">
          <a-button type="text" @click="saveEdit(record)"> Save </a-button>
          <a-button type="text" @click="deleteEdit(record)"> Delete </a-button>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, watch, nextTick } from 'vue';
  import useLoading from '@/hooks/loading';
  import { Pagination } from '@/types/global';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';
  import Sortable from 'sortablejs';
  import { reduce } from 'lodash';
  import {
    placeTagWaitingList,
    ListParams,
    queryWaitingList,
    queryPlaceTagGroupOption,
    placeTagGroupOptionRequest
  } from "@/api/tags";
  import { queryGroupOptionList } from "@/api/group";

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  type Column = TableColumnData & { checked?: true };
  const errorMessage = ref('');

  const { loading, setLoading } = useLoading(true);
  const renderData = ref<placeTagWaitingList[]>([]);
  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);
  const groupTagOptionRequest = ref<placeTagGroupOptionRequest>({ tagBelongs: 0, tagShownState: 2 });

  const groupOption = ref();
  const groupTagOption = ref();

  const size = ref<SizeProps>('medium');

  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });

  const options = reactive([
    { value: 0, label: 'Public' },
    { value: 1, label: 'Group' },
    { value: 2, label: 'Private' },
  ]);
  const columns = computed<TableColumnData[]>(() => [
    {
      title: 'Id',
      dataIndex: 'index',
      slotName: 'index',
    },
    {
      title: 'Place Name',
      dataIndex: 'placeName',
      slotName: 'placeName',
    },
    {
      title: 'Tag Name',
      dataIndex: 'tagName',
      slotName: 'tagName',
    },
    {
      title: 'Tag Visibility',
      dataIndex: 'tagVisibility',
      slotName: 'tagVisibility',
    },
    {
      title: 'Tag Belongs',
      dataIndex: 'tagBelongs',
      slotName: 'tagBelongs',
    },
    {
      title: 'Parent Tag',
      dataIndex: 'parentTag',
      slotName: 'parentTag',
    },
    {
      title: 'Request Create Date',
      dataIndex: 'createDate',
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      slotName: 'operation',
    },
  ]);

  const saveEdit = (record: any) => {
    console.log(record);
  };

  const deleteEdit = (record: any) => {
    console.log(record);
  };

  const queryUserGroups = async () => {
    const { data } = await queryGroupOptionList()
    groupOption.value = data;
  }

  const queryGroupTags = async (tagBelongs: number, tagShownState: number) => {
    if(!tagBelongs){
      tagBelongs = -1;
    }
    groupTagOptionRequest.value.tagBelongs = Number(tagBelongs);
    groupTagOptionRequest.value.tagShownState = Number(tagShownState);

    const { data } = await queryPlaceTagGroupOption(
      groupTagOptionRequest.value
    );
    groupTagOption.value = data;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-UK');
  };

  const fetchData = async (
    params: ListParams = { current: 1, pageSize: 20 }
  ) => {
    setLoading(true);
    try {
      const { data } = await queryWaitingList(params);
      console.log(data.records);
      renderData.value = data.records;
      renderData.value.forEach((item) => {
        item.createDate = formatDate(item.createDate);
      });
      pagination.current = params.current;
      pagination.total = data.total;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  const search = () => {
    fetchData({
      ...basePagination,
    } as unknown as ListParams);
  };
  const onPageChange = (current: number) => {
    fetchData({ ...basePagination, current });
  };

  fetchData();
  const handleChange = (
    checked: boolean | (string | boolean | number)[],
    column: Column,
    index: number
  ) => {
    if (!checked) {
      cloneColumns.value = showColumns.value.filter(
        (item) => item.dataIndex !== column.dataIndex
      );
    } else {
      cloneColumns.value.splice(index, 0, column);
    }
  };
  const exchangeArray = <T extends Array<any>>(
    array: T,
    beforeIdx: number,
    newIdx: number,
    isDeep = false
  ): T => {
    const newArray = isDeep ? cloneDeep(array) : array;
    if (beforeIdx > -1 && newIdx > -1) {
      // 先替换后面的，然后拿到替换的结果替换前面的
      newArray.splice(
        beforeIdx,
        1,
        newArray.splice(newIdx, 1, newArray[beforeIdx]).pop()
      );
    }
    return newArray;
  };

  const popupVisibleChange = (val: boolean) => {
    if (val) {
      nextTick(() => {
        const el = document.getElementById('tableSetting') as HTMLElement;
        const sortable = new Sortable(el, {
          onEnd(e: any) {
            const { oldIndex, newIndex } = e;
            exchangeArray(cloneColumns.value, oldIndex, newIndex);
            exchangeArray(showColumns.value, oldIndex, newIndex);
          },
        });
      });
    }
  };

  watch(
    () => columns.value,
    (val) => {
      cloneColumns.value = cloneDeep(val);
      cloneColumns.value.forEach((item, index) => {
        item.checked = true;
      });
      showColumns.value = cloneDeep(cloneColumns.value);
    },
    { deep: true, immediate: true }
  );
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
  .action-icon {
    margin-left: 12px;
    cursor: pointer;
  }
  .active {
    color: #0960bd;
    background-color: #e3f4fc;
  }
  .setting {
    display: flex;
    align-items: center;
    width: 200px;
    .title {
      margin-left: 12px;
      cursor: pointer;
    }
  }
</style>
