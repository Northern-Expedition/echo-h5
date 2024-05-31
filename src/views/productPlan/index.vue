<template>
  <div class="productPlan">
    <!-- 产品规划 -->
    <image-load filePath="productbg.png" class="img-bg" />
    <van-icon name="arrow-left" size="30" class="back" color="#000" @click="push('/')" />
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const { push } = useRouter()
</script>
<style lang="scss" scoped>
.productPlan {
  font-size: 0;
  min-height: 100vh;
  position: relative;
  .img-bg {
    height: 100%;
    width: 100%;
  }
  .back {
    position: absolute;
    top: 0.426667rem;
    left: 0.426667rem;
    color: #fff;
  }
}
</style>
