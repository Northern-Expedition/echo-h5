<template>
  <div class="welfareEvents">
    <!-- 福利活动 -->
    <HeaderBar :currentName="_t18(`activity`)"></HeaderBar>
    <div class="itemDetailObj" v-html="currentHtml"></div>
    <Nodata v-if="!currentHtml"></Nodata>
  </div>
</template>
<script setup>
import { noticeListApi } from '@/api/common/index'
import { _t18 } from '@/utils/public'
const currentHtml = ref(null)
onMounted(async () => {
  try {
    const res = await noticeListApi()
    if (res.code === 200) {
      currentHtml.value = res.data[0].noticeContent
    }
  } catch (error) {}
})
</script>
<style lang="scss" scoped>
.welfareEvents {
  .itemDetailObj {
    padding: 0 0.426667rem;
    font-size: 0.373333rem;
    color: var(--ex-default-font-color);
  }
}
</style>
