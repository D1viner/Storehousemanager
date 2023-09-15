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
		  <el-form-item label="" class="custom-radio-container" >
			<el-radio-group v-model="form.role" class="custom-radio-group" >
			  <el-radio-button label="0">admin</el-radio-button>
			  <el-radio-button label="1">user</el-radio-button>
			</el-radio-group>
		  </el-form-item>
		  <el-form-item class="login-item">
			<el-button class="login-btn" type="primary" @click="login">login</el-button>
		  </el-form-item>
		  <el-form-item class="login-item register-btn">
			<el-button class="register-btn" type="primary"><router-link to="/register"> register</router-link></el-button>
		  </el-form-item>
		</el-form>
	  </div>
	</div>
  </template>
  
<script lang="ts" setup>

import { ref } from "vue";
import api from "../api/api.js";
import utils from "../utils/utils.js";
import { ElMessage, ElMessageBox } from 'element-plus';
import type { Action } from 'element-plus';
// import router from "../router/index.js";
import { useRouter } from "vue-router";

const router = useRouter();

const login = () => {
  var urlStr = "/login?username=" + form.value.username + "&password=" + form.value.password + "&role=" + form.value.role;
  console.log(urlStr);
  api.get(urlStr).then((resp) => {
    console.log(resp);
    console.log(resp.data.code);
    console.log(resp.data.data);
    console.log(resp.data.message);
    if (resp.data.data != null) {
      console.log(resp.data.data.username + "登录成功");
      console.log("登录成功");
      ElMessageBox.alert('登录成功', '登录', {
        confirmButtonText: '确定',
        callback: (action: Action) => {
          if (form.value.role === '0') {
            // 如果 role 为 0，则跳转到 /admin/storehouse
            router.push({ path: '/admin/storehouse' });
          } else {
            router.push({ path: '/home/storehouse' });
          }
        },
      });
    }
    else {
      console.log("登录失败");
      ElMessageBox.alert('登录失败', '登录', {
        confirmButtonText: '确定',
        callback: (action: Action) => {
          // 处理登录失败的逻辑
        },
      });
    }
  });
}
const form = ref({
	username: '',
	password: '',
	role: '0',
})
// const login = () => {

// 	var urlStr = "/login?username=" + form.value.username + "&password=" + form.value.password + "&role=" + form.value.role;
// 	console.log(urlStr);
// 	api.get(urlStr).then((resp) => {
// 		console.log(resp);
// 		console.log(resp.data.code);
// 		console.log(resp.data.data);
// 		console.log(resp.data.message);
// 		if (resp.data.data != null) {
// 			console.log(resp.data.data.username + "登录成功");
// 			console.log("登录成功");
// 			// 弹框提示用户
// 			// utils.showSuccess("登录成功");
// 			ElMessageBox.alert('登录成功', '登录', {
// 				confirmButtonText: '确定',
// 				callback: (action: Action) => {
// 					// ElMessage({
// 					//   type: 'info',
// 					//   message: `action: ${action}`,
// 					// })
// 					// 跳转到首页
// 					router.replace({ name: "storehouse" });
// 				},
// 			})

// 		}
// 		else {
// 			console.log("登录失败");
// 			// 弹出框
// 			// utils.showFail("登录失败");
// 			ElMessageBox.alert('登录失败', '登录', {
// 				confirmButtonText: '确定',
// 				callback: (action: Action) => {
// 					// ElMessage({
// 					//   type: 'info',
// 					//   message: `action: ${action}`,
// 					// })
// 				},
// 			})
// 		}


// 	});
// }

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
	height: 500px;
	margin: 100px auto;
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

.login-title {
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

.register-btn {
	width: 100%;
	border: none;
	background-color: #93e8e2;
	color: #fff;
	/* margin-top: 10px; */
	text-decoration: none;
}

.register-btn :hover {
	background-color: rgb(202, 202, 202);
}

.login-btn:hover {
	background-color: #80d6d2;

}

::v-deep .el-radio-button.is-active .el-radio-button__inner {
  background-color: #07e0d2 !important;
  color: #fff !important;
  border-color: #07e0d2 !important;
  box-shadow: none !important;
}

::v-deep .el-radio-button .el-radio-button__inner:hover {
  background-color: #fff !important;
  color: #07e0d2 !important;
  border-color: #07e0d2 !important;
  box-shadow: none !important;
}

::v-deep .custom-radio-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  width: 100%; /* 设置宽度为100%以充满父容器 */
}
a {
	text-decoration: none;
	color: #fff;
}
</style>

<style>

router-link {}

/* a {
	text-decoration: none;
	color: #fff;
} */

</style>