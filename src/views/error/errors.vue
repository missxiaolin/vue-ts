<template>
  <div class="error-wrap">
    <div class="error-img">
      <img src="https://energymonster.oss-cn-shanghai.aliyuncs.com/upload_img/errors_20190819.png" alt="">
    </div>
    <div class="title">
      系统维护中
    </div>
    <div class="tips">
      小怪兽暂时不可用，马上回来
    </div>
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
    pageName: 'errors'
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
.error-img {
  width: 100%;
  height: auto;
  overflow: hidden;
  margin-top: 100px;
  img {
    width: 100%;
  }
}
.title {
  width: 100%;
  height: 100px;
  text-align: center;
  background:rgba(255,255,255,1);
  font-size: 44px;
  font-weight: 600;
  color:rgba(36,59,60,1);
  line-height: 100px;
}
.tips {
  width: 100%;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-weight: 400;
  color: rgba(36,59,60,1);

}
</style>
