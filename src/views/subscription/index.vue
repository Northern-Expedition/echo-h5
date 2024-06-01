<template>
  <div>
    <!-- 申购 -->
    <HeaderBar
      :currentName="_t18(`IEO_subscription`, 'latcoin')"
      :cuttentRight="cuttentRight"
      :border_bottom="true"
    />
    <div class="content">
      <van-tabs v-model:active="active" type="card" class="subscription" @click-tab="clickTab">
        <van-tab v-for="(item, index) in tabList" :key="index" :title="item.title">
          <van-pull-refresh v-model="loading" @refresh="onRefresh">
            <div v-if="dataList.length" class="tabContent">
              <Card v-for="item in dataList" :key="item.id" :data="item" />
            </div>
            <Nodata v-else />
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup>
import { ownCoinList } from '@/api/subscription/index'
import { _t18 } from '@/utils/public'

import Card from './components/Card.vue'
// 下拉刷新
const loading = ref(false)
const onRefresh = () => {
  loading.value = true
  init()
  setTimeout(() => {
    loading.value = false
  }, 500)
}
const status = ref(1)
const init = async () => {
  let res = await ownCoinList(status.value)
  if (res.code == '200') {
    dataList.value = res.data
  }
}
const cuttentRight = {
  iconRight: [
    { iconName: 'sub-record', clickTo: '/subscription/order', text: _t18('pledge_order_record') }
  ]
}
const tabList = [
  { id: 1, title: _t18('Preparation') },
  { id: 2, title: _t18('In_progress') },
  { id: 3, title: _t18('In_over') }
]
const dataList = ref([])
const clickTab = (e) => {
  status.value = e.name + 1
}
watch(
  status,
  (val) => {
    init()
  },
  {
    immediate: true
  }
)
onMounted(() => {
  // init()
})
</script>

<style lang="scss" scoped>
.content {
  padding: 15px 0;
}
.tabContent,
.van-pull-refresh {
  height: calc(100vh - 70px - 30px);
  overflow: auto;
}
:deep(.van-tabs--card > .van-tabs__wrap) {
  height: 35px;
}
:deep(.van-tabs__nav--card) {
  height: 35px;
}
</style>
<style lang="scss">
.subscription.van-tabs {
  .van-tabs__nav--card {
    height: auto;
    border: 0 solid transparent;
    background: #161a33;
  }
  .van-tab {
    padding: 0;
    height: auto;
    background: #161a33;
    color: #7a7a7a;
    border: none;
    // flex-grow: 0;
    padding: 0.24rem 0.533333rem;
    font-size: 0.373333rem;
    &:nth-child(2) {
      flex: 2;
    }
  }

  .van-tab--active {
    background: #252a4d;
    color: white;
    border-radius: 0.266667rem;
  }
}
</style>
