<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import {
  QuestionnaireAll,
  oneChoiceP,
  MoreChoice,
  FillIn,
  OPtion,
} from "@/BasicDataStruct/QuestionType";
import { useRoute, useRouter } from "vue-router";
import { useQnidGetAllProblem } from "@/hook/useQnid";
import { useQidModQt,useQidGetQt } from "@/hook/useQid";
import { useError } from "@/hook/useAlert";

const router = useRouter();
const route = useRoute();

onBeforeMount(() => {
  async function main() {
    const qnid = route.params.qnid as string;
    const { qts, qnName } = await useQnidGetAllProblem(qnid);
    questionnaireEditor.value = new QuestionnaireAll(
      qnid,
      qnName.value,
      qts.value
    );
  }
  main().catch((err) => {
    alert(err);
  });
});

// 创建问卷对象
const questionnaireEditor = ref<QuestionnaireAll>(
  new QuestionnaireAll("0", "出错问卷", [])
);
async function fillEnd() {
    let len = questionnaireEditor.value.questionNaire.length;
    //填写检验
    for(let i=0;i<len;i++){
        let qns=questionnaireEditor.value.questionNaire[i];
        if(qns instanceof oneChoiceP){
            if(qns.whichBeChoose == ''){
              useError(`第${i+1}个单选题没有填写`);
              return;
            }
        }   
        else if(qns instanceof MoreChoice){
            if(qns.whichBeChoose.length == 0){
              useError(`第${i+1}个多选题没有填写`);
              return;
            }
        }
        else if(qns instanceof FillIn){
            if(qns.Answer == ''){
              useError(`第${i+1}个填空题没有填写`);
              return;
            }
        }

    }
    
    for(let i=0;i<len;i++){
        let qns=questionnaireEditor.value.questionNaire[i];
        if(qns instanceof oneChoiceP){
            const {selecteds} = await useQidGetQt(qns.qid,'oneQns');
            selecteds.value[Number(qns.whichBeChoose as string)-1]++;
            await useQidModQt(qns.qid,'oneQns',{
                selecteds:selecteds.value
            })
        }   
        else if(qns instanceof MoreChoice){
            const {selecteds} = await useQidGetQt(qns.qid,'moreQns');   
            qns.whichBeChoose.forEach(val => {
                selecteds.value[Number(val as string)-1]++;
            })
            await useQidModQt(qns.qid,'moreQns',{
                selecteds:selecteds.value
            })
        }
        else if(qns instanceof FillIn){
            await useQidModQt(qns.qid,'fillQns',{
                $push:{ answer : qns.Answer }
            })
        }

    }
    router.push('/fillEnd');
}
</script>


<template>
  <div class="Main-box">
    <div class="content-box">
      <div class="showBody-box">
        <div class="head-box">
          <div class="head">{{ questionnaireEditor.Title }}</div>
        </div>
        <div class="trueShow-box">
          <div>
            <!-- 展示单选题 -->

            <div
              v-for="(question, index) in questionnaireEditor?.questionNaire"
              :key="index"
              style="margin: 5px;"
            >
               <div>
                <el-text>{{ question instanceof oneChoiceP ? question.tittle : "" }}</el-text>
               </div>
              <el-radio-group
                v-model="question.whichBeChoose"
                style="align-items: flex-start"
                class="ml-4 vertical-radio-group"
                v-if="question instanceof oneChoiceP"
              >
                <el-radio
                  v-for="(option, i) in question.returnQuestion()"
                  :key="i"
                  :value="option.value"
                >
                  {{ option.label }}
                </el-radio>
              </el-radio-group>

              <!-- 展示多选题 -->
              <div>
                <el-text>{{ question instanceof MoreChoice ? question.tittle : "" }}</el-text>
               </div>
              <el-checkbox-group
                v-model="question.whichBeChoose"
                style="align-items: flex-start"
                class="ml-4 vertical-checkbox-group"
                v-if="question instanceof MoreChoice"
              >
                <el-checkbox
                  v-for="(option, i) in question.returnQuestion()"
                  :key="i"
                  :value = "option.value"
                >
                  {{ option.label }}
                </el-checkbox>
              </el-checkbox-group>

              <!-- 展示填空题 -->
              <div>
                <el-text>{{ question instanceof FillIn ? question.Tittle : "" }}</el-text>
               </div>
              <el-input
                v-model="question.Answer"
                placeholder="Please input your answer"
                v-if="question instanceof FillIn"
              />
              <el-divider />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="down-box">
      <button class="down-btn" @click="fillEnd">填写完成</button>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.Main-box {
  height: 930px;
  width: 1400px;
  overflow: auto;

  background-image: url('/back7.jpg');
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
      border: 1px solid rgb(4, 2, 21); /* 添加边框 */
      border-radius: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center; 
      margin-bottom: 20px;
      .head{
        color: #3b393a;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
      }
    }
    .trueShow-box {
      border-radius: 15px;
      height: 720px;
      width: 1380px;
      border: 1px solid rgb(4, 2, 21); /* 添加边框 */
      overflow-y: auto; /* 启用垂直滚动条 */
      display: flex;
      flex-direction: column; /* 使内部组件垂直排列 */
      padding: 10px; /* 添加内边距 */
    }
  }
  .down-box {
    border-radius: 15px;
    height: 100px;
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
    background-color: #393738;
    color: white;
    font-size: 1em;
    border-radius: 5px;
    cursor: pointer;
  }
  .down-btn:hover {
    background-color: #0056b3;
  }
}
.vertical-radio-group {
  flex-direction: column;
}
.vertical-checkbox-group {
  display: flex;
  flex-direction: column;
}
</style>