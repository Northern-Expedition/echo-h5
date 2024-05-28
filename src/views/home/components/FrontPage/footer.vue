<template>
  <div class="footer">
    <!-- 热门币种 -->
    <!-- <h1 class="title" @click="handelShowTab(0)">{{ _t18('coinbase_h_l_hot') }}</h1> -->
    <!-- <div class="tab_title">
      <h1 :class="showTab===0?'active title':'title'" @click="handelShowTab(0)">{{ _t18('coinbase_h_l_hot') }}<i></i></h1>
      <h1 :class="showTab===1?'active title':'title'" @click="handelShowTab(1)">外汇币种<i></i></h1>
    </div> -->
    <div class="headerChoose">
      <van-tabs v-model:active="showTab" swipeable @click-tab="handelShowTab(showTab)">
        <van-tab v-for="(item, index) in headerList" :key="index">
          <template #title>
            <div v-if="item.show" class="tab-item" :class="showTab === index ? 'atv' : ''">
              {{ item.name }}
            </div>
          </template>
        </van-tab>
      </van-tabs>
    </div>
    <div class="main">
      <div v-if="showTab === 0 && headerList[0].show">
        <div v-if="currentCoinList0.length">
          <CurrencyItem
            v-for="(item, index) in currentCoinList0"
            :key="index"
            :currencyItem="item"
            @click="linkTo(item)"
          ></CurrencyItem>
        </div>
        <Nodata v-else></Nodata>
      </div>
      <div v-if="showTab === 1 && headerList[1].show">
        <div v-if="currentCoinList1.length">
          <CurrencyItem
            v-for="(item, index) in currentCoinList1"
            :key="index"
            :currencyItem="item"
            @click="linkTo(item)"
          ></CurrencyItem>
        </div>
        <Nodata v-else></Nodata>
      </div>
      <div v-if="showTab === 2 && headerList[2].show">
        <div v-if="currentCoinList2">
          <CurrencyItem
            v-for="(item, index) in currentCoinList2"
            :key="index"
            :currencyItem="item"
            @click="linkTo(item)"
          ></CurrencyItem>
        </div>
        <Nodata v-else></Nodata>
      </div>
    </div>
  </div>
</template>
<script setup>
import CurrencyItem from '@/components/CurrencyList/currencyItem.vue'
import { useTradeStore } from '@/store/trade/index'
import { useMainStore } from '@/store/index.js'
import { useRouter } from 'vue-router'
import { _t18 } from '@/utils/public'
const tradeStore = useTradeStore()
const mainStroe = useMainStore()
const $router = useRouter()
const linkTo = (item) => {
  if (!['latcoin'].includes(__config._APP_ENV)) {
    mainStroe.setTradeStatus(Number(0))
    $router.push(`/trade?symbol=${item.coin}`)
  } else {
    mainStroe.setTradeStatus(Number(0))
    $router.push(`/tradeU?symbol=${item.coin}`)
  }
}
const headerList = computed(() => {
  return [
    {
      name: _t18(`coinbase_h_l_hot`, ['latcoin']),
      show: true
    },
    {
      name: _t18(`coinbase_h_l_out`, ['latcoin']),
      show: true
    },
    {
      name: _t18(`coinbase_h_l_gold`),
      show: ['latcoin'].includes(__config._APP_ENV) ? false : true
    }
  ]
})
const currentCoinList0 = ref(
  tradeStore.secondContractCoinList.filter((it, inx) => {
    return it.coinType == 2
  })
)
const currentCoinList1 = ref(
  tradeStore.secondContractCoinList.filter((it, inx) => {
    return it.coinType == 1
  })
)
const currentCoinList2 = ref(
  tradeStore.secondContractCoinList.filter((it, inx) => {
    return it.coinType == 3
  })
)
// 筛选
let arrowList = ref({
  firstIcon: 0,
  secondIcon: 0,
  thirdIcon: 0
})

const showTab = ref(['ebc'].includes(__config._APP_ENV) ? 1 : 0)
const handelShowTab = (item) => {
  showTab.value = item
}
</script>
<style lang="scss" scoped>
.footer {
  padding-bottom: 120px;
  h1.active {
    color: var(--ex-default-font-color);
    position: relative;

    i {
      background-color: var(--ex-active-font-color);
      position: absolute;
      width: 20px;
      height: 2px;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      transition: all 0.2s;
    }

    // font-size: 18px;
  }

  .main {
    background-color: var(--ex-default-background-color);
    // padding-top: 10px;
  }

  .header-list {
    padding: 15px 15px 5px;
    font-size: 12px;
    color: var(--ex-home-list-ftcolor2);
    display: flex;
    justify-content: space-between;

    .item {
      display: flex;
      align-items: center;
      .arrows {
        display: flex;
        flex-direction: column;
        margin-left: 5px;
        .itemImg {
          width: 6px;
          height: 8px;
        }
      }
    }
    .item:nth-child(2) {
      flex: 1;
      text-align: right;
      justify-content: right;
    }

    .item:nth-child(3) {
      margin-left: 20px;
      max-width: 80px;
      min-width: 80px;
      text-align: right;
      justify-content: flex-end;
    }
  }
}

.headerChoose {
  :deep(.van-tabs) {
    overflow: hidden;
    .van-tabs__nav {
      border-radius: 0.266667rem;
      padding: 0;
      background: var(--ex-home-tabs-bg-color);
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
</style>
