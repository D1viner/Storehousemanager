

<template>
  <div class="common-layout">
    <el-container>
      <el-header style="--el-header-padding: 0 0px">
				<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#545c64"
					text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
					<el-menu-item index="1" ><router-link to="/home"> StorehouseManager</router-link></el-menu-item>
					<el-sub-menu index="2">
						<template #title>Workspace</template>
						<el-menu-item index="2-1">item one</el-menu-item>
						<el-menu-item index="2-2">item two</el-menu-item>
						<el-menu-item index="2-3">item three</el-menu-item>
						<el-sub-menu index="2-4">
							<template #title>item four</template>
							<el-menu-item index="2-4-1">item one</el-menu-item>
							<el-menu-item index="2-4-2">item two</el-menu-item>
							<el-menu-item index="2-4-3">item three</el-menu-item>
						</el-sub-menu>
					</el-sub-menu>
					<el-menu-item index="3" disabled>Info</el-menu-item>
					<el-menu-item index="4">Orders</el-menu-item>
				</el-menu>
			</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <location />
                </el-icon>
                <span>仓库模块</span>
              </template>
              <el-menu-item-group title="仓库">
                <el-menu-item index="1-1"><router-link to="/home/sthouse"> 仓库列表</router-link></el-menu-item>
                <el-menu-item index="1-2"><router-link to="/home/storehouse">货物列表</router-link></el-menu-item>
              </el-menu-item-group>
              <el-sub-menu index="1-4">
                <template #title>课程</template>
                <el-menu-item index="1-4-1">选课信息</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="2">
              <el-icon><icon-menu /></el-icon>
              <span>后勤模块</span>
            </el-menu-item>
            <el-menu-item index="3">
              <el-icon>
                <setting />
              </el-icon>
              <span>系统设置</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view>

          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}

/* 不起作用 */
router-link {}

a {
  text-decoration: none;
  color: #333;
}
</style>