<script lang="ts" setup>
import { ref } from 'vue';
import { FillIn } from '@/BasicDataStruct/QuestionType';

// 定义填空题实例
const tiankongti = ref<FillIn>(
  new FillIn('填空题', '')
);

// 修改标题函数
const changeTitle = () => {
  const newTitle = prompt('请输入新的填空题标题:');
  if (newTitle) {
    tiankongti.value.changeTittle(newTitle);
  }
};
</script>


<template>
  <div>
    <!-- 显示填空题标题 -->
    <h3>{{ tiankongti.returnTittle() }}</h3>
    <hr />

    <!-- 填空框 -->
    <div class="my-2 flex items-start text-sm">
      <el-input
        v-model="tiankongti.Answer"
        style="width: 240px"
        placeholder="请填写答案"
      />
    </div>

    <!-- 修改标题按钮 -->
    <div class="button-group">
      <button class="change-title-btn" @click="changeTitle">修改标题</button>
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

.button-group {
  margin-top: 10px;
  display: flex;
}

.change-title-btn {
  margin-right: 10px;
}
</style>
