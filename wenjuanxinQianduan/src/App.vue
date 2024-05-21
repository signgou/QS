<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ElContainer } from 'element-plus';
import LoginFace from './LogInFace/LoginFace.vue';
import MainStage from './MainStage/MainStage.vue';
import ReAccountFace from './ReAccountFace/ReAccountFace.vue';
import QuCreateFace from './QuCreateFace/QuCreateFace.vue';
import QuSendFace from './QuSendFace/QuSendFace.vue';
import DataShow from './DataShowFace/DataShow.vue';
import HelloWorld from './components/HelloWorld.vue'
import QusetionnaireShow from './QuestionnaireShow/QusetionnaireShow.vue';
</script>

<template>
     
  <QuCreateFace/>

     

</template>

<style scoped>
   .el-container {
 height: 900px;
 width:1400px;
border: 1px solid black;
  position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);   
       border-radius: 15px; 
}

</style>
