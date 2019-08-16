<template>
  <div class="index-wrap">
    {{data.pageName}}
    <div class="ceshi">
      测试
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { IndexData } from '@/types/views/index.interface'
import User from '@/api/login'
const user = new User()

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
}
</script>

<style lang="scss" scope>
.ceshi {
  width: 200px;
}
</style>
