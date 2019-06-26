<template>
  <div class="">
    <el-card class="filst-card">
      <span>搜索</span>
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
            width="200"
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
                @click="delAticleOK(scope.row.id)"
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
      //  请求参数
      querit: {
        // 审核状态
        status: '',
        // 频道id
        channel_id: '',
        // 开始时间
        begin_pubdate: '',
        // 结束时间
        end_pubdate: '',
        // 页码
        page: 1,
        // 当前页显示的数据条数
        per_page: 10
      },
      // 加载中
      articleLoading: false,
      // 审核状态
      statusTypes: [
        { type: 'info', label: '草稿' },
        { type: '', label: '待审核' },
        { type: 'success', label: '审核通过' },
        { type: 'warning', label: '审核为通过' },
        { type: 'danger', label: '已删除' }
      ],
      //  总数据条数
      totalCount: 0
    }
  },
  created () {
    this.getAticleList()
  },
  methods: {
    // 获取数据列表
    async getAticleList () {
      try {
        this.articleLoading = true
        const res = await this.$axios({
          method: 'GET',
          url: '/articles',
          params: {
            page: this.querit.page,
            per_page: this.querit.per_page
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
      this.querit.page = page
      this.getAticleList()
    },
    // 删除文章确认
    async delAticleOK (aticleId) {
      try {
        console.log(aticleId)
        await this.$confirm('确定要删除吗？', '删除提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 调用删除函数
        this.delAticle(aticleId)
      } catch (error) {
        this.$message({
          type: 'info',
          message: '已取消删除!'
        })
      }
    },
    // 删除文章
    async delAticle (aticleId) {
      try {
        await this.$axios({
          method: 'DELETE',
          url: `/articles/${aticleId}`
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      } catch (error) {
        this.$message({
          type: 'info',
          message: '删除失败!'
        })
      }
    }
  },
  components: {

  }
}
</script>

<style lang="less" scoped>
.filst-card,
.aticleTable {
  margin-bottom: 20px;
}
</style>
