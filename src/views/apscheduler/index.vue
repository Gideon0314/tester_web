<template>
  <div class="app-container">

    <div class="filter-container">
      <el-input v-model="listQuery.project" placeholder="任务" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.env" placeholder="环境" clearable class="filter-item" style="width: 130px;margin-left: 10px;" value="">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 10px;" @click="handleFilter">
        搜索
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      :show-overflow-tooltip="true"
      style="width: 100%;font-weight:500"
    >
      <el-table-column label="ID" prop="id" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务" min-width="190px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.task_name }}</span>
          &emsp;
          <el-tag>{{ row.env | envFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="任务描述" min-width="350px" align="center">
        <template slot-scope="{row}">
          <a>{{ row.remark }}</a>
        </template>
      </el-table-column>
      <el-table-column label="执行时间" width="100px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.updated_at">{{ row.updated_at }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="80px" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status | statusFilter }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">

          <el-button v-if="row.status!=1" size="mini" type="success" @click="handleResumeTask(row)">
            开始
          </el-button>
          <el-button v-if="row.status!=0" size="mini" type="danger" @click="handlePauseTask(row)">
            停止
          </el-button>

        </template>
      </el-table-column>

      <!--      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">-->
      <!--        <template slot-scope="{row,$index}">-->
      <!--          <el-button type="primary" size="mini" @click="handleUpdate(row)">-->
      <!--            Edit-->
      <!--          </el-button>-->
      <!--          <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">-->
      <!--            Publish-->
      <!--          </el-button>-->
      <!--          <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">-->
      <!--            Draft-->
      <!--          </el-button>-->
      <!--          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">-->
      <!--            Delete-->
      <!--          </el-button>-->
      <!--        </template>-->
      <!--      </el-table-column>-->

    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import api from '@/api/task'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: '0', display_name: 'DEV' },
  { key: '1', display_name: 'TEST' },
  { key: '2', display_name: 'PRE' },
  { key: '3', display_name: 'PROD' }
]

const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

const statusOptions = [
  { key: '0', display_name: '待开始' },
  { key: '1', display_name: '运行中' }
]

const statusKeyValue = statusOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ProjectList',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      return statusKeyValue[status]
    },
    envFilter(env) {
      return calendarTypeKeyValue[env]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        id: '',
        page: 1,
        limit: 10,
        task_name: undefined,
        env: undefined
      },
      calendarTypeOptions,
      statusOptions: [0, 1],
      showReviewer: false,
      temp: {
        id: '',
        task_name: '',
        remark: '',
        env: '',
        status: 0
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        project: [{ required: true, message: 'project is required', trigger: 'blur' }],
        env: [{ required: true, message: 'env is required', trigger: 'change' }],
        swagger_url: [{ required: true, message: 'swagger_url is required', trigger: 'blur' }]
      }
      // downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      api.getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 100)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    resetTemp() {
      this.temp = {
        id: '',
        project: '',
        env: '',
        swagger_url: '',
        status: ''
      }
    },
    handlePauseTask(row, status) {
      this.$confirm('暂停任务', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      })
        .then(async() => {
          const data = {
            'task_id': row.task_id
          }
          row.status = status
          api.pauseTask(data).then(response => {
            this.getList()
            row.status = 0
            // Just to simulate the time of the request
            // setTimeout(() => {
            //   this.listLoading = false
            // }, 1.5 * 100)
          })
          // await test.test()
          // this.getList()
          // setTimeout(() => {
          // }, 1.5 * 100)
          this.$message({
            type: 'success',
            message: '定时任务暂停成功'
          })
        })
        .catch(err => { console.error(err) })
    },
    handleResumeTask(row, status) {
      this.$confirm('开始任务', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      })
        .then(async() => {
          const data = {
            'task_id': row.task_id
          }
          row.status = status
          api.resumeTask(data).then(response => {
            this.getList()
            row.status = 1
            // Just to simulate the time of the request
            // setTimeout(() => {
            //   this.listLoading = false
            // }, 1.5 * 100)
          })
          // await test.test()
          // this.getList()
          // setTimeout(() => {
          // }, 1.5 * 100)
          this.$message({
            type: 'success',
            message: '定时任务开始运行'
          })
        })
        .catch(err => { console.error(err) })
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    }
  }
}
</script>
<style>
 .el-table {
    border: 1px solid #dfe6ec;
  }
 .el-table td{
   border: 1px solid #dfe6ec;
 }
 .el-table th{
   border: 1px solid #dfe6ec;
 }
</style>
