<template>
  <div class="userMess" v-if="userId">
    <!-- vip等级
    <div class="messLeft" v-if="showVip">
      <image-load filePath="defi/组 249.png" class="userMessImg"></image-load>
      <image-load filePath="defi/logo.png" class="userMessImg" name="defi"></image-load>

      <p class="fw-num">v{{ vipClass }}</p>
    </div> -->
    <div class="user">
      <div class="User-user-inf">
        <image-load filePath="defi/logo.png" class="logo" name="defi"></image-load>
        <div class="user-item">
          <div class="user-item-con">
            <p class="userName">{{ loginName }}</p>
          </div>
          <Copy :data="userId">
            <template #copyMsg>
              <div class="rightTop">UID：{{ userId }}</div>
            </template>
          </Copy>
        </div>
      </div>
    </div>
  </div>
  <!-- 钱包地址 -->
  <!-- <div class="copyName" v-if="address">
    <Copy :data="address">
      <template #copyMsg>
        <p>{{ _hideAddress(address) }}</p>
      </template>
    </Copy>
  </div> -->
</template>
<script setup>
import { _t18 } from '@/utils/public'
import Copy from '@/components/common/Copy/index.vue'
import { useUserStore } from '@/store/user/index'
import { useMainStore } from '@/store/index'
import { computed } from 'vue'
import { _hideAddress } from '@/utils/public'
// const vipClass = ref(0) //vip等级
const userStore = useUserStore()
const mainStore = useMainStore()
const userId = computed(() => userStore.userInfo.user?.userId)
const address = computed(() => userStore.userInfo.user?.address)
const loginName = computed(() => {
  // Check if loginName exists
  if (!userStore.userInfo.user?.loginName) return ''

  // Extract the loginName
  let loginName = userStore.userInfo.user.loginName

  // Find the index of '@'
  let atIndex = loginName.indexOf('@')

  // Extract the prefix and domain
  let prefix = loginName.substring(0, atIndex)
  let domain = loginName.substring(atIndex)

  // Mask the prefix if it is longer than 5 characters
  let maskedPrefix = prefix.length > 5 ? prefix.substring(0, 5) + '***' : prefix

  // Return the masked loginName
  return maskedPrefix + domain
})
const userAccount = computed(() => {
  let temp = userStore.userInfo.asset?.filter((item) => {
    return item.symbol == 'usdt' && item.type == 1
  })
  return temp[0]?.availableAmount || 0
})
const showVip = ref(mainStore.getVIPClass?.isOpen)
const vipClass = computed(() => {
  let temp = 0
  let start = ''
  let end = ''
  for (let key in mainStore.getVIPClass) {
    if (userAccount.value > mainStore.getVIPClass[key]) {
      start = key
    }
    if (userAccount.value <= mainStore.getVIPClass[key]) {
      end = key
      break
    }
  }
  if (start.replace('Start', '') === end.replace('End', '')) {
    temp = start.replace('Start', '').replace('vip', '')
  }
  return temp
})
</script>
<style lang="scss" scoped>
:deep(.rightTop) {
  color: rgba(192, 198, 204, 0.7);
}
.userMess {
  padding: 0 0.48rem;
  padding-top: 2.506667rem;
  display: flex;
  align-items: center;
  .user {
    display: flex;
    padding: 0 0.48rem;
    align-items: center;
    .User-user-inf {
      display: flex;
      .logo {
        width: 1.493333rem;
        height: 1.493333rem;
        margin-right: 0.266667rem;
      }
      .user-item {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .user-item-con {
          display: flex;
          align-items: center;
          .userName {
            word-break: break-all;
            font-size: 0.373333rem;
          }
        }
      }
    }
  }
  .userMessImg {
    width: 1.493333rem;
    height: 1.493333rem;
    margin-right: 0.266667rem;
  }
  .messRight {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px 0;
    .rightTop {
      font-size: 16px;
      color: var(--ex-default-font-color);
    }
    .rightBot {
      font-size: 14px;
      color: var(--ex-passive-font-color);
    }
  }
}
.copyName {
  margin: 0 15px;
  background-color: var(--ex-home-sidebar-address-bgcolor);
  font-size: 14px;
  border-radius: 3px;
  padding: 5px 10px;
  color: var(--ex-home-sidebar-address-ftcolor) !important;
}

.vipClass {
  font-size: 14px;
  color: var(--ex-passive-font-color);
  .senLeftImg {
    font-size: 20px;
    // margin-left: 15px;
    // margin-right: 10px;
  }
}
.messLeft {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 18px;
    color: #333;
  }
}
</style>
