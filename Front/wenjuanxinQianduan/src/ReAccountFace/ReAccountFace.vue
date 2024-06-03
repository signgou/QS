<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { apiRegister } from '@/apis/register';
import {useSuccess,useError,useConfirmSuccess} from '@/hook/useAlert';
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
          useConfirmSuccess('注册成功,需要回到登录界面吗','是的','不用，继续注册',()=>{
              router.push('/');
          })
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
      <el-form  label-width="auto" style="width: 400px;max-width: 600px" label-position="left">
        <el-form-item label="用户名:">
          <el-input v-model="inputName" />
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="inputPassword" type="password" show-password />
        </el-form-item>
        <el-form-item label="再次输入密码:">
          <el-input v-model="inputPasswordAgain" type="password" show-password />
        </el-form-item>
        <el-form-item >
          <el-row justify="center" style=" width: 100%; margin-top: 50px;" >
            <el-button  @click="register()">注册</el-button>
            <el-button  @click="ReturnLogin">返回登录</el-button>
          </el-row>
        </el-form-item>
    </el-form>
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
  .el-button{
    background-color: #908d96;
    color: white;
  }
  .el-button:hover {
    background-color: black;
    color: white;
  }
  .el-button+.el-button {
    margin-left: 70px;
  }
</style>
