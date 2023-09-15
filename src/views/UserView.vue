<template>
    <el-table :data="stData" style="width: 100%" stripe :header-cell-style="{ background: '#07e0d2', color: '#fff' }">
        <el-table-column prop="username" label="Username" fixed="left" :width="'180px'" />
        <el-table-column prop="password" label="Password" />
        <el-table-column prop="role" label="Role" />

        <el-table-column fixed="right" label="Operations" width="200">
            <template #default="scope">
                <el-button plain size="small" @click="handleEdit(scope.$index)">修改</el-button>
                <el-button plain type="danger" size="small" @click="handleDel(scope.$index)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-button type="primary" size="small" round @click="dialogFormVisible = true" class="add-btn">
        添加
    </el-button>


    <el-dialog v-model="dialogFormVisible" title="添加用户" :width="'400px'">
        <el-form :model="addForm" label-position="top">
            <el-form-item label="Username" :label-width="formLabelWidth">
                <el-input v-model="addForm.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Password" :label-width="formLabelWidth">
                <el-input v-model="addForm.password" autocomplete="off" />
            </el-form-item>
            <el-radio-group v-model="addForm.role" class="ml-4">
					<el-radio label="0" size="large">admin</el-radio>
					<el-radio label="1" size="large">user</el-radio>
				</el-radio-group>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="handleAdd" style="    background-color: #07e0d2;color: #fff;border: none;">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>


    <el-dialog v-model="editDialogFormVisible" title="修改仓库" :width="'400px'">
        <el-form :model="editForm" label-position="top">
            <el-form-item label="Username" :label-width="formLabelWidth">
                <el-input v-model="editForm.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Password" :label-width="formLabelWidth">
                <el-input v-model="editForm.password" autocomplete="off" />
            </el-form-item>
            <el-radio-group v-model="editForm.role" class="ml-4">
					<el-radio label="0" size="large">admin</el-radio>
					<el-radio label="1" size="large">user</el-radio>
				</el-radio-group>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="handleSave"
                    style="    background-color: #07e0d2;color: #fff;border: none;">
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

api.get("/user/").then((resp) => {
    stData.value = resp.data.data;
    console.log(resp.data);
});

const handleDel = (index) => {
    // @ts-ignore
    var username = stData.value[index].username;
    console.log('执行删除' + username);

    // 弹出询问框
    ElMessageBox.confirm(
        '是否确认删除' + username + '的用户',
        'Warning',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {

            // 执行删除
            api.delete("/user/" + username).then((resp) => {
                console.log(resp.data);
                if (resp.data.data == true) {
                    ElMessage({
                        type: 'success',
                        message: '删除成功',
                    })
                    // 更新数据
                    api.get("/user/").then((resp) => {
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
const formLabelWidth = '150px';
const addForm = reactive({
    username: '',
    password: '',
    role: '',
})

const editForm = reactive({
    username: '',
    password: '',
    role: '',
})
const handleAdd = () => {
    // 添加数据
    // console.log(addForm);
    api.post("/user/", addForm).then((resp) => {
        console.log(resp.data);
        if (resp.data.data == true) {
            console.log("增加成功");
            // 重新请求数据
            api.get("/user/").then((resp) => {
                console.log(resp.data);
                stData.value = resp.data.data;
            });
            // 隐藏对话框
            dialogFormVisible.value = false;
        }
        else {
            console.log("增加失败");

            ElMessageBox.alert('增加失败', '添加用户', {
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
    api.put("/user/", editForm).then((resp) => {
        console.log(resp.data);
        if (resp.data.data == true) {
            console.log("修改成功");
            // 重新请求数据
            api.get("/user/").then((resp) => {
                console.log(resp.data);
                stData.value = resp.data.data;
            });
            // 隐藏对话框
            editDialogFormVisible.value = false;
        }
        else {
            console.log("修改失败");

            ElMessageBox.alert('修改失败', '修改用户', {
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
    // console.log(stData.value[index])
    // @ts-ignore
    var username = stData.value[index].username;
    console.log('编辑' + username);
    // @ts-ignore
    editForm.username = stData.value[index].username;
    // @ts-ignore
    editForm.password = stData.value[index].password;
    // @ts-ignore
    editForm.role = stData.value[index].role;

    editDialogFormVisible.value = true;
}
</script>


<style scoped>
/* 在这里添加你的样式 */

/* 为按钮添加一些样式 */
.el-button {
    margin-right: 10px;
}

/* 为表格添加一些样式 */

/* 为表单项添加一些样式 */
.el-form-item {
    margin-bottom: 15px;
}

/* 为按钮组添加一些样式 */
.dialog-footer .el-button {
    margin-top: -20px;
    margin-right: 5px;
}

.add-btn {
    margin-top: 20px;
    background-color: #07e0d2;
    color: #fff;
    border: none;

}
</style>
