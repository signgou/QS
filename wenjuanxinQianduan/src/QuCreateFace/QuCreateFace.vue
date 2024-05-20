<script lang="ts" setup>

</script>


<template>
<div class="Main-box">
    <div class="content-box">
      <div class="showBody-box">
         <div class="trueShow-box"></div>
      </div>
      <div class="side-box">
        <button class="side-btn">添加问题</button>
        <button class="side-btn">删除问题</button>
        <button class="side-btn">修改问题</button>
      </div>
    </div>
    <div class="down-box">
      <button class="down-btn">完成</button>
      <button class="down-btn">分享</button>
    </div>
  </div>
</template>
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
    .trueShow-box
    {
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
</style>