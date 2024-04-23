<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { createCheckDataApi, updateCheckDataApi, getCheckDataApi } from "@/api/check"
import { GetCheckData } from "@/api/check/types/check"
import { type FormInstance, type FormRules, ElMessage } from "element-plus"
import { Search, Refresh, Download, RefreshRight } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"

defineOptions({
  // 命名当前组件
  name: "studentScore"
})

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

//#region 增
const dialogVisible = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
const formData = reactive({
  name: "",
  type: 1
})
const formRules: FormRules = reactive({
  name: [{ required: true, trigger: "blur", message: "请输入学院名称" }]
})
const handleCreate = () => {
  formRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      if (currentUpdateId.value === undefined) {
        createCheckDataApi(formData)
          .then(() => {
            ElMessage.success("新增成功")
            GetCollegeDataFunction()
          })
          .finally(() => {
            dialogVisible.value = false
          })
      } else {
        updateCheckDataApi({
          id: currentUpdateId.value,
          name: formData.name
        })
          .then(() => {
            ElMessage.success("修改成功")
            GetCollegeDataFunction()
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

// //#region 删
// const handleDelete = (row: GetCheckData) => {
//   ElMessageBox.confirm(`正在删除学院：${row.name}，确认删除？`, "提示", {
//     confirmButtonText: "确定",
//     cancelButtonText: "取消",
//     type: "warning"
//   }).then(() => {
//     deleteCheckDataApi(row.id).then(() => {
//       ElMessage.success("删除成功")
//       GetCollegeDataFunction()
//     })
//   })
// }
//#endregion

//#region 改
const currentUpdateId = ref<undefined | string>(undefined)
// const handleUpdate = (row: GetCheckData) => {
//   currentUpdateId.value = row.id
//   formData.name = row.name
//   dialogVisible.value = true
// }
//#endregion

//#region 查
const tableData = ref<GetCheckData[]>([])
const searchFormRef = ref<FormInstance | null>(null)
const searchData = reactive({
  name: "",
  jobNumber: ""
})
const GetCollegeDataFunction = () => {
  loading.value = true
  getCheckDataApi({
    pageNo: paginationData.currentPage,
    pageSize: paginationData.pageSize,
    name: searchData.name || "",
    jobNumber: searchData.jobNumber || ""
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
  paginationData.currentPage === 1 ? GetCollegeDataFunction() : (paginationData.currentPage = 1)
}
const resetSearch = () => {
  searchFormRef.value?.resetFields()
  handleSearch()
}
//#endregion

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], GetCollegeDataFunction, { immediate: true })
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
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <!-- <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true">新增学院</el-button> -->
          <!-- <el-button type="danger" :icon="Delete">批量删除</el-button> -->
        </div>
        <div>
          <el-tooltip content="下载">
            <el-button type="primary" :icon="Download" circle />
          </el-tooltip>
          <el-tooltip content="刷新当前页">
            <el-button type="primary" :icon="RefreshRight" circle @click="GetCollegeDataFunction" />
          </el-tooltip>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="jobNumber" label="学号" align="center" />
          <el-table-column prop="name" label="姓名" align="center" />
          <el-table-column prop="grade" label="年级" align="center" />
          <el-table-column prop="clazz" label="班级" align="center" />
          <el-table-column prop="majorScore" label="学业分" align="center" />
          <el-table-column prop="majorMatchScore" label="专业比赛分" align="center" />
          <el-table-column prop="secondClassScore" label="第二课堂分" align="center" />
          <el-table-column prop="totalScore" label="综测总分" align="center" />
          <el-table-column prop="totalRanking" label="综测总排行" align="center" />
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
      :title="currentUpdateId === undefined ? '新增学院' : '修改学院'"
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
