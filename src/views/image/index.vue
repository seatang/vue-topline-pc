<template>
  <div class="">
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>图片素材</span>
        <el-button
          style="float: right;"
          type="primary"
        >图片上传</el-button>
      </div>
      <el-tabs type="border-card">
        <el-tab-pane label="全部">

        </el-tab-pane>
        <el-tab-pane label="收藏">收藏图片</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'imageList',
  data () {
    return {
      collect: false,
      page: 1,
      per_page: 10
    }
  },
  created () {
    this.getImagesList()
  },
  methods: {
    async getImagesList () {
      try {
        const res = this.$axios({
          method: 'GET',
          url: '/user/images',
          params: {
            page: this.page,
            per_page: this.per_page,
            collect: this.collect
          }
        })
        console.log(res)
      } catch (error) {
        this.$message.error('获取图片数据出错了！')
      }
    }

  },
  components: {

  }
}
</script>

<style lang="less" scoped>
</style>
