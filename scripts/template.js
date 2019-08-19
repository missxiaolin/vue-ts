/*
 * @Description: 页面快速生成脚本
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
    {{data.pageName}}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
interface Data {
  pageName: string
}

@Component({})
export default class About extends Vue {
  // data
  data: Data = {
    pageName: '${fileName}'
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

<style lang="scss" scoped>
  
</style>
`

fs.readdir(`${basePath}/views/${dirName}`,function(err, file){
  if (err) {
    fs.mkdirSync(`${basePath}/views/${dirName}`) // mkdir
  }
  process.chdir(`${basePath}/views/${dirName}`) // cd views
  fs.writeFileSync(`${fileName}.vue`, VueTep) // vue 
  process.exit(0)
})