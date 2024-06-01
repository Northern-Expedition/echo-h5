<!-- 交易——>U本位 -->
<template>
  <div>
    <HeaderBar :currentName="_t18('trade_tab5', ['paxpay', 'latcoin'])" :border_bottom="true" />
    <!-- 头部 -->
    <UTradingHeader :coinInfo="coinInfo" @show-side-popup="showSidePopup" />
    <!-- 主体内容 -->
    <UTradingContent :coinInfo="coinInfo" />

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

// import { removeCollect, setCollect } from '@/api/trade'
import PublicPopup from '@/components/Popup/public.vue'
import { useTradeStore } from '@/store/trade'
import { _t18 } from '@/utils/public'

import LeftSide from './components/common/leftSide.vue'
import UTradingContent from './components/ustandard/content/index.vue' // U本位content部分
import UTradingHeader from './components/ustandard/header/index.vue'
// U本位header部分
const tradeStore = useTradeStore()
const $route = useRoute()
defineProps({
  headerList: {
    type: Array,
    default() {
      return []
    }
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
    coinInfo.value = tradeStore.contractCoinList.filter((item) => {
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
    coinInfo.value = tradeStore.contractCoinList.filter((item) => {
      return item.coin === $route.query.symbol
    })[0]
    if (!coinInfo.value) {
      coinInfo.value = tradeStore.contractCoinList[0]
    }
  } else {
    coinInfo.value = tradeStore.contractCoinList[0]
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

<style lang="scss" scoped></style>
