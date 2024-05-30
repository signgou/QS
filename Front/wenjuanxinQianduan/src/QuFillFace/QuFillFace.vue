<script lang="ts" setup>
import { ref } from 'vue';
import { QuestionnaireAll, oneChoiceP, MoreChoice, FillIn, OPtion } from '@/BasicDataStruct/QuestionType';
import { useRouter } from 'vue-router';
import { onBeforeMount } from 'vue';
import useQn from '@/hooks/useQn';
const router = useRouter()
import { useQnOperStore } from '@/store/qnOper';
const qnOperStore=useQnOperStore()
import { apiModQt } from '@/apis/modQt';
import { useRoute } from 'vue-router';
const {qnid}=useRoute().params
// 创建问卷对象
const questionnaireEditor = ref<QuestionnaireAll>(new QuestionnaireAll('wentiti', []));

onBeforeMount(()=>{
      async function ttt() {
        const{getAllProblem,getSingleTitle,qt,title}=useQn()
        await getSingleTitle(qnid as string)
        await getAllProblem(qnid as string)
        let pro =  qt.value
        let ti= title.value
          questionnaireEditor.value.changeTittle(ti)
          questionnaireEditor.value.questionNaire=pro
      }
      try{
        ttt()
      }catch(error){
        console.log(error)
      };
      
    })

// let selectedOption=ref<string>('')
function Submit()
{
  router.push({
    name:'Success',
    params:qnid
  })
}

async function confirm(que:oneChoiceP|MoreChoice|FillIn){
  if(que instanceof oneChoiceP){
    let tp:string|undefined = que.whichBeChoose
    let n:number=Number(tp)
    que.question[n-1].selectedNum+=1
    let sub:number[]=[]
    let cnt=0
    que.question.forEach((it:OPtion) => {
      sub[cnt]=it.selectedNum
      cnt+=1
    });
    let param={
      selecteds:sub
    }
    let res=await apiModQt(param,'oneQns',que.qid)
    // console.log(res)
    if(res.code[0]=='0') alert('确认成功')
  }

  else if(que instanceof MoreChoice){
    let tp:string[]=que.whichBeChoose
    tp.forEach(it => {
      que.Question[Number(it)-1].selectedNum+=1
    });
    let sub:number[]=[]
    let cnt=0
    que.Question.forEach((it:OPtion) => {
      sub[cnt]=it.selectedNum
      cnt+=1
    });
    let param={
      selecteds:sub
    }
    let res=await apiModQt(param,'moreQns',que.qid)
    // console.log(res)
    if(res.code[0]=='0') alert('确认成功')
  }

  else if(que instanceof FillIn){
    let tp = que.Answer
    // console.log(que.TmpAns)
    tp.push(que.TmpAns)
    let param={
      answer:tp
    }
    let res=await apiModQt(param,'fillQns',que.qid)
    if(res.code[0]=='0') alert('确认成功')
  }
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
    
    
    <div v-for="(question, index) in questionnaireEditor.questionNaire" :key="index">
      <!-- 展示单选题 -->
      <h3>{{ question instanceof oneChoiceP ? question.tittle : '' }}</h3>
      <el-radio-group v-model="question.whichBeChoose" class="ml-4 vertical-radio-group" v-if="question instanceof oneChoiceP">
        <el-radio v-for="(option, i) in question.returnQuestion()" :key="i" :label="option.value">
          {{ option.label }}
        </el-radio>
        <button @click="confirm(question)">确认答案</button>
      </el-radio-group>
      <hr/>



      <!-- 展示多选题 -->
      <h3>{{ question instanceof MoreChoice ? question.tittle : '' }}</h3>
      <el-checkbox-group v-model="question.whichBeChoose" class="ml-4 vertical-checkbox-group" v-if="question instanceof MoreChoice">
        <el-checkbox v-for="(option, i) in question.returnQuestion()" :key="i" :label="option.value">
          {{ option.label }}
        </el-checkbox>
        <button @click="confirm(question)">确认答案</button>
      </el-checkbox-group>
      <hr/>

      <div v-if="question instanceof FillIn">
        <!-- 展示填空题 -->
        <h3>{{ question instanceof FillIn ? question.Tittle : '' }}</h3>
        <el-input v-model="question.TmpAns" placeholder="Please input your answer" v-if="question instanceof FillIn" />
        <button @click="confirm(question)">确认答案</button>
        <hr/>
      </div>
      
    </div>
  </div>


          
    
         </div>


          <div>
    
  </div>

      </div>
    </div>
    <div class="down-box">
      <button class="down-btn" @click="Submit">提交问卷</button>
    </div>
  </div>

</template>

<style lang='scss' scoped>
/* 定义主容器样式 */
.Main-box {
  height: 930px; /* 设置高度 */
  width: 1400px; /* 设置宽度 */
  overflow: auto; /* 允许内容溢出时滚动 */
  position: absolute; /* 绝对定位 */
  top: 50%; /* 使容器垂直居中 */
  left: 50%; /* 使容器水平居中 */
  transform: translate(-50%, -50%); /* 将容器中心点移至视口中心 */
  background-color: aliceblue; /* 设置背景颜色 */
  background-size: cover; /* 使背景图片覆盖整个容器 */
  background-position: center; /* 使背景图片居中 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
  border-radius: 15px; /* 设置圆角 */
  padding: 10px; /* 添加内边距 */
  display: flex; /* 使用 flex 布局 */
  flex-direction: column; /* 使子元素垂直排列 */
  align-items: center; /* 水平居中对齐子元素 */

  /* 定义内容容器样式 */
  .content-box {
    display: flex; /* 使用 flex 布局 */
    flex-direction: row; /* 使 .showBody-box 和 .side-box 水平排列 */
    align-items: flex-start; /* 子元素上对齐 */
    gap: 10px; /* 添加子元素间距 */
  }

  /* 定义主显示容器样式 */
  .showBody-box {
    height: 800px; /* 设置高度 */
    width: 1390px; /* 设置宽度 */
    border: 1px solid rgb(4, 2, 21); /* 添加边框 */

    /* 定义头部容器样式 */
    .head-box {
      height: 100px; /* 设置高度 */
      width: 1380px; /* 设置宽度 */
      border: 1px solid rgb(4, 2, 21); /* 添加边框 */
    }

    /* 定义内容显示区域样式 */
    .trueShow-box {
      height: 700px; /* 设置高度 */
      width: 1380px; /* 设置宽度 */
      border: 1px solid rgb(4, 2, 21); /* 添加边框 */
      overflow-y: auto; /* 启用垂直滚动条 */
      display: flex; /* 使用 flex 布局 */
      flex-direction: column; /* 使内部组件垂直排列 */
      padding: 10px; /* 添加内边距 */
    }
  }

  /* 定义底部容器样式 */
  .down-box {
    height: 130px; /* 设置高度 */
    width: 100%; /* 使用 100% 宽度 */
    border: 1px solid rgb(4, 2, 21); /* 添加边框 */
    margin-top: 10px; /* 添加顶部间距 */
    display: flex; /* 使用 flex 布局 */
    justify-content: center; /* 子元素水平居中 */
    align-items: center; /* 子元素垂直居中 */
    gap: 20px; /* 添加子元素间距 */
  }

  /* 定义垂直单选按钮组样式 */
  .vertical-radio-group {
    display: flex; /* 使用 flex 布局 */
    flex-direction: column; /* 使子元素垂直排列 */
    align-items: flex-start;
  }

  /* 定义垂直复选框组样式 */
  .vertical-checkbox-group {
    display: flex; /* 使用 flex 布局 */
    flex-direction: column; /* 使子元素垂直排列 */
    align-items: flex-start;
  }
}
</style>
