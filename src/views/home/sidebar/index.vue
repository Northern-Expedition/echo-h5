<template>
  <div class="slidebar">
    <UserLogin v-if="isSign"></UserLogin>
    <Navigation></Navigation>
    <!-- 未登录 -->
    <div v-if="!isSign" class="notLogged">
      <div class="btnBox" @click="_toView('/sign-in')">
        <!-- 登录 -->
        <ButtonBar :btnValue="_t18('login')" />
      </div>
      <div class="btnBox" @click="_toView('/sign-up')">
        <!-- 注册 -->
        <ButtonBar :btnReverse="false" :btnValue="_t18('register')" :btnColor="'#fff'" />
      </div>
    </div>
    <!-- 已登录 -->
    <div v-if="isSign && !userInfo.addressFlag" class="logged" @click="exit">
      <image-load filePath="log-out.png" class="loggedImg"></image-load>

      <!-- 退出登录 -->
      <div>{{ _t18('layout', ['aams']) }}</div>
    </div>

    <!-- 退出弹窗 -->
    <!-- 您确定要退出登录吗 -->
    <Dialog
      v-model:value="showDialog"
      :title="``"
      :content="_t18('layout_require')"
      confirm-button-color="#613af1"
      @cancelBtn="cancelBtn"
      @confirmBtn="confirmBtn"
      :confirmButtonText="_t18('btnConfirm', ['bitmake'])"
      :cancelButtonText="_t18('cancel')"
      z-index="200"
    ></Dialog>
  </div>
</template>
<script setup>
import { _back, _t18, _toView, _toReplace } from '@/utils/public'
import ButtonBar from '@/components/common/ButtonBar/index.vue'
import { signOut } from '@/api/user'
import { useUserStore } from '@/store/user/index'
import UserLogin from '../components/Sidebar/userLogin.vue'
import Navigation from '../components/Sidebar/navigation.vue'
import Dialog from '@/components/Dialog/index.vue'
import { useToast } from '@/hook/useToast'
const { _toast } = useToast()

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
// 判断是否登录
const isSign = ref(userStore.isSign)
/**
 * 显示弹窗
 */
const showDialog = ref(false)
// 退出登录
const exit = () => {
  showDialog.value = true
}
const confirmBtn = () => {
  showDialog.value = false
  signOut()
    .then((res) => {
      if (res.code == '200') {
        _toast('layout_success')
        // 清除token
        userStore.signOut()
        _toReplace('/')
        closeSideBar()
        isSign.value = false
        setTimeout(() => location.reload(), 10)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
const cancelBtn = () => {
  showDialog.value = false
}
const emit = defineEmits(['closeSideBar'])
const closeSideBar = () => {
  emit('closeSideBar')
}
</script>
<style lang="scss" scoped>
.slidebar {
  height: 100vh;
  padding-bottom: 100px;
  overflow: auto;
  &:after {
    position: absolute;
    top: 40%;
    content: ' ';
    width: 100%;
    height: 8.24rem;
    background: linear-gradient(39deg, #cb4ee8 0%, #10f4b1 100%);
    opacity: 0.14;
    filter: blur(0.88rem);
  }
}

// 未登录
.notLogged {
  border-top: 1px solid var(--ex-input-boder-bgColor);
  padding: 50px 15px 30px;
  .btnBox {
    margin-bottom: 20px;
  }
}
// 登录
.logged {
  padding: 0.32rem 0.533333rem;
  font-size: 14px;
  display: flex;
  align-items: center;
  .loggedImg {
    width: 20px;
    height: 20px;
    margin-right: 20px;
  }
}
</style>
