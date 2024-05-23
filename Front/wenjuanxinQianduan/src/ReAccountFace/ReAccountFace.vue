<script lang="ts" setup>
import { ref } from 'vue';
import { Users } from '@/BasicDataStruct/users';
import { useRouter } from 'vue-router';
import { apiRegister } from '@/apis/register';
import type { QuestionnaireAll } from '@/BasicDataStruct/QuestionType';
import axios from 'axios'
import { computed } from 'vue';

const router=useRouter()

// 创建响应式变量来绑定输入框的值
let inputName = ref<string>('');
let inputPassword = ref<string>('');
let inputPasswordAgain = ref<string>('');

console.log(inputName.value)
  
// let aa:QuestionnaireAll[]=[]
// let bb:QuestionnaireAll[]=[]
// // 创建用户示例列表
// let exampleList: Users[] = [
//   new Users('成龙', '28967',aa),
//   new Users('小玉', '7376',bb)
// ];

// 注册函数
function register() {
  // 检查输入是否为空
  
    // 创建新用户并添加到用户列表中
    // const newUser = new Users(inputName.value, inputPassword.value,aa);
    // exampleList.push(newUser);
    // // 弹出窗口显示新用户列表
    // alert(`注册成功！当前用户列表:\n${exampleList.map(user => `${user.userName}: ${user.passWord}`).join('\n')}`);
    // // 清空输入框

  //   axios.post('http://192.168.99.254:3000/api/users/register',param).then((res)=>{
  //   console.log(res)
  // })//delete
    let param =({
      userName: inputName.value,
      passWord: inputPassword.value,
    })

    apiRegister(param).then((res)=>{
      console.log(param)
      if(res.msg=="注册成功")
      {
        alert('注册成功')
      }
      else{
        alert('注册失败')
      }
    })
  
}

function ReturnLogin()
  {
    router.push({name:'Login'})
  }
</script>


<template>
  <div class="loginBody-box">
    <div class="Tittle-box">
      <h1 class="title">注册新账户</h1>
    </div>

    <div class="enter-box">
      <div class="input-group">
        <label for="register-username">用户名:</label>
        <input type="text" id="register-username" v-model="inputName" />
      </div>
      <div class="input-group">
        <label for="register-password">密码:</label>
        <input type="password" id="register-password" v-model="inputPassword" />
      </div>
      <div class="input-group">
        <label for="confirm-password">再次输入密码:</label>
        <input type="password" id="confirm-password" v-model="inputPasswordAgain" />
      </div>
    </div>

    <div class="button-box">
      <button class="btn" @click="register()">注册</button>
      <button class="btn" @click="ReturnLogin">返回登录</button>
    </div>
  </div>
</template>





<style lang='scss' scoped>
  .loginBody-box {
    height: 930px;
    width: 1400px;
    overflow: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: aliceblue;
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
    height: 130px;
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
