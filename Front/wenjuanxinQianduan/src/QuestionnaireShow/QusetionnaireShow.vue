<script lang="ts" setup>
import { ref } from 'vue';
import { QuestionnaireAll, oneChoiceP, MoreChoice, FillIn, OPtion } from '@/BasicDataStruct/QuestionType';
import { useRouter } from 'vue-router';
const router = useRouter()
// 创建问卷对象
const questionnaireEditor = ref<QuestionnaireAll>(new QuestionnaireAll('wentiti', []));


// 填充问卷数据
questionnaireEditor.value.questionNaire.push(
  new oneChoiceP('你喜欢玩什么游戏', [
    new OPtion('4', '炉石传说-标准模式'),
    new OPtion('1', '炉石传说-狂野模式'),
    new OPtion('2', '炉石传说-竞技场'),
    new OPtion('3', '炉石传说-酒馆战棋')
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

function BackUser()
{
  router.push('/user')
}
</script>


<template>
 <div class="Main-box">
    <div class="content-box">
      <div class="showBody-box">
         <div class="head-box">
            <head>问卷名</head>   <!--这里有点小问题，显示被吞了,后面应该修改为读取问卷体标题-->
         </div>
         <div class="trueShow-box">

   <!--真正的问卷展示部分-->     
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


          
    
         </div>


          <div>
    
  </div>

      </div>
    </div>
    <div class="down-box">
      <button class="down-btn" @click="BackUser">返回</button>
    </div>
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
  background-size: cover; /* 使背景图片覆盖整个容器 */
  background-position: center; /* 使背景图片居中 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
  border-radius: 15px;
  padding: 10px; /* 添加内边距 */
  display: flex;
  flex-direction: column; /* 使子元素垂直排列 */
  align-items: center; /* 水平居中 */

  .content-box {
    display: flex;
    flex-direction: row; /* 使 .showBody-box 和 .side-box 水平排列 */
    align-items: flex-start; /* 上对齐 */
    gap: 10px; /* 添加间距 */
  }

  .showBody-box {
    height: 800px;
    width: 1390px;
    border: 1px solid rgb(4, 2, 21); /* 添加边框 */
    .head-box
    {
        height: 100px;
    width: 1380px;
    border: 1px solid rgb(4, 2, 21); /* 添加边框 */
    }
    .trueShow-box
    {
         height: 700px;
  width: 1380px;
  border: 1px solid rgb(4, 2, 21); /* 添加边框 */
  overflow-y: auto; /* 启用垂直滚动条 */
  display: flex;
  flex-direction: column; /* 使内部组件垂直排列 */
  padding: 10px; /* 添加内边距 */
    }
  }
  .down-box {
    height: 130px;
    width: 100%; /* 使用100%宽度 */
    border: 1px solid rgb(4, 2, 21); /* 添加边框 */
    margin-top: 10px; /* 添加顶部间距 */
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    gap: 20px; /* 按钮之间的间距 */
  }

  .vertical-radio-group
{
  display: flex;
  flex-direction: column;
}
 .vertical-checkbox-group {
  display: flex;
  flex-direction: column;
}

  
}
</style>