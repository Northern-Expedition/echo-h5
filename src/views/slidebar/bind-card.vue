<!-- 绑定银行卡 -->
<template>
  <div class="bind-card">
    <!-- 导航条 -->

    <HeaderBar
      :currentName="_t18('sidebar_bank')"
      :cuttentRight="cuttentRight"
      :border_bottom="true"
      :backTo="'/'"
    />
    <!--内容-->
    <van-overlay
      :show="showLoading"
      z-index="100"
      :custom-style="{ background: 'rgba(0, 0, 0, .6)' }"
    >
      <div style="position: fixed; top: 30%; left: 50%; transform: translate(-50%, -50%)">
        <van-loading vertical color="#613af1">{{ _t18('loading') }}...</van-loading>
      </div>
    </van-overlay>
    <div class="content">
      <div v-if="!bindcard">
        <div v-if="bankList.length > 0">
          <BankItem :bankList="bankList" />
        </div>
        <div v-else class="bindcard">
          <img src="@/assets/defi/notbind.png" alt="" />
          <div class="bind-text">{{ _t18('Unbound_bank_card') }}</div>
        </div>

        <div class="btnBox" @click="add">
          <ButtonBar :btnValue="`+ ${_t18('add_bank_card')}`" />
        </div>
      </div>
      <div v-if="bindcard">
        <div
          v-if="
            ['trustwallet', 'coinmarketcap', 'kabit', 'etfinex', 'ebc'].includes(
              _getConfig('_APP_ENV')
            )
          "
          class="form"
        >
          <!-- 收款人姓名 -->
          <div class="formInput">
            <p class="label">
              {{ _t18('payee_name')
              }}<span v-if="showInfo1" class="info">（*{{ _t18('required') }}）</span>
            </p>
            <input
              v-model="formData.userName"
              :placeholder="_t18('login_please')"
              class="form-input"
            />
          </div>
          <!-- 银行名 -->
          <div class="formInput">
            <p class="label">
              {{ _t18('bank_name')
              }}<span v-if="showInfo2" class="info">（*{{ _t18('required') }}）</span>
            </p>
            <input
              v-model="formData.bankName"
              :placeholder="_t18('login_please')"
              class="form-input"
            />
          </div>
          <!-- 账户-->
          <div class="formInput">
            <p class="label">
              {{ _t18('bank_account')
              }}<span v-if="showInfo1" class="info">（*{{ _t18('required') }}）</span>
            </p>
            <input
              v-model="formData.cardNumber"
              :placeholder="_t18('login_please')"
              class="form-input"
            />
          </div>

          <div class="formInput">
            <p class="label">{{ _t18('branch_namee') }}</p>
            <input
              v-model="formData.bankBranch"
              :placeholder="_t18('login_please')"
              class="form-input"
            />
          </div>
          <div class="formInput">
            <p class="label">
              {{ _t18('branch_number') }}
            </p>
            <input
              v-model="formData.bankAddress"
              :placeholder="_t18('login_please')"
              class="form-input"
            />
          </div>
        </div>

        <div v-else class="form">
          <!-- <div class="formInput">
            <p class="label">开户人</p>
            <input placeholder="请输入" v-model="formData.userName" class="form-input" />
          </div> -->
          <div v-if="['gemini2'].includes(_getConfig('_APP_ENV'))" class="formInput">
            <p class="label">
              {{ _t18('advanced_name') }}
            </p>
            <input
              v-model="formData.userName"
              :placeholder="_t18('login_please')"
              class="form-input"
            />
          </div>
          <div class="formInput">
            <p class="label">
              {{ _t18('Bank_card_number', ['gemini2'])
              }}<span v-if="showInfo1" class="info">（*{{ _t18('required') }}）</span>
            </p>
            <input
              v-model="formData.cardNumber"
              :placeholder="_t18('login_please')"
              class="form-input"
            />
          </div>
          <div class="formInput">
            <p class="label">
              {{ _t18('Bank_own')
              }}<span v-if="showInfo2" class="info">（*{{ _t18('required') }}）</span>
            </p>
            <input
              v-model="formData.bankName"
              :placeholder="_t18('login_please')"
              class="form-input"
            />
          </div>

          <!-- HFM2 币种选择-->
          <div v-if="['HFM2', 'dev'].includes(_getConfig('_APP_ENV'))" class="formInput">
            <p class="label">
              {{ _t18('recharge_coin') }}<span class="scl">（{{ _t18('optional') }}）</span>
            </p>
            <van-field
              v-model="formData.coin"
              class="form-input"
              is-link
              readonly
              :placeholder="_t18('recharge_coin')"
              @click="showCoinPicker = true"
            />
            <van-action-sheet
              v-model:show="showCoinPicker"
              :actions="bankCoinList"
              @select="onBankCoinConfirm"
            />
          </div>

          <!--gemini2 去掉选填项 -->
          <div v-if="!['gemini2'].includes(_getConfig('_APP_ENV'))">
            <div class="formInput">
              <p class="label">
                {{ _t18('branch_name') }}<span class="scl">（{{ _t18('optional') }}）</span>
              </p>
              <input
                v-model="formData.bankBranch"
                :placeholder="_t18('login_please')"
                class="form-input"
              />
            </div>
            <div class="formInput">
              <p class="label">
                {{ _t18('bank_address_or_number')
                }}<span class="scl"
                  ><span class="scl">（{{ _t18('optional') }}）</span></span
                >
              </p>
              <input
                v-model="formData.bankAddress"
                :placeholder="_t18('login_please')"
                class="form-input"
              />
            </div>
            <div class="formInput">
              <p class="label">
                {{ _t18('Bank_International_Code')
                }}<span class="scl">（{{ _t18('optional') }}）</span>
              </p>
              <input
                v-model="formData.bankCode"
                :placeholder="_t18('login_please')"
                class="form-input"
              />
            </div>
            <div class="formInput">
              <p class="label">
                {{ _t18('Home_address') }} <span class="scl">（{{ _t18('optional') }}）</span>
              </p>
              <input
                v-model="formData.userAddress"
                :placeholder="_t18('login_please')"
                class="form-input"
              />
            </div>
          </div>
        </div>

        <div class="btnBox" @click="submit">
          <ButtonBar :btnValue="_t18('advanced_submit')" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { showToast } from 'vant'
import { onMounted, reactive, ref } from 'vue'

import { bindCardSubmit, getBindCardList } from '@/api/account.js'
import { dict } from '@/api/common/index.js'
import ButtonBar from '@/components/common/ButtonBar/index.vue'
import HeaderBar from '@/components/HeaderBar/index.vue'
import { useToast } from '@/hook/useToast'
import { _t18, _toView } from '@/utils/public'

import BankItem from './components/bank-item.vue'

const { _toast } = useToast()

const formData = reactive({
  // userName: '',
  cardNumber: '',
  bankName: '',
  bankBranch: '',
  bankAddress: '',
  bankCode: '',
  userAddress: '',
  coin: ''
})
// const bankList = reactive([
//   {
//     bankAddress: '美国花旗银行',
//     bankBranch: '华盛顿支行',
//     bankName: '储蓄卡',
//     cardNumber: '78910',
//     id: 6,
//     userName: '张三'
//   },
//   {
//     bankAddress: '美国花旗银行',
//     bankBranch: '华盛顿支行',
//     bankName: '储蓄卡',
//     cardNumber: '123456',
//     id: 8,
//     userName: '李四'
//   }
// ])
const showLoading = ref(true)
const bankList = ref([])
const showInfo1 = ref(false)
const showInfo2 = ref(false)
const bindcard = ref(false)
const cuttentRight = { iconRight: [{ iconName: 'kefu', clickTo: 'event_serviceChange' }] }
const add = () => {
  bindcard.value = true
}
const getCardList = async () => {
  const res = await getBindCardList()
  if (res.code == '200') {
    if (res.data.length > 0) {
      bindcard.value = false
      bankList.value = res.data
    }
  }
  setTimeout(() => {
    showLoading.value = false
  }, 200)
}

// 币种列表
const bankCoinList = ref([])
const showCoinPicker = ref(false)
const getBankCoinList = () => {
  dict('t_bank_coin').then((res) => {
    if (res.code == '200' && res.data.length) {
      bankCoinList.value = res.data.map((item) => {
        return { ...item, name: item.dictValue.toUpperCase() }
      })
    }
  })
}
//币种选择
const onBankCoinConfirm = (item) => {
  formData.coin = item.name
  showCoinPicker.value = false
}

onMounted(() => {
  getCardList()
  getBankCoinList()
})

const submit = () => {
  let params = formData
  if (formData.cardNumber == '') {
    // showToast('请填写银行卡号')
    _toast('Bank_please_card')
    showInfo1.value = true
    return
  }

  if (!['coinmarketcap'].includes(__config._APP_ENV) && formData.cardNumber.length < 8) {
    _toast('Bank_please_cardNumber')
    return
  } else if (['coinmarketcap'].includes(__config._APP_ENV) && formData.cardNumber.length < 6) {
    _toast('Bank_please_cardNumber')
    return
  }

  if (formData.bankName == '') {
    // showToast('请填写银行名称')
    _toast('Bank_please_cardName')
    showInfo2.value = true
    return
  }
  bindCardSubmit(params).then((res) => {
    if (res.code == '200') {
      // showToast(res.msg)
      _toast('quote_addSuccess')
      getCardList()
      bindcard.value = false
      formData.cardNumber =
        formData.bankName =
        formData.bankBranch =
        formData.bankAddress =
        formData.bankCode =
        formData.userAddress =
        formData.coin =
          ''
    } else {
      showToast(res.msg)
    }
  })
}
</script>
<style lang="scss" scoped>
.content {
  padding: 10px 15px;

  .tip {
    font-size: 12px;
    color: var(--ex-tip-font-color);
    margin-bottom: 30px;
  }

  .form {
    .formInput {
      margin-top: 20px;

      .label {
        color: #a7afb7;
        font-size: 14px;
        margin: 0 0 10px;

        .scl {
          color: var(--ex-font-color19);
          padding-left: 5px;
        }

        .info {
          font-size: 12px;
          color: var(--ex-tip-font-color);
          padding-left: 5px;
        }

        .required {
          color: var(--ex-default-font-color);
          padding-left: 2px;
        }
      }

      input {
        width: 100%;
        height: 46px;
        background: #161a33;
        border-radius: 3px;
        border: 0.026667rem solid rgba(0, 0, 0, 0);
        padding: 0 15px;
        font-size: 14px;

        &::placeholder {
          color: var(--ex-bindcard-input-font-color);
          font-size: 14px;
        }
      }

      :deep(.van-cell) {
        border: 1px solid var(--ex-bindcard-input-border-color);

        &::placeholder {
          color: var(--ex-bindcard-input-font-color);
          font-size: 14px;
        }
      }
    }
  }

  // .btn {
  //   font-size: 14px;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   height: 50px;
  //  background: var(--ex-div-bgColor1)
  //   border-radius: 3px;
  //   color: var(--ex-font-color);
  //   margin: 50px 0;
  // }
  .btnBox {
    margin-top: 50px;
  }
}

.bindcard {
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 120px;
    height: 110px;
    margin: 2.666667rem 0 1.333333rem;
  }

  .bind-text {
    font-size: 14px;
    color: var(--ex-passive-font-color);
    text-align: center;
  }

  .btnBox {
    width: 100%;
    margin-top: 30px;
  }

  // .add {
  //   position: fixed;
  //   bottom: 50px;
  //   width: 92%;
  //   font-size: 14px;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   height: 50px;
  //  background: var(--ex-div-bgColor1)
  //   border-radius: 3px;
  //   color: var(--ex-font-color);
  //   margin: 50px 0;
  // }
}
</style>
