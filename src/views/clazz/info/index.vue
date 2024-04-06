<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import {
  createClassDataApi,
  deleteClassDataApi,
  updateClassDataApi,
  getClassDataApi,
  listAllCollegeApi
} from "@/api/class"
import { type GetClassData } from "@/api/class/types/class"
import { type FormInstance, type FormRules, ElMessage, ElMessageBox } from "element-plus"
import { Search, Refresh, CirclePlus, Delete, Download, RefreshRight } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"

defineOptions({
  // 命名当前组件
  name: "clazz"
})

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

//#region 增
const dialogVisible = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
const formData = reactive({
  name: "",
  type: 2
})
const formRules: FormRules = reactive({
  name: [{ required: true, trigger: "blur", message: "请输入班级名称" }]
})
const handleCreate = () => {
  formRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      if (currentUpdateId.value === undefined) {
        createClassDataApi(formData)
          .then(() => {
            ElMessage.success("新增成功")
            GetClassDataFunction()
          })
          .finally(() => {
            dialogVisible.value = false
          })
      } else {
        updateClassDataApi({
          id: currentUpdateId.value,
          name: formData.name
        })
          .then(() => {
            ElMessage.success("修改成功")
            GetClassDataFunction()
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
const handleDelete = (row: GetClassData) => {
  ElMessageBox.confirm(`正在删除学院：${row.name}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteClassDataApi(row.id).then(() => {
      ElMessage.success("删除成功")
      GetClassDataFunction()
    })
  })
}
//#endregion

//#region 改
const currentUpdateId = ref<undefined | string>(undefined)
const handleUpdate = (row: GetClassData) => {
  currentUpdateId.value = row.id
  formData.name = row.name
  dialogVisible.value = true
}
//#endregion

//#region 查
const tableData = ref<GetClassData[]>([])
const searchFormRef = ref<FormInstance | null>(null)
const searchData = reactive({
  name: "",
  parentId: null
})
const collegeAllData = ref<GetClassData[]>([])
const GetCollegeAllData = () => {
  loading.value = true
  listAllCollegeApi()
    .then((res) => {
      collegeAllData.value = res.data
    })
    .catch(() => {
      collegeAllData.value = []
    })
    .finally(() => {
      loading.value = false
    })
}

const GetClassDataFunction = () => {
  loading.value = true
  getClassDataApi({
    pageNo: paginationData.currentPage,
    pageSize: paginationData.pageSize,
    name: searchData.name || "",
    parentId: searchData.parentId || 0,
    type: 2
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
  paginationData.currentPage === 1 ? GetClassDataFunction() : (paginationData.currentPage = 1)
}
const resetSearch = () => {
  searchFormRef.value?.resetFields()
  handleSearch()
}
//#endregion

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], GetClassDataFunction, { immediate: true })
GetCollegeAllData()
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="parentId" label="学院">
          <el-select v-model="searchData.parentId" placeholder="请选择学院">
            <!-- 下拉选项 -->
            <el-option v-for="college in collegeAllData" :key="college.id" :label="college.name" :value="college.id" />
          </el-select>
        </el-form-item>
        <el-form-item prop="name" label="班级">
          <el-input v-model="searchData.name" placeholder="请输入班级名称" />
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
          <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true">新增班级</el-button>
          <el-button type="danger" :icon="Delete">批量删除</el-button>
        </div>
        <div>
          <el-tooltip content="下载">
            <el-button type="primary" :icon="Download" circle />
          </el-tooltip>
          <el-tooltip content="刷新当前页">
            <el-button type="primary" :icon="RefreshRight" circle @click="GetClassDataFunction" />
          </el-tooltip>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="parentName" label="学院" align="center" />
          <el-table-column prop="name" label="班级名称" align="center" />
          <el-table-column prop="status" label="状态" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.status" type="success" effect="plain">启用</el-tag>
              <el-tag v-else type="danger" effect="plain">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="creationTime" label="创建时间" align="center" />
          <el-table-column prop="remark" label="备注" align="center" />
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
      :title="currentUpdateId === undefined ? '新增班级' : '修改学院'"
      @close="resetForm"
      width="30%"
    >
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="left">
        <el-form-item prop="name" label="学院名称">
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
