<template>
  <div class="index-wrap">
    {{data.pageName}}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { IndexData } from '@/types/views/index.interface'

@Component({})
export default class About extends Vue {
  // data
  data: IndexData = {
    pageName: 'index'
  }

  created() {
    //
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

<style lang="scss">
  
</style>
