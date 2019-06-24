<template>
  <el-menu
    router
    default-active="2"
    class="el-menu-vertical-demo menu"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <img src="./logo_admin.png">
    <el-menu-item index="/"><i class="iconfont icon-zhuye"></i>首页</el-menu-item>
    <el-submenu index="1">
      <template slot="title"><i class="iconfont icon-neirong"></i><span>内容管理</span></template>
      <el-menu-item index="/publish">发布文章</el-menu-item>
      <el-menu-item index="1-2">内容列表</el-menu-item>
      <el-menu-item index="1-3">评论列表</el-menu-item>
      <el-menu-item index="1-4">素材列表</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title"><i class="iconfont icon-fensi"></i><span>粉丝管理</span></template>
      <el-menu-item index="2-1">图文数据</el-menu-item>
      <el-menu-item index="2-2">粉丝概况</el-menu-item>
      <el-menu-item index="2-3">粉丝画像</el-menu-item>
      <el-menu-item index="2-4">粉丝列表</el-menu-item>
    </el-submenu>
    <el-menu-item index="/account"><i class="iconfont icon-set"></i>账户信息</el-menu-item>
  </el-menu>
</template>

<script type="text/javascript">
export default {
  name: 'AppAsdie'
}
</script>

<style lang="less" scoped>
.menu {
  background-color: #666;
  img {
    padding-top: 20px;
    padding-left: 30px;
    width: 150px;
  }
  i {
    padding: 0 10px;
  }
}
</style>
