<template>
    <div class="login-container">
        <div class="login-panel">
            <div class="login-title">
                <h1 class="title">Login</h1>
            </div>
            <el-form :model="form" label-width="120px" label-position="top">
                <el-form-item label="Username:" class="login-item">
                    <el-input v-model="form.username" />
                </el-form-item>
                <el-form-item label="Password:" class="login-item">
                    <el-input type="password" v-model="form.password" />
                </el-form-item>
                <el-form-item class="login-item">
                    <el-button class="login-btn" type="primary" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
	
	import {ref} from "vue";
	import api from "../api/api.js";
	import utils from "../utils/utils.js";
	import { ElMessage, ElMessageBox } from 'element-plus';
	import type { Action } from 'element-plus';
	import router from "../router/index.js";
	
	const form = ref({
	  username: '',
	  password: '',
	})
	const login = ()=>{
		
		var urlStr = "/login?username="+form.value.username+"&password="+form.value.password;
		console.log(urlStr);
		api.get(urlStr).then((resp)=>{ 
			console.log(resp);
			console.log(resp.data.code);
			console.log(resp.data.data);
			console.log(resp.data.message);
			if(resp.data.data != null)
			{
				console.log(resp.data.data.username+"登录成功");
				console.log("登录成功");
				// 弹框提示用户
				// utils.showSuccess("登录成功");
						  ElMessageBox.alert('登录成功', '登录', {
						     confirmButtonText: '确定',
						      callback: (action: Action) => {
						        // ElMessage({
						        //   type: 'info',
						        //   message: `action: ${action}`,
						        // })
								// 跳转到首页
								router.replace({name:"storehouse"});
						      },
						    })
				
			}
			else
			{
				console.log("登录失败");
				// 弹出框
				// utils.showFail("登录失败");
				 ElMessageBox.alert('登录失败', '登录', {
						      confirmButtonText: '确定',
						      callback: (action: Action) => {
						        // ElMessage({
						        //   type: 'info',
						        //   message: `action: ${action}`,
						        // })
						      },
						    })
			}
			
			
		});
	}
	
</script>
  
<style scoped>
.form-title {
    margin: 0;
    margin-bottom: 20px;
}

.title {
    color: #07e0d2;
}

.login-container {
    max-width: 400px;
    width: 300px;
    height: 400px;
    margin: 200px auto;
    padding: 20px;
    border: 2px solid #ccc;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: scale(1.1);
}
.login-title{
	text-align: center;
	margin-bottom: 40px;
	font-size: 25px;
}
.login-form {
    width: 100%;
}

.rounded-input {
    width: 100%;
}

.login-btn {
    width: 100%;
    border: none;
    background-color: #07e0d2;
    color: #fff;
    margin-top: 15px;
}

.login-btn:hover {
    background-color: #80d6d2;

}
</style>