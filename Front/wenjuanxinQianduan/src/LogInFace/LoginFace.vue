<script lang="ts" setup>
import { ref } from 'vue';
import { Users } from '@/BasicDataStruct/users';
import { useRouter } from 'vue-router';
import { apiGetUserInfo } from '@/apis/login';
import Questionnaire from '@/router/QusetionAndNaire/Questionnaire.vue';
import type { QuestionnaireAll } from '@/BasicDataStruct/QuestionType';
import axios from 'axios'
import {useUerInfoStore} from '@/store/userInfo'

const router=useRouter()
const userInfoStore=useUerInfoStore()

// 创建响应式变量来绑定输入框的值
let inputName = ref<string>('');
let inputPassword = ref<string>('');

// 登录函数
function Loginin(intName: string, inPassword: string) {
 
  //用户信息、后端
  
	let param =({
		userName: inputName.value,
		passWord: inputPassword.value,
	})


  // router.push('/user')//need to delete
  // userInfoStore.id=inputName.value
  async function test(){
    let res = await apiGetUserInfo(param)
    if(res.msg=='登录成功') {
      alert('登录成功');
      userInfoStore.uid=res.data.uid
      userInfoStore.id=inputName.value
      userInfoStore.getAllQn(userInfoStore.uid)
      router.push('/user')
    }
    else{
      alert('登录失败');
    }
  }
  test()
	// apiGetUserInfo(param).then((res) => {
		
    // console.log(res)
	// })

}

function Register()
{
  router.push('/register')
}
</script>



<template>
  <div class="loginBody-box">
    <div class="Tittle-box">
      <h1 class="title">问卷调查系统</h1>
    </div>

    <div class="enter-box">
      <div class="input-group">
        <label for="input1">用户名:</label>
        <input type="text" id="input1" v-model="inputName" />
      </div>
      <div class="input-group">
        <label for="input2">密码:</label>
        <input type="password" id="input2" v-model="inputPassword" />
      </div>
    </div>

    <div class="button-box">
      <button class="btn" @click="Loginin(inputName, inputPassword)">登录</button>
      <button class="btn" @click="Register">没有账户？现在注册！</button>
    </div>
  </div>
</template>



<style lang='scss' scoped>
  .loginBody-box {
    height: 930px;
    width: 1400px;
    border: 1px solid rgb(4, 2, 21);  /* 添加边框 */
    overflow: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: url('F:/RealQuestionnaire/wenjuanxinQianduan/ruanmei1.png'); /* 替换为你的背景图片路径 */
    background-size: cover; /* 使背景图片覆盖整个容器 */
    background-position: center; /* 使背景图片居中 */
    background-repeat: no-repeat; /* 防止背景图片重复 */
    border-radius: 15px;
    padding: 10px; /* 添加内边距 */
  }

  .Tittle-box {
    height: 200px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .Tittle-box .title {
    font-size: 2em;
  }

  .enter-box {
    height: 400px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center; /* 垂直居中 */
    align-items: center; /* 水平居中 */
    padding: 20px;
  }

  .input-group {
    margin-bottom: 20px;
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
  }

  .input-group label {
    margin-right: 10px;
  }

  .input-group input {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 300px; /* 设置输入框宽度 */
  }

  .button-box {
    height: 295px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px; /* 设置按钮之间的间距 */
  }

  .button-box .btn {
    padding: 10px 20px;
    border: none;
    background-color: #007bff;
    color: white;
    font-size: 1em;
    border-radius: 5px;
    cursor: pointer;
  }

  .button-box .btn:hover {
    background-color: #0056b3;
  }
</style>
