<!-- 首页 -->
<script setup>
import Header from './components/FrontPage/header.vue'
import HeaderDiff from './components/FrontPage/headerDiff.vue'
import Menu from './components/FrontPage/menu.vue'
import Footer from './components/FrontPage/footer.vue'
import { DIFF_HOME_BANNER } from '@/config/index'
import { useMainStore } from '@/store/index.js'
const mainStore = useMainStore()
const showAd = ref(true)
onMounted(() => {
  mainStore.getSettingConfig()
})
</script>

<template>
  <HeaderDiff v-if="DIFF_HOME_BANNER.includes(_getConfig('_APP_ENV'))"></HeaderDiff>
  <Header v-else></Header>
  <Menu></Menu>
  <Footer></Footer>
  <van-dialog
    closeOnClickOverlay
    v-model:show="showAd"
    :showConfirmButton="false"
    class="dialog-ad"
  >
    <div class="popup-box">
      <div class="head">
        <div class="title">在线客服</div>
        <div class="close">
          <img src="resource/svg/dark/guanbi.svg" class="icon closeSvg" @click="showAd = false" />
        </div>
      </div>
      <div class="conn">
        <div>
          请认准Telegram智联科技官方客服，核对Telegram用户名，其他人员请找官方客服人员确认，谨防上当受骗
        </div>
        <div>如需搭建，联系智联科技官方客服：</div>
        <div class="heng">
          <div>
            <span class="customer">@zhilian1919</span>
            -智联科技💰王羲之（包网🔥定制🔥搭建）
          </div>
        </div>
      </div>
    </div>
  </van-dialog>
</template>

<style lang="scss">
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
</style>
