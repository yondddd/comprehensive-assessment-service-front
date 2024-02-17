<script lang="ts" setup>
import { useUserStore } from "@/store/modules/user"

const userStore = useUserStore()
</script>

<template>
  <div class="app-container">
    <el-descriptions title="个人信息" direction="vertical" :column="2" border>
      <el-descriptions-item label="姓名">{{ userStore.username }}</el-descriptions-item>
      <el-descriptions-item label="角色">
        <el-tag size="small">{{ userStore.orgName }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="学校">{{ userStore.orgName }}</el-descriptions-item>
      <el-descriptions-item label="班级信息">{{ userStore.orgName }}</el-descriptions-item>
      <el-descriptions-item label="学/工号">{{ userStore.username }}</el-descriptions-item>
      <el-descriptions-item label="手机">{{ userStore.mobile }}</el-descriptions-item>
      <el-descriptions-item label="邮箱">{{ userStore.email }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped></style>
