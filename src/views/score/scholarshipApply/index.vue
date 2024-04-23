<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { saveScholarshipApply, updateCompreDataApi, getCompreDataApi } from "@/api/scoreCompre"
import { GetCompreData, scholarType } from "@/api/scoreCompre/types/scoreCompre"
import { type FormInstance, type FormRules, ElMessage } from "element-plus"
import { CirclePlus, Download, RefreshRight } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"

defineOptions({
  // 命名当前组件
  name: "scholarship"
})

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()
const statusData = ref<scholarType[]>([
  { id: "1", name: "红棉奖学金（学业优秀 ）" },
  { id: "2", name: "蒲公英奖学金（学术科技创新创业）" },
  { id: "3", name: "风藤奖学金" }
])

//#region 增
const dialogVisible = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
const formData = reactive({
  name: "",
  type: "",
  projectName: "",
  level: "",
  num: "",
  score: ""
})
const formRules: FormRules = reactive({
  name: [{ required: true, trigger: "blur", message: "请输入学生名称" }],
  jobNumber: [{ required: true, trigger: "blur", message: "请输入学号" }],
  type: [{ required: true, trigger: "blur", message: "请输入奖学金类型" }],
  level: [{ required: true, trigger: "blur", message: "请输入获奖级别" }],
  num: [{ required: true, trigger: "blur", message: "请输入获奖名次" }],
  score: [{ required: true, trigger: "blur", message: "请输入申请金额" }]
})
const handleCreate = () => {
  formRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      if (currentUpdateId.value === undefined) {
        saveScholarshipApply({
          scholarshipType: formData.type,
          prize: formData.score
        })
          .then(() => {
            ElMessage.success("新增成功")
            GetCollegeDataFunction()
          })
          .finally(() => {
            dialogVisible.value = false
          })
      } else {
        updateCompreDataApi({
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

//#region 删
// const handleDelete = (row: GetCompreData) => {
//   ElMessageBox.confirm(`正在删除申请：${row.type}，确认删除？`, "提示", {
//     confirmButtonText: "确定",
//     cancelButtonText: "取消",
//     type: "warning"
//   }).then(() => {
//     deleteCompreDataApi(row.id).then(() => {
//       ElMessage.success("删除成功")
//       GetCollegeDataFunction()
//     })
//   })
// }

//#region 撤回
// const handlRrevoke = (row: GetCompreData) => {
//   ElMessageBox.confirm(`正在撤回申请：${row.name}，确认撤回？`, "提示", {
//     confirmButtonText: "确定",
//     cancelButtonText: "取消",
//     type: "warning"
//   }).then(() => {
//     deleteCompreDataApi(row.id).then(() => {
//       ElMessage.success("撤回成功")
//       GetCollegeDataFunction()
//     })
//   })
// }

//#endregion

//#region 改
const currentUpdateId = ref<undefined | string>(undefined)
// const handleUpdate = (row: GetCollegeData) => {
//   currentUpdateId.value = row.id
//   formData.name = row.name
//   dialogVisible.value = true
// }
//#endregion

//#region 查
const tableData = ref<GetCompreData[]>([])
// const searchFormRef = ref<FormInstance | null>(null)
const searchData = reactive({
  name: "",
  projectName: ""
})
const GetCollegeDataFunction = () => {
  loading.value = true
  getCompreDataApi({
    pageNo: paginationData.currentPage,
    pageSize: paginationData.pageSize,
    projectName: searchData.name || "",
    type: 1
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
// const handleSearch = () => {
//   paginationData.currentPage === 1 ? GetCollegeDataFunction() : (paginationData.currentPage = 1)
// }
// const resetSearch = () => {
//   searchFormRef.value?.resetFields()
//   handleSearch()
// }
//#endregion

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], GetCollegeDataFunction, { immediate: true })
</script>

<template>
  <div class="app-container">
    <!-- <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="name" label="学院">
          <el-input v-model="searchData.name" placeholder="请输入学院名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form> -->
    <!-- </el-card> -->
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true">申报</el-button>
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
          <el-table-column prop="name" label="申请人" align="center" />
          <el-table-column prop="jobNumber" label="学号" align="center" />
          <el-table-column prop="type" label="奖学金类型" align="center" />
          <el-table-column prop="score" label="金额" align="center" />
          <!-- <el-table-column prop="material" label="申请材料" align="center" /> -->
          <el-table-column prop="applyTime" label="申请时间" align="center" />
          <el-table-column prop="status" label="申请状态" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.status == 1" type="success" effect="plain">通过</el-tag>
              <el-tag v-if="scope.row.status == 2" type="warning" effect="plain">审核中</el-tag>
              <el-tag v-if="scope.row.status == 0" type="danger" effect="plain">驳回</el-tag>
            </template>
          </el-table-column>
          <!-- <el-table-column fixed="right" label="操作" width="150" align="center">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handlRrevoke(scope.row)">撤回</el-button>
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column> -->
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
      :title="currentUpdateId === undefined ? '奖学金申请' : '修改学院'"
      @close="resetForm"
      width="30%"
    >
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="left">
        <el-form-item prop="name" label="申请人">
          <el-input v-model="formData.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="jobNumber" label="学号">
          <el-input v-model="formData.jobNumber" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="type" label="奖学金类型">
          <el-select v-model="formData.type" placeholder="请选择奖学金类型">
            <!-- 下拉选项 -->
            <el-option v-for="status in statusData" :key="status.id" :label="status.name" :value="status.id" />
          </el-select>
        </el-form-item>
        <el-form-item prop="level" label="获奖级别">
          <el-input v-model="formData.level" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="num" label="获奖名次">
          <el-input v-model="formData.num" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="score" label="申请金额">
          <el-input v-model="formData.score" placeholder="请输入" />
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
