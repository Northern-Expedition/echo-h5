<template>
  <div class="assetDetails">
    <div v-for="(item, index) in assetDetails" :key="index">
      <div v-if="item.icon == 'usdt'" class="title">
        <!-- 资产明细 -->
        <div class="left fw-bold">{{ _t18('asset_detail', ['ebc']) }}</div>
      </div>
      <div class="details">
        <div class="top">
          <svg-load v-if="item.title == 'USDT'" :name="item.icon" class="currencyIcon" />
          <image-load v-else :filePath="item.loge" />
          <p class="fw-num">{{ item.title }}</p>
        </div>
        <div class="bottom">
          <div>
            <!-- 可用 -->
            <p class="til">{{ _t18('asset_available') }}</p>
            <p class="num fw-num">
              {{ amountFormat(item.keyong) }}
            </p>
          </div>
          <div>
            <!-- 占用 冻结-->
            <p v-if="['rxce'].includes(_getConfig('_APP_ENV'))" class="til">
              {{ _t18('asset_cold') }}
            </p>
            <p v-else class="til">{{ _t18('asset_occupation', ['bitmake', 'ebc']) }}</p>
            <p class="num fw-num">
              {{ amountFormat(item.zhanyong, 4) }}
            </p>
          </div>
          <div>
            <!-- 折合 -->
            <p class="til">{{ _t18('asset_equivalent', ['bitmake', 'ebc']) }}(USDT)</p>
            <p class="num fw-num">
              {{ amountFormat(item.zhehe) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { priceFormat } from '@/utils/decimal.js'
import { _hide, _numberWithCommas, _t18 } from '@/utils/public.js'

const props = defineProps({
  assetDetails: {
    type: Object
  },
  showNum: {
    type: Boolean
  }
})

/**
 * 金额格式化
 * @param {*} amount
 * @param {*} hide
 * @param {*} decimal
 */
const amountFormat = (amount, decimal = 0) => {
  let tempVal = priceFormat(amount, decimal)
  if (props.showNum) {
    tempVal = _numberWithCommas(tempVal)
  } else {
    tempVal = _hide(tempVal)
  }
  return tempVal
}
</script>

<style lang="scss" scoped>
.assetDetails {
  background: var(--ex-financial-card-bg-color);
  padding: 0.64rem 0.426667rem 2.666667rem;
  flex-grow: 1;
  & > div {
    .title {
      display: flex;
      justify-content: center;
      .left {
        color: var(--ex-font-color6);
        font-size: 16px;
      }
      .yanjin {
        font-size: 16px;
      }
    }
    .details {
      margin-top: 0.426667rem;
      border-radius: 0.213333rem;
      border: 0.026667rem solid var(--ex--backup-background-color-2);
      padding: 0.533333rem 0.48rem;
      .top {
        display: flex;
        align-items: center;
        img {
          border-radius: 100%;
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }
        .currencyIcon {
          font-size: 20px;
          margin-right: 5px;
        }
        P {
          font-size: 14px;
          color: var(--ex-font-color6);
        }
      }
      .bottom {
        display: flex;
        & > div {
          flex: 1;
          text-align: center;
          .til {
            padding: 20px 0;
            color: var(--ex-passive-font-color);
          }
          .num {
            color: var(--ex-font-color6);
            font-size: 14px;
          }
          &:first-child {
            text-align: start;
          }
          &:last-child {
            text-align: end;
          }
        }
      }
    }
  }
}
</style>
