<template>
  <div class="detail">
    <!-- 产品详情 -->
    <div class="title">{{ _t18(`product_details`) }}</div>
    <!-- 项目名称 -->
    <div class="content">
      <div class="item">
        <div>{{ _t18(`product-details`) }}</div>
        <div class="itemName">{{ proDetail.title }}</div>
      </div>
      <!-- 项目进度 -->
      <div class="item">
        <div>{{ _t18(`project_progress`) }}</div>
        <div class="itemName ff-num">{{ proDetail.process }}%</div>
      </div>
      <!-- 项目总额 -->
      <div class="item">
        <div>{{ _t18(`total_project`) }}</div>
        <div class="itemName ff-num">
          {{ proDetail.totalInvestAmount }}&nbsp;{{ proDetail.coin }}
        </div>
      </div>
      <!-- 剩余金额 -->
      <div class="item">
        <div>{{ _t18(`balance`) }}</div>
        <div class="itemName ff-num">{{ proDetail.remainAmount }}&nbsp;{{ proDetail.coin }}</div>
      </div>
      <!-- 限投次数 -->
      <div class="item">
        <div>{{ _t18(`limit_number`) }}</div>
        <div class="itemName fw-num">
          <!-- 不存在则不限购 -->
          {{
            Number(proDetail.timeLimit) ? Number(proDetail.timeLimit) : _t18(`unlimited_purchase`)
          }}
        </div>
      </div>
      <!-- 平均日收益 -->
      <div class="item">
        <div>{{ _t18(`average_daily_income`) }}</div>
        <div class="itemName fw-num hightColor">{{ proDetail.avgRate }}%</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { _t18 } from '@/utils/public'
const props = defineProps({
  proDetail: {
    type: Object,
    default: {}
  }
})
</script>
<style lang="scss" scoped>
.detail {
  .title {
    font-size: 0.4rem;
    font-weight: 400;
    margin: 0.533333rem 0 0.426667rem;
  }
  .content {
    padding: 0.533333rem 0.4rem 0;
    background: var(--ex-financial-card-bg-color);
    border-radius: 0.213333rem;
    .item {
      padding-bottom: 0.533333rem;
      color: var(--ex-passive-font-color);
      font-size: 0.32rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .itemName {
        color: var(--ex-default-font-color);
      }
      .hightColor {
        color: var(--ex-font-color3);
      }
    }
  }
}
</style>
