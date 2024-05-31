<!-- 质押挖矿 -->
<script setup>
import { _t18 } from '@/utils/public'
import { getPledgeProductList, getPledgeShowInfo } from '@/api/pledge/index'
import { priceFormat } from '@/utils/decimal.js'
import { useRouter } from 'vue-router'
import Popup from '@/components/Popup/index.vue'
import Card from './components/card.vue'
import { onMounted } from 'vue'
import { rulesList } from '@/api/common/index'
const router = useRouter()

const showRule = ref(false)
const txt = _t18('defi_speak')
const popupContent = ref({})
const direction = ref('bottom')
let showPopup = () => {
  console.log('123123123')
  showRule.value = true
}
let closePopup = () => {
  showRule.value = false
}
const cuttentRight = reactive({
  iconRight: [{ iconName: 'right-rule', clickTo: '', text: _t18('gameplay_description') }]
})
const toView = (data) => {
  router.push({
    path: '/pledge/pledgeDetail',
    query: { data: encodeURI(JSON.stringify(data)) }
  })
}
const showInfo = ref({})
const projectList = ref([])
const getProjectList = async () => {
  const res = await getPledgeProductList()
  if (res.code == '200') {
    projectList.value = res.rows
  }
}
const getShowInfo = async () => {
  const res = await getPledgeShowInfo()
  if (res.code == '200') {
    showInfo.value = res.data
  }
}

/**弹窗内容 */
const getPopupContent = async () => {
  const res = await rulesList('PLEDGE_EXPLAIN')
  if ((res.code = '200')) {
    popupContent.value = res.data
  }
}

onMounted(() => {
  getProjectList()
  getShowInfo()
  getPopupContent()
})
</script>
<template>
  <!-- 质押挖矿规则弹窗 -->
  <Popup
    :show="showRule"
    :direction="direction"
    @handelClose="closePopup"
    :title="txt"
    :content="popupContent"
  >
  </Popup>
  <HeaderBar
    :currentName="_t18('defi_host_lockup')"
    :cuttentRight="cuttentRight"
    @showPopup="showPopup"
  ></HeaderBar>
  <div class="container">
    <div class="title">
      <div class="left">MOONEX</div>
      <div class="middle">Pledge</div>
      <div class="right">Mining</div>
    </div>
    <div class="sub_title">Ultra high yield One click DeFi</div>
    <div class="introduce">
      MOONEX provides comprehensive digital assets A global user ecosystem based on decentralization
      Smart contract technology
    </div>
  </div>
  <!-- 广告图 -->
  <div class="banner">
    <image-load filePath="zhiyabg.png" name="defi"></image-load>
  </div>
  <!-- 质押记录 -->
  <div class="pledge_record" @click="router.push('/pledge/pledgeOrder')">
    <div class="flex">
      <image-load filePath="time.png" name="usdt" class="img time"></image-load>
      <span class="text">{{ _t18('pledge_records') }}</span>
    </div>
    <image-load filePath="right-arrow.png" name="usdt" class="img right-arrow"></image-load>
  </div>
  <!-- 收益信息（资金、收益） -->
  <div class="userAccount">
    <div class="title">
      <span class="line"></span>
      <span class="text">{{ _t18('data_preview') }}</span>
      <span class="line"></span>
    </div>
    <div class="fund">
      <van-grid :column-num="2" style="padding-left: 10px" :border="false">
        <van-grid-item
          style="flex-basis: 50%; padding-right: 10px"
          :style="{ marginTop: index >= 2 ? '10px' : '' }"
        >
          <image-load class="img icon" filePath="pledge_hosting.png" name="defi"></image-load>
          <p class="fw-num">{{ priceFormat(showInfo.amount) || 0 }}</p>
          <div class="til">{{ _t18('pledge_hosting') }}</div>
        </van-grid-item>
        <van-grid-item
          style="flex-basis: 50%; padding-right: 10px"
          :style="{ marginTop: index >= 2 ? '10px' : '' }"
        >
          <image-load class="img icon" filePath="pledge_hosting.png" name="defi"></image-load>
          <p class="fw-num">{{ showInfo.orderNum || 0 }}</p>
          <div class="til">{{ _t18('pledge_commissioned_order') }}</div>
        </van-grid-item>
        <van-grid-item
          style="flex-basis: 50%; padding-right: 10px"
          :style="{ marginTop: index >= 2 ? '10px' : '' }"
        >
          <image-load
            class="img icon"
            filePath="pledge_Today_Earnings.png"
            name="defi"
          ></image-load>
          <p class="fw-num">{{ showInfo.orderNum || 0 }}</p>
          <div class="til">{{ _t18('pledge_Today_Earnings') }}</div>
        </van-grid-item>
        <van-grid-item
          style="flex-basis: 50%; padding-right: 10px"
          :style="{ marginTop: index >= 2 ? '10px' : '' }"
        >
          <image-load class="img icon" filePath="Cumulative_income.png" name="defi"></image-load>
          <p class="fw-num">{{ priceFormat(showInfo.profitMoney) || 0 }}</p>
          <div class="til">{{ _t18('Cumulative_income') }}</div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
  <!-- 项目信息 -->
  <div class="project">
    <div class="title">
      <div class="line"></div>
      <div class="text">{{ _t18('pledge_the_position') }}</div>
      <div class="line"></div>
    </div>
    <div class="projectList" v-if="projectList?.length > 0">
      <Card
        v-for="(item, index) in projectList"
        @click="toView(item)"
        :key="index"
        :index="index + 1"
        :cardData="item"
      ></Card>
    </div>
    <Nodata v-else></Nodata>
  </div>
</template>
<style lang="scss" scoped>
.container {
  .title {
    font-size: 0.826667rem;
    font-weight: 600;
    color: var(--ex-font-color);
    line-height: 1.253333rem;
    display: flex;
    justify-content: center;
    .left {
    }
    .middle {
      margin: 0 0.4rem;
      color: var(--ex-primary-color);
    }

    .right {
    }
  }
  .sub_title {
    font-size: 0.64rem;
    font-weight: 500;
    color: var(--ex-font-color);
    line-height: 0.96rem;
    display: flex;
    justify-content: center;
  }
  .introduce {
    font-size: 0.346667rem;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    color: var(--ex--home-grid-text-color);
    line-height: 0.48rem;
    padding: 0 0.4rem;
    text-align: center;
    margin-top: 0.533333rem;
  }
}
.banner {
  padding: 10px 25px 0;
  img {
    width: 100%;
    height: auto;
  }
}
.pledge_record {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 1.013333rem;
  padding: 0 0.4rem;
  background: rgba(16, 244, 177, 0.13);
  border-radius: 0.16rem;
  .flex {
    display: flex;
    align-items: center;
    .time {
      width: 0.426667rem;
      height: 0.426667rem;
    }
    .text {
      font-size: 0.373333rem;
      font-weight: 400;
      color: #10f4b1;
      margin-left: 0.16rem;
      cursor: pointer;
    }
  }
  .right-arrow {
    width: 0.4rem;
    height: 0.266667rem;
  }
}

.userAccount {
  font-size: 0.373333rem;
  padding: 0 0.4rem;
  color: var(--ex-default-font-color);
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.666667rem 0 0.426667rem;
    .line {
      width: 2.293333rem;
      height: 0.026667rem;
      opacity: 0.19;
      border: 0.026667rem solid #d0dad5;
    }
    .text {
      white-space: nowrap;
      font-size: 0.48rem;
      font-weight: 400;
      margin: 0 0.533333rem;
      color: var(--ex-default-font-color);
    }
  }
  .fund {
    :deep(.van-grid-item__content) {
      border: 0.026667rem solid rgba(255, 255, 255, 0.05);
      border-radius: 0.266667rem;
      align-items: flex-start;
      padding-left: 0.266667rem;
    }
    .icon {
      width: 0.8rem;
      height: 0.8rem;
    }
    .fw-num {
      font-size: 0.426667rem;
      word-break: break-all;
      color: var(--ex-default-font-color);
      margin: 0.533333rem 0 0.16rem;
    }
    .til {
      word-wrap: break-word;
      color: #9493ac;
    }
  }
}

.project {
  padding: 0 15px 50px;
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.666667rem 0 0.426667rem;
    .line {
      width: 2.293333rem;
      height: 0.026667rem;
      opacity: 0.19;
      border: 0.026667rem solid #d0dad5;
    }
    .text {
      white-space: nowrap;
      font-size: 0.48rem;
      font-weight: 400;
      margin: 0 0.533333rem;
      color: var(--ex-default-font-color);
    }
  }
}
</style>
