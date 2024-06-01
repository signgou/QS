<template>
  <div>
    <h3>{{ question.Tittle }}</h3>
    <hr />
    <div class="my-2 flex items-start text-sm">
      <el-input
        v-model="question.Answer"
        style="width: 240px"
        placeholder="请填写答案"
        @change="updateAnswer"
      />
    </div>
    <div class="button-group">
      <button class="change-title-btn" @click="changeTitle">修改标题</button>
    </div>
    <hr />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FillIn } from '@/BasicDataStruct/QuestionType';
import { useQidModQt } from '@/hook/useQidModQt';
export default defineComponent({
  props: {
    question: {
      type: FillIn,
      required: true
    }
  },
  methods: {
    async changeTitle() {
      const newTitle = prompt('请输入新的填空题标题:');
      if (newTitle) {
        await useQidModQt(this.question.qid,'fillQns',{
           title : newTitle
        })
        this.question.changeTittle(newTitle);
      }
    },
    updateAnswer(newAnswer: string) {
      this.question.changeAnswer(newAnswer);
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

.button-group {
  margin-top: 10px;
  display: flex;
}

.change-title-btn {
  margin-right: 10px;
}
</style>
