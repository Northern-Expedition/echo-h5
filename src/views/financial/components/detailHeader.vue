<template>
  <div class="hd">
    <div class="header">
      <img src="@/assets/financial/coin-JyvGAUty.png" class="img" />
      <div class="fw-bold">{{ headerObj.title }}</div>
    </div>
    <div class="headerList">
      <div class="item">
        <div
          class="itemNum fw-num"
          :style="headerObj.leftColor ? `color: ${headerObj.leftColor}` : ''"
        >
          {{ headerObj.leftNum }}
        </div>
        <div class="itemName">{{ headerObj.leftName }}</div>
      </div>
      <div class="item">
        <div class="itemNum fw-num">{{ headerObj.centerNum }}</div>
        <div class="itemName">{{ headerObj.centerName }}</div>
      </div>
      <div class="item">
        <div class="itemNum fw-num">{{ headerObj.rightNum }}</div>
        <div class="itemName">{{ headerObj.rightName }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  headerObj: {
    type: Object,
    default: {}
  }
})
</script>
<style lang="scss" scoped>
.hd {
  background: var(--ex-financial-card-bg-color);
  border-radius: 0.213333rem;
  .header {
    padding: 0.266667rem 0.453333rem;
    font-size: 0.4rem;
    color: var(--ex-default-font-color);
    background: #252a4d;
    border-radius: 0.213333rem;
    display: flex;
    .img {
      width: 0.693333rem;
      height: 0.506667rem;
      -o-object-fit: cover;
      object-fit: cover;
      margin-right: 0.266667rem;
    }
  }
  .headerList {
    padding: 0.266667rem 0.4rem 0.533333rem;
    display: flex;
    background: var(--ex-financial-card-bg-color);

    .item {
      flex: 1;
      .itemNum {
        font-size: 16px;
        color: var(--ex-default-font-color);
      }
      .itemName {
        margin-top: 10px;
        font-size: 12px;
        color: var(--ex-passive-font-color);
      }
    }
    .item:nth-child(2) {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .item:nth-child(3) {
      text-align: right;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }
}
</style>
