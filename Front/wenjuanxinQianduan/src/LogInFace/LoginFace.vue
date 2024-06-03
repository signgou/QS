<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { apiGetUserInfo } from '@/apis/login';
import {useSuccess,useError} from '@/hook/useAlert';

const router=useRouter()

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
	apiGetUserInfo(param).then((res) => {
		if(res.msg=='登录成功') {
      useSuccess('登录成功');
      router.push(`/user/${res.data.uid}`);
    }
    else{
      useError('登录失败，请检查用户名或密码');
    }
    // console.log(res)
	})

}

function Register()
{
  router.push('/register')
}
</script>



<template>
  <div class="loginBody-box">
    <div class="Tittle-box">
      <el-text style="font-weight: bold;" class="title">问卷调查系统</el-text>
    </div>

    <div class="enter-box">
      <el-form  label-width="auto" style="width: 300px;max-width: 600px" label-position="left">
          <el-form-item label="用户名:">
          <el-input v-model="inputName" />
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="inputPassword" type="password" show-password />
        </el-form-item>
        <el-form-item >
          <el-row justify="center" style=" width: 100%; margin-top: 100px;" >
            <el-button  @click="Loginin(inputName, inputPassword)">登录</el-button>
            <el-button  @click="Register">没有账户？现在注册！</el-button>
          </el-row>
        </el-form-item>
    </el-form>
    </div>
  </div>
</template>


<style lang='scss' scoped>
  .loginBody-box {
    height: 930px;
    width: 1400px;
    overflow: auto;

    background-image: url('/back2.jpg'); /* 替换为你的背景图片路径 */
    background-size: cover; /* 使背景图片覆盖整个容器 */
    background-position: center; /* 使背景图片居中 */
    background-repeat: no-repeat; /* 防止背景图片重复 */
    border-radius: 15px;
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
</style>
