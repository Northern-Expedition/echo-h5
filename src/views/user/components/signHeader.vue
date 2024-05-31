<template>
  <div class="box">
    <div class="menu">
      <div style="display: flex; text-align: center">
        <image-load
          :filePath="currentLanguage.imgUrl"
          class="lang img"
          @click="$router.push('/language-selection')"
        />
        <p style="font-size: 0.373333rem; color: #999; margin-left: 10px">
          {{ currentLanguage.remark }}
        </p>
      </div>

      <van-icon name="cross" @click="$router.push('/')" size="20" />
    </div>
    <div class="top">
      <!-- <p class="left" v-if="props.type != 2">Hi</p> -->
      <!-- 忘记密码 -->
      <p class="left" v-if="props.type == 2">{{ _t18('forget_pwd', ['bitmake']) }}</p>
    </div>
    <div class="bottom">
      <!-- 欢迎登录 -->
      <p v-if="props.type == 0">{{ _t18('login') }}</p>
      <p v-if="props.type == 1">{{ _t18('register') }}</p>
    </div>
  </div>
</template>

<script setup>
import { _t18 } from '@/utils/public'
import { useMainStore } from '@/store/index'
import { computed } from 'vue'
const mainStore = useMainStore()
/**
 * 当前语言实例
 */
const currentLanguage = computed(() => {
  console.log('mainStore.languageList', mainStore.languageList)
  return mainStore.languageList.find((elem) => elem.dictValue == mainStore.language)
})
const props = defineProps({
  type: {
    type: Number
  }
})
</script>

<style lang="scss" scoped>
* {
  font-size: 14px;
  color: var(--ex-default-font-color);
}
.box {
  padding: 0.533333rem 15px 0px;
  .menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .guanbi {
      font-size: 24px;
    }
    .lang {
      width: 24px;
      height: 24px;
    }
  }
  .top {
    padding-top: 30px;
    .right {
      display: flex;
    }
  }
  p {
    font-size: 24px;
    line-height: 1.5;
  }
}
</style>
