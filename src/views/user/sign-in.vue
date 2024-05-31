<!-- 登录 -->
<template>
  <Header :type="0"></Header>
  <div class="loginMethod">
    <van-tabs v-model:active="active" animated>
      <van-tab v-for="(item, index) in tabList" :key="index">
        <template #title>
          <div :class="['tab-item', active == index ? 'atv' : '']">{{ item.title }}</div>
        </template>
        <component :is="currentComponent"></component>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { _t18 } from '@/utils/public'
import Header from './components/signHeader.vue'
import AccountLogin from './components/sign-in/AccountLogin.vue'
import EmailLogin from './components/sign-in/EmailLogin.vue'
import MobileLogin from './components/sign-in/MobileLogin.vue'
import { useMainStore } from '@/store/index.js'
/**
 * 登录注册方式
 * [{ id: 1, title: '账号登录', type: 1 },{ id: 2, title: '邮箱登录', type: 2 },{ id: 3, title: '手机登录', type: 3 }]
 */
// 登录列表
const mainStore = useMainStore()
const tabList = computed(() => {
  let list = []
  if (mainStore.getLoginMethodList.ordinaryIsOpen || ['aams'].includes(__config._APP_ENV)) {
    let obj = {}
    obj['id'] = 1
    obj['title'] = _t18('login_account', ['bitmake', 'aams'])
    obj['type'] = '1'
    obj['componentName'] = AccountLogin
    list.push(obj)
  }
  if (mainStore.getLoginMethodList.emailIsOpen && !['aams'].includes(__config._APP_ENV)) {
    let obj = {}
    obj['id'] = 2
    obj['title'] = _t18('login_email')
    obj['type'] = '2'
    obj['componentName'] = EmailLogin
    list.push(obj)
  }
  if (mainStore.getLoginMethodList.phoneIsOpen) {
    let obj = {}
    obj['id'] = 3
    obj['title'] = _t18('login_mobile')
    obj['type'] = '3'
    obj['componentName'] = MobileLogin
    list.push(obj)
  }
  if (['coinsexpto'].includes(__config._APP_ENV)) {
    list = list.reverse()
  }
  return list
})
// 切换组件
const currentComponent = computed(() => {
  return tabList.value[active.value].componentName
})
// 初始组件
const active = ref(0)
</script>
<style lang="scss" scoped>
* {
  color: var(--ex-default-font-color);
  font-size: 14px;
}
.loginMethod {
  padding: 0.533333rem 0.426667rem;
  min-height: 100vh;

  :deep(.van-tabs) {
    margin-top: 0.64rem;
    overflow: hidden;

    .van-tabs__nav {
      border-radius: 0.266667rem;
      padding: 0;
      background: #161a33;

      .van-tab--active {
        background: var(--ex-home-tabs-bg-atv-color);
        color: var(--ex-home-tabs-text-atv-color);
        border-radius: 0.266667rem;
      }

      .tab-item.atv {
        font-size: 0.4rem;
        color: var(--ex-home-tabs-text-atv-color);
      }

      .tab-item {
        padding: 0.32rem 0;
        width: 100%;
        font-size: 0.373333rem;
        color: var(--ex-home-tabs-text-color);
      }
    }

    .van-tabs__line {
      width: 0px;
      transform: translateX(84px) translateX(-50%);
      transition-duration: 0.3s;
    }
  }
  :deep(.van-count-down) {
    font-size: 14px;
    color: var(--ex-font-color);
    padding: 0;
  }
}
</style>
