<template>
  <template v-if="!getIsMock">
    <HeaderDiff v-if="DIFF_HOME_BANNER.includes(_getConfig('_APP_ENV'))" />
    <Header v-else />
    <Menu />
  </template>

  <div v-if="getIsMock" class="summary">
    <div class="unit_name">
      <div class="name">{{ _t18('mock_price') }}</div>
      <div class="unit">USDT</div>
    </div>
    <div class="numerical">{{ amountSum }}</div>
  </div>

  <Footer />
  <van-dialog
    v-model:show="showAd"
    closeOnClickOverlay
    :showConfirmButton="false"
    class="dialog-ad"
  >
    <div class="popup-box">
      <div class="head">
        <div class="title">{{ _t18('online_service') }}</div>
        <div class="close">
          <img src="/resource/svg/dark/guanbi.svg" class="icon closeSvg" @click="showAd = false" />
        </div>
      </div>
      <div class="conn">
        <div>
          {{ _t18('ad_1') }}
        </div>
        <div>{{ _t18('ad_2') }}</div>
        <div class="heng">
          <div>
            <span class="customer">@zhilian1919</span>
            {{ _t18('ad_3') }}
          </div>
        </div>
      </div>
    </div>
  </van-dialog>
</template>

<!-- 首页 -->
<script setup>
import { storeToRefs } from 'pinia'

import { DIFF_FREEZE_ASSETS, DIFF_HOME_BANNER } from '@/config/index'
import { useMainStore } from '@/store/index.js'
import { useUserStore } from '@/store/user/index'
import { priceFormat } from '@/utils/decimal.js'
import { _t18, _toView } from '@/utils/public'

import Footer from './components/FrontPage/footer.vue'
import Header from './components/FrontPage/header.vue'
import HeaderDiff from './components/FrontPage/headerDiff.vue'
import Menu from './components/FrontPage/menu.vue'
import { storageDict } from '@/config/dict'
const userStore = useUserStore()

const mainStore = useMainStore()
const showAd = ref(true)
const getIsMock = computed(() => userStore.userInfo.user?.type === '2')
onMounted(() => {
  mainStore.getSettingConfig()
})
const { asset } = storeToRefs(userStore)
const assetDetails = computed(() => {
  let list = []
  //[{icon: 'usdt', title: 'USDT', keyong: 100, zhanyong: 100, zhehe: 100}]
  asset.value.forEach((item, index) => {
    // 之前两块多平台判断逻辑是一样的 -> 精简合并

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
  })
  return list
})

// 计算账户余额
const amountSum = computed(() => {
  let sum = 0
  for (let i = 0; i < assetDetails.value.length; i++) {
    sum += Number(assetDetails.value[i].zhehe)
  }
  return sum.toLocaleString()
})
</script>

<style lang="scss">
.dialog-ad {
  width: 8.266667rem;
}

.popup-box {
  width: 8.266667rem;
  padding-bottom: 0.4rem;
  background: var(--ex-backup--background-color);

  .head {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 0.4rem;
    height: 1.333333rem;
    border-bottom: 0.026667rem solid var(--ex-border-line);

    .title {
      font-size: 0.426667rem;
      color: var(--ex-font-color6);
      text-align: center;
      width: 100%;
      position: absolute;
      left: 0;
    }

    .close {
      position: relative;
      z-index: 9;

      .closeSvg {
        font-size: 0.533333rem;
      }
    }
  }

  .conn {
    min-height: 6.666667rem;
    max-height: calc(100vh - 18.666667rem);
    overflow: hidden auto;
    line-height: 0.533333rem;
    padding: 0.266667rem 0.4rem 0;
    box-sizing: border-box;
    font-size: 0.373333rem;

    .heng {
      font-size: 0.373333rem;
      margin-top: 0.32rem;
    }

    .customer {
      color: #0052ff;
    }
  }
}

.summary {
  height: 2.453333rem;
  margin: 0.16rem 0.4rem 0.4rem;
  background-color: var(--ex--backup-background-color-2);
  border-radius: 0.133333rem;
  padding: 0.266667rem;

  .unit_name {
    line-height: 1.066667rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .name {
      font-size: 0.373333rem;
      color: var(--ex-default-font-color-light);
    }
    .unit[data-v-ccd5ad20] {
      font-size: 0.426667rem;
      color: var(--ex-default-font-color-light);
    }
  }

  .numerical {
    font-size: 0.586667rem;
    font-weight: 700;
    color: var(--ex-default-font-color-light);
    font-family: DINOT-Medium;
  }
}
</style>
