<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { FillIn,oneChoiceP,MoreChoice } from '@/BasicDataStruct/QuestionType';
import { onBeforeMount,ref } from 'vue';
const router = useRouter()
import { useQtOperStore } from '@/store/qtOper';
const qtOperStore=useQtOperStore()

function Back(){
  router.go(-1)
}

function getData(FillIn:FillIn):any[]{
  let res:any[]=[];
  FillIn.Answer.forEach(val =>{
    res.push({answer: val});
  })
  return res;
}

let qtList=ref<(oneChoiceP | MoreChoice | FillIn)[]>([])
onBeforeMount(()=>{
  async function ttt() {
    await qtOperStore.getQt()
    qtList.value=qtOperStore.qtt
  }
  ttt();
})

</script>


<template>
 <div class="Main-box">
    <div class="content-box">
      <div class="showBody-box">
         <div class="head-box">
            <head>数据展示</head>
         </div>
         <div class="trueShow-box">
          <div>
            <div
              v-for="(question, index) in qtList"
              :key="index"
            >
              <!-- 展示单选题 -->
              <el-table
                :data="question.question"
                style="width: 100% "
                v-if= 'question instanceof oneChoiceP'
              >
                <el-table-column :label='"单选问卷:"+question.tittle' >
                  <el-table-column prop="label" label="选项名称" />
                  <el-table-column prop="selectedNum" label="已选人数" />
                </el-table-column>
              </el-table>

              <!-- 展示多选题 -->
              <el-table
                :data="question.Question"
                style="width: 100%"
                v-if="question instanceof MoreChoice"
              >
                <el-table-column :label='"多选问卷:"+question.tittle'>
                  <el-table-column prop="label" label="选项名称" />
                  <el-table-column prop="selectedNum" label="已选人数" />
                </el-table-column>
              </el-table>

              <!-- 展示填空题 -->
              <el-table
                :data="getData(question)"
                style="width: 100%"
                v-if="question instanceof FillIn"
              >
                <el-table-column :label='"填空问卷:"+question.Tittle' >
                  <el-table-column prop="answer" label="填空内容" />
                </el-table-column>
              </el-table>
              <el-divider />
            </div>
          </div>

         </div>
      </div>
    </div>
    <div class="down-box">
      <button class="down-btn" @click="Back">返回</button>
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
  .down-btn {
    padding: 10px 20px;
    border: none;
    background-color: #007bff;
    color: white;
    font-size: 1em;
    border-radius: 5px;
    cursor: pointer;
  }
  .down-btn:hover {
    background-color: #0056b3;
  }
  // .down-btn:focus {
  //   background-color: #0056b3;
  // }
}
</style>
