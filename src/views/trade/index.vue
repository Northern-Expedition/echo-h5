<!-- 交易页面：秒合约，币币交易，U本位 -->
<template>
  <div
    :style="{
      background: '#161a33'
    }"
  >
    <!-- tabs -->
    <van-sticky>
      <div class="headerList">
        <div class="left">
          <svg-load name="jiantou-z" class="leftImg" @click="_back()" />
        </div>
        <div class="headerChoose">
          <van-tabs v-model:active="currentIndex" swipeable>
            <van-tab v-for="(item, index) in headerList" :key="index">
              <template #title>
                <div class="tab-item" :class="currentIndex === index ? 'atv' : ''">
                  {{ item.title }}
                </div>
              </template>
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </van-sticky>
    <!-- tab -->
    <component :is="currentComponent" :headerList="headerList" />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { useMainStore } from '@/store/index'
import { useTradeStore } from '@/store/trade'
import { _t18 } from '@/utils/public'

import BBTrading from './components/tradeBBTrading.vue'
import SecondContract from './components/tradeSecondContract.vue'
import Ustandard from './components/tradeUstandard.vue'

const mainStore = useMainStore()
const tradeStore = useTradeStore()
const $route = useRoute()
// tabs
const headerList = computed(() => {
  let tempList = mainStore.getTradeHeaderList.filter((item, index) => {
    return item.componentName != 'Optional'
  })
  return tempList
})
const currentIndex = ref(
  mainStore.tradeFlag - mainStore.isOption < 0 ? 0 : mainStore.tradeFlag - mainStore.isOption
)
// 切换组件
const currentComponent = computed(() => {
  let temp = ''
  if (headerList.value[currentIndex.value].componentName == 'SecondContract') {
    temp = SecondContract
  } else if (headerList.value[currentIndex.value].componentName == 'BBTrading') {
    temp = BBTrading
  } else if (headerList.value[currentIndex.value].componentName == 'Ustandard') {
    temp = Ustandard
  }
  return temp
})
watch(
  currentIndex,
  (n) => {
    mainStore.setTradeFlag(n)
    tradeStore.getCoinList()
    /* if (headerList.value[n].componentName == 'SecondContract') {
      let temp={}
      if ($route.query.symbol) {
        temp = tradeStore.secondContractCoinList.filter((item, index) => {
          return item.coin === $route.query.symbol
        })[0]
        if (!temp) {
          temp = tradeStore.secondContractCoinList[0]
        }
      } else {
        temp = tradeStore.secondContractCoinList[0]
      }
      coinInfo2.value=temp
    } else if (headerList.value[currentIndex.value].componentName == 'BBTrading') {
      let temp={}
      if ($route.query.symbol) {
        temp = tradeStore.spotCoinList.filter((item, index) => {
          return item.coin === $route.query.symbol
        })[0]
        if (!temp) {
          temp = tradeStore.spotCoinList[0]
        }
      } else {
        temp = tradeStore.spotCoinList[0]
      }
      coinInfo2.value=temp
    } else if (headerList.value[currentIndex.value].componentName == 'Ustandard') {
      let temp={}
      if ($route.query.symbol) {
        temp = tradeStore.contractCoinList.filter((item, index) => {
          return item.coin === $route.query.symbol
        })[0]
        if (!temp) {
          temp = tradeStore.contractCoinList[0]
        }
      } else {
        temp = tradeStore.contractCoinList[0]
      }
      coinInfo2.value=temp
    } */
  },
  { immediate: true }
)
onMounted(() => {
  tradeStore.getCoinList()
})
</script>

<style lang="scss" scoped>
.headerList {
  height: 60px;
  border-bottom: 1px solid var(--ex-border-color);
  display: flex;
  align-items: center;
  z-index: 9;
  padding-left: 15px;
  background: #161a33;

  .left {
    display: flex;
    font-size: 16px;
    font-weight: normal;
    color: var(--ex-default-font-color);
    padding: 0.266667rem;
    border-radius: 0.213333rem;
    line-height: normal;
    background: var(--ex--backup-background-color-2);

    .leftImg {
      width: 16px;
      height: 12px;
    }
  }

  .headerChoose {
    width: 100%;
    margin-left: 20px;
    margin-right: 20px;
    :deep(.van-tabs) {
      overflow: hidden;
      .van-tabs__nav {
        border-radius: 0.266667rem;
        padding: 0;
        background: #161a33;
      }
      .van-tab--active {
        background: var(--ex-home-tabs-bg-atv-color);
        color: var(--ex-home-tabs-text-atv-color);
        border-radius: 0.266667rem;
      }
      .tab-item {
        padding: 0.266667rem 0;
        width: 100%;
        font-size: 0.373333rem;
        color: var(--ex-home-tabs-text-color);
      }
      .atv {
        color: var(--ex-home-tabs-text-atv-color);
      }
      .van-tabs__line {
        width: 0px;
      }
      .van-tabs__content--animated {
        overflow: hidden;
      }
    }
  }
}
</style>
