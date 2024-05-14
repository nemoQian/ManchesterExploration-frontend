<template>
  <a-form
    ref="formRef"
    :model="formData"
    class="form"
    :label-col-props="{ span: 8 }"
    :wrapper-col-props="{ span: 16 }"
  >
    <a-form-item
      field="email"
      :label="$t('userSetting.basicInfo.form.label.email')"
      :rules="[
        {
          required: false,
          type: 'email',
          message: $t('userSetting.form.error.email.valid'),
        },
      ]"
    >
      <a-input
        v-model="formData.email"
        :placeholder="$t('userSetting.basicInfo.placeholder.email')"
      />
    </a-form-item>
    <a-form-item
      field="phone"
      :label="$t('userSetting.basicInfo.form.label.phone')"
      :rules="[
        {
          required: false,
          message: $t('userSetting.form.error.phone.required'),
        },
      ]"
    >
      <a-input
        v-model="formData.phone"
        :placeholder="$t('userSetting.basicInfo.placeholder.phone')"
      />
    </a-form-item>
    <a-form-item
      field="nickname"
      :label="$t('userSetting.basicInfo.form.label.nickname')"
      :rules="[
        {
          required: false,
          message: $t('userSetting.form.error.nickname.required'),
        },
      ]"
    >
      <a-input
        v-model="formData.nickname"
        :placeholder="$t('userSetting.basicInfo.placeholder.nickname')"
      />
    </a-form-item>
    <a-form-item
      field="gender"
      :label="$t('userSetting.basicInfo.form.label.userGender')"
      :rules="[
        {
          required: false,
          message: $t('userSetting.form.error.gender.required'),
        },
      ]"
    >
      <a-select
        v-model="formData.gender"
        :placeholder="$t('userSetting.basicInfo.placeholder.gender')"
        allow-clear
      >
        <a-option value="Male">{{
          $t('userSetting.basicInfo.form.label.male')
        }}</a-option>
        <a-option value="Female">{{
          $t('userSetting.basicInfo.form.label.female')
        }}</a-option>
      </a-select>
    </a-form-item>
    <a-form-item :label="$t('userSetting.basicInfo.form.label.updateTime')">
      {{ updateTime }}
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
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { BasicInfoModel, updateUserInfo } from '@/api/user-center';
  import { useUserStore } from '@/store';
  import useLoading from '@/hooks/loading';
  import { Message } from '@arco-design/web-vue';

  const userStore = useUserStore();

  const { updateTime } = userStore;
  const errorMessage = ref('');
  const { setLoading } = useLoading();

  const formRef = ref<FormInstance>();
  const formData = ref<BasicInfoModel>({
    email: userStore.email,
    nickname: userStore.nickname,
    gender: userStore.gender,
    phone: userStore.phone,
  });

  const validate = async () => {
    const val = await formRef.value?.validate();
    if (!val) {
      setLoading(true);
      try {
        await updateUserInfo(formData.value);
        Message.success('Information Update Successful');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
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
  .form {
    width: 540px;
    margin: 0 auto;
  }
</style>
