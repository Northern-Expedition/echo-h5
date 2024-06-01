<script setup>
import { _t18 } from '@/utils/public'

let props = defineProps({
  cardData: {
    type: Object
  },
  index: {
    type: Number
  }
})
const dataValue = ref(props.cardData)
</script>
<template>
  <div class="box">
    <div class="top">
      <div class="top_left">
        <div class="top_left_title">
          <div class="left_content">
            <div class="index">
              {{ index >= 10 ? index : '0' + index }}
            </div>
            <div class="title fw-bold">{{ dataValue.title }}</div>
          </div>
          <div class="right_content">{{ _t18('pledge_Buy', ['aams']) }}</div>
        </div>
        <div class="odds">
          <div class="odds_left">
            <p>收益率</p>
            <span class="fw-num rate">{{ dataValue.minOdds }}%~{{ dataValue.maxOdds }}%</span>
          </div>
          <div class="odds_right">
            <svg-load name="usdt" class="icon usdt2" />
            <svg-load name="usdt" class="icon usdt1" />
          </div>
        </div>
      </div>

      <!-- <div class="top_right">{{ _t18('pledge_Buy', ['aams']) }}</div> -->
      <!-- <div class="top_right">
        可购：<span class="ff-num">{{ `${dataValue.kegou}/${dataValue.sum}` }}</span>
      </div> -->
    </div>
    <div class="content">
      <div class="left">
        <div class="content1">
          <!-- 限额 -->
          <p>{{ _t18('pledge_quota') }}</p>
          <span class="fw-num">{{ dataValue.limitMin }}~{{ dataValue.limitMax }}</span>
        </div>
        <div class="content2">
          <!-- 天数 -->
          <p>{{ _t18('pledge_number_days') }}</p>
          <span class="fw-num day">{{ dataValue.days }}</span>
        </div>
        <div class="content3">
          <!-- 可购 -->
          <p>{{ _t18('pledge_available_purchase', ['aams']) }}</p>
          <span v-if="['dev'].includes(_getConfig('_APP_ENV'))" class="fw-num">{{
            `${dataValue.buyPurchase}/${dataValue.timeLimit}`
          }}</span>
          <!-- buyPurchase -->
          <span v-else class="fw-num">{{ `${dataValue.timeLimit}` }}</span>
        </div>
        <div class="content3"></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.box {
  margin-top: 0.533333rem;
  cursor: pointer;
  border-radius: 0.266667rem;
  font-size: 0.373333rem;
  color: var(--ex-passive-font-color);
  background: var(--ex-backup--background-color);
  padding: 0.533333rem 0.373333rem;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 0.026667rem solid rgba(208, 218, 213, 0.19);
    padding-bottom: 0.533333rem;
    &_left {
      width: 100%;
      &_title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left_content {
          display: flex;
          align-items: center;
          .index {
            width: 1.066667rem;
            height: 1.066667rem;
            background: var(--ex-primary-color);
            border-radius: 0.24rem;
            font-size: 0.4rem;
            font-family:
              PingFangSC,
              PingFang SC;
            font-weight: 500;
            color: var(--ex-default-font-color);
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .title {
            font-weight: 700;
            color: var(--ex-default-font-color);
            margin-left: 0.24rem;
          }
        }
        .right_content {
          border-radius: 0.213333rem;
          border: 0.026667rem solid var(--ex-text-color);
          color: var(--ex-font-color);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.24rem 0.693333rem;
          font-size: 0.32rem;
        }
      }
      .odds {
        margin-top: 0.56rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &_left {
          .rate {
            color: var(--ex-two-level-theme-color);
            margin-top: 0.106667rem;
            font-size: 0.453333rem;
          }
        }
        &_right {
          margin-right: 0.4rem;
          .usdt2 {
            width: 0.72rem;
            height: 0.72rem;
          }
          .usdt1 {
            width: 1.013333rem;
            height: 1.013333rem;
            margin-left: -1.466667rem;
          }
        }
      }
    }
  }
  .content {
    display: flex;
    padding: 20px 10px;
    padding-bottom: 0px;
    justify-content: space-between;

    .left {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      & > div {
        flex: 1;
        display: flex;
        align-items: center;
        color: var(--ex-passive-font-color);
        justify-content: space-between;

        font-size: 12px;
        p {
          min-width: 36px;
        }
        span {
          color: var(--ex-default-font-color);
          font-size: 18px;
        }
        .day {
          color: #8885fb;
        }
      }
    }
  }
}
</style>
