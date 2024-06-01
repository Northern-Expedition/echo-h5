<!-- 交易——>币币交易 -->
<template>
  <div>
    <!-- 头部 -->
    <BBTradingHeader :coinInfo="coinInfo" @show-side-popup="showSidePopup" />
    <!-- 内容，订单 -->
    <BBTradingContent :coinInfo="coinInfo" />
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
// import { showToast } from 'vant'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

// import { getCollect, removeCollect, setCollect } from '@/api/trade'
import PublicPopup from '@/components/Popup/public.vue'
import { useTradeStore } from '@/store/trade'
import { _t18 } from '@/utils/public'

import BBTradingContent from './bbTrading/content/index.vue' // BB 内容部分
import BBTradingHeader from './bbTrading/header/index.vue' // BB header部分
import LeftSide from './common/leftSide.vue'

const tradeStore = useTradeStore()
const $route = useRoute()
defineProps({
  headerList: {
    type: Array,
    default: () => []
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
    coinInfo.value = tradeStore.spotCoinList.filter((item) => {
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
    coinInfo.value = tradeStore.spotCoinList.filter((item) => {
      return item.coin === $route.query.symbol
    })[0]
    if (!coinInfo.value) {
      coinInfo.value = tradeStore.spotCoinList[0]
    }
  } else {
    coinInfo.value = tradeStore.spotCoinList[0]
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
</script>

<style lang="scss" scoped>
.line {
  height: 5px;
  background: var(--ex-div-bgColor10);
}
</style>
