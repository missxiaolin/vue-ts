/*
 * @Description: 组件快速生成脚本
 * @Date: 2019-08-16 10:26:23
 * @auth xiaolin
 */

const fs = require('fs')
const path = require('path')
const basePath = path.resolve(__dirname, '../src')

const dirName = process.argv[2]
const fileName = process.argv[3]

const capPirName = dirName.substring(0, 1).toUpperCase() + dirName.substring(1)
if (!dirName || !fileName) {
  console.log('文件夹名称文件名称不能为空！')
  console.log('示例：npm run com ${capPirName} ${fileName}')
  process.exit(0)
}

/**
 * @msg: vue页面模版
 */
const VueTep = `<template>
  <div class="${dirName}-wrap">
    {{data.componentName}}
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator"
  interface Data {
    componentName: string
  }

  @Component({})
  export default class About extends Vue {
    // prop
    @Prop({
      required: false,
      default: ''
    }) name!: string

    // data
    data: Data = {
      componentName: '${fileName}'
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

  }
</script>

<style lang="scss">
  @import "@/assets/scss/variables";

  .${dirName}-wrap {
    width: 100%;
  }
</style>

`


fs.readdir(`${basePath}/components/${dirName}`,function(err, file){
  if (err) {
    fs.mkdirSync(`${basePath}/components/${dirName}`) // mkdir
  }
  process.chdir(`${basePath}/components/${dirName}`) // cd views
  fs.writeFileSync(`${fileName}.vue`, VueTep) // vue 
  process.exit(0)
})