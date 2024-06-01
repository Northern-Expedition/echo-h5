<!-- 高级认证 -->
<script setup>
import { storeToRefs } from 'pinia'
import { showToast } from 'vant'
import { computed, reactive, ref } from 'vue'

import { uploadImg } from '@/api/common/index.js'
import { uploadKYC } from '@/api/user'
import HeaderBar from '@/components/HeaderBar/index.vue'
import { REALNAME } from '@/config'
import { useToast } from '@/hook/useToast'
import { useUserStore } from '@/store/user/index'
import { _t18 } from '@/utils/public'

import { nation } from './components/nation.js'
import Success from './components/success.vue'

const { _toast } = useToast()
const userStore = useUserStore()
userStore.getUserInfo()
/**
 * 多语言国家列表
 */
const nationList = computed(() => {
  return nation.map((elem) => {
    elem.title = `nation_${elem.name}`
    return elem
  })
})
// 用户信息
const { userInfo } = storeToRefs(userStore)

const formData = reactive({
  userName: '',
  number: ''
})
const cuttentRight = { iconRight: [{ iconName: 'kefu', clickTo: 'event_serviceChange' }] }
// 是否高级认证
const advancedAuth = ref(userInfo.value.detail?.auditStatusAdvanced)
const title = ref(_t18('advanced_IdCard'))
const type = ref('1')
const show = ref(false)
const actions = [
  { name: _t18('advanced_IdCard'), type: 1 }, //身份证
  { name: _t18('advanced_paper'), type: 2 }, //护照
  { name: _t18('advanced_driver_license'), type: 3 } //驾驶证
]
const onSelect = (item) => {
  show.value = false
  title.value = item.name
  type.value = item.type
}

/**
 * 当前选中
 */
const nationName = ref('')
/**
 * 显示国家弹窗
 */
const showNation = ref(false)
/**
 * 选择国家
 * @param {*} item
 */
const onSelectNation = (item) => {
  showNation.value = false
  nationName.value = item.title
}
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

/**
 * 提交认证信息
 * 审核状态 0未申请 1通过 3审核中 2拒绝
 */
const submit = () => {
  if (formData.userName == '') {
    // showToast('请填写姓名')
    _toast('advanced_please_name')
    return
  }
  if (!REALNAME.includes(__config._APP_ENV) && formData.number == '') {
    // showToast('请填写证件号码')
    _toast('advanced_please_number')
    return
  }
  if (fileList1.value.length == 0) {
    // showToast('请上传证件正面')
    _toast('loan_idcardFront')
    return
  }
  if (fileList2.value.length == 0) {
    // showToast('请上传证件反面')
    _toast('loan_idcardReverse')
    return
  }
  if (!REALNAME.includes(__config._APP_ENV) && fileList3.value.length == 0) {
    // showToast('请上传手持证件照')
    _toast('please_loan_hand')
    return
  }
  const file1 = fileList1.value[0] || {}
  let filePath1 = file1.res
  const file2 = fileList2.value[0] || {}
  let filePath2 = file2.res
  const file3 = fileList3.value[0] || {}
  let filePath3 = file3.res
  if (REALNAME.includes(__config._APP_ENV)) {
    file3.status = 'success'
  }
  if (file1.status != 'success' || file2.status != 'success' || file3.status != 'success') {
    // showToast('图片上传中,稍后重试')
    _toast('recharge_img_load')
    return
  }

  // realName 姓名 ,idCard 证件号码 ,flag 1 初级 2高级 ,frontUrl 正面照片 ,backUrl 反面照片 ,country 国家 ,handelUrl 手持照片 ,cardType 类型
  let params = `realName=${formData.userName}&idCard=${formData.number}&flag=2&frontUrl=${filePath1}&backUrl=${filePath2}&country=${nationName.value}&handelUrl=${filePath3}&cardType=${type.value}`
  uploadKYC(params).then((res) => {
    if (res.code == '200') {
      // showToast('提交成功，请等待...')
      _toast('please_wait')
      advancedAuth.value = 3
    } else {
      showToast(res.msg)
      advancedAuth.value = 2
    }
  })
}
/**
 * 认证失败 重新认证
 */
const reSubmit = () => {
  advancedAuth.value = '0'
}

/**
 * 初始化
 */
const init = () => {
  if (['aams'].includes(__config._APP_ENV)) {
    nationName.value = 'nation_United States of America'
  } else if (['das'].includes(__config._APP_ENV)) {
    nationName.value = 'nation_Singapore'
  } else {
    nationName.value = 'nation_Japan'
  }
}

onMounted(() => {
  init()
  if (REALNAME.includes(__config._APP_ENV)) {
    formData.userName = userInfo.value.user?.loginName
  }
})
</script>
<template>
  <!-- 导航条 -->
  <HeaderBar
    :currentName="_t18('sidebar_advanced', ['aams'])"
    :cuttentRight="cuttentRight"
    :border_bottom="true"
  />
  <div v-if="advancedAuth == '0' || advancedAuth == null" class="content">
    <div class="tip advanced_txt">
      <image-load filePath="tips.png" class="tips" />{{ _t18('advanced_txt', ['aams']) }}
    </div>
    <div v-if="['coinsexpto'].includes(_getConfig('_APP_ENV'))" class="tip_info">
      {{
        `${_t18('advanced_certification_info_left')}${_getConfig('_APP_META_TITLE')}${_t18(
          'advanced_certification_info_right'
        )}`
      }}
    </div>
    <!-- 姓名 -->
    <!-- 隐藏实名认证姓名输入 -->
    <div v-if="!REALNAME.includes(_getConfig('_APP_ENV'))" class="form">
      <div class="label text-ellipsis2">{{ _t18('advanced_name') }}：</div>
      <div class="formInput">
        <input v-model="formData.userName" :placeholder="_t18('login_please')" class="form-input" />
      </div>
    </div>
    <!-- 身份证 -->
    <div class="label text-ellipsis2">{{ _t18('certificate_type') }}：</div>
    <van-cell
      style="margin-top: 10px; margin-bottom: 15px"
      is-link
      :title="title"
      @click="show = true"
    />
    <van-action-sheet
      v-model:show="show"
      :actions="actions"
      style="max-width: var(--ex-max-width); left: 50%; translate: -50%"
      @select="onSelect"
    />
    <div v-if="!REALNAME.includes(_getConfig('_APP_ENV'))" class="form">
      <div class="label text-ellipsis2">{{ _t18('advanced_license_number') }}：</div>
      <div class="formInput">
        <input
          v-model="formData.number"
          :placeholder="_t18('advanced_please_cardName')"
          class="form-input"
        />
      </div>
    </div>
    <!-- 国家 -->
    <div class="label text-ellipsis2">{{ _t18('nationality') }}：</div>
    <van-cell
      style="margin-top: 10px"
      is-link
      :title="_t18(nationName)"
      @click="showNation = true"
    />
    <van-action-sheet
      v-model:show="showNation"
      :actions="nationList"
      style="max-width: var(--ex-max-width); left: 50%; translate: -50%"
      @select="onSelectNation"
    >
      <template #action="{ action, index }">
        <div :key="index">{{ _t18(action.title) }}</div>
      </template>
    </van-action-sheet>

    <div class="upload">
      <div class="photo">
        <span class="hui"> {{ _t18('advanced_id_photo') }}({{ _t18('advanced_make_sure') }})</span>
      </div>
    </div>
    <div class="upload-box">
      <div class="item">
        <van-uploader v-model="fileList1" :after-read="afterRead1">
          <image-load filePath="defi/delete.png" name="delete" class="img" />
          <div class="tit">{{ _t18('upload_positive') }}</div>
        </van-uploader>
      </div>
      <div class="item">
        <van-uploader v-model="fileList2" :after-read="afterRead2">
          <image-load filePath="defi/delete.png" name="delete" class="img" />
          <div class="tit">{{ _t18('upload_reverse side') }}</div>
        </van-uploader>
      </div>
      <div v-if="!REALNAME.includes(_getConfig('_APP_ENV'))" class="item">
        <van-uploader v-model="fileList3" :after-read="afterRead3">
          <image-load filePath="defi/delete.png" name="delete" class="img" />
          <div v-if="['coinsexpto'].includes(_getConfig('_APP_ENV'))" class="tit">
            {{ _t18('Upload_passport_photo2') }}
          </div>
          <div v-else class="tit">{{ _t18('Upload_passport_photo') }}</div>
        </van-uploader>
      </div>
    </div>
    <div class="btnBox" @click="submit">
      <ButtonBar :btnValue="_t18('advanced_submit')" />
    </div>
  </div>

  <div v-if="advancedAuth == '3'" class="success">
    <Success :text="_t18('under_review')" :imgUrl="'defi/zhong.png'" :color="'#333'" />
  </div>
  <div v-if="advancedAuth == '2'" class="success">
    <Success :text="_t18('Audit_failure')" :imgUrl="'defi/failed.png'" :color="'#333'">
      <template #btn>
        <div class="btnBox" @click="reSubmit">
          <ButtonBar :btnValue="_t18('Resubmit')" />
        </div>
      </template>
    </Success>
  </div>
  <div v-if="advancedAuth == '1'" class="success">
    <Success :text="_t18('advanced_success')" :imgUrl="'defi/success.png'" :color="'#333'" />
  </div>
</template>
<style lang="scss" scoped>
.van-cell {
  height: 46px;
  border-radius: 3px;
  padding: 0 10px;
  font-size: 14px;
  color: var(--ex-select-font-color) !important;
  display: flex;
  align-items: center;
}

.van-cell:after {
  border-bottom: 0px !important;
}
:deep(.van-action-sheet__item, .van-action-sheet__cancel) {
  background-color: #0e1327 !important;
}
.label {
  color: var(--ex-input-label-color2);
  text-align: left;
}
.content {
  padding: 30px 15px 0 15px;
  color: var(--ex-default-font-color);

  .tip {
    font-size: 12px;
    color: #8885fb;
  }
  .tip_info {
    font-size: 12px;
  }
  .advanced_txt {
    font-size: 0.373333rem;
    margin-bottom: 0.64rem;
    text-align: left;
    .tips {
      width: 0.426667rem;
      height: 0.426667rem;
      margin: 0 0.053333rem;
      vertical-align: top;
    }
  }

  .form {
    padding-top: 0.133333rem;
    font-size: 0.373333rem;
    .label {
      color: var(--ex-input-label-color2);
      text-align: left;
    }
    .formInput {
      align-items: center;
      margin: 0.24rem 0 0.64rem;

      input {
        padding: 0 0.373333rem;
        width: 100%;
        height: 1.226667rem;
        font-size: 0.373333rem;
        border-radius: 0.213333rem;
        background: var(--ex-input-background-color);
        border: 0.026667rem solid rgba(0, 0, 0, 0);
        &::placeholder {
          color: var(--ex-input-font-color);
          font-size: 14px;
        }
      }
    }
  }

  .upload {
    margin: 30px 0 10px 0;

    .photo {
      font-size: 14px;
      color: var(--ex-default-font-color);
    }

    span {
      font-size: 14px;
      color: var(--ex-passive-font-color);
    }
  }

  .upload-box {
    .item {
      height: 194px;
      background: var(--ex-default-background-color);
      border-radius: 0.213333rem;
      border: 0.026667rem dashed var(--ex-border-color10);
      margin-bottom: 10px;
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

  .btnBox {
    width: 100%;
    margin: 50px 0;
  }
}

.success {
  margin: 100px 0;
}

:deep(.van-action-sheet__content) {
  button {
    background: var(--ex-select-dialog-background-color);
    color: var(--ex-select-dialog-font-color);
    height: 45px;
    // border: 1px solid var(--ex-select-dialog-boder-color);
  }
}
</style>
