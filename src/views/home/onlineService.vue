<template>
  <HeaderBar :currentName="_t18(`home_service`)" />
  <div v-if="list.length > 0" class="onlineService">
    <div v-for="(item, index) in list" :key="index" class="item" @click="linkTo(item.url)">
      <image-load :filePath="item.imgUrl" alt="" class="itemImg" />
      <div class="right"><svg-load name="jiantou" class="jiantou" /></div>
    </div>
  </div>
  <Nodata v-if="list.length === 0 && isShow" />
</template>
<script setup>
import { onMounted, ref } from 'vue'

import { getCustomerService } from '@/api/common/index'
import HeaderBar from '@/components/HeaderBar/index.vue'
import { useMainStore } from '@/store/index.js'
import { _t18 } from '@/utils/public'

const mainStroe = useMainStore()
const list = ref([])
const isShow = ref(false)
const linkTo = (link) => {
  location.href = link
}
onMounted(async () => {
  list.value = mainStroe.getCustomerServiceList || []
  list.value.length === 0 ? (isShow.value = true) : (isShow.value = false)
})
</script>
<style lang="scss" scoped>
.onlineService {
  padding: 5px 15px 0;
  .item {
    display: flex;
    justify-content: space-between;
    .itemImg {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      margin: 10px 0;
      object-fit: cover;
    }
    .right {
      display: flex;
      align-items: center;
      .jiantou {
        font-size: 10px;
      }
    }
  }
}
</style>
