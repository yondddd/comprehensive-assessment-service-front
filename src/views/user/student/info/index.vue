<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { createUserDataApi, deleteUserDataApi, updateUserDataApi, getUserDataApi } from "@/api/student"
import { GetUserData, StatusData } from "@/api/student/types/student"
import { type FormInstance, type FormRules, ElMessage, ElMessageBox } from "element-plus"
import { Search, Refresh, CirclePlus, Delete, Download, RefreshRight } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"

defineOptions({
  // 命名当前组件
  name: "student"
})

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()
const statusData = ref<StatusData[]>([
  { id: "1", name: "正常" },
  { id: "0", name: "禁用" }
])

//#region 增
const dialogVisible = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
const formData = reactive({
  name: "",
  type: 1
})
const formRules: FormRules = reactive({
  collegeName: [{ required: true, trigger: "blur", message: "请输入学院名称" }],
  className: [{ required: true, trigger: "blur", message: "请输入班级名称" }],
  name: [{ required: true, trigger: "blur", message: "请输入学生姓名" }]
})
const handleCreate = () => {
  formRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      if (currentUpdateId.value === undefined) {
        createUserDataApi(formData)
          .then(() => {
            ElMessage.success("新增成功")
            GetUserDataFunction()
          })
          .finally(() => {
            dialogVisible.value = false
          })
      } else {
        updateUserDataApi({
          id: currentUpdateId.value,
          name: formData.name
        })
          .then(() => {
            ElMessage.success("修改成功")
            GetUserDataFunction()
          })
          .finally(() => {
            dialogVisible.value = false
          })
      }
    } else {
      console.error("表单校验不通过", fields)
    }
  })
}
const resetForm = () => {
  currentUpdateId.value = undefined
  formData.name = ""
}
//#endregion

//#region 删
const handleDelete = (row: GetUserData) => {
  ElMessageBox.confirm(`正在删除学院：${row.name}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteUserDataApi(row.id).then(() => {
      ElMessage.success("删除成功")
      GetUserDataFunction()
    })
  })
}
//#endregion

//#region 改
const currentUpdateId = ref<undefined | string>(undefined)
const handleUpdate = (row: GetUserData) => {
  currentUpdateId.value = row.id
  formData.name = row.name
  dialogVisible.value = true
}
//#endregion

//#region 查
const tableData = ref<GetUserData[]>([])
const searchFormRef = ref<FormInstance | null>(null)
const searchData = reactive({
  name: "",
  jobNumber: "",
  status: null
})
const GetUserDataFunction = () => {
  loading.value = true
  getUserDataApi({
    pageNo: paginationData.currentPage,
    pageSize: paginationData.pageSize,
    name: searchData.name || "",
    jobNumber: searchData.jobNumber || "",
    roleId: 3,
    status: searchData.status
  })
    .then((res) => {
      paginationData.total = res.total
      tableData.value = res.data
    })
    .catch(() => {
      tableData.value = []
    })
    .finally(() => {
      loading.value = false
    })
}
const handleSearch = () => {
  paginationData.currentPage === 1 ? GetUserDataFunction() : (paginationData.currentPage = 1)
}
const resetSearch = () => {
  searchFormRef.value?.resetFields()
  handleSearch()
}
//#endregion

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], GetUserDataFunction, { immediate: true })
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="jobNumber" label="学号">
          <el-input v-model="searchData.jobNumber" placeholder="请输入学号" />
        </el-form-item>
        <el-form-item prop="name" label="姓名">
          <el-input v-model="searchData.name" placeholder="请输入学生姓名" />
        </el-form-item>

        <el-form-item prop="status" label="状态">
          <el-select v-model="searchData.status" placeholder="请选择状态">
            <!-- 下拉选项 -->
            <el-option v-for="status in statusData" :key="status.id" :label="status.name" :value="status.id" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true">新增学生</el-button>
          <el-button type="danger" :icon="Delete">批量删除</el-button>
        </div>
        <div>
          <el-tooltip content="下载">
            <el-button type="primary" :icon="Download" circle />
          </el-tooltip>
          <el-tooltip content="刷新当前页">
            <el-button type="primary" :icon="RefreshRight" circle @click="GetUserDataFunction" />
          </el-tooltip>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="collegeName" label="学院" align="center" />
          <el-table-column prop="className" label="班级" align="center" />
          <el-table-column prop="name" label="姓名" align="center" />
          <el-table-column prop="jobNumber" label="学号" align="center" />
          <el-table-column prop="mobile" label="手机" align="center" />
          <el-table-column prop="email" label="邮箱" align="center" />
          <el-table-column prop="idCard" label="身份证" align="center" />
          <el-table-column prop="gender" label="性别" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.gender" type="primary" effect="plain">男</el-tag>
              <el-tag v-else type="danger" effect="plain">女</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.status" type="success" effect="plain">启用</el-tag>
              <el-tag v-else type="danger" effect="plain">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="creationTime" label="创建时间" align="center" />
          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager-wrapper">
        <el-pagination
          background
          :layout="paginationData.layout"
          :page-sizes="paginationData.pageSizes"
          :total="paginationData.total"
          :page-size="paginationData.pageSize"
          :currentPage="paginationData.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <!-- 新增/修改 -->
    <el-dialog
      v-model="dialogVisible"
      :title="currentUpdateId === undefined ? '新增学生' : '修改学生'"
      @close="resetForm"
      width="30%"
    >
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="left">
        <el-form-item prop="collegeName" label="学院名称">
          <el-input v-model="formData.collegeName" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="className" label="班级名称">
          <el-input v-model="formData.className" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="name" label="学生姓名">
          <el-input v-model="formData.name" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCreate">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
