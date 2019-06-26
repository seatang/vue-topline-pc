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
            type="tel"
            v-model="userForm.mobile"
            placeholder="手机号码"
            maxlength="11"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-col :span="14">
            <el-input
              type="text"
              v-model="userForm.code"
              placeholder="验证码"
              maxlength="6"
            ></el-input>
          </el-col>
          <el-col
            :offset="1"
            :span="8"
          >
            <el-button
              v-show="sending"
              @click="healdSendCode"
            >
              获取验证码
            </el-button>
            <el-button
              v-show="!sending"
              disabled
            >
              {{ countDown }}秒后重新发送
            </el-button>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="user-login-btn"
            @click="submitForm('userForm')"
            :loading="loginLoding"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { seveUser } from '@/utils/auth.js'

// 加载极验SDK文件
import '@/vendor/gt.js'

export default {
  name: 'login',
  data () {
    return {
      userForm: {
        mobile: '13911111111',
        code: '123456'
      },
      userInfo: {},
      // 表单验证
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /\d{11}/, len: 11, message: '11位手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /\d{6}/, len: 6, message: '6为验证码', trigger: 'blur' }
        ]
      },
      countDown: 60,
      sending: true,
      loginLoding: false
    }
  },
  methods: {
    // 登录前手机验证
    submitForm () {
      this.$refs['userForm'].validate(valid => {
        if (valid) {
          // 验证通过
          this.submitTologin()
        } else {
          // 验证失败
          return false
        }
      })
    },
    // 登录验证
    async submitTologin () {
      try {
        this.loginLoding = true
        // 验证通过
        const res = await this.$axios({
          method: 'POST',
          url: 'authorizations',
          data: this.userForm
        })
        this.userInfo = res.data
        // 保存登录信息到本地
        seveUser(this.userInfo)
        this.$router.push({ name: 'home' })
        this.loginLoding = false
      } catch {
        this.$message.error('登录失败')
        this.loginLoding = false
      }
    },
    // 发送前验证手机号
    healdSendCode () {
      this.$refs['userForm'].validateField('mobile', errorMessage => {
        if (errorMessage) {
          return
        }
        this.showGeetest()
      })
    },
    // 显示验证码
    async showGeetest () {
      let mobile = this.userForm.mobile
      const res = await this.$axios({
        method: 'GET',
        url: `/captchas/${mobile}`
      })
      const { data } = res
      window.initGeetest({
        gt: data.gt,
        challenge: data.challenge,
        offline: !data.success,
        new_captcha: data.new_captcha,
        // 隐式,直接弹出
        product: 'bind'
      }, async (captchaObj) => {
        captchaObj.onReady(() => {
          // 显示验证的窗口
          captchaObj.verify()
        }).onSuccess(async () => {
          // 验证成功
          const { geetest_challenge: challenge,
            geetest_seccode: seccode,
            geetest_validate: validate } =
            captchaObj.getValidate()
          // 发送请求，获取验证码
          await this.$axios({
            method: 'GET',
            url: `/sms/codes/${mobile}`,
            params: {
              challenge, seccode, validate
            }
          })
          this.$message({
            message: '验证码发送成功！',
            type: 'success'
          })
          this.getCountdown()
        }).onError(function () {
          // 验证失败
        })
      })
    },

    // 倒计时
    getCountdown () {
      this.sending = false
      let setTimer = setInterval(() => {
        this.countDown--
        if (this.countDown <= 0) {
          this.sending = true
          window.clearInterval(setTimer)
        }
      }, 1000)
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
