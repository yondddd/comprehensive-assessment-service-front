<script lang="ts" setup>
import { useUserStore } from "@/store/modules/user"

const userStore = useUserStore()
</script>

<template>
  <div class="app-container">
    <el-descriptions title="个人信息" direction="vertical" :column="4" border>
      <el-descriptions-item label="学校">{{ userStore.orgName }}</el-descriptions-item>
      <el-descriptions-item label="用户名">{{ userStore.username }}</el-descriptions-item>
      <el-descriptions-item label="手机号">{{ userStore.mobile }}</el-descriptions-item>
      <el-descriptions-item label="居住地" :span="2">苏州市</el-descriptions-item>
      <el-descriptions-item label="备注">
        <el-tag size="small">学校</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped></style>
