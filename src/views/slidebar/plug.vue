<!-- 推广中心 -->
<template>
  <div v-if="NO_SHOW_MEMBER.includes(_getConfig('_APP_ENV'))">
    <div class="content">
      <image-load filePath="plugbg.png" class="img-bg"></image-load>
      <div class="toBack" @click="$router.push('/')">
        <svg-load name="back" class="back"></svg-load>
        <div class="code_box">
          <p class="code1 fw-bold">{{ _t18('plug_invite') }}</p>
          <p class="code2">{{ _t18('plug_toInvite') }}</p>
          <div class="erweima">
            <QRCode :address="sharkCode"></QRCode>
          </div>
          <div class="sharkCode">
            <Copy :data="sharkCode">
              <template #copyMsg>
                <!-- 邀请码 -->
                <p class="ff-num">{{ _t18('plug_shareCode') }}：{{ sharkCode }}</p>
              </template>
            </Copy>
          </div>
          <div class="shareLink">
            <p class="ff-num">{{ _t18('plug_shareLink') }}：</p>
            <Copy :data="`${shareLink}${sharkCode}`">
              <template #copyMsg>
                <!-- 推广链接 -->
                <p class="ff-num link">{{ shareLink }}{{ sharkCode }}</p>
              </template>
            </Copy>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <HeaderBar
      :currentName="_t18('plug')"
      :cuttentRight="cuttentRight"
      :border_bottom="false"
      @showPopup="showPopup"
    ></HeaderBar>
    <!-- 团队信息 -->
    <div class="banner">
      <div class="plug-header">
        <div class="row-header">
          <image-load filePath="icon-janH6C-6.png" class="itemImg" />
          <div>{{ _t18('aams_plug_myShare') }}</div>
        </div>
        <div class="row-body">
          <div>{{ _t18('plug_amount', ['aams']) }}</div>
          <div>{{ teamInfo.sumAmount || 0 }}</div>
        </div>
      </div>
      <div v-if="!['das'].includes(_getConfig('_APP_ENV'))">
        <div class="plug-conter">
          <div class="row-item">
            <div class="row-item-left">
              <div class="line"></div>
              <div class="num">{{ teamInfo.oneCount || 0 }}</div>
              <div>{{ _t18('plug_oneNum', ['aams']) }}</div>
            </div>
            <div class="row-item-right">
              <image-load filePath="team1-fCbGTtzM.png" class="itemImg" />
            </div>
          </div>
          <div class="row-item">
            <div class="row-item-left">
              <div class="line"></div>
              <div class="num">{{ teamInfo.twoCount || 0 }}</div>
              <div>{{ _t18('plug_twoNum', ['aams']) }}</div>
            </div>
            <div class="row-item-right">
              <image-load filePath="team2-7amC4BUM.png" class="itemImg" />
            </div>
          </div>
          <div class="row-item">
            <div class="row-item-left">
              <div class="line"></div>
              <div class="num">{{ teamInfo.threeCount || 0 }}</div>
              <div>{{ _t18('plug_threeNum', ['aams']) }}</div>
            </div>
            <div class="row-item-right">
              <image-load filePath="team3-5UtVm90W.png" class="itemImg" />
            </div>
          </div>
          <div class="row-item">
            <div class="row-item-left">
              <div class="line"></div>
              <div class="num">{{ teamInfo.sumCount || 0 }}</div>
              <div>{{ _t18('plug_sum', ['aams']) }}</div>
            </div>
            <div class="row-item-right">
              <image-load filePath="team4-zdEiH06I.png" class="itemImg" />
            </div>
          </div>
        </div>
        <div class="plug-invite" @click="showInvite = true">{{ _t18('plug_invite') }}</div>
      </div>
    </div>
    <div v-if="!['das'].includes(_getConfig('_APP_ENV'))">
      <!-- 我的推广 -->
      <div class="promotion_my" v-if="!['bitfly'].includes(_getConfig('_APP_ENV'))">
        <div class="title fw-bold">{{ _t18('plug_myShare', ['aams']) }}</div>
        <van-tabs v-model:active="curIndex" @change="changeIndex" shrink>
          <!-- 加载中动画 -->
          <van-tab v-for="(item, index) in tabList">
            <template #title>
              <div class="tab-item" :class="index === curIndex ? 'atv' : ''">{{ item }}</div>
            </template>
            <div class="header">
              <!--用户ID  返佣金额  注册时间 -->
              <p>{{ _t18('plug_userId') }}</p>
              <p>{{ _t18('plug_back') }}</p>
              <p>{{ _t18('plug_registerTime') }}</p>
            </div>

            <van-loading v-if="showLoading" />
            <Nodata v-if="teamList.length <= 0 && !showLoading"></Nodata>
            <div v-else class="contentBox">
              <div class="content" v-for="(item, index) in teamList" :key="index">
                <p class="ff-num">{{ item.fromId || '' }}</p>
                <p class="ff-num">{{ item.sumAmount || 0 }}</p>
                <!-- <p>{{ item.createTime?_timeFormat(item.createTime, 'HH:mm MM/DD', true):'' }}</p> -->
                <p class="ff-num">
                  {{
                    item.createTime
                      ? _timeFormat(item.params?.createTime, 'YY/MM/DD HH:mm', true)
                      : ''
                  }}
                </p>
              </div>
            </div>
          </van-tab>
          <!-- <template #tabContent>
            <div class="header">
              用户ID  返佣金额  注册时间
              <p>{{ _t18('plug_userId') }}</p>
              <p>{{ _t18('plug_back') }}</p>
              <p>{{ _t18('plug_registerTime') }}</p>
            </div>

            <van-loading v-if="showLoading" />
            <Nodata v-if="teamList.length <= 0 && !showLoading"></Nodata>
            <div v-else class="contentBox">
              <div class="content" v-for="(item, index) in teamList" :key="index">
                <p class="ff-num">{{ item.fromId || '' }}</p>
                <p class="ff-num">{{ item.sumAmount || 0 }}</p>
                 <p>{{ item.createTime?_timeFormat(item.createTime, 'HH:mm MM/DD', true):'' }}</p> 
                <p class="ff-num">
                  {{
                    item.createTime
                      ? _timeFormat(item.params?.createTime, 'YY/MM/DD HH:mm', true)
                      : ''
                  }}
                </p>
              </div>
            </div>
          </template> -->
        </van-tabs>
      </div>
    </div>

    <!-- 质押挖矿规则弹窗 -->
    <Popup
      :show="showRule"
      @handelClose="closePopup"
      :title="txt"
      :content="popupContent"
      :direction="direction"
    >
    </Popup>
    <van-popup v-model:show="showInvite" round>
      <div class="popup-invite">
        <div class="invite-header">
          <div class="title">{{ _t18('aams_plug_invite') }}</div>
        </div>
        <div class="contents">
          <div class="sharkCode">
            <Copy :data="sharkCode" :fontSize="'15px'">
              <template #copyMsg>
                <!-- 邀请码 -->
                {{ sharkCode }}
              </template>
            </Copy>
          </div>
          <div class="shareLink">
            <Copy :data="`${shareLink}${sharkCode}`" :fontSize="'15px'">
              <template #copyMsg>
                <!-- 推广链接 -->
                {{ shareLink }}{{ sharkCode }}
              </template>
            </Copy>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { NO_SHOW_MEMBER } from '@/config/index'
import { _t18 } from '@/utils/public'
import HeaderBar from '@/components/HeaderBar/index.vue'
import QRCode from '@/components/common/QRCode/index.vue'
import Copy from '@/components/common/Copy/index.vue'
import Tab from '@/components/Tab/index.vue'
import Popup from '@/components/Popup/index.vue'
import { useUserStore } from '@/store/user/index'
import { getAgentInfo, getAgentList } from '@/api/plug.js'
import { onMounted } from 'vue'
import { rulesList } from '@/api/common/index'

const cuttentRight = reactive({
  iconRight: [{ iconName: 'right-rule', clickTo: '', text: _t18('plug_rule') }]
})
const useStore = useUserStore()
const userInfo = useStore.userInfo
const sharkCode = userInfo?.user?.activeCode
// const shareLink = `${import.meta.env.VITE_APP_PLANFORM_H5}/#/i&`
const shareLink = `${location.origin}/#/i&`
// 推广中心数据
const showLoading = ref(true)
const teamInfo = ref({})
const teamList = ref([])
const popupContent = ref({})
const getTeamInfo = async () => {
  const res = await getAgentInfo()
  if ((res.code = '200')) {
    teamInfo.value = res.data
  }
}
const showInvite = ref(false)
const getTeamList = async () => {
  showLoading.value = true
  const res = await getAgentList({ params: { leve: curIndex.value + 1 } })
  if ((res.code = '200')) {
    setTimeout(() => {
      showLoading.value = false
      teamList.value = res.data
    }, 500)
  }
}
const getPopupContent = async () => {
  const res = await rulesList('PROMOTION_CENTER_EXPLAIN')
  if ((res.code = '200')) {
    popupContent.value = res.data
  }
}
onMounted(() => {
  getTeamInfo()
  getTeamList()
  getPopupContent()
})
// const teamInfo = computed(() => {
//   let obj = {}
//   obj = { one: 10, two: 20, three: 30, sum: '60', amount: 10000000 }
//   return obj
// })
const showRule = ref(false)
const txt = _t18('plug_rule') //规则
const direction = ref('bottom')
let showPopup = () => {
  showRule.value = true
}
let closePopup = () => {
  showRule.value = false
}
const manual = computed(() => {
  let list = []
  list = [
    {
      title: '推广规则',
      content: [
        {
          childContent:
            '如果用户使用了您的邀请码注册，即为您的下级。这个用户再次的邀请用户，即为您的二级下级。 of Stake，即权益证明）机制产生的奖励。在这个机制中，用户将数字资产委托给节点，节点在区块链上行使出块、打包交易等权利并获得奖励。用户根据锁仓数量按比例分享节点获得的奖励。'
        }
      ]
    },
    {
      title: '推广奖励',
      content: [
        {
          childContent:
            '如果用户使用了您的邀请码注册，即为您的下级。这个用户再次的邀请用户，即为您的二级下级。'
        },
        {
          childTitle: '1.下级充值奖励。',
          childContent: '您的下级进行充值，您即可获得他充值金额的1%作为奖励。'
        },
        {
          childTitle: '2.下级挖矿奖励。',
          childContent: '您的下级，如果进行了锁仓挖矿。那么你也可以获得对应的收益。'
        }
      ]
    },
    {
      title: '例：A-B-C-D-E..',
      content: [
        {
          childContent: 'A可以获得B收益的3%'
        },
        {
          childContent: 'A可以获得C收益的2%'
        },
        {
          childContent: 'A可以获得D收益的1%'
        },
        {
          childContent: 'B可以获得C收益的3%'
        },
        {
          childContent: 'B可以获得D收益的2%'
        },
        {
          childContent: 'B可以获得E收益的1%'
        }
      ]
    }
  ]
  return list
})
const curIndex = ref(0)
const tabList = computed(() => {
  let list = []
  // list = ['一代', '二代', '三代']
  list = [_t18('plug_one', ['aams']), _t18('plug_two', ['aams']), _t18('plug_three', ['aams'])]
  return list
})
const changeIndex = (v) => {
  curIndex.value = v
  teamList.value = []
  getTeamList()
}
</script>

<style lang="scss" scoped>
* {
  font-size: 14px;
}
:deep(.content1 p span) {
  color: #fff !important;
}
:deep(.copy) {
  .img {
    margin-left: 20px;
  }
}
:deep(.van-tabs) {
  .van-tabs__wrap {
    padding: 0 0.426667rem;
  }
  .van-tabs__nav {
    padding: 0 0.426667rem;
    display: flex;
    justify-content: space-between;
    border-radius: 0.266667rem;
    padding: 0;
    background: var(--ex-home-tabs-bg-color);
  }
  .van-tab--shrink {
    flex: none;
    padding: 0 var(--van-padding-xs);
  }
  .van-tab--active {
    background: var(--ex-home-tabs-bg-atv-color);
    color: var(--ex-home-tabs-text-atv-color) !important;
    border-radius: 0.266667rem;
  }
  .tab-item {
    padding: 0.24rem 0.533333rem;
    width: 100%;
    font-size: 0.373333rem;
    color: var(--ex-home-tabs-text-color);
  }
  .atv {
    font-size: 0.4rem;
    color: var(--ex-home-tabs-text-atv-color);
  }
  .van-tabs__line {
    display: none;
  }
  .header {
    padding: 0.4rem 0.4rem 0.266667rem;
    display: flex;
    & > p {
      font-size: 0.32rem;
      flex: 1;
      color: var(--ex-passive-font-color);
      text-align: center;
      &:first-child {
        text-align: left;
      }
      &:last-child {
        text-align: right;
      }
    }
  }
}
.popup-invite {
  padding: 0.773333rem 0.373333rem;
  background: #0e1327;
  width: 9.146667rem;
  .invite-header {
    .title {
      text-align: center;
      font-size: 0.48rem;
      font-weight: 600;
      color: var(--ex-input-focus-color);
      margin-bottom: 0.533333rem;
    }
  }
  .contents {
    .sharkCode {
      background: var(--ex-backup--background-color);
      border-radius: 0.213333rem;
      padding: 0.4rem 0.426667rem;
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.533333rem;
    }
    .shareLink {
      background: var(--ex-backup--background-color);
      border-radius: 0.213333rem;
      padding: 0.4rem 0.426667rem;
      line-height: 1.2;
      font-size: 0.32rem;
      word-break: break-all;
    }
  }
}
.content {
  font-size: 0;
  min-height: 100vh;
  position: relative;

  .img-bg {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .toBack {
    position: absolute;
    margin-top: 30px;
    margin-left: 20px;

    .back {
      font-size: 18px;
    }
  }

  .code_box {
    min-width: 300px;
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translate(-50%, 0);
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;

    p.code1 {
      font-size: 18px;
      text-align: center;
    }

    p.code2 {
      font-size: 12px;
      text-align: center;
      color: #b5b5b5;
      margin-top: 10px;
    }

    .erweima {
      padding: 20px 0;

      p {
        margin-top: -25px;
        font-size: 20px;
        text-align: center;
        font-weight: bold;
      }
    }

    .link {
      word-break: break-all;
    }
  }
}

.banner {
  padding: 0.426667rem;
  .plug-header {
    background: var(--ex-default-font-color);
    border-radius: 0.213333rem;
    .row-header {
      display: flex;
      align-items: center;
      background: var(--ex-primary-color);
      padding: 0.4rem 0.373333rem;
      border-radius: 0.213333rem 0.213333rem 0 0;
      .itemImg {
        width: 0.453333rem;
        height: 0.426667rem;
      }
      div {
        margin-left: 0.106667rem;
        font-size: 0.426667rem;
        font-weight: 500;
      }
    }
    .row-body {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.373333rem;
      div {
        font-size: 0.32rem;
        font-weight: 500;
        color: var(--ex-default-background-color);
      }
    }
  }
  .plug-conter {
    display: grid;
    grid-template-columns: 4.426667rem 4.426667rem;
    grid-column-gap: 0.293333rem;
    grid-row-gap: 0.293333rem;
    margin: 0.373333rem 0 0.8rem;
    .row-item {
      display: flex;
      justify-content: space-between;
      border-radius: 0.266667rem;
      border: 0.026667rem solid var(--ex-border-line);
      padding: 0.48rem 0.373333rem;
      &-left {
        width: 2.293333rem;
        .line {
          width: 0.48rem;
          height: 0.053333rem;
          background: var(--ex-text-color);
        }
        .num {
          font-size: 0.426667rem;
          font-weight: 600;
          margin: 0.56rem 0 0.08rem;
          word-break: break-all;
        }
        div {
          &:last-child {
            font-size: 0.32rem;
            font-weight: 500;
            color: var(--ex--home-grid-text-color);
          }
        }
      }
      &-right {
        .itemImg {
          width: 1.173333rem;
          height: 1.173333rem;
        }
      }
    }
  }
  .plug-invite {
    width: 9.146667rem;
    height: 1.44rem;
    line-height: 1.44rem;
    text-align: center;
    background: var(--ex-copy-font-color);
    border-radius: 0.213333rem;
  }
  .plug_bg {
    background: url('../../../public/resource/images/dark/plugbg.png') no-repeat center;
    background-size: cover;
    padding: 45px 15px 20px;

    .shareContent {
      width: 60%;

      .shareContent_title {
        font-size: 20px;
        color: var(--ex-font-color8);
      }

      .shareContent_info {
        font-size: 14px;
        color: var(--ex-font-color8);
        padding: 10px 0 30px;
      }

      .sharkCode,
      .shareLink {
        p {
          line-height: 1.2;
          font-size: 12px;
          word-break: break-all;
          color: var(--ex-font-color8);
          // word-wrap:break-word;
          // word-break:normal;
        }
      }
    }
  }

  .plugbg {
    background: url('../../../public/resource/images/dark/plugbg.png') no-repeat center;
    background-size: cover;
    padding: 45px 15px 20px;

    .shareContent {
      width: 60%;

      .shareContent_title {
        font-size: 20px;
        color: var(--ex-font-color6);
      }

      .shareContent_info {
        font-size: 14px;

        padding: 10px 0 30px;
      }

      .sharkCode,
      .shareLink {
        p {
          line-height: 1.2;
          font-size: 12px;
          word-break: break-all;
          // word-wrap:break-word;
          // word-break:normal;
        }
      }
    }
  }

  img {
    width: 100%;
    height: auto;
  }
}

.promotion_my {
  .title {
    padding: 0 0.4rem 0.533333rem;
    color: var(--ex-font-color6);
    font-weight: bold;
    font-size: 16px;
  }

  .header {
    padding: 15px 15px 10px;
    display: flex;

    & > p:first-child {
      text-align: left;
    }

    & > p:last-child {
      text-align: right;
    }

    p {
      font-size: 12px;
      flex: 1;
      color: var(--ex-passive-font-color);
      text-align: center;
    }
  }

  .contentBox {
    height: 50vh;
    overflow: auto;
  }

  .content {
    padding: 15px 0;
    display: flex;

    & > p:first-child {
      text-align: left;
    }

    & > p:last-child {
      text-align: right;
    }

    p {
      padding: 0 15px;
      font-size: 12px;
      flex: 1;
      text-align: center;
      font-weight: 400;
    }
  }
}

.van-loading {
  text-align: center;
  padding: 30px;
}

:deep(.van-tab) {
  color: var(--ex-home-list-ftcolor) !important;
}

:deep(.van-tab--active) {
  color: var(--ex-home-list-ftcolor3) !important;
}
</style>
