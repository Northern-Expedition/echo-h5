<template>
  <div>
    <van-tabs shrink v-model:active="tabActive" animated @click-tab="clickTab">
      <van-tab v-for="(item, index) in tabList" :title="item.keyStr" :key="index" :name="item.name">
        <template #title>
          <div class="tab-item" :class="curIndex2 === index ? 'atv' : ''">
            {{ item.name }}
          </div>
        </template>
      </van-tab>
    </van-tabs>
    <!-- 平台资产 platAccount-->
    <Plat
      v-show="tabActive == '平台资产'"
      :amountSum="amountSum"
      :assetDetails="assetDetails"
      @handleYanjin="handleYanjin"
      @handleShuaxin="handleShuaxin"
      :showNum="showNum"
      :type="tabActive"
    ></Plat>
    <!-- 理财资产 financAccount-->
    <financ
      v-show="tabActive == '理财资产'"
      :amountSum="amountSum"
      :assetDetails="assetDetails"
      @handleYanjin="handleYanjin"
      @handleShuaxin="handleShuaxin"
      :showNum="showNum"
      :type="tabActive"
    ></financ>
    <!-- 合约资产 contarctAccount-->
    <Contarct
      v-show="tabActive == '合约资产'"
      :amountSum="amountSum"
      :assetDetails="assetDetails"
      @handleYanjin="handleYanjin"
      @handleShuaxin="handleShuaxin"
      :showNum="showNum"
      :type="tabActive"
    ></Contarct>
  </div>
</template>

<script setup>
import { _t18 } from '@/utils/public'
import { _add } from '@/utils/decimal'
import Plat from './components/account/platAccount.vue'
import financ from './components/account/financAccount.vue'
import Contarct from './components/account/contarctAccount.vue'
import { priceFormat, countFormat, currencyFormat } from '@/utils/decimal.js'
import { useUserStore } from '@/store/user/index'
import { useMainStore } from '@/store'
import { storeToRefs } from 'pinia'
import { storageDict } from '@/config/dict'
import { showLoadingToast } from 'vant'
import { getFreezeList } from '@/api/user'
import { onMounted } from 'vue'
import { DIFF_FREEZE_ASSETS } from '@/config/index'

const userStore = useUserStore()
// 平台资产,理财资产,合约资产
const mainStore = useMainStore()

// tabs数据示例
// const tabList = [
//    {name: '平台资产', isOpen: true, sort: 0, keyStr: 'asset_platform'}
//    {name: '理财资产', isOpen: true, sort: 1, keyStr: 'asset_financ'}
//    {name: '合约资产', isOpen: true, sort: 2, keyStr: 'asset_contarct'}
// ]

const tabList = computed(() => {
  const list = mainStore.getAssetsTabList.filter((item) => {
    if (!item.isOpen) return false
    item.name == '平台资产' && (item.keyStr = _t18(item.keyStr, ['latcoin']))
    item.name == '理财资产' && (item.keyStr = _t18(item.keyStr, ['paxpay', 'latcoin']))
    item.name == '合约资产' && (item.keyStr = _t18(item.keyStr, ['paxpay', 'latcoin']))
    return true
  })
  return list.sort((a, b) => a.sort - b.sort)
})

const tabActive = ref(tabList.value[0]?.name || '')

/**
 * 账户信息
 */
const curIndex = ref('0')
const curIndex2 = ref(0)
const clickTab = (e) => {
  if (curIndex.value != e.name) {
    userStore.getUserInfo()
    curIndex.value = e.name
  }
  if (e.name === '平台资产') {
    curIndex2.value = 0
  } else if (e.name === '理财资产') {
    curIndex2.value = 2
  } else if (e.name === '合约资产') {
    curIndex2.value = 1
  }
}

const showNum = ref(localStorage.getItem(storageDict.EYES) == 'true' || true)
// 点击小眼睛
const handleYanjin = () => {
  showNum.value = !showNum.value
  localStorage.setItem(storageDict.EYES, showNum.value)
}

// 点击刷新
const handleShuaxin = () => {
  showLoadingToast({
    forbidClick: true,
    duration: 0
  })
  userStore.getUserInfo()
  getAccountFreezeList()
}

// 用户余额信息
const { asset } = storeToRefs(userStore)
const assetDetails = computed(() => {
  let list = []
  //[{icon: 'usdt', title: 'USDT', keyong: 100, zhanyong: 100, zhehe: 100}]
  asset.value.forEach((item, index) => {
    // 之前两块多平台判断逻辑是一样的 -> 精简合并

    if (
      (item.type == 1 && tabActive.value == '平台资产') ||
      (item.type == 2 && tabActive.value == '理财资产') ||
      (item.type == 3 && tabActive.value == '合约资产')
    ) {
      let obj = {}
      obj['keyong'] = priceFormat(item.availableAmount)
      // rxce冻结金额=占用+冻结
      if (DIFF_FREEZE_ASSETS.includes(__config._APP_ENV)) {
        let temp = 0
        if (freezeList.value) {
          freezeList.value.forEach((itm, inx) => {
            if (itm.coin == item.symbol && item.type == 1) {
              temp = itm.price
            }
          })
        }
        obj['zhanyong'] = priceFormat(_add(item.occupiedAmount, temp))
      } else {
        obj['zhanyong'] = priceFormat(item.occupiedAmount)
      }
      obj['zhehe'] = priceFormat(item.exchageAmount)
      if (item.symbol == 'usdt') {
        obj['icon'] = 'usdt'
        obj['loge'] = item.loge
        obj['title'] = 'USDT'
        list.unshift(obj)
      } else {
        obj['loge'] = item.loge
        obj['title'] = item.symbol?.replace('usdt', '').trim().toLocaleUpperCase()
        obj['icon'] = item.symbol?.replace('usdt', '').trim()
        list.push(obj)
      }
    }
  })
  return list
})

// 计算账户余额
const amountSum = computed(() => {
  let sum = 0
  for (let i = 0; i < assetDetails.value.length; i++) {
    sum += Number(assetDetails.value[i].zhehe)
  }
  return priceFormat(sum)
})

const freezeList = ref()

// 获取冻结资产
const getAccountFreezeList = async () => {
  if (DIFF_FREEZE_ASSETS.includes(__config._APP_ENV)) {
    const res = await getFreezeList()
    if (res.code == '200') {
      freezeList.value = res.data
    }
  }
}

onMounted(() => {
  getAccountFreezeList()
})
</script>

<style lang="scss" scoped>
:deep(.van-tabs) {
  overflow: hidden;
  padding: 0.4rem 0 0.426667rem;
  background: var(--ex-default-background-color);

  .van-tabs__wrap {
    padding: 0 0.426667rem;
    background: var(--ex-default-background-color);

    .van-tabs__nav {
      padding: 0 0.426667rem;
      display: flex;
      justify-content: space-between;
      border-radius: 0.266667rem;
      padding: 0;
      background: var(--ex-home-tabs-bg-color);

      .van-tab--active {
        background: var(--ex-home-tabs-bg-atv-color);
        color: var(--ex-home-tabs-text-atv-color);
        border-radius: 0.266667rem;
      }
    }
  }

  .tab-item.atv {
    font-size: 0.4rem;
    color: var(--ex-home-tabs-text-atv-color);
  }

  .tab-item {
    padding: 0.24rem 0.533333rem;
    width: 100%;
    font-size: 0.373333rem;
    color: var(--ex-home-tabs-text-color);
  }

  .van-tabs__line {
    width: 0px;
  }

  .account-content {
    min-height: calc(100vh - 1.866667rem);
    overflow: auto;
    display: flex;
    flex-direction: column;

    .userAmount {
      padding: 1.226667rem 0.4rem 0.693333rem;
      display: flex;
      flex-direction: column;
      text-align: center;

      div {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin-bottom: 0.666667rem;

        p {
          font-size: 0.426667rem;
          color: var(--ex-passive-font-color);
        }

        .yanjin {
          font-size: 0.666667rem;
          margin: 0 0 0 0.4rem;
        }
      }

      & > p {
        font-size: 0.64rem;
        font-weight: 600;
        text-align: center;
      }
    }

    .currencyAbout {
      padding: 0 0.133333rem 0.56rem;
      display: flex;
      text-align: center;
      justify-content: center;

      & > div {
        width: 25%;

        .currencyIcon {
          font-size: 1.28rem;
          margin-bottom: 0.213333rem;
        }

        .tips {
          font-size: 0.373333rem;
          color: var(--ex-assets--font-color);
        }
      }
    }

    .assetDetails {
      background: var(--ex-financial-card-bg-color);
      padding: 0.64rem 0.426667rem 2.666667rem;
      flex-grow: 1;

      & > div {
        .title {
          display: flex;
          justify-content: center;

          .left {
            color: var(--ex-font-color6);
            font-size: 0.48rem;
            font-weight: 400;
          }
        }

        .details {
          margin-top: 0.426667rem;
          border-radius: 0.213333rem;
          border: 0.026667rem solid var(--ex--backup-background-color-2);
          padding: 0.533333rem 0.48rem;

          .top {
            font-size: 0.533333rem;
            margin-right: 0.133333rem;

            img {
              border-radius: 100%;
              width: 0.533333rem;
              height: 0.533333rem;
              margin-right: 0.133333rem;
            }

            .currencyIcon {
              font-size: 0.533333rem;
              margin-right: 0.133333rem;
            }

            span {
              font-size: 0.426667rem;
              color: var(--ex-font-color6);
            }
          }

          .bottom {
            display: flex;

            div:first-child {
              text-align: start;
            }

            & > div {
              flex: 1;
              text-align: center;

              .til {
                padding: 0.533333rem 0;
                font-size: 0.346667rem;
                color: var(--ex-assets--font-card-color);
              }

              .num {
                color: var(--ex-font-color6);
                font-size: 0.373333rem;
                font-weight: 400;
              }
            }

            div:first-child {
              text-align: start;
            }

            div:last-child {
              text-align: end;
            }
          }
        }
      }
    }
  }
}
</style>
