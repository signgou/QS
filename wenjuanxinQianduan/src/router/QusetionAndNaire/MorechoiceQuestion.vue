<script lang="ts" setup>
import { ref } from 'vue';
import { OPtion, MoreChoice } from '@/BasicDataStruct/QuestionType';

// 定义选项数组
const options = ref<OPtion[]>([
  new OPtion('1', 'Option 1'),
  new OPtion('2', 'Option 2'),
  new OPtion('3', 'Option 3')
]);

// 定义多选题实例并使用 options
const duoxuanti = ref<MoreChoice>(
  new MoreChoice('多选题', options.value)
);

// 添加选项函数
const addOption = () => {
  const newOptionTitle = prompt('请输入新选项的标题:');
  if (newOptionTitle) {
    const newOption = new OPtion((options.value.length + 1).toString(), newOptionTitle);
    duoxuanti.value.addOption(newOption);
  }
};

// 删除选项函数
const removeOption = () => {
  if (options.value.length > 0) {
    duoxuanti.value.removeOption(options.value.length - 1);
  }
};

// 修改标题函数
const changeTitle = () => {
  const newTitle = prompt('请输入新的多选题标题:');
  if (newTitle) {
    duoxuanti.value.changeTittle(newTitle);
  }
};
</script>



<template>
  <div>
    <!-- 显示多选题标题 -->
    <h3>{{ duoxuanti.returnTittle() }}</h3>
    <hr />
    
    <!-- 多选题选项 -->
    <div class="mb-2 flex items-start text-sm">
      <el-checkbox-group v-model="duoxuanti.whichBeChoose" class="ml-4 vertical-checkbox-group">
        <el-checkbox 
          v-for="(option, index) in duoxuanti.returnQuestion()" 
          :key="index" 
          :label="option.returnValue()">
          {{ option.returnlabel() }}
        </el-checkbox>
      </el-checkbox-group>
      
      <!-- 操作按钮组 -->
      <div class="button-group">
        <button class="add-option-btn" @click="addOption">+</button>
        <button class="remove-option-btn" @click="removeOption">-</button>
        <button class="change-title-btn" @click="changeTitle">修改标题</button>
      </div>
    </div>
    
    <hr />
  </div>
</template>


<style lang='scss' scoped>
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

.vertical-checkbox-group {
  display: flex;
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



