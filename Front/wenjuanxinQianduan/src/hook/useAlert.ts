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

export function useConfirmSuccess(msg:string,ok:string,cancel:string,yes:Function){
  ElMessageBox.confirm(
    msg,
    '请选择后续操作',
    {
      distinguishCancelAndClose: true,
      confirmButtonText: ok,
      cancelButtonText: cancel,
      type:'success'
    }
  )
    .then(() => {
      yes();
    })
}

export async function usePrompt(msg:string){
  let {value}=await ElMessageBox.prompt(msg, 'Tip', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
  });
  return value;
}