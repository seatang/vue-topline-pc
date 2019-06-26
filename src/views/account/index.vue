<template>
  <div class="account">
    <div class="message">
      账户信息
    </div>
    <div class="userFrom">
      <el-row class="row" :gutter="20">
        <el-col :span="3">
          <div class="div-img">
            <img
              :src="userInfo.photo"
              alt=""
            >
            <P>修改头像</P>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <p>{{ userInfo.name }}</p>
            <p> 最靓的仔 </p>
          </div>
        </el-col>
        <el-col :offset="10" :span="3">
            <p> 修改 </p>
        </el-col>
      </el-row>
      <el-divider></el-divider>
    </div>

  </div>
</template>

<script type="text/javascript">
import { getUser } from '@/utils/auth.js'
export default {
  name: 'account',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.userInfo = getUser()
  },
  methods: {

  },
  components: {

  }
}
</script>

<style lang="less" scoped>
.account {
  height: 98%;
  // padding: 20px 40px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 10px;
  .message {
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    border-bottom: 1px solid #ccc;
  }
  .userFrom {
    .row{
      padding-top: 20px;
    }
    .div-img {
      text-align: center;
      img {
        width: 80px;
        border-radius: 50%;
      }
    }
  }
}
</style>
