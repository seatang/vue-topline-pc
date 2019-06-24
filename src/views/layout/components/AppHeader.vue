<template>
  <el-row :gutter="20">
    <el-col :span="10">
      <div class="grid-content bg-purple"><i class="iconfont icon-hongxin"></i>
        人生就是一次次幸福的相聚，夹杂着一次次伤感的别离</div>
    </el-col>
    <el-col
      :offset="10"
      :span="4"
    >
      <div class="grid-content bg-purple">
        <el-dropdown>
          <img :src="userInfo.photo">
          {{ userInfo.name }}<i class="el-icon-arrow-down el-icon--right"></i>
          <span class="el-dropdown-link">
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">个人信息</el-dropdown-item>
            <el-dropdown-item command="b">Git地址</el-dropdown-item>
            <el-dropdown-item
              command="e"
              divided
              @click.native="healdlogout"
            >退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>

<script type="text/javascript">
import { getUser, removeUser } from '@/utils/auth.js'

export default {
  name: 'AppHeader',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.userInfo = getUser()
  },
  methods: {
    healdlogout () {
      this.$confirm('确定要退出吗？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeUser()
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '退出已取消'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
img {
  width: 35px;
  border-radius: 50%;
  vertical-align: middle;
}
</style>
