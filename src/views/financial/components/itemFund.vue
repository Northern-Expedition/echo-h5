<template>
  <div class="item">
    <div class="top">
      <div class="left">
        <img src="@/assets/financial/coin-JyvGAUty.png" class="img" />
        <div class="info">{{ itemObj.title }}</div>
        <!-- 普通和增值没有 -->
        <div v-if="itemObj.classify !== '0' && itemObj.classify !== '2'" class="vip">
          VIP{{ itemObj.level }}
        </div>
      </div>
      <!-- 立即参投  -->
      <div class="join" @click="$router.push(`/financialDetails/${itemObj.id}`)">
        {{ _t18(`vote_now`) }}
      </div>
    </div>
    <div class="dataList">
      <div class="left">
        <div class="leftTop">
          <div class="tip_left">
            <p>收益率</p>
            <div class="baifenbi">{{ itemObj.avgRate }} %</div>
          </div>
          <img src="@/assets/financial/shangshen.png" class="rightImg" />
        </div>
        <div class="leftBottom">
          <!-- 起投金额 -->
          <div class="centerNum">
            <div>
              <div>{{ _t18(`starting-amount`) }}：</div>
            </div>
            <div class="money">
              {{ itemObj.limitMin }} {{ itemObj.coin ? itemObj.coin.toUpperCase() : '' }}
            </div>
          </div>
          <!-- 限投金额： -->
          <div class="centerNum">
            <div>
              <div>{{ _t18(`Investment_Limit`) }}：</div>
            </div>
            <div class="money">
              {{ itemObj.limitMax }} {{ itemObj.coin ? itemObj.coin.toUpperCase() : '' }}
            </div>
          </div>
          <!-- 锁仓天数： -->
          <div class="centerNum">
            <div>
              <div>{{ _t18(`Lock-up_days`) }}：</div>
            </div>
            <div class="money" style="color: #8885fb">{{ itemObj.days }}</div>
          </div>
        </div>
      </div>
      <!-- <div class="right">
        <img src="@/assets/financial/shangshen.png" alt="" class="rightImg" />
      </div> -->
    </div>
    <div class="line">
      <div class="hight" :style="{ width: `${itemObj.process}%` }"></div>
    </div>
    <div class="footer">
      <!-- 项目进度：   -->
      <div class="footerL">
        <div>{{ _t18(`project_progress`) }}：</div>
        <div class="num fw-num">{{ itemObj.process }}%</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { _t18 } from '@/utils/public'

const props = defineProps({
  itemObj: {
    type: Object,
    default: {}
  }
})
</script>
<style lang="scss" scoped>
.item {
  border-radius: 0.133333rem;
  background: var(--ex-financial-card-bg-color);
  margin-bottom: 0.586667rem;
  padding: 0.533333rem 0.373333rem;
  box-sizing: border-box;

  .top {
    display: flex;
    font-size: 16px;
    color: var(--ex-default-font-color);
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .img {
        width: 0.933333rem;
        height: 0.933333rem;
      }
      .info {
        font-weight: 500;
        font-size: 0.4rem;
        margin: 0 0.16rem 0 0.213333rem;
      }
      .vip {
        padding: 0.053333rem 0.106667rem;
        background: var(--ex-financial-vip-bg-color);
        color: var(--ex-financial-vip-font-bg-color);
        font-size: 0.32rem;
        border-radius: 0.106667rem;
        opacity: 0.5;
      }
    }

    .join {
      margin-left: 0.133333rem;
      padding: 0.213333rem;
      min-width: 2.026667rem;
      background: var(--ex-primary-color);
      border-radius: 0.213333rem;
      color: var(--ex-default-font-color);
      font-size: 0.32rem;
      text-align: center;
    }
  }
  .dataList {
    margin-top: 10px;
    padding-right: 10px;
    position: relative;
    .left {
      .leftTop {
        display: flex;
        justify-content: space-between;
        font-size: 36px;
        color: var(--ex-font-color3);
        align-items: center;
        margin-bottom: 15px;
        padding: 10px;
        border-bottom: 0.026667rem solid var(--ex-border-line);
        .tip_left {
          p {
            font-weight: 500;
            font-size: 0.346667rem;
            color: var(--ex-passive-font-color);
          }
          .baifenbi {
            font-weight: 600;
            font-size: 0.453333rem;
            margin-top: 0.106667rem;
            color: var(--ex-financial-adorn-bg-color);
          }
        }
        .rightImg {
          width: 2.693333rem;
          height: 0.64rem;
          height: 1.333333rem;
        }
      }
      .leftBottom {
        padding: 10px 0;
      }
      .centerNum {
        font-size: 12px;
        color: var(--ex-passive-font-color);
        display: flex;
        align-items: center;
        margin-bottom: 7px;
        justify-content: space-between;
        & > div {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .starImg {
          width: 7px;
          height: 7px;
          margin-right: 5px;
        }
        .money {
          font-size: 0.373333rem;
          color: var(--ex-default-font-color);
        }
      }
    }
  }
  .line {
    margin-top: 5px;
    height: 6px;
    background: #252a4d;
    border-radius: 5px 5px 5px 5px;
    .hight {
      height: 6px;
      background: var(--ex-font-color2);
      border-radius: 5px 5px 5px 5px;
    }
  }
  .footer {
    margin-top: 13px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .footerL {
      display: flex;
      font-size: 14px;
      width: 100%;
      justify-content: space-between;
      color: var(--ex-passive-font-color);
      .num {
        color: var(--ex-default-font-color);
      }
    }
    .footerR {
      padding: 8px 10px;
      background: var(--ex-div-bgColor1);
      border-radius: 3px 3px 3px 3px;
      color: var(--ex-font-color);
      font-size: 12px;
      display: flex;
      align-items: center;
      margin-left: 10px;
    }
  }
}
</style>
