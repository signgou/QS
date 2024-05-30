<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MainStage from './MainStage/MainStage.vue';
import QuCreateFace from './QuCreateFace/QuCreateFace.vue';
import UserCenter from './UserCenter/UserCenter.vue';
import QuestionnaireShowtool from './QuFillFace/QuestionnaireShowtool.vue';
import FillinQuestion from './router/QusetionAndNaire/FillinQuestion.vue';
</script>

<template>
  <!-- <UserCenter/> -->
  <!-- <QuestionnaireShowtool/> -->
  <RouterView></RouterView>
  <!-- <QuCreateFace/> -->

</template>

<style scoped>
</style>
