<template>
  <div class="">
    <el-row :gutter="20">
      <el-col :span="6">
        <img src="" alt="">
      </el-col>
      <el-col
        :span="6"
        :offset="6"
      >
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'account',
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {

  },
  components: {

  }
}
</script>

<style lang="less" scoped>
</style>
