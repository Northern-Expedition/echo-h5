<script setup>
import { showToast } from 'vant'
// import Success from './components/success.vue'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { dict } from '@/api/common/index'
import { uploadImg } from '@/api/common/index.js'
import { getLoan, getLoanProductList } from '@/api/loan.js'
import HeaderBar from '@/components/HeaderBar/index.vue'
import { useToast } from '@/hook/useToast'
import { _div, _mul, priceFormat } from '@/utils/decimal.js'
import { _t18, _toView } from '@/utils/public'

const { _toast } = useToast()
const router = useRouter()
const ProductList = ref([])
const amount = ref('')

// 当前选择还款周期
const currentProduct = ref({})
// 当前商品
const productDetail = ref({})
const repaymentCycle = ref([])
const fileList1 = ref([])
const fileList2 = ref([])
const fileList3 = ref([])
const afterRead1 = (file) => {
  file.status = 'uploading'
  // 此时可以自行将文件上传至服务器
  // console.log(file)
  let formData = new FormData()
  formData.append('file', file.file)
  uploadImg(formData).then((res) => {
    res = res.data
    if (res.code == '200') {
      file.res = res.data.url
      file.status = 'success'
    } else {
      showToast(res.msg)
      fileList1.value = []
    }
  })
}
const afterRead2 = (file) => {
  file.status = 'uploading'
  // 此时可以自行将文件上传至服务器
  // console.log(file)
  let formData = new FormData()
  formData.append('file', file.file)
  uploadImg(formData).then((res) => {
    res = res.data
    if (res.code == '200') {
      file.res = res.data.url
      file.status = 'success'
    } else {
      showToast(res.msg)
      fileList2.value = []
    }
  })
}
const afterRead3 = (file) => {
  file.status = 'uploading'
  // 此时可以自行将文件上传至服务器
  // console.log(file)
  let formData = new FormData()
  formData.append('file', file.file)
  uploadImg(formData).then((res) => {
    res = res.data
    if (res.code == '200') {
      file.res = res.data.url
      file.status = 'success'
    } else {
      showToast(res.msg)
      fileList3.value = []
    }
  })
}
//利息
const interest = computed(() => {
  let tempValue = 0
  if (amount.value && productDetail?.value.odds && productDetail?.value.cycleType) {
    tempValue = priceFormat(
      _div(_mul(_mul(amount.value, productDetail.value.odds), productDetail.value.cycleType), 100),
      2,
      'up'
    )
  }

  return tempValue
})
const cuttentRight = {
  iconRight: [{ iconName: 'right-rule', clickTo: '/loan-rule', text: _t18('Loan_statement') }]
}
const showNation = ref(false)
onMounted(async () => {
  await getDict()
  getProductList()
})
const dictList = ref()
const getDict = async () => {
  const res = await dict('t_repay_type')
  if (res.code == '200') {
    dictList.value = res.data
  }
}
/**借贷产品 */
const getProductList = async () => {
  const res = await getLoanProductList()
  if (res.code == '200') {
    ProductList.value = res.rows
    repaymentCycle.value = res.rows.map((elem, index) => {
      return {
        id: index,
        name: elem.cycleType, //周期
        value: elem.id,
        amountMin: elem.amountMin,
        amountMax: elem.amountMax,
        repayTypeLabel: dictList.value?.filter((item) => {
          return parseInt(item.dictValue) == elem.repayType
        })[0].dictLabel
      }
    })
    selectorAction(repaymentCycle.value[0])
  }
}

const selectorAction = (item) => {
  currentProduct.value = item
  productDetail.value = ProductList.value.find((elem) => elem.id == item.value)
  showNation.value = false
}
const submit = () => {
  if (
    amount.value == '' ||
    amount.value > productDetail.value.amountMax ||
    amount.value < productDetail.value.amountMin
  ) {
    // showErr.value = true
    _toast(`loan_amountErr`)
    return
  }
  if (fileList1.value.length == 0) {
    _toast(`loan_idcardFront`)
    return
  }
  if (fileList2.value.length == 0) {
    _toast(`loan_idcardReverse`)
    return
  }
  if (fileList3.value.length == 0) {
    _toast(`loan_hand`)
    return
  }
  const file1 = fileList1.value[0] || {}
  let filePath1 = file1.res
  const file2 = fileList2.value[0] || {}
  let filePath2 = file2.res
  const file3 = fileList3.value[0] || {}
  let filePath3 = file3.res

  getLoan({
    proId: productDetail.value.id,
    cycleType: productDetail.value.cycleType,
    cardUrl: filePath1,
    cardBackUrl: filePath2,
    capitalUrl: filePath3,
    amount: amount.value
  }).then((res) => {
    if (res.code == '200') {
      _toast(`loan_applySuccess`)
      stepsActive.value++
      // setTimeout(() => {
      //   router.push('/loan-record')
      // }, 500)
    } else {
      showToast(res.msg)
    }
  })
}

const showErr = ref(false)
const blur = () => {
  if (
    amount.value > productDetail.value.amountMax ||
    amount.value < productDetail.value.amountMin
  ) {
    showErr.value = true
    // 借贷金额超出可借范围
    _toast(`loan_amountMore`)
    amount.value = ''
  }
}
const stepsActive = ref(0)
</script>
<template>
  <!-- 助力贷 -->
  <HeaderBar :currentName="_t18('asset_loan')" :cuttentRight="cuttentRight" :border_bottom="true" />
  <div class="content">
    <div class="header-step">
      <van-steps
        :active="stepsActive"
        active-color="var(--ex-assets--record-font-color)"
        inactive-color="var(--ex-placeholder-font)"
      >
        <van-step>{{ _t18('fill_in_the_application_form') }}</van-step>
        <van-step>{{ _t18('Upload_data') }}</van-step>
        <van-step>{{ _t18('application_result') }}</van-step>
      </van-steps>
    </div>
    <div v-if="stepsActive === 0" class="loan-apply">
      <div class="top">
        <!-- 经平台审核，您可向平台申请一笔借款！ -->
        <strong class="tip">{{ _t18('loan_msg') }}</strong>
        <!-- 借贷产品 -->
        <div class="type">{{ _t18('loan_product') }} <span></span></div>
        <div class="form">
          <div class="formInput" @click="showNation = true">
            <!-- <input v-model="productDetail.amount" class="form-input" disabled /> -->
            <p>{{ productDetail.amountMin }}-{{ productDetail.amountMax }}</p>
          </div>
        </div>
        <!-- 借款金额 -->
        <div class="type">{{ _t18('loan_amount') }} <span>(USDT)</span></div>
        <div class="form">
          <div class="formInput">
            <!-- 输入贷款金额 -->
            <input
              v-model="amount"
              class="form-input"
              :placeholder="_t18('loan_pleaseInput')"
              @blur="blur"
            />
            <!-- <span v-if="showErr">*金额不符合</span> -->
          </div>
        </div>

        <van-action-sheet
          v-model:show="showNation"
          style="max-width: var(--ex-max-width); left: 50%; translate: -50%"
          ><template #default>
            <ul class="action">
              <li v-for="item in repaymentCycle" :key="item.id" @click="selectorAction(item)">
                <div class="selector">
                  <span>{{ item.amountMin }}-{{ item.amountMax }} USDT</span>
                </div>
              </li>
            </ul>
          </template>
        </van-action-sheet>
        <!-- 还款周期 -->
        <div class="type">{{ _t18('loan_cycle') }}</div>
        <div class="form">
          <div class="formInput">
            <input v-model="productDetail.cycleType" class="form-input" disabled />
          </div>
        </div>
      </div>
      <!-- 借贷信息 -->
      <div class="loan-detail">
        <div class="item">
          <!-- 日利率 -->
          <div class="left">{{ _t18('loan_rateDay') }}</div>
          <div class="right">{{ productDetail.odds }}%</div>
        </div>
        <div class="item">
          <!-- 利息 -->
          <div class="left">{{ _t18('loan_interest') }}</div>
          <div class="right">{{ interest }} USDT</div>
        </div>
        <div class="item">
          <!-- 还款方式 -->
          <div class="left">{{ _t18('loan_repayType') }}</div>
          <!-- 到期一次还本息 -->
          <div class="right adorn">{{ currentProduct.repayTypeLabel || '' }}</div>
        </div>
        <div class="item">
          <!-- 放款机构 -->
          <div class="left">{{ _t18('loan_repayOrg') }}</div>
          <div class="right">{{ productDetail.repayOrg }}</div>
        </div>
      </div>
      <!-- 借贷记录 -->
      <div class="record-info" @click="$router.push('/loan-record')">
        <div class="record-card">
          <image-load filePath="time.png" class="img left-img" />
          <div class="record-right">
            <div>{{ _t18('Debit_and_credit_record') }}</div>
            <image-load filePath="right-arrow.png" class="img right-img" />
          </div>
        </div>
      </div>
      <div class="step-btn">
        <p @click="stepsActive++">{{ _t18('next_step') }}</p>
      </div>
    </div>
    <div v-if="stepsActive === 1" class="bottom">
      <div class="upload">
        <!-- 证件照 请确保证件照清晰可见-->
        <div class="photo">
          {{ _t18('loan_idImg') }} <span class="hui">({{ _t18('loan_idMsg') }})</span>
        </div>
      </div>
      <div class="upload-box">
        <div class="item">
          <!-- 上传正面 -->
          <van-uploader v-model="fileList1" :after-read="afterRead1">
            <image-load filePath="defi/delete.png" name="delete" class="img" />
            <div class="tit">{{ _t18('loan_front') }}</div>
          </van-uploader>
        </div>
        <div class="item">
          <!-- 上传反面 -->
          <van-uploader v-model="fileList2" :after-read="afterRead2">
            <image-load filePath="defi/delete.png" name="delete" class="img" />
            <div class="tit">{{ _t18('loan_reverse') }}</div>
          </van-uploader>
        </div>
        <div class="item">
          <!-- 上传手持证件照 -->
          <van-uploader v-model="fileList3" :after-read="afterRead3">
            <image-load filePath="defi/delete.png" name="delete" class="img" />
            <div class="tit">{{ _t18('loan_hand') }}</div>
          </van-uploader>
        </div>
      </div>
      <!-- 确认上传 -->
      <div class="step-btn" @click="submit">
        <p>{{ _t18('loan_require') }}</p>
      </div>
    </div>
    <div v-if="stepsActive === 2" class="success-info">
      <image-load filePath="defi/success.png" class="img success-img" />
      <div>{{ _t18('Congratulations_on_your_successful_application') }}</div>
      <div>
        {{
          _t18(
            'Your_loan_application_has_been_successful_andthe_platform_will_review_the_successful_loan'
          )
        }}
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
:deep(.van-action-sheet__content) {
  background: var(--ex-default-background-color);
}

.action {
  li {
    color: var(--ex-default-font-color);
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    border-bottom: 1px solid var(--ex-border-color);
  }
}

.content {
  .header-step {
    :deep(.van-steps) {
      background: transparent;
      .van-step--horizontal .van-step__circle-container {
        background: var(--ex-default-background-color);
        border-radius: 50%;
      }
    }
  }
  .loan-apply {
    padding: 0 0.4rem;
  }
  .top {
    .tip {
      display: block;
      font-size: 0.32rem;
      color: var(--ex-copy-font-color);
      margin-bottom: 0.8rem;
    }

    .type {
      font-size: 0.373333rem;
      color: var(--ex-passive-font-color);
      margin-bottom: 0.266667rem;

      span {
        font-size: 14px;
        color: var(--ex-passive-font-color);
      }
    }

    .form {
      .formInput {
        padding: 0 0.266667rem;
        display: flex;
        justify-content: space-between;
        background: var(--ex-financial-card-bg-color);
        border-radius: 0.08rem;
        align-items: center;
        margin-bottom: 0.533333rem;
        P {
          width: 100%;
          height: 1.226667rem;
          font-size: 0.373333rem;
          line-height: 1.226667rem;
          color: var(--ex-default-font-color);
        }

        input {
          flex: 1;
          width: 100%;
          height: 1.226667rem;
          font-size: 0.373333rem;
          background: var(--ex-financial-card-bg-color);
          color: var(--ex-default-font-color);

          &::placeholder {
            color: var(--ex-default-font-color);
            font-size: 14px;
          }
        }

        p {
          width: 100%;
          height: 46px;
          font-size: 14px;
          line-height: 46px;
          color: var(--ex-default-font-color);
        }
      }
    }
  }

  .loan-detail {
    margin-top: 0.533333rem;
    background: var(--ex-financial-card-bg-color);
    padding: 0.426667rem 0.373333rem 0;
    border-radius: 0.16rem;

    .item {
      padding: 0 0 0.426667rem;
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
        text-align: right;
      }
      .adorn {
        color: var(--ex-copy-font-color) !important;
      }
    }
  }
  .record-info {
    margin-top: 0.533333rem;
    .record-card {
      display: flex;
      align-items: center;
      background: var(--ex-assets--record-card-color);
      border-radius: 0.16rem;
      padding: 0.293333rem 0.346667rem;
      .left-img {
        width: 0.426667rem;
        height: 0.426667rem;
      }
      .record-right {
        margin-left: 0.213333rem;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        div {
          font-size: 0.373333rem;
          font-family:
            PingFangSC,
            PingFang SC;
          font-weight: 400;
          color: var(--ex-assets--record-font-color);
        }
        .right-img {
          width: 0.4rem;
          height: 0.266667rem;
        }
      }
    }
  }
  .step-btn {
    margin-top: 0.533333rem;
    padding: 0 0 1.466667rem;
    p {
      text-align: center;
      padding: 0.373333rem 0;
      font-size: 0.426667rem;
      border-radius: 0.213333rem;
      background: var(--ex-primary-color);
      color: var(--ex-default-font-color);
    }
  }
  .bottom {
    padding: 0 0.4rem;

    .upload {
      margin: 0.8rem 0 0.266667rem;

      .photo {
        font-size: 0.373333rem;
        color: var(--ex-default-font-color);
      }

      span {
        font-size: 0.373333rem;
        color: var(--ex-passive-font-color);
      }
    }

    .upload-box {
      .item {
        height: 5.173333rem;
        background: var(--ex-default-background-color);
        border-radius: 0.08rem;
        border: 0.026667rem solid var(--ex-border-color1);
        margin-bottom: 0.266667rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;

        .van-uploader {
          width: 100%;

          :deep(.van-uploader__wrapper) {
            width: 100%;
            height: 100%;
            display: block;

            .van-uploader__input-wrapper {
              display: flex;
              flex-direction: column;
              align-items: center;
            }

            .van-uploader__preview {
              width: 100%;
              height: 100%;
              margin: auto;

              .van-uploader__preview-image {
                width: 100%;
                height: 194px;
              }
            }

            .van-uploader__preview-delete {
              width: 20px;
              height: 20px;

              .van-uploader__preview-delete-icon {
                font-size: 22px;
              }
            }
          }
        }

        .img {
          // width: 100%;
          // height: 100%;
          width: 50px;
          height: 50px;
          min-width: none;
          min-height: none;
          object-fit: contain;
          margin: 50px 0 20px 0;
        }

        .tit {
          box-sizing: border-box;
          width: 100%;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 400;
          color: var(--ex-passive-font-color);
        }
      }
    }

    .btn {
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      background: var(--ex-div-bgColor1);
      border-radius: 3px;
      color: var(--ex-font-color);
      margin: 50px 0;
    }
  }
  .success-info {
    .success-img {
      width: 5.36rem;
      height: 5.146667rem;
      display: block;
      margin: 2.48rem auto 0;
    }
    div {
      &:nth-child(2) {
        font-size: 0.586667rem;
        font-weight: 600;
        color: var(--ex-copy-font-color);
        text-align: center;
        margin: 1.44rem 0 0.266667rem;
      }
      &:last-child {
        text-align: center;
        font-size: 0.373333rem;
        font-weight: 400;
        color: var(--ex-passive-font-color);
      }
    }
  }
}
</style>
