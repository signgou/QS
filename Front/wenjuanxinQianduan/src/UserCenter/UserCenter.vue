<!--用户中心-->
<script lang="ts" setup>
import { FillIn, MoreChoice, OPtion, QuestionnaireAll, oneChoiceP } from '@/BasicDataStruct/QuestionType';
import { Users } from '@/BasicDataStruct/users';
import {  ref, onBeforeMount} from 'vue';
import { useRouter,useRoute } from 'vue-router';
import { apiQnCreate } from '@/apis/qnCreate';
import {useUidGetQn} from '@/hook/useUidGetQn'
import { useQnidDelQn } from '@/hook/useQnidDelQn';


const route = useRoute();
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
  let qnid= exampleQuestionnaires.value[selctedQn.value].qnid;
  router.push(`/QuestShow/${qnid}`)
}

function DataShow()
{
  let qnid= exampleQuestionnaires.value[selctedQn.value].qnid;
  router.push(`/Data/${qnid}`)
}

function Edit()
{
  let qnid= exampleQuestionnaires.value[selctedQn.value].qnid;
  router.push(`/create/${qnid}`)
}

function Send()
{
  router.push('/QuestShare')
}

async function Delete(){
  let qnid= exampleQuestionnaires.value[selctedQn.value].qnid;
   await useQnidDelQn(qnid);
   exampleQuestionnaires.value.splice(selctedQn.value,1);
}
//被选择问卷的qnid
const selctedQn=ref(0);
let exampleQuestionnaires = ref<QuestionnaireAll[]>([]);

onBeforeMount(()=>{

  async function main() {
    const {userName,qnids,qnNames}= await useUidGetQn(route.params.uid as string);
    user.value.userName=userName.value;
    qnids.value.forEach((qnid,index)=>{
      exampleQuestionnaires.value.push(new QuestionnaireAll(qnid,qnNames.value[index],[]));
    })
  }
  main().catch(err => {
    console.log(err);
  })
})

// 创建示例用户对象
const user = ref<Users>(
  new Users(route.params.uid as string, "", exampleQuestionnaires.value)
);



function Quit()
{
  dialogVisible.value=false
  let param={
    qnName:QnName.value
  }
  
  apiQnCreate(param,route.params.uid as string).then((res) => {
		if(res.code=='0016') {
      alert('创建成功');
      exampleQuestionnaires.value.push(new QuestionnaireAll(res.data.qnid,res.data.qnName,[]))
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
          <div class="head">用户中心</div>
          <div>{{ user.userName }}</div> <!-- 显示用户名 -->
        </div>
        <div class="trueShow-box">
            <!-- <button class="questionnaire-btn" @click="ChooseAndShow"></button> -->
            <el-radio-group v-model="selctedQn" style="display: flex;flex-flow: column nowrap; align-items:center;" >
            <div v-for="(questionnaire, index) in user.returnQuestionnaireAll()" :key="index" >
                <el-radio-button style="
                            margin: 10px 0;
                            width: auto;" 
                class="questionnaire-btn"  :label= '"问卷 ："+" "+questionnaire.returnTittle()'  :value='index' />
            </div>
            </el-radio-group>
        
        </div>
      </div>

      <div class="side-box">
        <button class="side-btn" @click="DataShow">数据展示</button>
        <button class="side-btn" @click="Edit">进入编辑</button>
        <button class="side-btn" @click="Send">发布问卷</button>
        <button class="side-btn" @click="Delete">删除问卷</button>
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
        font-size: 5em;
        font-weight: bold;
        margin-bottom: 10px;
      }
    }

    .trueShow-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;

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

