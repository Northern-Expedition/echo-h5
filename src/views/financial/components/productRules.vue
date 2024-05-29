<template>
  <div class="rules">
    <!-- 基金介绍 -->
    <div class="title fw-bold">{{ _t18(`Fund_introduction`) }}</div>
    <!-- 暂无介绍 -->
    <div class="item">{{ fundIntroduction ? fundIntroduction : _t18(`No_introductionyet`) }}</div>
  </div>
  <div class="rules">
    <!-- 产品规则 -->
    <div class="title fw-bold">{{ _t18('product_rules') }}</div>
    <!-- 暂无介绍 -->
    <div class="item">{{ proRules ? proRules : _t18(`No_introductionyet`) }}</div>
  </div>
</template>
<script setup>
import { _t18 } from '@/utils/public'
const props = defineProps({
  proRules: {
    type: String,
    default: ''
  },
  fundIntroduction: {
    type: String,
    default: ''
  }
})
</script>
<style lang="scss" scoped>
.rules {
  .title {
    font-size: 0.4rem;
    font-weight: 400;
    margin: 0.533333rem 0 0.426667rem;
  }
  .item {
    padding: 0.533333rem 0.453333rem;
    color: var(--ex-passive-font-color);
    font-size: 0.32rem;
    background: var(--ex-financial-card-bg-color);
    border-radius: 0.213333rem;
  }
}
</style>
