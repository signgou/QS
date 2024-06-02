<template>
  <div>
    <h3>{{ question.tittle }}</h3>
    <hr />
    <div class="mb-2 flex items-start text-sm">
      <el-checkbox-group v-model="question.whichBeChoose" class="ml-4 vertical-checkbox-group">
        <el-checkbox 
          v-for="(option, index) in question.Question" 
          :key="index" 
          :value="option.value">
          {{ option.label }}
        </el-checkbox>
      </el-checkbox-group>
      <div class="button-group">
        <el-button color="#504547"  size="small" :icon="Plus" circle @click="addOption"/>
        <el-button color="#504547" size="small" :icon="Minus" circle @click="removeOption"/>
        <el-button color="#504547"  size="small" class="change-title-btn" @click="changeTitle">修改标题</el-button>
        <el-button size="small" style="margin-left: 10px;" type="danger" :icon="Delete" circle @click="deleteMore('moreQns')" />
      </div>
    </div>
    <hr />
  </div>
</template>

<script lang = "ts" setup>
  import { Delete,Plus,Minus } from '@element-plus/icons-vue';
  
</script>
<script lang="ts">
import { defineComponent } from 'vue';
import { MoreChoice, OPtion } from '@/BasicDataStruct/QuestionType';
import { useQidModQt } from '@/hook/useQid';
export default defineComponent({
  props: {
    question: {
      type: MoreChoice,
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
    async addOption() {
      const newOptionTitle = prompt('请输入新选项的标题:');
      if (newOptionTitle) {
        await useQidModQt(this.question.qid,"moreQns",{$push:{
          options:newOptionTitle,
          selecteds:0
        }
        });
        this.question.addOption(new OPtion((this.question.Question.length + 1).toString(), newOptionTitle));
      }
    },
    async removeOption() {
      if (this.question.Question.length > 0) {
        let index =this.question.Question.length - 1;
        await useQidModQt(this.question.qid,"moreQns",{
          $pop:{
            options:1,
            selecteds:1
          }
        });
        this.question.removeOption(index);
      }
    },
    async changeTitle() {
      const newTitle = prompt('请输入新的多选题标题:');
      if (newTitle) {
        await useQidModQt(this.question.qid,'moreQns',{
           title : newTitle
        })
        this.question.changeTittle(newTitle);
      }
    },
    deleteMore(type:string){
        this.deleteSelf(this.question.qid,type,this.pos);
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
  margin-top: 5px;
  display: flex;
}

</style>



