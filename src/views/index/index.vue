<template>
  <div class="index-wrap">
    {{data.pageName}}
    <div class="ceshi" @click="clicked">
      测试
    </div>
    <van-button type="primary">主要按钮</van-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import User from '@/api/login'
const user = new User()

interface IndexData {
  pageName: string
}

@Component({})
export default class About extends Vue {
  // data
  data: IndexData = {
    pageName: 'index'
  }

  created() {
    user.login().then((res: any) => {
      console.log(res)
    })

    console.log(process.env.VUE_APP_WEB_API)
  }
    
  activated() {
    //
  }

  mounted() {
    //
  }

  // 初始化函数
  init() {
    //
  }

  clicked() {
    alert(1)
  }
}
</script>

<style lang="scss" scope>
.ceshi {
  width: 200px;
}
</style>
