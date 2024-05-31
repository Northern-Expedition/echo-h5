<!-- 行情页面：自选，秒合约，币币交易，U本位 -->
<template>
  <div class="quote">
    <!-- 搜索 -->
    <van-field
      type="text"
      v-model.trim="searchName"
      :placeholder="_t18(`search_currency`)"
      class="searchInput"
    >
      <template #button>
        <van-icon
          name="search"
          style="color: var(--ex-default-font-color); font-size: 20px"
        ></van-icon>
      </template>
    </van-field>
    <!-- tabs -->

    <div class="simulate" @click="clickMock">
      <div class="left_tips">
        <div class="tips_assets text-ellipsis2">交易账户暂无资产</div>
        <div class="tips_sel">您可以尝试模拟交易</div>
      </div>
      <div class="right_btn">
        模拟交易
        <img src="@/assets/quote/quan.png" class="img right_btn-bg" />
      </div>
      <img src="@/assets/quote/simulate.png" class="img simulate-bg" />
    </div>
    <div class="headerChoose">
      <van-tabs
        swipeable
        shrink
        :swipe-threshold="2"
        v-model:active="currentIndex"
        line-width="20"
        line-height="2"
        color="#fff"
      >
        <van-tab v-for="(item, index) in headerList" :key="index" :title="item.title">
          <component :is="currentComponent" :searchName="searchName"></component>
        </van-tab>
      </van-tabs>
    </div>
    <!-- tab -->
  </div>
</template>

<script setup>
import { _t18 } from '@/utils/public'
import { useMainStore } from '@/store/index'
import { switchTypeApi } from '@/api/quote'
const mainStore = useMainStore()
import { showConfirmDialog, showLoadingToast, showToast } from 'vant'
import { computed } from 'vue'
import Optional from './components/quoteOptional.vue'
import SecondContract from './components/quoteSecondContract.vue'
import BBTrading from './components/quoteBBTrading.vue'
import Ustandard from './components/quoteUstandard.vue'
import { useRouter } from 'vue-router'
const { push } = useRouter()

// 搜索
const searchName = ref('')
// tabs
const headerList = computed(() => {
  let tempList = mainStore.getTradeHeaderList
  return tempList
})
const currentIndex = ref(mainStore.tradeFlag + mainStore.isOption)
// 切换组件
const currentComponent = computed(() => {
  let temp = ''
  if (headerList.value[currentIndex.value].componentName == 'Optional') {
    temp = Optional
  } else if (headerList.value[currentIndex.value].componentName == 'SecondContract') {
    temp = SecondContract
  } else if (headerList.value[currentIndex.value].componentName == 'BBTrading') {
    temp = BBTrading
  } else if (headerList.value[currentIndex.value].componentName == 'Ustandard') {
    temp = Ustandard
  }
  return temp
})

function clickMock() {
  showConfirmDialog({
    message: '确定开启模拟交易吗？',
    className: 'mock-dialog'
  }).then(async () => {
    showLoadingToast({})
    await switchTypeApi(2)
    showToast('已经入模拟交易')
    push('/home')
  })
}

watch(
  currentIndex,
  (n) => {
    mainStore.setTradeFlag(n)
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
// 搜索
.search {
  .searchBtn {
    height: 34px;
    background: var(--ex-div-bgColor22);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.213333rem;
    border: 0.026667rem solid var(--ex-border-color2);
    padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
    .searchLeft {
      width: 12px;
      height: 12px;
      margin-right: 10px;
      margin-top: -1.5px;
    }

    .searchInput {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      background: transparent;
      flex: 1;
      color: var(--ex-font-color12);
    }

    input::-webkit-input-placeholder {
      color: var(--ex-font-color12);
    }

    input::-moz-input-placeholder {
      color: var(--ex-font-color12);
    }

    input::-ms-input-placeholder {
      color: var(--ex-font-color12);
    }
  }
}
.headerChoose {
  margin-top: 0.533333rem;

  :deep(.van-tabs__nav) {
    background: var(--ex-div-bgColor8) !important;
    height: 40px;
    line-height: 40px;
  }
  :deep(.van-tab) {
    flex: none;
    font-size: 14px;
    margin-right: 30px;
    padding: 0;
    color: #7a7a7a !important;
    background: var(--ex-div-bgColor8) !important;
  }
  :deep(.van-tab--active) {
    font-weight: normal;
    color: #fff !important;
  }
}
</style>

<style lang="scss">
.quote {
  padding: 0.533333rem 0.426667rem 2.133333rem;

  .searchInput {
    border-radius: 0.213333rem;
    border: 0.026667rem solid var(--ex-border-color2);
    height: 47px;

    &:hover {
      border: 0.026667rem solid var(--ex-input-focus-color);
      outline: none;
    }

    .van-cell__value {
      height: 25px;
    }
  }

  .van-cell:after {
    border: none;
  }

  .simulate {
    margin: 0.266667rem 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.266667rem 0.346667rem;
    position: relative;

    .left_tips {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .tips_assets {
        font-size: 0.453333rem;
        color: var(--ex-default-font-color-deep2);
        font-weight: 600;
      }

      .text-ellipsis2 {
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        overflow: hidden;
        word-break: break-all;
        -webkit-box-orient: vertical;
      }

      .tips_sel {
        padding: 0.106667rem 0.266667rem;
        background-color: var(--ex-two-level-theme-color);
        font-size: 0.32rem;
        color: var(--ex-default-reverse-font-color);
        border-radius: 0.293333rem;
        width: -moz-fit-content;
        width: fit-content;
        margin-top: 0.266667rem;
      }
    }

    .right_btn {
      width: 1.546667rem;
      height: 1.546667rem;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 0.32rem;
      word-wrap: break-word;
      color: var(--ex-default-reverse-font-color);
      flex-shrink: 0;
      position: relative;

      .right_btn-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
      }
    }

    .simulate-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      -o-object-fit: fill;
      object-fit: fill;
    }
  }
}

.mock-dialog {
  width: 380px;
  top: 45%;
}
</style>
