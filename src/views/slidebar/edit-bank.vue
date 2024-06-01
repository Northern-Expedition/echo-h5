<!-- 编辑银行卡 -->
<template>
  <div class="bind-card">
    <!-- 导航条 -->
    <HeaderBar
      :currentName="_t18('Bank_edit')"
      :cuttentRight="cuttentRight"
      :border_bottom="true"
      @del="del"
    />
    <!--内容-->
    <div class="content">
      <div class="form">
        <div class="formInput">
          <p class="label">{{ _t18('advanced_name') }}</p>
          <!-- <input
            :placeholder="_t18('login_please')"
            v-model="formData.userName"
            class="form-input"
          /> -->
          <input v-model="bindUserName" :placeholder="_t18('login_please')" class="form-input" />
        </div>
        <div class="formInput">
          <p
            v-if="
              ['trustwallet', 'coinmarketcap', 'kabit', 'etfinex', 'ebc'].includes(
                _getConfig('_APP_ENV')
              )
            "
            class="label"
          >
            {{ _t18('bank_account') }}
          </p>
          <p v-else class="label">{{ _t18('Bank_card_number') }}</p>
          <input
            v-model="formData.cardNumber"
            :placeholder="_t18('login_please')"
            class="form-input"
          />
        </div>
        <div class="formInput">
          <p
            v-if="
              ['trustwallet', 'coinmarketcap', 'kabit', 'etfinex', 'ebc'].includes(
                _getConfig('_APP_ENV')
              )
            "
            class="label"
          >
            {{ _t18('bank_name') }}
          </p>
          <p v-else class="label">
            {{ _t18('Bank_own') }}
          </p>
          <input
            v-model="formData.bankName"
            :placeholder="_t18('login_please')"
            class="form-input"
          />
        </div>
        <div v-if="formData.bankBranch" class="formInput">
          <p
            v-if="
              ['trustwallet', 'coinmarketcap', 'kabit', 'etfinex', 'ebc'].includes(
                _getConfig('_APP_ENV')
              )
            "
            class="label"
          >
            {{ _t18('branch_namee') }}
          </p>
          <p v-else class="label">{{ _t18('branch_name') }}</p>
          <input
            v-model="formData.bankBranch"
            :placeholder="_t18('login_please')"
            class="form-input"
          />
        </div>
        <!-- HFM2 币种选择-->
        <div v-if="['HFM2', 'dev'].includes(_getConfig('_APP_ENV'))" class="formInput">
          <p class="label">
            {{ _t18('recharge_coin') }}
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
      </div>
      <div class="btnBox" @click="submit">
        <ButtonBar :btnValue="_t18('Bank_save')" />
      </div>
      <van-dialog v-model:show="show" title="" show-cancel-button />
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { showConfirmDialog, showToast } from 'vant'
import { onMounted, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

import { delBindCard, updateBindCard } from '@/api/account'
import { dict } from '@/api/common/index.js'
import ButtonBar from '@/components/common/ButtonBar/index.vue'
import HeaderBar from '@/components/HeaderBar/index.vue'
import { useToast } from '@/hook/useToast'
import { useUserStore } from '@/store/user/index'
import { _t18, _toView } from '@/utils/public'

const { t } = useI18n()
const userStore = useUserStore()
// userStore.getUserInfo()
// 用户信息
const { userInfo } = storeToRefs(userStore)
const { _toast } = useToast()
const Route = useRoute()
const Router = useRouter()
// const formData = reactive({
//   bankAddress: '美国花旗银行',
//   bankBranch: '华盛顿支行',
//   bankName: '储蓄卡',
//   cardNumber: '78910',
//   id: 6,
//   userName: '张三'
// })
const formData = reactive(JSON.parse(decodeURI(Route.query.data)))
const bindUserName = ref(formData.userName || userInfo.value.user?.loginName)
const cuttentRight = {
  iconRight: [{ clickTo: 'del', text: _t18('quote_del') }]
}
const del = () => {
  showConfirmDialog({
    message: t('Bank_delete')
  })
    .then(() => {
      delBindCard(formData.id).then((res) => {
        if (res.code == '200') {
          // showToast('删除成功！')
          _toast('Bank_delete_success')
          setTimeout(() => {
            Router.push('/bind-card')
          }, 500)
        } else {
          showToast(msg)
        }
      })
    })
    .catch(() => {})
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
  getBankCoinList()
})
const submit = () => {
  console.log(formData)
  updateBindCard(formData).then((res) => {
    if (res.code == '200') {
      // showToast('修改成功！')
      _toast('Bank_update_success')
      setTimeout(() => {
        Router.push('/bind-card')
      }, 500)
    } else {
      showToast(msg)
    }
  })
}
</script>
<style lang="scss" scoped>
* {
  font-size: 16px;
  color: var(--ex-default-font-color);
}

.header {
  display: flex;

  .title {
    margin-left: 10px;
  }
}

.content {
  margin-top: 10px;
  padding: 0 15px;

  .tip {
    font-size: 12px;
    color: var(--ex-font-color3);
    margin-bottom: 30px;
  }

  .form {
    padding-top: 5px;

    .formInput {
      margin-top: 20px;

      .label {
        color: #a7afb7;
        font-size: 14px;
        margin: 0 0 10px;

        .scl {
          color: var(--ex-font-color11);
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
          color: var(--ex-font-color5);
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
</style>
