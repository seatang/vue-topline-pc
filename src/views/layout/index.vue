<template>
  <el-container class="container">
    <el-aside width="200px" class="aside">
      <AppAside/>
    </el-aside>
    <el-container>
      <el-header class="app-header">
        <AppHeader/>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script type="text/javascript">
import AppAside from './components/AppAside'
import AppHeader from './components/AppHeader'
export default {
  name: 'layout',
  data () {
    return {

    }
  },
  methods: {

  },
  components: {
    AppAside,
    AppHeader
  }
}
</script>

<style lang="less" scoped>
.container{
  height: 100%;
  .aside{
    height: 100%;
    background-color: #666;
  }
  .app-header{
    height: 60px;
    line-height: 60px;
    background-color: #fff;
  }
  .main{
    background-color: #f2f4f6;
  }
}
</style>
