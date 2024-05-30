<script lang="ts" setup>
import { RouterLink, RouterView } from 'vue-router'
import { ElContainer } from 'element-plus';
import LoginFace from '@/LogInFace/LoginFace.vue';
import ReAccountFace from '@/ReAccountFace/ReAccountFace.vue';
import QuCreateFace from '@/QuCreateFace/QuCreateFace.vue';
import QuSendFace from '@/QuSendFace/QuSendFace.vue';
import DataShow from '@/DataShowFace/DataShow.vue';
import HelloWorld from '@/components/HelloWorld.vue'
import QuestionnaireShowtool from '@/QuFillFace/QuestionnaireShowtool.vue';
import QusetionnaireShow from '@/QuestionnaireShow/QusetionnaireShow.vue';
import UserCenter from '@/UserCenter/UserCenter.vue';
</script>


<template>
  <div class="Main-box">

  <QuCreateFace/>


  </div>

</template>

<style lang='scss' scoped>
.Main-box {
  height: 930px;
  width: 1400px;
  overflow: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: aliceblue;
  border-radius: 15px;
  padding: 10px; /* 添加内边距 */
  
}

</style>