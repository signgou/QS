<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
import { onBeforeMount, ref } from "vue";
import { useQnidGetShow } from "@/hook/useQnid";
import {
  QuestionnaireAll,
  oneChoiceP,
  MoreChoice,
  FillIn,
  OPtion,
} from "@/BasicDataStruct/QuestionType";
const route = useRoute();
const router = useRouter();
onBeforeMount(() => {
  async function main() {
    const qnid = route.params.qnid as string;
    const { qts, qnName } = await useQnidGetShow(qnid);
    questionnaireEditor.value = new QuestionnaireAll(
      qnid,
      qnName.value,
      qts.value
    );
    console.log("获取信息成功");
  }
  main()
  .catch((err) => {
    alert(err);
  });
});

function getData(FillIn:FillIn):any[]{
  let res:any[]=[];
  FillIn.answers.forEach(val =>{
    res.push({answer: val});
  })
  return res;
}
// 创建问卷对象
const questionnaireEditor = ref<QuestionnaireAll>(
  new QuestionnaireAll("0", "出错问卷", [])
);
function Back() {
  router.back();
}
</script>


<template>
  <div class="Main-box">
    <div class="content-box">
      <div class="showBody-box">
        <div class="head-box">
          <div style="font-weight: bold;color: #b6b9c2;font-size: 20px;" class="head">数据展示</div>
        </div>
        <div class="trueShow-box">
          <div>
            <div
              v-for="(question, index) in questionnaireEditor?.questionNaire"
              :key="index"
              style="margin-bottom: 30px;"
            >
              <!-- 展示单选题 -->
              <el-table
                :data="question.question"
                style="width: 100% "
                v-if= 'question instanceof oneChoiceP'
              >
                <el-table-column :label='"单选问题:  "+question.tittle' >
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
                <el-table-column :label='"多选问题:  "+question.tittle'>
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
                <el-table-column :label='"填空问题:  "+question.Tittle' >
                  <el-table-column prop="answer" label="填空内容" />
                </el-table-column>
              </el-table>
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

  background-image: url('/back1.jpg');
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
    align-items: center;
    height: 800px;
    width: 1380px;
    .head-box {
      height: 50px;
      width: 1380px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center; 
      margin-bottom: 20px;
    }
    .trueShow-box {
      height: 720px;
      width: 1380px;
      overflow-y: auto; /* 启用垂直滚动条 */
      display: flex;
      flex-direction: column; /* 使内部组件垂直排列 */
      padding: 10px; /* 添加内边距 */

 
  
    }
  }
  .down-box {
    height: 100px;
    width: 100%; /* 使用100%宽度 */
    margin-top: 10px; /* 添加顶部间距 */
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    gap: 20px; /* 按钮之间的间距 */
  }
  .down-btn {
    padding: 10px 20px;
    border: none;
    background-color: #798287;
    color: white;
    font-size: 1em;
    border-radius: 5px;
    cursor: pointer;
  }
  .down-btn:hover {
    background-color: #0056b3;
  }
}

.el-table{
      color:#b6b9c2;
      --el-table-border-color:#798189;
      --el-table-header-text-color:#b6b9c2;
      --el-fill-color-light: #445370;
      --el-table-tr-bg-color:rgba(57, 86, 104,0.5);
      background-color:#f7f4f400;
}
</style>
