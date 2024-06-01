<template>
  <div class="download">
    <div class="laod-header">
      <HeaderBar :currentName="_t18('robinhood2_download_center')" />
      <div class="placeholder"></div>
      <div class="sub-title">ZHILIAN_DARK {{ _t18('digitalTradingPlatform') }}</div>
      <div class="btn-list">
        <image-load
          v-for="item in downLoadList"
          :key="item.path"
          :filePath="item.icon"
          class="img btn-img"
          @click="tohref(item.path)"
        />
      </div>
    </div>
    <div class="load-section">
      <div class="title">
        {{ _t18('The world s first blockchain ecological aggregation product') }}
      </div>
      <div class="item-body">
        <div v-for="(item, index) in sectionData" :key="index" class="row-item">
          <image-load :filePath="item.icon" class="img" />
          <div>{{ item.title }}</div>
        </div>
      </div>
    </div>
    <div class="subtitle">{{ _t18('trusted_partners') }}</div>
    <image-load filePath="footer-2GI7uaLH.png" class="footerImg" />
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'

import { useMainStore } from '@/store'
import { _t18 } from '@/utils/public'

const mainStore = useMainStore()
/**
 * 下载列表
 */
const downLoadList = computed(() => {
  let data = []
  if (mainStore.getDownLoadList.length) {
    data = mainStore.getDownLoadList
      .map((item) => {
        return { icon: `${item.name}.png`, path: item.url, isOpen: item.isOpen }
      })
      .filter((item) => item.isOpen == 'true')
  }
  return data
})
const route = useRoute()
const showFlag = ref(route.query.flag)
const tohref = (url) => {
  window.open(url)
}
const sectionData = [
  { icon: 'd1-Tw_bkQui.png', title: _t18('decentralizedOperation') },
  { icon: 'd2-I5xZRFsV.png', title: _t18('data_trustworthy') },
  { icon: 'd3-m7O5VQpX.png', title: _t18('regulatory_protection') },
  { icon: 'd4-yiMkgLaO.png', title: _t18('diversified_empowerment') }
]
</script>
<style scoped lang="scss">
:deep(.border_bottom) {
  background-color: transparent !important;
}
.download {
  .sub-title {
    color: var(--ex-home-tabs-text-atv-color);
    text-align: center;
    font-size: 40px;
    margin: 80px 0 0;
  }
  .laod-header {
    background-image: url('./banner-SKW8CNTK.png');
    padding-bottom: 30px;
    background-size: cover;
    color: var(--ex-home-tabs-text-atv-color);

    .btn-list {
      padding: 0 20px;
      margin-top: 126px;
      display: flex;
      justify-content: space-between;
      .btn-img {
        width: 142px;
        height: 50px;
      }
    }
  }
  .load-section {
    padding: 0 15px 30px;
    .title {
      text-align: center;
      font-size: 20px;
      color: #fff;
      margin-bottom: 28px;
    }
    .item-body {
      display: grid;
      grid-template-columns: 48% 48%;
      grid-column-gap: 4%;
      grid-row-gap: 4%;
      .row-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 18px 0;
        background: #161a33;
        border-radius: 10px;
        .img {
          width: 40px;
          height: 40px;
        }
        div {
          text-align: center;
          margin-top: 6px;
          font-size: 13px;
        }
      }
    }
  }
  .subtitle {
    font-size: 15px;
    font-weight: 400;
    color: #fff;
    margin: 50px 0 30px;
    text-align: center;
  }
  .footerImg {
    height: 77px;
    object-fit: contain;
    width: 100%;
  }
}
</style>
