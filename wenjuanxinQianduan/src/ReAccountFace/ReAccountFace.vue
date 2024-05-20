<script lang="ts" setup>

</script>

<template>
  <div class="loginBody-box">
    <div class="Tittle-box">
      <h1 class="title">注册新账户</h1>
    </div>

    <div class="enter-box">
      <div class="input-group">
        <label for="register-username">用户名:</label>
        <input type="text" id="register-username" />
      </div>
      <div class="input-group">
        <label for="register-password">密码:</label>
        <input type="password" id="register-password" />
      </div>
      <div class="input-group">
        <label for="confirm-password">再次输入密码:</label>
        <input type="password" id="confirm-password" />
      </div>
    </div>

    <div class="button-box">
      <button class="btn">注册</button>
      <button class="btn">返回登录</button>
    </div>
  </div>
</template>



<style lang='scss' scoped>
  .loginBody-box {
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
  }

  .Tittle-box {
    height: 200px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .Tittle-box .title {
    font-size: 2em;
  }

  .enter-box {
    height: 400px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center; /* 垂直居中 */
    align-items: center; /* 水平居中 */
    padding: 20px;
  }

  .input-group {
    margin-bottom: 20px;
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
  }

  .input-group label {
    margin-right: 10px;
  }

  .input-group input {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 300px; /* 设置输入框宽度 */
  }

  .button-box {
    height: 130px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px; /* 设置按钮之间的间距 */
  }

  .button-box .btn {
    padding: 10px 20px;
    border: none;
    background-color: #007bff;
    color: white;
    font-size: 1em;
    border-radius: 5px;
    cursor: pointer;
  }

  .button-box .btn:hover {
    background-color: #0056b3;
  }
</style>
