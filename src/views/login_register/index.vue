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
    <div class="right-side">
      <a-tooltip :content="$t('settings.language')">
        <a-button
          class="nav-btn"
          type="outline"
          :shape="'circle'"
          @click="setDropDownVisible"
        >
          <template #icon>
            <icon-language />
          </template>
        </a-button>
      </a-tooltip>
      <a-dropdown trigger="click" @select="changeLocale as any">
        <div ref="triggerBtn" class="trigger-btn"></div>
        <template #content>
          <a-doption
            v-for="item in locales"
            :key="item.value"
            :value="item.value"
          >
            <template #icon>
              <icon-check v-show="item.value === currentLocale" />
            </template>
            {{ item.label }}
          </a-doption>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Footer from '@/components/footer/index.vue';
  import { ref } from 'vue';
  import useLocale from '@/hooks/locale';
  import { LOCALE_OPTIONS } from '@/locale';
  import LoginBanner from './components/banner.vue';
  import LoginForm from './components/login-form.vue';
  import RegisterForm from './components/register-from.vue';

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
