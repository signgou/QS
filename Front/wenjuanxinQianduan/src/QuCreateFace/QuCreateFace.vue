<template>
  <div class="Main-box">
    <div class="content-box">
      <div class="showBody-box">
        <div class="trueShow-box">
          <component
            :is="componentType(question)"
            v-for="(question, index) in questionnaireEditor.questionNaire"
            :key="index"
            :question="question"
            @updateQuestion="handleUpdateQuestion"
          />
        </div>
      </div>
      <div class="side-box">
        <button class="side-btn" @click="openDialog">添加问题</button>
        <button class="side-btn" @click="removeQuestion">删除问题</button>
      </div>
    </div>
    <div class="down-box">
      <button class="down-btn" @click="finish">完成</button>
      <button class="down-btn" @click="share">分享</button>
    </div>
  </div>

  <!-- 添加问题选择弹窗 -->
  <div v-if="dialogVisible" class="dialog-overlay">
    <div class="dialog-box">
      <h3>选择添加的问题类型</h3>
      <button @click="addSpecificQuestion('oneChoice')">单选题</button>
      <button @click="addSpecificQuestion('moreChoice')">多选题</button>
      <button @click="addSpecificQuestion('fillIn')">填空题</button>
      <button @click="closeDialog">取消</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { QuestionnaireAll, oneChoiceP, MoreChoice, FillIn, OPtion } from '@/BasicDataStruct/QuestionType';
import OnechoiceQuestion from '@/router/QusetionAndNaire/OnechoiceQuestion.vue';
import MorechoiceQuestion from '@/router/QusetionAndNaire/MorechoiceQuestion.vue';
import FillinQuestion from '@/router/QusetionAndNaire/FillinQuestion.vue';
import { Users} from '@/BasicDataStruct/users';
import { useRouter } from 'vue-router';



export default defineComponent({
  components: {
    OnechoiceQuestion,
    MorechoiceQuestion,
    FillinQuestion
  },
  setup() {
    const router = useRouter()
    const questionnaireEditor = ref<QuestionnaireAll>(new QuestionnaireAll('问卷标题', [
      new oneChoiceP('单选题', [
        new OPtion('1', '选项 1'),
        new OPtion('2', '选项 2'),
        new OPtion('3', '选项 3')
      ]),
      new MoreChoice('多选题', [
        new OPtion('1', '选项 A'),
        new OPtion('2', '选项 B'),
        new OPtion('3', '选项 C')
      ]),
      new FillIn('填空题', ''),
    ]));

    const dialogVisible = ref(false);

    const componentType = (question: oneChoiceP | MoreChoice | FillIn) => {
      if (question instanceof oneChoiceP) {
        return 'OnechoiceQuestion';
      } else if (question instanceof MoreChoice) {
        return 'MorechoiceQuestion';
      } else if (question instanceof FillIn) {
        return 'FillinQuestion';
      }
      return '';
    };

    const handleUpdateQuestion = (updatedQuestion: oneChoiceP | MoreChoice | FillIn) => {
      const index = questionnaireEditor.value.questionNaire.findIndex(q => q === updatedQuestion);
      if (index !== -1) {
        questionnaireEditor.value.questionNaire.splice(index, 1, updatedQuestion);
      }
    };

    function openDialog(){
      dialogVisible.value = true;
    };

    const closeDialog = () => {
      dialogVisible.value = false;
    };

    const addSpecificQuestion = (type: string) => {
      if (type === 'oneChoice') {
        questionnaireEditor.value.questionNaire.push(new oneChoiceP('新的单选题', [
          new OPtion('1', '选项 1'),
          new OPtion('2', '选项 2'),
          new OPtion('3', '选项 3')
        ]));
      } else if (type === 'moreChoice') {
        questionnaireEditor.value.questionNaire.push(new MoreChoice('新的多选题', [
          new OPtion('1', '选项 A'),
          new OPtion('2', '选项 B'),
          new OPtion('3', '选项 C')
        ]));
      } else if (type === 'fillIn') {
        questionnaireEditor.value.questionNaire.push(new FillIn('新的填空题', ''));
      }
      dialogVisible.value = false;
    };

    const removeQuestion = () => {
      if (questionnaireEditor.value.questionNaire.length > 0) {
        questionnaireEditor.value.questionNaire.pop();
      }
    };

    function finish(){
      // 完成问卷编辑的逻辑
      router.push('/user')
    };

    function share(){
      // 分享问卷的逻辑
      router.push('/QuestShare')
    };

    return {
      questionnaireEditor,
      dialogVisible,
      componentType,
      handleUpdateQuestion,
      openDialog,
      closeDialog,
      addSpecificQuestion,
      removeQuestion,
      finish,
      share
    };
  }
});
</script>

<style lang='scss' scoped>
.Main-box {
  height: 930px;
  width: 1400px;
  overflow: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: aliceblue;
  background-size: cover; /* 使背景图片覆盖整个容器 */
  background-position: center; /* 使背景图片居中 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
  border-radius: 15px;
  padding: 10px; /* 添加内边距 */
  display: flex;
  flex-direction: column; /* 使子元素垂直排列 */
  align-items: center; /* 水平居中 */
  .content-box {
    display: flex;
    flex-direction: row; /* 使 .showBody-box 和 .side-box 水平排列 */
    align-items: flex-start; /* 上对齐 */
    gap: 10px; /* 添加间距 */
  }

  .showBody-box {
    height: 800px;
    width: 1200px;
    border: 1px solid rgb(4, 2, 21); /* 添加边框 */
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
    .trueShow-box {
      height: 800px;
      width: 1200px;
      border: 1px solid rgb(4, 2, 21); /* 添加边框 */
      overflow-y: auto; /* 启用垂直滚动条 */
      display: flex;
      flex-direction: column; /* 使内部组件垂直排列 */
      padding: 10px; /* 添加内边距 */
    }
  }

  .side-box {
    height: 800px;
    width: 170px;
    border: 1px solid rgb(4, 2, 21); /* 添加边框 */
    display: flex;
    flex-direction: column; /* 垂直排列按钮 */
    gap: 10px; /* 按钮之间的间距 */
    padding: 10px;
  }

  .side-btn {
    padding: 10px;
    border: none;
    background-color: #007bff;
    color: white;
    font-size: 1em;
    border-radius: 5px;
    cursor: pointer;
  }

  .side-btn:hover {
    background-color: #0056b3;
  }

  .down-box {
    height: 130px;
    width: 100%; /* 使用100%宽度 */
    border: 1px solid rgb(4, 2, 21); /* 添加边框 */
    margin-top: 10px; /* 添加顶部间距 */
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    gap: 20px; /* 按钮之间的间距 */
  }

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
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-box {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.dialog-box h3 {
  margin-top: 0;
}

.dialog-box button {
  margin: 5px;
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;
}

.dialog-box button:hover {
  background-color: #0056b3;
}
</style>
