
import {Elloading,ElMessage} from 'element-plus';

const utils = {
	
	// 加载状态
	loadding:null,
	showLoading(msg)
	{
		// 显示加载的组件
		utils.loadding = ElLoading.service({
			lock:true,
			text:msg?msg:"加载中"
		})
	},
	hideLoading()
	{
		// 关闭加载组件
		utils.loading && utils.loadding.close();
	},
	showError(msg)
	{
		return ELMessage({
			message:msg,
			grouping:true,
			type:'error'
		})
	},
	showSuccess(msg)
	{
		return ELMessage({
			message:msg,
			grouping:true,
			type:'success'
		})
	},
	closeMsg()
	{
		ElMessage.closeAll();
	}
}

export default utils;