<!-- 平台Logo -->
<script setup name="img-load">
import { computed } from 'vue'

import { useMainStore } from '@/store/index.js'
import { _toView } from '@/utils/public.js'

const mainStroe = useMainStore()

/**
 * Logo
 */
const path = computed(() => {
  let tempPath = mainStroe.getLogoList?.logo || mainStroe.getLogoList?.logoD
  if (!tempPath) {
    // tempPath = `/platform/${__config._APP_ENV}/logo.png?${_APP_VERSION}`
    tempPath = `/platform/dev/logo.png?${_APP_VERSION}`
  }
  return tempPath
})
</script>
<template>
  <img :src="path" loading="lazy" class="logo" @click="_toView('/home')" />
</template>
<style lang="scss" scoped>
.logo {
  width: 0.533333rem;
  height: 0.533333rem;
}
</style>
