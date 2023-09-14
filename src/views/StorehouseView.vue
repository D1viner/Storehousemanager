<template>
	<div class="alignment-container">
		<el-space alignment="center" :size="'large'">
			<el-date-picker v-model="dateRange" type="daterange" :shortcuts="shortcuts" range-separator="To"
				format="YYYY/MM/DD" value-format="YYYY-MM-DD" start-placeholder="Start date" end-placeholder="End date"
				@change="filterTableData" />
			<el-button size="small" round @click="resetDateRange">取消</el-button>

			<el-button type="primary" size="small" round @click="dialogFormVisible = true" class="add-btn">添加</el-button>
		</el-space>
	</div>

	<el-table :data="stData" style="width: 100%" stripe :header-cell-style="{ background: '#07e0d2', color: '#fff' }">
		<el-table-column prop="no" label="No" width="100" fixed />
		<el-table-column prop="name" label="Name" />
		<el-table-column prop="price" label="Price" />
		<el-table-column prop="num" label="Num" />
		<el-table-column prop="storehouseid" label="Storehouseid" />
		<el-table-column prop="inventorydate" label="Inventorydate" />

		<el-table-column fixed="right" label="Operations" width="200">
			<template #default="scope">
				<el-button plain size="small" @click="handleEdit(scope.$index)">修改</el-button>
				<el-button plain type="danger" size="small" @click="handleDel(scope.$index)">删除</el-button>
			</template>
		</el-table-column>

	</el-table>





	<el-dialog v-model="dialogFormVisible" title="添加货物" :width="'400px'">
		<el-form :model="addForm" label-position="top">
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
				<el-button type="primary" @click="handleAdd" class="color-btn">
					确认
				</el-button>
			</span>
		</template>
	</el-dialog>


	<el-dialog v-model="editDialogFormVisible" title="修改货物" :width="'400px'">
		<el-form :model="editForm" label-position="top">
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
				<el-button type="primary" @click="handleSave" class="color-btn">
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
import { format, parseISO } from 'date-fns';


var stData = ref([]);

api.get("/storehouse/").then((resp) => {
	stData.value = resp.data.data;
	console.log(resp.data);
});


const loadData = () => {
  api.get("/storehouse/").then((resp) => {
    stData.value = resp.data.data;
    console.log(resp.data);
  });
};


const resetDateRange = () => {
  dateRange.value = [];
  loadData();
};

const handleDel = (index) => {
	// @ts-ignore
	var no = stData.value[index].no;
	console.log('执行删除' + no);
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

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
}

const value1 = ref('')
const shortcuts = [
	{
		text: 'Last week',
		value: () => {
			const end = new Date()
			const start = new Date()
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
			return [start, end]
		},
	},
	{
		text: 'Last month',
		value: () => {
			const end = new Date()
			const start = new Date()
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
			return [start, end]
		},
	},
	{
		text: 'Last 3 months',
		value: () => {
			const end = new Date()
			const start = new Date()
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
			return [start, end]
		},
	},
]
const dateRange = ref([]);
const filterTableData = (dateRange) => {
	if (!dateRange || dateRange.length !== 2) {
		// 如果日期范围无效，不进行筛选
		return;
	}

	// 在这里进行数据获取，然后过滤
	api.get("/storehouse/").then((resp) => {
		const rawData = resp.data.data;

		const startDate = dateRange[0];
		const endDate = dateRange[1];

		const filteredData = rawData.filter(item => {
			// 将 inventorydate 字符串解析为日期对象
			const inventoryDate = parseISO(item.inventorydate);

			// 格式化日期为 'yyyy-MM-DD' 格式
			const formattedDate = format(inventoryDate, 'yyyy-MM-dd');

			// 检查日期是否在范围内
			return formattedDate >= startDate && formattedDate <= endDate;
		});

		// 更新 stData
		stData.value = filteredData;

		// 使用 filteredData 进行后续操作，例如更新视图
	});
};
</script>
  

<style scoped>
/* 在这里添加你的样式 */
.color-btn {
	background-color: #07e0d2;
	color: #fff;
	border: none;

}

/* 为按钮添加一些样式 */
.el-button {
	margin-right: 10px;
}

/* 为表格添加一些样式 */
.el-table {
	margin-top: 20px;
}

/* 为表单项添加一些样式 */
.el-form-item {
	margin-bottom: 10px;
}

/* 为按钮组添加一些样式 */
.dialog-footer .el-button {
	margin-top: -20px;
	margin-right: 5px;
}

.add-btn {
	background-color: #07e0d2;
	color: #fff;

	border: none;
}

.add-btn:hover {
	background-color: #80d6d2;

}

.common-layout {
	height: 100vh;
}

.alignment-container {
	width: 240px;
	margin-bottom: 20px;
	padding: 8px;
}

.el-container {
	height: 100%;

}

.el-aside {
	background-color: #D3DCE6;
	color: #333;
	text-align: center;
	line-height: 100vh;
}
</style>
