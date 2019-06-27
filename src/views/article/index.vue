<template>
  <div class="">
    <el-card class="filst-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>搜索</span>
      </div>
      <el-form
        ref="querit"
        :model="querit"
        label-width="100px"
      >
        <el-form-item label="文章状态：">
          <el-radio-group v-model="querit.status">
            <el-radio label="">全部</el-radio>
            <el-radio
              v-for="(item,index) in statusTypes"
              :key="item.type"
              :label="index"
            >
              {{item.label}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文章频道：">
          <el-select
            v-model="querit.channel_id"
            placeholder="请选择文章频道"
            size="small"
          >
            <el-option
              :value="item.id"
              v-for="item in channel"
              :key="item.id"
              :label="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间：">
          <el-date-picker
            type="date"
            placeholder="选择开始日期"
            v-model="querit.begin_pubdate"
            size="small"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <strong>-</strong>
          <el-date-picker
            type="date"
            placeholder="选择开始日期"
            v-model="querit.end_pubdate"
            size="small"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="selectAcrticle"
            :loading="articleLoading"
          >搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="last-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>共有 {{ totalCount }} 篇文章</span>
      </div>
      <div class="aticleTable">
        <el-table
          :data="articleList"
          style="width: 100%"
          v-loading="articleLoading"
        >
          <el-table-column
            label="封面"
            width="180"
          >
            <template slot-scope="scope">
              <img
                v-for="item in scope.row.cover.images"
                :key="item"
                :src="item"
                width="20"
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            width="300"
          >
          </el-table-column>
          <el-table-column
            label="状态"
            width="180"
          >
            <template slot-scope="scope">
              <el-tag :type="statusTypes[scope.row.status].type">
                {{ statusTypes[scope.row.status].label }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="pubdate"
            label="发布时间"
            width="180"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            width="180"
          >
            <template slot-scope="scope">
              <el-button
                size="small"
                type="warning"
              >修改</el-button>
              <el-button
                size="small"
                type="danger"
                :aticleId="scope.row.id"
                @click="delAticleOK(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalCount"
          @current-change="getChangePage"
          :disabled="articleLoading"
        >
        </el-pagination>
      </div>
    </el-card>

  </div>
</template>

<script type="text/javascript">
export default {
  name: 'ArticleList',
  data () {
    return {
      //  文章数据列表
      articleList: [],
      articleTitle: '',
      //  请求参数
      querit: {
        // 审核状态
        status: '',
        // 频道id
        channel_id: '',
        // 开始时间
        begin_pubdate: '',
        // 结束时间
        end_pubdate: ''

      },
      // 页码
      page: 1,
      // 当前页显示的数据条数
      per_page: 10,
      // 加载中
      articleLoading: false,
      // 审核状态
      statusTypes: [
        { type: 'info', label: '草稿' },
        { type: '', label: '待审核' },
        { type: 'success', label: '审核通过' },
        { type: 'warning', label: '审核未通过' },
        { type: 'danger', label: '已删除' }
      ],
      //  总数据条数
      totalCount: 0,
      channel: []
    }
  },
  created () {
    this.getAticleList()
    this.getChannel()
  },
  methods: {
    // 获取数据列表
    async getAticleList () {
      try {
        this.articleLoading = true
        // 过滤多余的查询条件
        const selectList = {}
        for (let key in this.querit) {
          if (this.querit[key] !== null && this.querit[key] !== undefined && this.querit[key] !== '') {
            selectList[key] = this.querit[key]
          }
        }
        const res = await this.$axios({
          method: 'GET',
          url: '/articles',
          params: {
            page: this.page,
            per_page: this.per_page,
            ...selectList
          }
        })
        this.articleList = res.data.results
        this.totalCount = res.data.total_count
        this.articleLoading = false
      } catch {
        this.$message({
          message: '获取文章列表失败',
          type: 'warning'
        })
        this.articleLoading = false
      }
    },
    // 获取当前页数据
    getChangePage (page) {
      //   console.log(page)
      this.page = page
      this.getAticleList()
    },
    // 删除文章确认
    async delAticleOK (item) {
      try {
        await this.$confirm('确定要删除吗？', '删除提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 调用删除函数
        this.delAticle(item)
      } catch (error) {
        this.$message({
          type: 'error',
          message: '已取消删除!'
        })
      }
    },
    // 删除文章
    async delAticle (item) {
      try {
        await this.$axios({
          method: 'DELETE',
          url: `/articles/${item.id}`
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      } catch (error) {
        this.$message.error('删除失败!')
      }
    },
    // 搜索数据
    selectAcrticle () {
      this.page = 1
      this.getAticleList()
    },
    async getChannel () {
      try {
        const data = await this.$axios({
          method: 'GET',
          url: '/channels'
        })
        this.channel = data.data.channels
      } catch (error) {
        this.$message.error('获取文章频道出错了：', error)
      }
    }
  },
  components: {

  }
}
</script>

<style lang="less" scoped>
.block {
  text-align: center;
}
</style>
