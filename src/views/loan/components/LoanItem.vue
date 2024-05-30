<script setup>
import { _t18 } from '@/utils/public'
import { onMounted } from 'vue'
import { _mul } from '@/utils/decimal'

const props = defineProps({
  dataList: {
    type: Object,
    default: {}
  }
})
const status = computed(() => {
  // 待审核，审核通过，审核失败，已结清，已逾期
  let temp = ''
  if (props.dataList.status == 0) {
    temp = _t18('loan_apply_wait')
  } else if (props.dataList.status == 1) {
    temp = _t18('loan_apply_success')
  } else if (props.dataList.status == 2) {
    temp = _t18('loan_apply_err')
  } else if (props.dataList.status == 3) {
    temp = _t18('loan_apply_complete')
  } else if (props.dataList.status == 4) {
    temp = _t18('loan_apply_overdue')
  }
  return temp
})
onMounted(() => {
  console.log(props.dataList, 'dataListdataListdataList')
})
</script>
<template>
  <div>
    <div class="loan-detail">
      <div class="header-record">
        <image-load filePath="deposit.png" name="deposit" class="left-icon"></image-load>
        <div class="right-status">
          <p class="tips">{{ _t18('borrow_money') }}</p>
          <!-- 状态 审核中 成功 失败 -->
          <p class="right status0" v-if="props.dataList.status == 0">
            {{ _t18('loan_tab_wait') }}
          </p>
          <p class="right status1" v-if="props.dataList.status == 1">
            {{ _t18('loan_apply_success') }}
          </p>
          <p class="right status2" v-if="props.dataList.status == 2">
            {{ _t18('loan_apply_err') }}
          </p>
          <p class="right status3" v-if="props.dataList.status == 3">
            {{ _t18('loan_apply_complete') }}
          </p>
          <p class="right status4" v-if="props.dataList.status == 4">
            {{ _t18('loan_apply_overdue') }}
          </p>
        </div>
      </div>
      <div class="message">
        <div class="item">
          <!-- 借款金额 -->
          <div class="left">{{ _t18('loan_amount') }}</div>
          <div class="right">{{ props.dataList.amount }}</div>
        </div>
        <div class="item">
          <!-- 还款周期 -->
          <div class="left">{{ _t18('loan_cycle') }}</div>
          <div class="right">{{ props.dataList.cycleType }}</div>
        </div>
        <div class="item">
          <!-- 日利率 -->
          <div class="left">{{ _t18('loan_rateDay') }}</div>
          <div class="right">{{ props.dataList.rate }}%</div>
        </div>
        <div class="item">
          <!-- 利息 -->
          <div class="left">{{ _t18('loan_interest') }}</div>
          <div class="right">
            {{ _mul(_mul(_mul(dataList.amount, dataList.rate), dataList.cycleType), 0.01) }}
          </div>
        </div>
        <div class="item">
          <!-- 还款方式 -->
          <div class="left">{{ _t18('loan_repayType') }}</div>
          <div class="right">{{ dataList.repayTypeLabel }}</div>
        </div>
        <div class="item" v-if="!(dataList.status === 0 || dataList.status === 2)">
          <!-- 还款时间 -->
          <div class="left">{{ _t18('loan_time') }}</div>
          <div class="right">
            {{ _timeFormat(dataList.params?.finalRepayTime, 'HH:mm MM/DD', true) }}
          </div>
        </div>
        <div class="item">
          <!-- 借款机构 -->
          <div class="left">{{ _t18('loan_repayOrg') }}</div>
          <div class="right">{{ dataList.tloadProduct?.repayOrg }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.loan-detail {
  background: var(--ex-financial-card-bg-color);
  border-radius: 0.266667rem;
  padding: 0.373333rem 0.373333rem 0.053333rem;
  .header-record {
    display: flex;
    align-items: center;
    padding-bottom: 0.4rem;
    border-bottom: 0.026667rem solid var(--ex-select-border-btmcolor);
    .left-icon {
      width: 0.746667rem;
      height: 0.746667rem;
    }
    .right-status {
      margin-left: 0.16rem;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      p {
        font-size: 0.373333rem;
      }
      .status0 {
        font-size: 0.373333rem;
        color: var(--ex-font-color29);
      }
      .status1 {
        font-size: 0.373333rem;
        color: var(--ex-assets--record-font-color);
      }
      .status2 {
        font-size: 0.373333rem;
        color: var(--ex-font-color30);
      }
      .status3 {
        color: var(--ex-assets--record-card-color);
      }
    }
  }
  .message {
    padding: 0.426667rem 0 0;
    .item {
      margin-bottom: 0.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        font-size: 0.373333rem;
        color: var(--ex-passive-font-color);
      }
      .right {
        font-size: 0.373333rem;
        color: var(--ex-default-font-color);
      }
    }
  }
}
</style>
