<template>
  <div :class="DIFF_HOME_BANNER.includes(_getConfig('_APP_ENV')) ? 'main mainEbc' : 'main'"></div>
  <div class="notice">
    <div class="itemNo">
      <svg-load name="mengbanzu12" class="noticeImg"></svg-load>
      <van-notice-bar class="currentNotice" :text="currentNotice" />
    </div>
  </div>
  <div class="grid">
    <van-grid :border="false" :column-num="4">
      <van-grid-item
        v-for="(item, index) in menuList"
        :key="index"
        class="grid-item"
        @click="routeLink(item.linkUrl, item.flag)"
      >
        <image-load :filePath="item.imgUrl" :name="item.img" class="grid-item-img" />
        <p class="grid-text">
          {{ _t18(`${item.key}`, ['robinhood2']) }}
        </p>
      </van-grid-item>
    </van-grid>
  </div>
  <div class="quick-trade">
    <div class="quick-trade-item" @click="toRecharge">
      <svg-load name="mengbanzu13" class="img quick-trade-item-img"></svg-load>

      <span class="quick-trade-item-span">{{
        _t18(`home_recharge`, ['latcoin', 'aams', 'robinhood2'])
      }}</span>
    </div>
    <div class="quick-trade-item" @click="$router.push('/withdraw')">
      <svg-load name="zu29" class="img quick-trade-item-img"></svg-load>

      <span class="quick-trade-item-span">{{
        _t18(`quick_withdrawal`, ['latcoin', 'aams', 'robinhood2'])
      }}</span>
    </div>
  </div>
</template>
<script setup>
import { DIFF_RECHARGE_COSTORM, DIFF_HOME_BANNER } from '@/config/index'
import { publiceNotice } from '@/api/common/index'
import { onMounted, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMainStore } from '@/store/index.js'
import { useUserStore } from '@/store/user/index'
import { getInfo } from '@/api/info.js'
import { noticeList } from '@/api/common/index'
import { _t18, _toView } from '@/utils/public'
import InfoPopup from '@/views/home/components/InfoPopup.vue'
import { dispatchCustomEvent } from '@/utils'

const mainStroe = useMainStore()
const userStore = useUserStore()
const tokenStatus = ref(userStore.isSign)
const $router = useRouter()
// DeFi挖矿 质押挖矿 助力货 闪兑 下载中心 推广中心 秒合约 理财 申购 直播 福利活动
const menuList = computed(() => {
  let tempData = mainStroe.getJinGangList.filter((item) => {
    return item.isOpen == true
  })
  return tempData
})
const currentNotice = ref('')
const routeLink = (link) => {
  if (link === 'live' && showNoticeContent.value) {
    // showNotice.value=true
    getOpenPopupContent()
  } else if (link === '/trade') {
    mainStroe.setTradeStatus(Number(0))
    $router.push(link)
  } else if (link.includes('http')) {
    location.href = link
  } else {
    $router.push(link)
  }
}
const showInfoPopup = ref(false)
const closeBtn = () => {
  showInfoPopup.value = false
}
const infoData = ref([])
/**
 * 用户信息改变监听回调事件
 * @param {*} e
 */
const event_userInfoChange = (e) => {
  getInfoList()
}

const getInfoList = async () => {
  if (tokenStatus.value) {
    let res = await getInfo()
    if (res.code == '200' && res.rows.length > 0) {
      console.log(res.rows)
      infoData.value = res.rows
      showInfoPopup.value = true
    }
  }

  // getInfo().then((res) => {
  //   if (res.code == 200) {
  //     infoData.value = res.rows
  //     showInfoPopup.value = true
  //   }
  // })
}
getInfoList()
/**直播弹窗内容 */
const showNotice = ref(false)
const showNoticeContent = ref({})
const getOpenPopupContent = async () => {
  const res = await publiceNotice('POP_UPS_NOTICE', 'DEFI_POP_UPS_NOTICE')
  if ((res.code = '200')) {
    if (res.data.length) {
      showNotice.value = true
      showNoticeContent.value = res.data[0]
    }
  }
}
onMounted(async () => {
  try {
    const res = await noticeList('ROLL_NOTICE')
    if (res.code === 200) {
      if (res.data.length > 0 && res.data[0].status == '0')
        currentNotice.value = res.data[0].noticeContent
    }
  } catch (error) {}
  document.addEventListener('event_userInfoChange', event_userInfoChange)
  // getInfoList()
})

onUnmounted(() => {
  document.removeEventListener('event_userInfoChange', event_userInfoChange)
})
/**
 * 点击快捷充币
 */
const toRecharge = () => {
  if (DIFF_RECHARGE_COSTORM.includes(__config._APP_ENV)) {
    if (tokenStatus.value) {
      dispatchCustomEvent('event_serviceChange')
    } else {
      _toView('/sign-in')
    }
  } else {
    _toView('/recharge')
  }
}
</script>
<style lang="scss" scoped>
.main {
  // padding: 180px 0px 0;
  margin-top: .426667rem;
  padding-top: 13.243px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.mainEbc {
  padding-top: 0;
}

.notice {
  padding: 0 0.426667rem;
  .itemNo {
    display: flex;
    padding: 0.053333rem 0.426667rem;
    align-items: center;
    background: var(--ex-home-notice-bgcolor);
    border-radius: 0.32rem;

    .noticeImg {
      width: 20px;
      height: 20px;
    }

    :deep(.van-notice-bar) {
      height: 35px;
      padding: 0 15px 0 10px;
    }

    .currentNotice {
      flex: 1;
      border-radius: 20px 20px 20px 20px;
      font-size: 14px;
      color: var(--ex-home-notice-color);
      background: var(--ex-home-notice-bgcolor);
    }
  }
}
.grid {
  margin-top: 0.5rem;
  &-item {
    :deep(.van-grid-item__content) {
      padding-bottom: 0.426667rem;
      padding-top: 0;
      justify-content: flex-start;
    }
    &-img {
      width: 1.44rem;
      height: 1.44rem;
      margin-bottom: 0.266667rem;
    }
    .grid-text {
      text-align: center;
      font-size: 0.373333rem;
      word-break: break-word;
      color: var(--ex--home-grid-text-color);
    }
  }
}
.quick-trade {
  padding: 0 0.426667rem;
  margin-top: 0.213333rem;
  margin-bottom: 0.513333rem;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  &-item {
    position: relative;
    width: 4.453333rem;
    background: var(--ex--home-grid-bg);
    border-radius: 0.266667rem;
    display: flex;
    align-items: center;
    padding: 0.373333rem;
    &-img {
      width: 1.28rem;
      height: 1.333333rem;
      margin-right: 0.266667rem;
    }
    img {
      object-fit: contain;
    }
    &-span {
      translate: none;
      rotate: none;
      scale: none;
      opacity: 1;
      transform: translate(0px, 0px);
      color: var(--ex--home-grid-text-color);
      font-size: 0.4rem;
    }
    &-img2 {
      translate: none;
      rotate: none;
      scale: none;
      opacity: 1;
      transform: translate(0px, 0px);
      width: 0.586667rem;
      height: 0.586667rem;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}

.showNoticeContent {
  min-width: 300px;
  text-align: center;
  .showNoticeContent_title {
    font-size: 18px;
    padding: 15px 0;
    border-bottom: 1px solid #e1e1e1;
  }
  .showNoticeContent_content {
    padding: 20px 15px 30px;
    max-height: 400px;
  }
}
</style>
