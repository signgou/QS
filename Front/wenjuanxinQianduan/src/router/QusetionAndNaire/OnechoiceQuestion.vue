<template>
  <div class="show-box">
    <el-text>{{ question.tittle }}</el-text>
        <hr/>
        <div class="mb-2 flex items-start text-sm">
          <el-radio-group v-model="question.whichBeChoose" style="align-items: flex-start;" class="ml-4 vertical-radio-group">
            <el-radio 
              v-for="(option, index) in question.question" 
              :key="index" 
              :value="option.value">
              {{ option.label }}
            </el-radio>
          </el-radio-group>
          <div class="button-group">
            <el-button color="#504547"  size="small" :icon="Plus" circle @click="addOption"/>
            <el-button color="#504547"  size="small" :icon="Minus" circle @click="removeOption"/>
            <el-button color="#504547"  size="small" class="change-title-btn" @click="changeTitle">修改标题</el-button>
            <el-button size="small" style="margin-left: 10px;" type="danger" :icon="Delete" circle @click="deleteOne('oneQns')" />
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
import { oneChoiceP, OPtion } from '@/BasicDataStruct/QuestionType';
import { useQidModQt } from '@/hook/useQid'; 
import {usePrompt,useSuccess} from '@/hook/useAlert';
export default defineComponent({
  props: {
    question: {
      type: oneChoiceP,
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
      const newOptionTitle = await usePrompt('请输入新选项的标题:');
      if (newOptionTitle) {
        await useQidModQt(this.question.qid,"oneQns",{$push:{
          options:newOptionTitle,
          selecteds:0
        }
        });
        useSuccess('增加选项成功');
        this.question.addOption(new OPtion((this.question.question.length + 1).toString(), newOptionTitle));
      }
    },
    async removeOption() {
      if (this.question.question.length > 0) {
        let index =this.question.question.length - 1;
        await useQidModQt(this.question.qid,"oneQns",{
          $pop:{
            options:1,
            selecteds:1
          }
        });
        useSuccess('删除选项成功');
        this.question.removeOption(index);
      }
      
    },
    async changeTitle() {
      const newTitle =await usePrompt('请输入新的单选题标题:');
      if (newTitle) {
        await useQidModQt(this.question.qid,'oneQns',{
           title : newTitle
        })
        this.question.changeTittle(newTitle);
      }
      useSuccess('修改标题成功');
    },
    deleteOne(type:string){
        this.deleteSelf(this.question.qid,type,this.pos);
    }
  }
});
</script>


<style  lang='scss' scoped>
.vertical-radio-group {
  flex-direction: column;
}
.show-box{
  margin-bottom: 30px;
}
.button-group {
  margin-top:5px;
  display: flex;
}


</style>
