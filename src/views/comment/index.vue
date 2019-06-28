<template>
  <el-card class="comment-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>文章评论列表  共：{{ total_count }} 条数据</span>
    </div>
    <el-table
      :data="commentData"
      border
      style="width: 100%"
      class="comment-table"
      v-loading="loading"
      element-loading-text="拼命加载中"
    >
      <el-table-column
        prop="title"
        label="文章标题"
        width="400"
      >
      </el-table-column>
      <el-table-column
        prop="comment_status"
        label="文章状态"
      >
      </el-table-column>
      <el-table-column
        prop="total_comment_count"
        label="总评论数"
      >
      </el-table-column>
      <el-table-column
        prop="fans_comment_count"
        label="粉丝评论数"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
      >
      </el-table-column>
    </el-table>

    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :size-change='per_page'
      :total="total_count"
      @current-change="getCommentPage"
      v-loading="loading"
    >
    </el-pagination>
  </el-card>
</template>

<script type="text/javascript">
export default {
  name: 'comment',
  data () {
    return {
      commentData: [],
      response_type: 'comment',
      page: 1,
      per_page: 10,
      total_count: 0,
      loading: false
    }
  },
  created () {
    this.getCommentList()
  },
  methods: {
    // 获取评论数据列表
    async getCommentList () {
      try {
        this.loading = true
        const res = await this.$axios({
          method: 'GET',
          url: '/articles',
          params: {
            response_type: this.response_type,
            page: this.page,
            per_page: this.per_page
          }
        })
        this.commentData = res.data.results
        this.total_count = res.data.total_count
        console.log(res)
        console.log(res.data.results)
        this.loading = false
      } catch (error) {
        this.$message.error('获取评论数据失败')
      }
    },
    getCommentPage (page) {
      this.page = page
      this.getCommentList()
    }
  },
  components: {

  }
}
</script>

<style lang="less" scoped>
.comment-table {
  margin-bottom: 20px;
}
.pagination {
  text-align: center;
}
</style>
