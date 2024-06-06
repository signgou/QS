<template>
  <div class="show-box">
    <h3>{{ question.Tittle }}</h3>
    <hr />
    <div class="my-2 flex items-start text-sm" style="margin-top: 10px;">
      <el-input
        v-model="question.Answer"
        style="width: 240px"
        placeholder="请填写答案"
        @change="updateAnswer"
      />
    </div>
    <div class="button-group">
      <el-button color="#504547"  size="small" @click="changeTitle">修改标题</el-button>
      <el-button size="small" style="margin-left: 10px;" type="danger" :icon="Delete" circle @click="deleteFill('fillQns')" />
    </div>
    <hr />
  </div>
</template>

<script lang = "ts" setup>
  import { Delete } from '@element-plus/icons-vue';
  
</script>
<script lang="ts">
import { defineComponent } from 'vue';
import { FillIn } from '@/BasicDataStruct/QuestionType';
import { useQidModQt } from '@/hook/useQid';
import {useSuccess,usePrompt} from '@/hook/useAlert';
export default defineComponent({
  props: {
    question: {
      type: FillIn,
      required: true
    },
    deleteSelf:{
      type : Function,
      required : true
    },
    pos:{
      type : Number,
      required : true
    }
  },
  methods: {
    async changeTitle() {
      const newTitle = await usePrompt('请输入新的填空题标题:');
      if (newTitle) {
        await useQidModQt(this.question.qid,'fillQns',{
           title : newTitle
        });
        useSuccess('修改标题成功');
        this.question.changeTittle(newTitle);
      }
    },
    updateAnswer(newAnswer: string) {
      this.question.changeAnswer(newAnswer);
    },
    deleteFill(type:string){
        this.deleteSelf(this.question.qid,type,this.pos);
    }
  }
});
</script>


<style lang='scss' scoped>
.show-box{
  margin-bottom: 30px;
}
.button-group {
  margin-top: 10px;
  display: flex;
}

</style>
