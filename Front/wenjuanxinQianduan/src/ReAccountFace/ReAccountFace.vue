<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { apiRegister } from '@/apis/register';
import { useError, useConfirmSuccess } from '@/hook/useAlert';
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()

//注册接口
interface RuleForm {
  inputName: string,
  inputPassword: string,
  inputPasswordAgain: string
}
//注册表单
const ReForm = reactive<RuleForm>({
  inputName: '',
  inputPassword: '',
  inputPasswordAgain: ''
})

//表单引用
const ReFormRef = ref<FormInstance>();

//表单验证
const checkName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    return callback(new Error('请输入用户名'))
  }
  else {
    console.log(value);
    callback();
  }

}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (ReForm.inputPasswordAgain !== '') {
      if (!ReFormRef.value) return
      ReFormRef.value.validateField('inputPasswordAgain')
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== ReForm.inputPassword) {
    callback(new Error("两次输入密码不一样"))
  } else {
    callback()
  }
}

//表单规则
const rules = reactive<FormRules<RuleForm>>({
  inputName: [{
    validator: checkName,
    trigger: 'blur'
  }],
  inputPassword: [{
    validator: validatePass,
    trigger: 'blur'
  }],
  inputPasswordAgain: [{
    validator: validatePass2,
    trigger: 'blur'
  }]
})


const register = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      let param = ({
        userName: ReForm.inputName,
        passWord: ReForm.inputPassword,
      })

      apiRegister(param).then((res) => {
        console.log(param)
        if (res.code == "0000") {
          useConfirmSuccess('注册成功,需要回到登录界面吗', '是的', '不用，继续注册', () => {
            router.push('/');
          })
        }
        else if (res.code == "1016") {
          useError('用户名已存在，注册失败')
        }
        else {
          useError('注册失败')
        }
      })
    } 
  })
}



function ReturnLogin() {
  router.push({ name: 'Login' })
}
</script>



<template>
  <div class="loginBody-box">
    <div class="Tittle-box">
      <el-text style="font-weight: bold;" class="title">注册新账户</el-text>
    </div>
    <div class="enter-box">
      <el-form ref='ReFormRef' :model="ReForm" :rules="rules" status-icon label-width="auto"
        style="width: 400px;max-width: 600px" label-position="left">
        <el-form-item  prop="inputName">
          <template #label>
              <el-text style="color:#606266;font-size: 20px;">用户名:</el-text>
          </template>
          <el-input v-model="ReForm.inputName" />
        </el-form-item>
        <el-form-item  prop="inputPassword">
          <template #label>
              <el-text style="color:#606266;font-size: 20px;">密码:</el-text>
          </template>
          <el-input v-model="ReForm.inputPassword" type="password" show-password />
        </el-form-item>
        <el-form-item  prop="inputPasswordAgain">
          <template #label>
              <el-text style="color:#606266;font-size: 20px;">再次输入密码:</el-text>
          </template>
          <el-input v-model="ReForm.inputPasswordAgain" type="password" show-password />
        </el-form-item>
        <el-form-item>
          <el-row justify="center" style=" width: 100%; margin-top: 50px;">
            <el-button @click="register(ReFormRef)">注册</el-button>
            <el-button @click="ReturnLogin">返回登录</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>




<style lang='scss' scoped>
.loginBody-box {
  background-image: url('/back2.jpg');
  /* 替换为你的背景图片路径 */
  background-size: cover;
  /* 使背景图片覆盖整个容器 */
  background-position: center;
  /* 使背景图片居中 */
  background-repeat: no-repeat;
  /* 防止背景图片重复 */

  height: 930px;
  width: 1400px;
  overflow: auto;

  background-color: aliceblue;
  border-radius: 15px;
  padding: 10px;
  /* 添加内边距 */
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
}

.el-button {
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
