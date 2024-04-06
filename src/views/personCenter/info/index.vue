<script lang="ts" setup>
import { useUserStoreHook } from "@/store/modules/user"
import { getRoleNumber } from "@/store/modules/role"
const userStore = useUserStoreHook()
</script>

<template>
  <div class="app-container">
    <el-descriptions title="个人信息" direction="vertical" :column="2" border>
      <el-descriptions-item label="姓名">{{ userStore.username }}</el-descriptions-item>
      <el-descriptions-item label="角色">
        <el-tag size="small">{{ userStore.roles.map((role) => getRoleNumber(role)).join(", ") }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="学校">{{ userStore.orgName }}</el-descriptions-item>
      <el-descriptions-item label="班级信息">{{ userStore.classInfo }}</el-descriptions-item>
      <el-descriptions-item label="工号">{{ userStore.jobNumber }}</el-descriptions-item>
      <el-descriptions-item label="手机">{{ userStore.mobile }}</el-descriptions-item>
      <el-descriptions-item label="邮箱">{{ userStore.email }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped></style>
