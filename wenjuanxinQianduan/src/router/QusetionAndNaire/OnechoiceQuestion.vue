<script lang="ts"  setup>
import { ref } from 'vue';
import { Users } from '@/BasicDataStruct/users';
import { OPtion, oneChoiceP, MoreChoice, FillIn, QuestionnaireAll } from '@/BasicDataStruct/QuestionType';

// 定义选项数组
let options = ref<OPtion[]>([
  new OPtion('1', 'Option 1'),
  new OPtion('2', 'Option 2'),
  new OPtion('3', 'Option 3')
]);

// 定义单选题实例并使用 options
const danxuanti = ref<oneChoiceP>(
  new oneChoiceP('单选题', options.value)
);

// 定义选中的选项
const selectedOption = ref<string>('1');

// 添加选项函数
const addOption = () => {
  const newOptionTitle = prompt('请输入新选项的标题:');
  if (newOptionTitle) {
    danxuanti.value.addOption(new OPtion((options.value.length + 1).toString(), newOptionTitle));
  }
};

// 删除选项函数
const removeOption = () => {
  if (options.value.length > 0) {
    danxuanti.value.removeOption(options.value.length - 1);
  }
};

// 修改标题函数
const changeTitle = () => {
  const newTitle = prompt('请输入新的单选题标题:');
  if (newTitle) {
    danxuanti.value.changeTittle(newTitle);
  }
};

</script>

<template>

         <!-- 显示单选题标题 -->
          <h3>{{ danxuanti.tittle }}</h3>
          <hr/>
          
          <!-- 单选题选项 -->
          <div class="mb-2 flex items-start text-sm">
            <el-radio-group v-model="danxuanti.whichBeChoose" class="ml-4 vertical-radio-group">
              <el-radio 
                v-for="(option, index) in danxuanti.returnQuestion()" 
                :key="index" 
                :label="option.value">
                {{ option.label }}
              </el-radio>
            </el-radio-group>
            
            <!-- 操作按钮组 -->
            <div class="button-group">
              <button class="add-option-btn" @click="addOption">+</button>
              <button class="remove-option-btn" @click="removeOption">-</button>
              <button class="change-title-btn" @click="changeTitle">修改标题</button>
            </div>
          </div>
          
          <hr />
</template>

<style  lang='scss' scoped>
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

  .vertical-radio-group {
  
  flex-direction: column;
}

.button-group {
  margin-top: 10px;
  display: flex;
}

.add-option-btn,
.remove-option-btn {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

</style>
