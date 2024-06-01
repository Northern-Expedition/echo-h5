<!-- 交易——>秒合约 -->
<template>
  <div>
    <!-- 头部 -->
    <SecondContractHeader :coinInfo="coinInfo" @show-side-popup="showSidePopup" />
    <!-- k线，委托数据 -->
    <SecondContractContent ref="childComp" :coinInfo="coinInfo" />
    <!-- 看涨看跌 -->
    <UpsAndDowns :coinInfo="coinInfo" @event-bus-brother="eventBusBrother" />
    <!-- 左侧切换币种 -->
    <PublicPopup
      :show="sidePopup"
      :direction="`left`"
      :height="`100%`"
      :width="`80%`"
      :showHeader="false"
      :empty="false"
      @handel-close="sidePopup = false"
    >
      <template #emptyContentCustomize>
        <LeftSide :headerList="headerList" @close="sidePopup = false" />
      </template>
    </PublicPopup>
  </div>
</template>

<script setup>
import { showToast } from 'vant'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { removeCollect, setCollect } from '@/api/trade'
import PublicPopup from '@/components/Popup/public.vue'
import { useTradeStore } from '@/store/trade'
import { useUserStore } from '@/store/user'
import { _t18 } from '@/utils/public'

import LeftSide from './common/leftSide.vue'
import SecondContractContent from './secondContract/content/index.vue' // 秒合约内容部分
import UpsAndDowns from './secondContract/content/upsAndDowns.vue' //涨跌
import SecondContractHeader from './secondContract/header/index.vue'
// 秒合约header部分
const tradeStore = useTradeStore()
const userStore = useUserStore()
const $route = useRoute()
const props = defineProps({
  headerList: {
    type: Array
  }
})
/**
 * 币种信息
 */
// 当前币种信息
const coinInfo = ref({})
// 监听路由展示对应币种信息
watch(
  () => $route.query.symbol,
  (val) => {
    coinInfo.value = tradeStore.secondContractCoinList.filter((item, index) => {
      return item.coin === val
    })[0]
  },
  {
    deep: true
  }
)
// 初始化展示币种信息
const init = () => {
  if ($route.query.symbol) {
    coinInfo.value = tradeStore.secondContractCoinList.filter((item, index) => {
      return item.coin === $route.query.symbol
    })[0]
    if (!coinInfo.value) {
      coinInfo.value = tradeStore.secondContractCoinList[0]
    }
  } else {
    coinInfo.value = tradeStore.secondContractCoinList[0]
  }
}
onMounted(() => {
  init()
})
/**
 * 侧边栏
 */
const sidePopup = ref(false)
const showSidePopup = () => {
  sidePopup.value = true
}
/** 子调用兄弟更新委托列表 */
const childComp = ref(null)
const eventBusBrother = () => {
  userStore.getUserInfo()
  childComp.value.updateList()
}
</script>

<style lang="scss" scoped></style>
