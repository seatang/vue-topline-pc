<template>
  <el-select
    placeholder="请选择文章频道"
    size="small"
    :value="value"
    @change="$emit('input',$event)"
  >
    <el-option
      v-for="item in channel"
      :value="item.id"
      :key="item.id"
      :label="item.name"
    >
    </el-option>
  </el-select>
</template>

<script type="text/javascript">
export default {
  name: 'ArticleChannel',
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      channel: []
    }
  },
  created () {
    this.getChannel()
  },
  methods: {
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
</style>
