<template>
    <div class="enter-box">
        <el-form
        status-icon
      ref="ruleFormRef"
      style="width:400px;"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"

    >
      <el-form-item label="Activity name" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
  
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Create
        </el-button>
        <el-button >Reset</el-button>
      </el-form-item>
    </el-form>
    </div>
   
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
  
  interface RuleForm {
    name: string
  }
  
  const ruleFormRef = ref<FormInstance>()
  const ruleForm = reactive<RuleForm>({
    name: '',
  })
  
  const locationOptions = ['Home', 'Company', 'School']
  
  const rules = reactive<FormRules<RuleForm>>({
    name: [
      { required: true, message: '请输入密码', trigger: 'blur' },
    ]
   
  })
  
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        console.log('submit!')
      } else {
        console.log('error submit!', fields)
      }
    })
  }
  </script>
  
 <style>
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
</style>