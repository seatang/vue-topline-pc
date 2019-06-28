<template>
  <el-card class="article-card">
    <div
      slot="header"
      class="clearfix"
    >
      <el-col :span="20">
        <span>文章发布</span>
      </el-col>
      <el-col :span="4">
        <el-button
          type="primary"
          size="small"
          @click="addArticle(false)"
        >发布</el-button>
        <el-button
          type="success"
          size="small"
          @click="addArticle(true)"
        >存为草稿</el-button>
      </el-col>
    </div>
    <el-form
      :model="article"
      label-width="100px"
    >
      <el-form-item label="文章标题：">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="文章内容：">
        <el-input
          type="textarea"
          v-model="article.content"
        ></el-input>
      </el-form-item>
      <el-form-item label="文章封面：">
        <el-radio-group
          v-model="article.cover.type"
          size="medium"
        >
          <el-radio label="0">无图</el-radio>
          <el-radio label="1">单图</el-radio>
          <el-radio label="3">三图</el-radio>
          <el-radio label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文章频道：">
        <article-changnels v-model="article.channel_id"></article-changnels>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script type="text/javascript">
import ArticleChangnels from '@/components/channels'
export default {
  name: 'publish',
  data () {
    return {
      article: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: ''
      }
    }
  },
  methods: {
    // 添加文章
    async addArticle (draft) {
      try {
        await this.$axios({
          method: 'POST',
          url: '/articles',
          params: {
            draft
          },
          data: this.article
        })
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.$router.push({ name: 'article' })
      } catch (error) {
        this.$message.error('添加失败')
      }
    }
  },
  components: {
    ArticleChangnels
  }
}
</script>

<style lang="less" scoped>
.article-card {
  height: 100%;
}
</style>
