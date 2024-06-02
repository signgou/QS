<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter()

function Back() {
    router.push('/');
}
</script>


<template>
    <div class="Main-box">
        <el-row>
            <el-col>
                <el-result >
                    <template #icon>
                        <el-image
                            src="/success.gif"
                        />
                    </template>
                    <template #title>
                        <el-text class="mx-1" style="color:#f8f8f8;font-size: 25px;">问卷填写成功</el-text>
                    </template>
                    <template #sub-title>
                        <el-text class="mx-1" style="color:#f8f8f8;font-size: 15px;">感谢你的参与</el-text>
                    </template>
                    <template #extra>
                        <el-button type="primary" @click='Back' color="#c6a57a">我也想创建问卷</el-button>
                    </template>
                </el-result>
            </el-col>
        </el-row>
    </div>
</template>

<style lang='scss' scoped>
.Main-box {
    height: 930px;
    width: 1400px;
    overflow: auto;
    
    background-image: url('/back6.jpg');
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
    align-items: center; /* 水平居中 */
    justify-content: center; /* 垂直居中 */
}
</style>
