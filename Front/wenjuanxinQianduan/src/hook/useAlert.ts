import { ElMessage,ElMessageBox } from 'element-plus';

export function useSuccess(msg : string){
    ElMessage({
        showClose: true,
        message: msg,
        type : 'success',
        duration : 1000
      })
}
export function useError(msg : string){
  ElMessageBox.alert(
      msg,
    '错误',
    {
      confirmButtonText: 'OK',
      type: 'error'
    }
  )
}

export function useConfirmDelete(yes:Function){
  ElMessageBox.confirm(
    '你确定要删除吗？',
    '请确认',
    {
      distinguishCancelAndClose: true,
      confirmButtonText: '是的',
      cancelButtonText: '点错了',
      type:'error'
    }
  )
    .then(() => {
      yes();
    })
}