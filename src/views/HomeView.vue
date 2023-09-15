

<template>
  <div class="common-layout" style="height: 100%;">
    <el-container style="height: 100%;">


      <el-header style="--el-header-padding: 0 0px">

        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#07e0d2"
          text-color="#fff" active-text-color="#fff" @select="handleSelect" :ellipsis="false">
          <el-menu-item style="font-size: 20px; "><router-link to="/home"> StorehouseManager</router-link></el-menu-item>


          <div class="flex-grow" />
          <el-sub-menu index="2">
            <template #title>User</template>
            <el-menu-item index="2-1"><router-link to="/login" style="color: aliceblue;">
                Logout</router-link></el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-header>


      <el-container style="height: 100%;">
        <el-aside width="200px" style="height: 100%;">
          <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" style="height: 100%;">
            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <Folder />
                </el-icon>
                <span>仓库管理</span>
              </template>
              <el-menu-item-group title="仓库">
                <el-menu-item index="1-1"><router-link to="/home/storehouse">货物列表</router-link></el-menu-item>
                <el-menu-item index="1-2"><router-link to="/home/sthouse"> 仓库列表</router-link></el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-menu-item index="2">
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
import { Edit, Folder, Menu as IconMenu, Location, Message, Setting } from '@element-plus/icons-vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
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
  color: #000;
}
</style>