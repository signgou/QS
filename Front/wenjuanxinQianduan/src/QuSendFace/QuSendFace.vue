<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';
import vueQr from 'vue-qr/src/packages/vue-qr.vue';

const router = useRouter();
const route = useRoute();
function Quit() {
  router.push('/')
}
function Back() {
  router.go(-1)
}

function qrCallBack(qrUrl) {
      qrDownloadUrl.value = qrUrl;
}
//下载二维码
function downloadQrcode() {
      let a = document.createElement('a');
      a.download = '我的二维码';
      a.href = qrDownloadUrl.value;
      a.click();
}
let qrDownloadUrl = ref<string>('');
let shareURL = ref<string>(`http://192.168.99.254:5173/fill/${ route.params.qnid }`); 
</script>


<template>
  <div class="Main-box">
    <div class="content-box">
      <div class="showBody-box">
        <div class="head-box">
          <div class="head">问卷分享</div>
        </div>
        <div class="trueShow-box">
          <el-row>
            <el-col>
              <el-result>
                <template #icon>
                  <vue-qr :callback="qrCallBack"  :text="shareURL" :size="200"></vue-qr>
                </template>
                <template #title>
                  <el-text class="mx-1" style="color:#000000;font-size: 30px;">分享链接 </el-text>
                </template>
                <template #sub-title>
                  <el-text class="mx-1" style="background-color:#e4ded2;color:#000000;font-size: 20px;">{{shareURL}}</el-text>
                </template>

                <template #extra>
                  <el-button type="primary" @click='downloadQrcode' color="#c6a57a">下载二维码</el-button>
                </template>
              </el-result>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="down-box">
      <button class="down-btn" @click="Quit">退出</button>
      <button class="down-btn" @click="Back">返回</button>
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

  background-image: url('/back5.jpg');
  background-color: aliceblue;
  background-size: cover;
  /* 使背景图片覆盖整个容器 */
  background-position: center;
  /* 使背景图片居中 */
  background-repeat: no-repeat;
  /* 防止背景图片重复 */

  border-radius: 15px;
  padding: 10px;
  /* 添加内边距 */
  display: flex;
  flex-direction: column;
  /* 使子元素垂直排列 */
  align-items: center;

  /* 水平居中 */
  .content-box {
    display: flex;
    flex-direction: row;
    /* 使 .showBody-box 和 .side-box 水平排列 */
    align-items: flex-start;
    /* 上对齐 */
    gap: 10px;
    /* 添加间距 */
  }

  .showBody-box {
    align-items: center;
    height: 800px;
    width: 1380px;

    .head-box {
      height: 50px;
      width: 1380px;
      border: 1px solid rgb(4, 2, 21);
      /* 添加边框 */
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;

      .head {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
      }
    }

    .trueShow-box {
      height: 720px;
      width: 1380px;
      border: 1px solid rgb(4, 2, 21);
      /* 添加边框 */
      overflow-y: auto;
      /* 启用垂直滚动条 */
      display: flex;
      flex-direction: column;
      /* 使内部组件垂直排列 */
      padding: 10px;
      /* 添加内边距 */
    }
  }

  .down-box {
    height: 100px;
    width: 100%;
    /* 使用100%宽度 */
    border: 1px solid rgb(4, 2, 21);
    /* 添加边框 */
    margin-top: 10px;
    /* 添加顶部间距 */
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
    gap: 20px;
    /* 按钮之间的间距 */
  }

  .down-btn {
    padding: 10px 20px;
    border: none;
    background-color: #000000;
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
