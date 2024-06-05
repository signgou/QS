<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useGetUser } from '../hook/useAdid';
import { onBeforeMount, reactive } from 'vue';
import { useError } from '@/hook/useAlert';
import { useUidDelUser } from '@/hook/useUid';
import { useConfirmDelete } from '@/hook/useAlert';
const router = useRouter()
interface User {
    uid: string,
    username: string,
    qnNum: number
}
const data = reactive<User[]>([])

onBeforeMount(() => {
    async function main() {
        const { uids, useNames, qnNums } = await useGetUser();
        let len = uids.value.length;
        for (let i = 0; i < len; i++) {
            data.push({
                uid: uids.value[i],
                username: useNames.value[i],
                qnNum: qnNums.value[i]
            })
        }
    }
    main().catch(err => {
        useError('获取信息失败');
    })
})


function edit(uid: string) {
    router.push(`/user/${uid}?admin=1`)
}
async function deleteIt(index: number, uid: string) {
    useConfirmDelete(async () => {
        await useUidDelUser(uid);
        data.splice(index, 1);
    })
}
function out() {
    router.push('/');
}
</script>


<template>
    <div class="Main-box">
        <div class="Tittle-box">
            <el-icon color="#0087d1" size="40px">
                <Avatar />
            </el-icon>
            <el-text style="font-weight: bold;color:#0087d1;font-size: 40px; margin-left: 10px;"
                class="title">管理员</el-text>
        </div>
        <div class="show-box">
            <el-table :data="data" style="width: 100%;" max-height="700px">
                <el-table-column label="用户">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <el-icon>
                                <user />
                            </el-icon>
                            <span style="margin-left: 10px">{{ scope.row.username }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="问卷数量">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <el-icon><Document /></el-icon>
                            <span style="margin-left: 10px">{{ scope.row.qnNum }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <el-button type="primary" link @click="edit(scope.row.uid)">
                                <el-icon>
                                    <Edit />
                                </el-icon>
                                <span>编辑</span>
                            </el-button>
                            <el-button type="danger" link @click="deleteIt(scope.$index, scope.row.uid)">
                                <el-icon>
                                    <Delete />
                                </el-icon>
                                <span>删除</span>
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="down-box">
            <el-button @click="out" type="primary">退出</el-button>
        </div>
    </div>
</template>

<style lang='scss' scoped>
.Main-box {
    height: 930px;
    width: 1400px;
    overflow: auto;

    background-image: url('/back12.jpg');
    background-color: aliceblue;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 15px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .Tittle-box {
        height: 100px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .show-box {
        height: 800px;
        width: 100%;
        display: flex;
        align-items: start;
        justify-content: center;
    }

    .down-box {
        height: 100px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

    }
}
.el-table{
    --el-table-header-bg-color:rgba($color: #000000, $alpha: 0);
    --el-table-tr-bg-color:rgba($color: #000000, $alpha: 0);
    background-color:rgba($color: #fff, $alpha: 0.5);
}

</style>
