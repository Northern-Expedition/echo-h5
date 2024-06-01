<template>
  <div class="noData">
    <svg-load name="noyet" class="noDatAimg" />
  </div>
</template>
<script setup>
import { _t18 } from '@/utils/public'
</script>
<style lang="scss" scoped>
.noData {
  padding: 1.333333rem 0 2.133333rem;
  text-align: center;
  .noDatAimg {
    font-size: 3.733333rem;
    // height: 180px;
  }
}
</style>
