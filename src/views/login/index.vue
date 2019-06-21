<template>
  <div class="login-wrap">
    <div class="form-wrap">
      <div class="login-logo">
        <img src="./logo_index.png">
      </div>
      <el-form
        :model="userForm"
        :rules="rules"
        ref="userForm"
        class="demo-ruleForm userForm"
      >
        <el-form-item prop="mobile">
          <el-input
            v-model="userForm.mobile"
            placeholder="手机号码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-col :span="15">
            <el-input
              v-model="userForm.code"
              placeholder="验证码"
            ></el-input>
          </el-col>
          <el-col
            :offset="2"
            :span="7"
          >
            <el-button plain>获取验证码</el-button>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="user-login-btn"
            @click="submitForm('userForm')"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userForm: {
        mobile: '',
        code: ''
      },
      // 表单验证
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '11位手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '6为验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证通过
        } else {
          // 验证失败
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-wrap {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('./login_bg.jpg') center no-repeat;

  .form-wrap {
    width: 400px;
    padding: 20px 40px;
    background-color: #fff;
    border-radius: 10px;

    .login-logo {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      img {
        width: 200px;
      }
    }
    .user-login-btn {
      width: 100%;
    }
  }
}
</style>
