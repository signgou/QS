<!--用户中心-->
<script lang="ts" setup>
import { FillIn, MoreChoice, OPtion, QuestionnaireAll, oneChoiceP } from '@/BasicDataStruct/QuestionType';
import { Users } from '@/BasicDataStruct/users';
import QusetionnaireShow from '@/QuestionnaireShow/QusetionnaireShow.vue';
import { VueElement, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useUerInfoStore } from '@/store/userInfo';
const userInfoStore=useUerInfoStore()
import { apiQnCreate } from '@/apis/qnCreate';
import Questionnaire from '@/router/QusetionAndNaire/Questionnaire.vue';
import { onMounted,onBeforeMount} from "vue";

const router = useRouter()
let QnName=ref('')
let dialogVisible=ref(false)

function Create(){
  dialogVisible.value=true  
}

function ReturnLogin(){
  router.push('/')
}

function QusetShow()
{
  router.push('/QuestShow')
}

function DataShow()
{
  router.push('/Data')
}

function Edit()
{
  router.push('/create')
}

function Send()
{
  router.push('/QuestShare')
}


let exampleQuestionnaires = ref<QuestionnaireAll[]>([]);

onBeforeMount(()=>{
  // let uid = userInfoStore.uid
  // userInfoStore.qn.forEach((it:string)=>{
  //   exampleQuestionnaires.value.push(new QuestionnaireAll(userInfoStore.getSingleTitle(it),userInfoStore.getAllProblem(it)))
  // })
  exampleQuestionnaires.value=[]
  let inde:string[]=userInfoStore.qn
  let{getSingleTitle,getAllProblem}=userInfoStore
  inde.forEach(qnid => {
    exampleQuestionnaires.value.push(new QuestionnaireAll(getSingleTitle(qnid),getAllProblem(qnid)))

    //test
    
  });
})

// 创建示例用户对象
const user = ref<Users>(
  new Users(userInfoStore.uid, userInfoStore.id, exampleQuestionnaires.value)
);


function ChooseAndShow()
{
  router.push('/QuestShow')
}

function Quit()
{
  dialogVisible.value=false
  let param={
    qnName:QnName.value
  }
  
  apiQnCreate(param,userInfoStore.uid).then((res) => {
		if(res.code=='0016') {
      alert('创建成功');
      //补充保存问卷id。。。
      userInfoStore.qn.push(res.data.qnid)
      exampleQuestionnaires.value.push(new QuestionnaireAll(QnName.value,[]))
        
      // router.push('/create')
    }
    else{
      alert('创建失败');
    }
    // console.log(res)
	})
}

</script>

<!--有待完善，只有基本框架-->
<template>
  <div class="Main-box">
    <div class="content-box">
      <div class="showBody-box">
        <div class="head-box">
          <head>用户中心</head>
          <div>{{ user.userName }}</div> <!-- 显示用户名 -->
        </div>
        <div class="trueShow-box">
          <div v-for="(questionnaire, index) in user.returnQuestionnaireAll()" :key="index">
            <button class="questionnaire-btn" @click="ChooseAndShow">{{ questionnaire.returnTittle() }}</button>
          </div>
        </div>
      </div>

      <div class="side-box">
        <button class="side-btn" @click="DataShow">数据展示</button>
        <button class="side-btn" @click="Edit">进入编辑</button>
        <button class="side-btn" @click="Send">发布问卷</button>
        <button class="side-btn">删除问卷</button>
        <button class="side-btn" @click="QusetShow">问卷预览</button>
      </div>

    </div>
    <div class="down-box">
      <button class="down-btn" @click="ReturnLogin">退出</button>
      <button class="down-btn" @click="Create">添加新问卷</button>
    </div> 
    
    <div v-if="dialogVisible" class="dialog-overlay">
      <div class="dialog-box">
        <h3>输入添加的问卷的主题</h3>
        <div class="input-group">
          <label for="input1">问卷名</label>
          <input type="text" id="input1" v-model="QnName" />
          <button @click="Quit">确认</button>
        </div>
      </div>
  </div>

  </div>

  
</template>

<style lang="scss" scoped>
.Main-box {
  height: 930px;
  width: 1400px;
  overflow: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: aliceblue;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 15px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .content-box {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 10px;
  }

  .showBody-box {
    height: 800px;
    width: 1200px;
    border: 1px solid rgb(4, 2, 21);

    .head-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;

      head {
        font-size: 2em;
        font-weight: bold;
        margin-bottom: 10px;
      }
    }

    .trueShow-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;

      .questionnaire-btn {
        width: 200px;
        padding: 10px;
        border: none;
        background-color: #007bff;
        color: white;
        font-size: 1em;
        border-radius: 5px;
        cursor: pointer;
      }

      .questionnaire-btn:hover {
        background-color: #0056b3;
      }
    }
  }

  .side-box {
    height: 800px;
    width: 170px;
    border: 1px solid rgb(4, 2, 21);
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
  }

  .side-btn {
    padding: 10px;
    border: none;
    background-color: #007bff;
    color: white;
    font-size: 1em;
    border-radius: 5px;
    cursor: pointer;
  }

  .side-btn:hover {
    background-color: #0056b3;
  }

  .down-box {
    height: 130px;
    width: 100%;
    border: 1px solid rgb(4, 2, 21);
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
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
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-box {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

</style>