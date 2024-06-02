<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { apiRegister } from '@/apis/register';
import {useSuccess,useError} from '@/hook/useAlert';
const router=useRouter()

// 创建响应式变量来绑定输入框的值
let inputName = ref<string>('');
let inputPassword = ref<string>('');
let inputPasswordAgain = ref<string>('');


function register() {
    let param =({
      userName: inputName.value,
      passWord: inputPassword.value,
    })

    if(inputPassword.value === inputPasswordAgain.value){
        apiRegister(param).then((res)=>{
        console.log(param)
        if(res.code=="0000")
        {
          useSuccess('注册成功')
        }
        else if(res.code=="1016"){
          useError('用户名已存在，注册失败')
        }
        else{
          useError('注册失败')
        }
      })  
    }
    else{
      useError("输入密码不一致");
    }
}

function ReturnLogin()
  {
    router.push({name:'Login'})
  }
</script>



<template>
  <div class="loginBody-box">
    <div class="Tittle-box">
      <el-text style="font-weight: bold;" class="title">注册新账户</el-text>
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
    background-image: url('/back2.jpg'); /* 替换为你的背景图片路径 */
    background-size: cover; /* 使背景图片覆盖整个容器 */
    background-position: center; /* 使背景图片居中 */
    background-repeat: no-repeat; /* 防止背景图片重复 */
    
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
    margin-top: 200px;
    height: auto;
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
    background-color: rgb(120, 116, 129);
    color: white;
    font-size: 1em;
    border-radius: 5px;
    cursor: pointer;
  }

  .button-box .btn:hover {
    background-color: #0056b3;
  }
</style>
