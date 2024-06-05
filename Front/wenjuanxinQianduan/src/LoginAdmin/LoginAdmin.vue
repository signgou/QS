<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { apiLoginAdmin } from '@/apis/adLogin'; 
import { useSuccess, useError } from '@/hook/useAlert';
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()

//登录接口
interface RuleForm {
  inputName: string,
  inputPassword: string
}

//登录表单
const LoginForm = reactive<RuleForm>({
  inputName: '',
  inputPassword: ''
})

//表单引用
const LoginFormRef = ref<FormInstance>();

//自定义规则
const checkName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    return callback(new Error('请输入管理员账号'))
  }
  else {
    callback();
  }
}

const checkPass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    return callback(new Error('请输入密码'))
  }
  else {
    callback();
  }
}

//表单规则
const rules = reactive<FormRules<RuleForm>>({
  inputName: [{
    validator:checkName,
    trigger:'blur'
  }],
  inputPassword: [{
    validator:checkPass,
    trigger:'blur'
  }],
})

// 登录函数
const Loginin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      {
        let param = ({
          adminName: LoginForm.inputName,
          passWord: LoginForm.inputPassword,
        })
        apiLoginAdmin(param).then((res) => {
          if (res.code[0] === '0' ) {
            useSuccess('登录成功');
            router.push(`/Admin`);
          }
          else {
            useError('登录失败，请检查用户名或密码');
          }
        })
      }
    } 
  })
}


function Register() {
  router.push('/AdminRegister')
}
function back(){
    router.push('/');
}
</script>



<template>
  <div class="loginBody-box">
    <div class="Tittle-box">
      <el-text style="font-weight: bold;color:#297db3;" class="title">管理员登录</el-text>
    </div>

    <div class="enter-box">
      <el-form ref="LoginFormRef" :rules="rules"  :model="LoginForm" label-width="auto"
        style="width: 400px;margin-top: 30px" label-position="left" status-icon >
        <el-form-item  prop="inputName">
          <template #label>
              <el-text style="color:#297db3;font-size: 20px;">管理员账号:</el-text>
          </template>
          <el-input  v-model="LoginForm.inputName" />
        </el-form-item>
        <el-form-item  prop="inputPassword">
          <template #label>
              <el-text style="color:#297db3;font-size: 20px;">密码:</el-text>
          </template>
          <el-input v-model="LoginForm.inputPassword" type="password" show-password />
        </el-form-item>
        <el-form-item>
          <el-row justify="center" style=" width: 100%; margin-top: 80px;">
            <el-button @click="back">返回用户登录</el-button>
            <el-button @click="Loginin(LoginFormRef)">登录</el-button>
            <el-button @click="Register">管理员注册</el-button>
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

  background-image: url('/back4.jpg');
  /* 替换为你的背景图片路径 */
  background-size: cover;
  /* 使背景图片覆盖整个容器 */
  background-position: center;
  /* 使背景图片居中 */
  background-repeat: no-repeat;
  /* 防止背景图片重复 */
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
  justify-content: center;
  /* 垂直居中 */
  align-items: center;
  /* 水平居中 */
  padding: 20px;
  .el-button {
    background-color: #297db3;
    color: white;
  }

  .el-button:hover {
    background-color: #cc3f30;
    color: white;
  }
}
.down-box{
  padding-right: 50px;
  height: 200px;
  width: 100%;
  display: flex;
  align-items:end;
  justify-content:right;
}


</style>
