<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useError, useConfirmSuccess } from '@/hook/useAlert';
import type { FormInstance, FormRules } from 'element-plus'
import { apiReAdmin } from '@/apis/adregister';

const router = useRouter()

//注册接口
interface RuleForm {
  inputName: string,
  inputPassword: string,
  inputPasswordAgain: string,
  SecretKey : string;
}
//注册表单
const ReForm = reactive<RuleForm>({
  inputName: '',
  inputPassword: '',
  inputPasswordAgain: '',
  SecretKey:''
})

//表单引用
const ReFormRef = ref<FormInstance>();

//表单验证
const checkName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    return callback(new Error('请输入用户名'))
  }
  else {
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
const checkKey = (rule: any, value: any, callback: any) => {
  if (value === '') {
    return callback(new Error('请输入秘钥'));
  }
  else {
    callback();
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
  }],
  SecretKey:[{
    validator: checkKey,
    trigger: 'blur'
  }]
})


const register = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      let param = ({
        adminName: ReForm.inputName,
        passWord: ReForm.inputPassword,
        SecretKey:ReForm.SecretKey
      })

      apiReAdmin(param).then((res) => {
        console.log(param)
        if (res.code[0] == "0") {
          useConfirmSuccess('注册成功,需要回到管理员登录界面吗', '是的', '不用，继续注册', () => {
            router.push('/AdminLogin');
          })
        }
        else {
          useError(res.msg);
        }
      })
    } 
  })
}



function ReturnLogin() {
  router.push('/AdminLogin')
}
</script>



<template>
  <div class="loginBody-box">
    <div class="Tittle-box">
      <el-text style="font-weight: bold;color:#297db3;" class="title">管理员注册</el-text>
    </div>
    <div class="enter-box">
      <el-form ref='ReFormRef' :model="ReForm" :rules="rules" status-icon label-width="auto"
        style="width: 400px;max-width: 600px" label-position="left">
        <el-form-item  prop="inputName">
          <template #label>
              <el-text style="color:#297db3;font-size: 20px;">用户名:</el-text>
          </template>
          <el-input v-model="ReForm.inputName" />
        </el-form-item>
        <el-form-item  prop="inputPassword">
          <template #label>
              <el-text style="color:#297db3;font-size: 20px;">密码:</el-text>
          </template>
          <el-input v-model="ReForm.inputPassword" type="password" show-password />
        </el-form-item>
        <el-form-item  prop="inputPasswordAgain">
          <template #label>
              <el-text style="color:#297db3;font-size: 20px;">再次输入密码:</el-text>
          </template>
          <el-input v-model="ReForm.inputPasswordAgain" type="password" show-password />
        </el-form-item>
        <el-form-item  prop="SecretKey">
          <template #label>
              <el-text style="color:#297db3;font-size: 20px;">秘钥:</el-text>
          </template>
          <el-input v-model="ReForm.SecretKey" type="password" show-password />
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
  background-image: url('/back4.jpg');
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
  height: 150px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 300px;
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
  background-color: #297db3;
  color: white;
}

.el-button:hover {
  background-color: #cc3f30;
  color: white;
}

.el-button+.el-button {
  margin-left: 50px;
}
</style>
