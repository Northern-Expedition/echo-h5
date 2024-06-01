<!-- 行情——>币币交易 -->
<template>
  <div>
    <Filter :list="currentCoinList" @to-sort="toSort" />
    <div v-if="currentList.length" class="currentCoinListStyle">
      <CurrencyItem
        v-for="(item, index) in filterKeyCoin(currentList, searchName)"
        :key="index"
        :currencyItem="item"
        @click="linkTo(item)"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import CurrencyItem from '@/components/CurrencyList/currencyItem.vue'
import { useTradeStore } from '@/store/trade'
import { filterKeyCoin } from '@/utils/filters'

import Filter from './common/filter.vue'

const props = defineProps({
  searchName: {
    type: String
  }
})
const tradeStore = useTradeStore()
const currentCoinList = computed(() => {
  let tempList = tradeStore.spotCoinList
  return tempList
})
const currentList = ref(tradeStore.spotCoinList)
const toSort = (v) => {
  currentList.value = v
}
const router = useRouter()
const linkTo = (item) => {
  router.push(`/trade?symbol=${item.coin}`)
}
</script>

<style lang="scss" scoped>
.currentCoinListStyle {
  padding-bottom: 74px;
}
</style>
