<!--功能转移至问卷展示界面，组件留作备用-->

<script lang="ts" setup>
import { ref } from 'vue';
import { QuestionnaireAll, oneChoiceP, MoreChoice, FillIn, OPtion } from '@/BasicDataStruct/QuestionType';

// 创建问卷对象
const questionnaireEditor = ref<QuestionnaireAll>(new QuestionnaireAll('www',[]));

// 填充问卷数据
questionnaireEditor.value.questionNaire.push(
  new oneChoiceP('Single Choice Question', [
    new OPtion('1', 'Option 1'),
    new OPtion('2', 'Option 2'),
    new OPtion('3', 'Option 3')
  ]),
  new MoreChoice('Multiple Choice Question', [
    new OPtion('1', 'Option A'),
    new OPtion('2', 'Option B'),
    new OPtion('3', 'Option C')
  ]),
  new FillIn('Fill in the blank question', ''),
  new FillIn('Fill', ''),
   new MoreChoice('Multiple ', [
    new OPtion('1', 'Option A'),
    new OPtion('2', 'Option B'),
    new OPtion('3', 'Option C'),
    new OPtion('4', 'Option C')
  ]),
);
</script>


<template>
  <div>
    <!-- 展示单选题 -->
    
    <div v-for="(question, index) in questionnaireEditor.questionNaire" :key="index">
      <h3>{{ question instanceof oneChoiceP ? question.tittle : '' }}</h3>
      <el-radio-group v-model="question.whichBeChoose" class="ml-4 vertical-radio-group" v-if="question instanceof oneChoiceP">
        <el-radio v-for="(option, i) in question.returnQuestion()" :key="i" :label="option.value">
          {{ option.label }}
        </el-radio>
      </el-radio-group>
      <hr/>



      <!-- 展示多选题 -->
      <h3>{{ question instanceof MoreChoice ? question.tittle : '' }}</h3>
      <el-checkbox-group v-model="question.whichBeChoose" class="ml-4 vertical-checkbox-group" v-if="question instanceof MoreChoice">
        <el-checkbox v-for="(option, i) in question.returnQuestion()" :key="i" :label="option.value">
          {{ option.label }}
        </el-checkbox>
      </el-checkbox-group>
      <hr/>

      <!-- 展示填空题 -->
      <h3>{{ question instanceof FillIn ? question.Tittle : '' }}</h3>
      <el-input v-model="question.Answer" placeholder="Please input your answer" v-if="question instanceof FillIn" />
      <hr/>
    </div>
  </div>
</template>



<style lang='scss' scoped>
.vertical-radio-group
{
  display: flex;
  flex-direction: column;
}
 .vertical-checkbox-group {
  display: flex;
  flex-direction: column;
}
</style>