<template>
	<el-button type="primary" @click="dialogFormVisible = true">
		添加
	</el-button>
	<el-table :data="stData" style="width: 100%">
		<el-table-column prop="no" label="No" width="100" />
		<el-table-column prop="name" label="Name" width="180" />
		<el-table-column prop="price" label="Price" width="180" />
		<el-table-column prop="num" label="Num" width="180" />
		<el-table-column prop="storehouseid" label="Storehouseid" width="180" />
		<el-table-column prop="inventorydate" label="Inventorydate" width="180" />


		<el-table-column fixed="right" label="Operations" width="120">
			<template #default="scope">
				<el-button link type="primary" size="small" @click="handleDel(scope.$index)">删除</el-button>
				<el-button link type="primary" size="small" @click="handleEdit(scope.$index)">修改</el-button>
			</template>
		</el-table-column>
	</el-table>


	<el-dialog v-model="dialogFormVisible" title="添加货物">
		<el-form :model="addForm">
			<el-form-item label="No" :label-width="formLabelWidth">
				<el-input v-model="addForm.no" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Name" :label-width="formLabelWidth">
				<el-input v-model="addForm.name" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Price" :label-width="formLabelWidth">
				<el-input v-model="addForm.price" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Num" :label-width="formLabelWidth">
				<el-input v-model="addForm.num" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Storehouseid" :label-width="formLabelWidth">
				<el-input v-model="addForm.storehouseid" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Inventorydate" :label-width="formLabelWidth">
				<el-date-picker v-model="addForm.inventorydate" type="date" placeholder="Pick a day" format="YYYY/MM/DD"
					value-format="YYYY-MM-DD" />
			</el-form-item>

		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取消</el-button>
				<el-button type="primary" @click="handleAdd">
					确认
				</el-button>
			</span>
		</template>
	</el-dialog>


	<el-dialog v-model="editDialogFormVisible" title="添加货物">
		<el-form :model="editForm">
			<el-form-item label="No" :label-width="formLabelWidth">
				<el-input v-model="editForm.no" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Name" :label-width="formLabelWidth">
				<el-input v-model="editForm.name" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Price" :label-width="formLabelWidth">
				<el-input v-model="editForm.price" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Num" :label-width="formLabelWidth">
				<el-input v-model="editForm.num" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Storehouseid" :label-width="formLabelWidth">
				<el-input v-model="editForm.storehouseid" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Inventorydate" :label-width="formLabelWidth">
				<el-date-picker v-model="editForm.inventorydate" type="date" placeholder="Pick a day" format="YYYY/MM/DD"
					value-format="YYYY-MM-DD" />
			</el-form-item>
		</el-form>

		<template #footer>
			<span class="dialog-footer">
				<el-button type="primary" @click="handleSave">
					保存
				</el-button>
			</span>
		</template>
	</el-dialog>


</template>
  
<script lang=ts setup>
import { ref, reactive } from 'vue';
import api from "../api/api.js";
import { ElMessage, ElMessageBox } from 'element-plus';
import type { Action } from 'element-plus';

var stData = ref([]);

api.get("/storehouse/").then((resp) => {
	stData.value = resp.data.data;
	console.log(resp.data);
});

const handleDel = (index) => {
	// @ts-ignore
	var no = stData.value[index].no;
	console.log('执行删除' + no);

	// 弹出询问框
	ElMessageBox.confirm(
		'是否确认删除编号' + no + '的货物',
		'Warning',
		{
			confirmButtonText: '确认',
			cancelButtonText: '取消',
			type: 'warning',
		}
	)
		.then(() => {

			// 执行删除
			api.delete("/storehouse/" + no).then((resp) => {
				console.log(resp.data);
				if (resp.data.data == true) {
					ElMessage({
						type: 'success',
						message: '删除成功',
					})
					// 更新数据
					api.get("/storehouse/").then((resp) => {
						stData.value = resp.data.data;
					});
				}
				else {
					ElMessage({
						type: 'info',
						message: '删除失败',
					})
				}

			});
		})
		.catch(() => {
			ElMessage({
				type: 'info',
				message: '删除取消',
			})
		})
}

const dialogFormVisible = ref(false);
const formLabelWidth = '100px';
const addForm = reactive({
	no: '',
	name: '',
	price: '',
	num: '',
	storehouseid: '',
	inventorydate: '',
})

const editForm = reactive({
	no: '',
	name: '',
	price: '',
	num: '',
	storehouseid: '',
	inventorydate: '',
})
const handleAdd = () => {
	// 添加数据
	// console.log(addForm);
	api.post("/storehouse/", addForm).then((resp) => {
		console.log(resp.data);
		if (resp.data.data == true) {
			console.log("增加成功");
			// 重新请求数据
			api.get("/storehouse/").then((resp) => {
				console.log(resp.data);
				stData.value = resp.data.data;
			});
			// 隐藏对话框
			dialogFormVisible.value = false;
		}
		else {
			console.log("增加失败");

			ElMessageBox.alert('增加失败', '添加学生', {
				confirmButtonText: '确认',
				callback: (action: Action) => {
					ElMessage({
						type: 'info',
						message: `action: ${action}`,
					})
				},
			})
		}
	});
}
const editDialogFormVisible = ref(false);

const handleSave = () => {
	// 添加数据
	api.put("/storehouse/", editForm).then((resp) => {
		console.log(resp.data);
		if (resp.data.data == true) {
			console.log("修改成功");
			// 重新请求数据
			api.get("/storehouse/").then((resp) => {
				console.log(resp.data);
				stData.value = resp.data.data;
			});
			// 隐藏对话框
			editDialogFormVisible.value = false;
		}
		else {
			console.log("修改失败");

			ElMessageBox.alert('修改失败', '修改学生', {
				confirmButtonText: '确认',
				callback: (action: Action) => {
					ElMessage({
						type: 'info',
						message: `action: ${action}`,
					})
				},
			})
		}
	});
}

const handleEdit = (index) => {
	console.log(stData.value[index])
	// @ts-ignore
	var no = stData.value[index].no;
	console.log('编辑' + no);
	// @ts-ignore
	editForm.no = stData.value[index].no;
	// @ts-ignore
	editForm.name = stData.value[index].name;
	// @ts-ignore
	editForm.price = stData.value[index].price;
	// @ts-ignore
	editForm.num = stData.value[index].num;
	// @ts-ignore
	editForm.storehouseid = stData.value[index].storehouseid;
	// @ts-ignore
	editForm.inventorydate = stData.value[index].inventorydate;
	
	editDialogFormVisible.value = true;
}
</script>
  