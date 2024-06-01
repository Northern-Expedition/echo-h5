<template>
  <div class="introduction">
    <HeaderBar
      :currentName="_t18('Exchange_introduction')"
      :border_bottom="true"
      :cuttentRight="cuttentRight"
    />
    <div v-if="content" class="itemDetailObj" v-html="content"></div>
    <Nodata v-else />
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'

import { getOptionRulesApi } from '@/api/loan.js'
import { _t18 } from '@/utils/public'

const cuttentRight = { iconRight: [{ iconName: 'kefu', clickTo: 'event_serviceChange' }] }

const content = ref('')
function getOptionRules() {
  getOptionRulesApi().then((res) => {
    content.value = res.data[0].content
  })
}
onMounted(() => {
  getOptionRules()
})
</script>
<style lang="scss" scoped>
.introduction {
  .itemDetailObj {
    font-size: 0.32rem;
    padding: 0.266667rem 0.4rem;
    color: var(--ex-default-font-color);
    line-height: 0.64rem;
    word-wrap: break-word;
    :deep(img) {
      width: 100%;
    }
  }
}
</style>
