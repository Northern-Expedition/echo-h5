<!-- 充值币种列表 -->
<template>
  <div class="content">
    <div class="list">
      <div v-for="(item, index) in props.data" :key="index" class="listCoin" @click="toClick(item)">
        <div class="left">
          <svg-load :name="item.icon" class="coin" />
          <span>{{ item.title }}</span>
        </div>
        <div class="right"><svg-load name="jiantou" class="jiantou" /></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '@/hook/useToast'
import { _t18 } from '@/utils/public'

const router = useRouter()
const props = defineProps({
  data: {
    type: Array,
    default: []
  }
})
const flag = ref(true)
const toClick = (item) => {
  router.push(`/recharge-apply?type=${item.title}&coin=${item.icon}`)
}
</script>

<style lang="scss" scoped>
* {
  font-size: 14px;
  color: var(--ex-default-font-color);
}

.content {
  padding: 30px 15px 0;

  p {
    font-size: 16px;
    margin-bottom: 20px;
    text-align: left;
  }

  .list {
    .listCoin {
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left,
      .right {
        display: flex;
        align-items: center;

        .coin {
          font-size: 25px;
          margin-right: 15px;
        }

        .jiantou {
          font-size: 10px;
        }
      }
    }
  }
}
</style>
