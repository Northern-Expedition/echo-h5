<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <HeaderBar :currentName="currentName" />
    <div class="itemDetailObj" v-html="currentHtml"></div>
    <Nodata v-if="!currentHtml" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

import { publiceNotice } from '@/api/common/index'
import { _t18 } from '@/utils/public'

const currentHtml = ref(null)
const currentName = ref(_t18('activity'))
const getList = async () => {
  try {
    const res = await publiceNotice('REGISTER_WELFARE', 'REGISTER_WELFARE_NOTICE')
    if (res.code === 200) {
      currentHtml.value = res.data[0].noticeContent
      currentName.value = res.data[0].noticeTitle
    }
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped></style>
