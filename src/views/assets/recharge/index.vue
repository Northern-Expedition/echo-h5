<!-- 快捷充币 -->
<template>
  <HeaderBar :currentName="_t18('recharge_fast', ['aams', 'robinhood2'])"></HeaderBar>
  <List :data="coinList"></List>
  <div class="record-info">
    <div class="record-card" @click="push('/recharge-order')">
      <image-load filePath="time.png" name="usdt" class="img left-img"></image-load>
      <div class="record-right">
        <div>{{ _t18('recharge_order') }}</div>
        <image-load filePath="right-arrow.png" name="usdt" class="img right-img"></image-load>
      </div>
    </div>
  </div>

  <div
    class="custorm"
    @click="dispatchCustomEvent('event_serviceChange')"
    v-if="['das', 'dev'].includes(_getConfig('_APP_ENV'))"
  >
    <!-- 人工匹配商家 -->
    <div class="left">
      <image-load filePath="defi/custorm.png" class="service-img"></image-load>
      <span class="text">{{ _t18('findCustorm') }}</span>
    </div>
    <div class="right"><svg-load name="jiantou" class="jiantou"></svg-load></div>
  </div>
</template>

<script setup>
import { dispatchCustomEvent } from '@/utils'
import { _t18 } from '@/utils/public'
import List from './recharge-list.vue'
import { filterCoin2 } from '@/utils/public'
import { useMainStore } from '@/store/index.js'
import { useRouter } from 'vue-router'
const { push } = useRouter()
const mainStore = useMainStore()

/**
 * 充值方式列表
 * [{ icon: 'usdt', type: '0', title: 'USDT - ERC' ,address:'111111'},{ icon: 'btc', type: '0', title: 'BTC' ,address:'222222'},]
 */

const coinList = computed(() => {
  return mainStore.getRechargeList.map((item, index) => {
    console.log(item.coinName)
    return {
      icon: filterCoin2(item.coin),
      type: 0, //充值
      title: item.coinName,
      address: item.address
    }
  })
})
</script>

<style lang="scss" scoped>
.custorm {
  margin-bottom: 30px;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left,
  .right {
    display: flex;
    align-items: center;
    .service-img {
      font-size: 20px;
      width: 20px;
      height: 20px;
      margin-right: 15px;
    }
    .text {
      font-size: 14px;
    }
    .jiantou {
      font-size: 10px;
    }
  }
}
.record-info {
  padding: 0 0.426667rem;
  .record-card {
    display: flex;
    align-items: center;
    background: var(--ex-assets--record-card-color);
    border-radius: 0.16rem;
    padding: 0.293333rem 0.346667rem;
    .left-img {
      width: 0.426667rem;
      height: 0.426667rem;
    }
    .record-right {
      margin-left: 0.213333rem;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      div {
        font-size: 0.373333rem;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        color: var(--ex-assets--record-font-color);
      }
      .right-img {
        width: 0.4rem;
        height: 0.266667rem;
      }
    }
  }
}
</style>
