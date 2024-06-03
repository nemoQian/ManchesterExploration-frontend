<template>
  <div class="container">
    <Breadcrumb :items="['menu.list', 'group.add']" />
    <a-card class="general-card" :title="$t('group.add')">
      <a-form
        ref="formRef"
        :model="formData"
        class="form"
        :label-col-props="{ span: 8 }"
        :wrapper-col-props="{ span: 16 }"
      >
        <a-form-item
          field="groupName"
          label="Group Name:"
          :rules="[
            {
              required: true,
              message: 'Please input your group name.',
            },
          ]"
        >
          <a-input
            v-model="formData.groupName"
            placeholder="Please input your group name."
          />
        </a-form-item>
        <a-form-item field="groupDescription" label="Group Description:">
          <a-input
            v-model="formData.groupDescription"
            placeholder="Please input your group description."
          />
        </a-form-item>
        <a-form-item
          field="groupVisibility"
          label="Group Visibility:"
          :rules="[
            {
              required: true,
              message: 'Please select group visibility.',
            },
          ]"
        >
          <a-select
            v-model="formData.groupVisibility"
            placeholder="Select Visibility"
            allow-clear
          >
            <a-option value="0">Public</a-option>
            <a-option value="1">Private</a-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" @click="validate">
              {{ $t('userSetting.save') }}
            </a-button>
            <a-button type="secondary" @click="reset">
              {{ $t('userSetting.reset') }}
            </a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { BasicGroupModel, createGroup } from "@/api/group";
  import { Message } from '@arco-design/web-vue';
  import useLoading from '@/hooks/loading';

  const errorMessage = ref('');
  const { setLoading } = useLoading();
  const formRef = ref<FormInstance>();
  const formData = ref<BasicGroupModel>({
    groupName: '',
    groupDescription: '',
    groupVisibility: '0',
  });

  const validate = async () => {
    console.log(formData.value);
    const val = await formRef.value?.validate();
    if (!val) {
      setLoading(true);
      try {
        await createGroup(formData.value);
        Message.success('Group Create Successful');
      } catch (err) {
        errorMessage.value = (err as Error).message;
      } finally {
        setLoading(false);
      }
    }
  };
  const reset = async () => {
    await formRef.value?.resetFields();
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }

  .form {
    width: 540px;
    margin: 0 auto;
  }
</style>
