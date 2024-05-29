<template>
  <div class="userAmount">
    <div class="left">
      <svg-load :name="$route.query.icon" class="coin-img"></svg-load>
      <div class="title">{{ $route.query.type }}</div>
    </div>
    <div class="right">
      <!-- 可用余额 -->
      <span class="tip">{{ _t18('swap_available') }}</span>
      <div class="amount-tip">
        <p class="userInfo ff-num">
          {{ priceFormat(amount) }} <i>{{ coin }}</i>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { _t18 } from '@/utils/public'
import { priceFormat } from '@/utils/decimal.js'
const props = defineProps({
  amount: {
    type: Number
  },
  coin: {
    type: String,
    default: 'USDT'
  }
})
</script>

<style lang="scss" scoped>
* {
  font-size: 14px;
  color: var(--ex-default-font-color);
}
.userAmount {
  margin-top: 0px;
  padding: 0 0.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    .coin-img {
      width: 1.066667rem;
      height: 1.066667rem;
    }
    .title {
      font-size: 0.426667rem;
      margin-left: 0.16rem;
    }
  }
  .right {
    .tip {
      font-size: 0.293333rem;
      color: var(--ex-passive-font-color);
    }
    .amount-tip {
      font-size: 0.426667rem;
      margin-top: 0.16rem;
      p {
        font-size: 0.373333rem;
        color: var(--ex-font-color9);
        i {
          margin-left: 0.16rem;
        }
      }
    }
  }
}
</style>
