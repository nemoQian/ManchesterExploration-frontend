<template>
  <div class="container">
    <div class="logo">
      <img
        alt="logo"
        :src="logoUrl"
        onerror="console.log('Error loading image.')"
      />
      <div class="logo-text">Manchester Exploration Guidance</div>
    </div>
    <LoginBanner />
    <div class="content">
      <div class="content-inner">
        <LoginForm v-if="formState" @switch-form="handleFormState" />
        <register-form v-else @switch-form="handleFormState" />
      </div>
      <div class="footer">
        <Footer />
      </div>
    </div>
    <div>
      <a-button type="primary" shape="round" class="map-button" @click="toMap">
        Map
      </a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Footer from '@/components/footer/index.vue';
  import { ref } from 'vue';
  import useLocale from '@/hooks/locale';
  import { LOCALE_OPTIONS } from '@/locale';
  import { useRouter } from 'vue-router';
  import LoginBanner from './components/banner.vue';
  import LoginForm from './components/login-form.vue';
  import RegisterForm from './components/register-from.vue';

  const router = useRouter();
  const { changeLocale, currentLocale } = useLocale();
  const locales = [...LOCALE_OPTIONS];
  const triggerBtn = ref();

  const formState = ref(true);

  const setDropDownVisible = () => {
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    triggerBtn.value.dispatchEvent(event);
  };

  const handleFormState = (visible: boolean) => {
    formState.value = visible;
  };

  const logoUrl = new URL('../../assets/logo.svg', import.meta.url);

  const toMap = () => {
    router.push({ path: '/map' });
  };
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    height: 100vh;

    .banner {
      width: 550px;
      background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
    }

    .content {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      padding-bottom: 40px;
    }

    .footer {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100%;
    }
  }

  .logo {
    position: fixed;
    top: 24px;
    left: 22px;
    z-index: 1;
    display: inline-flex;
    align-items: center;

    &-text {
      margin-right: 4px;
      margin-left: 4px;
      color: var(--color-fill-1);
      font-size: 20px;
    }
  }

  .map-button {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
    border: none;
    padding: 10px 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-lg) {
    .container {
      .banner {
        width: 25%;
      }
    }
  }
</style>
