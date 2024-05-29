<!-- 我的投资 -->
<template>
  <div class="columnFlex">
    <HeaderBar :currentName="_t18(`my_invest`)" />
    <div class="subtitle">
      <div></div>
      <div>交易统计</div>
      <div></div>
    </div>
    <div class="invest">
      <!-- 总投入价值 -->
      <div class="item">
        <div>{{ _t18(`sum_bet_value`) }}(USDT)</div>
        <div class="item-value">{{ headerObj.sumAmount }}</div>
      </div>
      <!-- 当日赚取奖励 -->
      <div class="item">
        <div>{{ _t18(`earn_rewards`) }}(USDT)</div>
        <div class="item-value">{{ headerObj.commission }}</div>
      </div>
      <!-- 累计收益 -->
      <div class="item">
        <div>{{ _t18(`Cumulative_income`) }}(USDT)</div>
        <div class="item-value">{{ headerObj.sumEarn }}</div>
      </div>
      <!-- 持仓数量 -->
      <div class="item">
        <div>{{ _t18(`number_of_positions`) }}</div>
        <div class="item-value">{{ headerObj.position }}</div>
      </div>
    </div>
    <!-- 交易记录 -->
    <div class="subtitle">
      <div></div>
      <div>{{ _t18(`transaction_record`) }}</div>
      <div></div>
    </div>
    <div class="recordList">
      <!-- 没有更多数据了 no_more_data 加载中  loading-->
      <van-list
        v-if="list.length > 0 && !isShow"
        v-model:loading="loading"
        :finished="finished"
        :finished-text="_t18(`no_more_data`)"
        :loading-text="_t18(`loading`)"
        @load="onLoad"
      >
        <RecordItem v-for="item in list" :key="item" :itemObj="item"></RecordItem>
      </van-list>
      <Nodata v-if="list.length === 0 && isShow"></Nodata>
    </div>
  </div>
</template>
<script setup>
import HeaderBar from '@/components/HeaderBar/index.vue'
import RecordItem from './components/recordItem.vue'
import { ref, onMounted } from 'vue'
import { investmentList, personalIncome } from '@/api/financial/index'
import { _t18 } from '@/utils/public'
import { _toFixed } from '@/utils/decimal'
const headerObj = ref({})
const list = ref([])
const pageNum = ref(1)
const pageSize = ref(5)
const isShow = ref(false)
const loading = ref(false)
const finished = ref(false)
const total = ref(0)
const onLoad = async () => {
  try {
    const data = await getInvestment()
    list.value = [...list.value, ...data]
    list.value.length === 0 ? (isShow.value = true) : (isShow.value = false)
    if (list.value.length === total.value) {
      finished.value = true
    }
    pageNum.value++
  } catch (error) {
  } finally {
    loading.value = false
  }
}
const allList = async () => {
  try {
    const res = await personalIncome()
    if (res.code === 200) {
      headerObj.value = res.data
    }
  } catch (error) {}
}
const getInvestment = async () => {
  try {
    const res = await investmentList(pageNum.value, pageSize.value)
    if (res.code === 200) {
      total.value = res.total
      return res.rows
    } else {
      finished.value = true
    }
  } catch (error) {}
}
onMounted(() => {
  allList()
  onLoad()
})
</script>
<style lang="scss" scoped>
.columnFlex {
  height: 100vh;
}
.subtitle {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.426667rem 0;
  div {
    &:not(:nth-child(2)) {
      width: 1.84rem;
      height: 0.026667rem;
      background: var(--ex-financial-line-bg-color);
    }
    &:nth-child(2) {
      font-size: 0.4rem;
      font-weight: 400;
      margin: 0 0.133333rem;
    }
  }
}
.invest {
  padding: 0.266667rem 0.4rem;
  display: grid;
  grid-template-columns: 4.373333rem 4.373333rem;
  grid-column-gap: 0.293333rem;
  grid-row-gap: 0.293333rem;
  .item {
    padding: 0.373333rem;
    border-radius: 0.133333rem;
    background: var(--ex-financial-card-bg-color);
    color: var(--ex-passive-font-color);
    display: flex;
    flex-direction: column-reverse;
    font-size: 0.32rem;

    &-value {
      margin-bottom: 0.08rem;
      font-size: 0.426667rem;
      color: var(--ex-default-font-color) !important;
    }
    div {
      color: var(--ex-passive-font-color);
    }
  }
}
.recordList {
  flex: 1;
  overflow: auto;
}
:deep(.van-list__finished-text) {
  height: 79px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: var(--ex-passive-font-color);
}
</style>
