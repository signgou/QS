<template>
  <div>
    <h3>{{ question.tittle }}</h3>
    <hr />
    <div class="mb-2 flex items-start text-sm">
      <el-checkbox-group v-model="question.whichBeChoose" class="ml-4 vertical-checkbox-group">
        <el-checkbox 
          v-for="(option, index) in question.Question" 
          :key="index" 
          :label="option.value">
          {{ option.label }}
        </el-checkbox>
      </el-checkbox-group>
      <div class="button-group">
        <button class="add-option-btn" @click="addOption">+</button>
        <button class="remove-option-btn" @click="removeOption">-</button>
        <button class="change-title-btn" @click="changeTitle">修改标题</button>
      </div>
    </div>
    <hr />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { MoreChoice, OPtion } from '@/BasicDataStruct/QuestionType';

export default defineComponent({
  props: {
    question: {
      type: MoreChoice,
      required: true
    }
  },
  methods: {
    addOption() {
      const newOptionTitle = prompt('请输入新选项的标题:');
      if (newOptionTitle) {
        this.question.addOption(new OPtion((this.question.Question.length + 1).toString(), newOptionTitle));
      }
    },
    removeOption() {
      if (this.question.Question.length > 0) {
        this.question.removeOption(this.question.Question.length - 1);
      }
    },
    changeTitle() {
      const newTitle = prompt('请输入新的多选题标题:');
      if (newTitle) {
        this.question.changeTittle(newTitle);
      }
    }
  }
});
</script>



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



