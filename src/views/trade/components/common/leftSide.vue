<template>
  <div class="leftSide">
    <div class="search">
      <van-cell>
        <template #title>
          <input
            v-model.trim="searchName"
            type="text"
            class="inputSearch"
            :placeholder="_t18('search_currency')"
            @input="searchBtn"
          />
        </template>

        <template #right-icon>
          <van-icon name="search" class="search-icon" color="#fff" size="20" />
        </template>
      </van-cell>
      <!-- <svg-load name="sousuo-h" class="searchImg"></svg-load>
      <div class="contain">
        <input
          type="text"
          v-model.trim="searchName"
          class="inputSearch"
          :placeholder="_t18('search_currency')"
          @input="searchBtn"
        />
      </div> -->
    </div>
    <Filter :list="currentCoinList" @to-sort="toSort" />
    <div class="leftList">
      <div v-if="currentList.length">
        <CurrencyItem
          v-for="(item, index) in filterKeyCoin(currentList, searchName)"
          :key="index"
          :currencyItem="item"
          :showLeftImg="['fx'].includes(_getConfig('_APP_ENV')) ? true : false"
          @click="linkTo(item)"
        />
      </div>
      <Nodata v-else />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import CurrencyItem from '@/components/CurrencyList/currencyItem.vue'
import { useMainStore } from '@/store/index'
import { useTradeStore } from '@/store/trade'
import { dispatchCustomEvent } from '@/utils'
import { filterKeyCoin } from '@/utils/filters'
import { _t18 } from '@/utils/public'

import Filter from './filter.vue'

const mainStore = useMainStore()

const tradeStore = useTradeStore()
const $router = useRouter()
const $route = useRoute()
const props = defineProps({
  headerList: {
    type: Array
  }
})
/**
 * 搜索
 */
const searchName = ref('')
/**
 * 币种列表
 */
const currentList = ref([])
const currentCoinList = computed(() => {
  let tempList = []
  if ($route.query.type) {
    if ($route.query.type == 1) {
      tempList = tradeStore.spotCoinList
    } else if ($route.query.type == 2) {
      tempList = tradeStore.contractCoinList
    }
  } else {
    if ($route.path == '/tradeU') {
      tempList = tradeStore.contractCoinList
    } else if ($route.path == '/tradeBB') {
      tempList = tradeStore.spotCoinList
    } else {
      let temp = props.headerList[mainStore.tradeFlag]
      if (temp.currentTab == 'secondContract') {
        tempList = tradeStore.secondContractCoinList
      } else if (temp.currentTab == 'spot') {
        tempList = tradeStore.spotCoinList
      } else if (temp.currentTab == 'contract') {
        tempList = tradeStore.contractCoinList
      }
    }
  }

  currentList.value = tempList
  return tempList
})
/** 点击每一项 */
const emit = defineEmits(['linkTo', 'close'])
const linkTo = (item) => {
  let type = ''
  if ($route.query.type == 1) {
    type = 'spot'
  } else if ($route.query.type == 2) {
    type = 'contract'
  }
  if (!$route.query.type) {
    $router.replace(`${$route.path}?symbol=${item.coin}`)
  } else {
    $router.replace(`${$route.path}?symbol=${item.coin}&type=${$route.query.type}`)
  }
  dispatchCustomEvent('event_tradeSymbolChange', {
    type: type,
    symbol: item.symbol,
    coin: item.coin,
    coinInfo: item
  })

  emit('close')
  emit('linkTo', item.coin)
}
const toSort = (v) => {
  currentList.value = v
}
</script>

<style lang="scss" scoped>
:deep(.currencyItem) {
  padding: 0.373333rem 0.426667rem;
  background-color: transparent;
}
:deep(.van-cell__title, .van-cell__value) {
  display: flex;
  align-items: center;
}
input {
  color: #fff;
}
.search-icon {
  display: flex;
  align-items: center;
}
.leftSide {
  display: flex;
  flex-direction: column;
  padding: 0.533333rem 0;
  position: relative;
  height: 100%;
  background-color: #161a33;
  .search {
    height: 1.333333rem;
    padding: 0 0.426667rem;
    :deep(.van-cell) {
      height: 1.333333rem;
      border-radius: 0.213333rem;
      background: var(--ex-default-background-color);
    }

    .searchImg {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
    .contain {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      color: var(--ex-default-font-color);
      .inputSearch {
        flex: 1;
        background: var(--ex-div-bgColor8);
      }
      input::-webkit-input-placeholder {
        color: var(--ex-font-color5);
      }
      input::-moz-input-placeholder {
        color: var(--ex-font-color5);
      }
      input::-ms-input-placeholder {
        color: var(--ex-font-color5);
      }
    }
  }
}
</style>
