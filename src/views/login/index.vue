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
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-col :span="13">
            <el-input
              type="number"
              v-model="userForm.code"
              placeholder="验证码"
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
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

// 加载极验SDK文件
import '@/vendor/gt.js'

export default {
  name: 'login',
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
      },
      countDown: 60,
      sending: true
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证通过
          axios({
            method: 'POST',
            url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
            data: this.userForm
          }).then(res => {
            this.$router.push({ name: 'home' })
          })
        } else {
          // 验证失败
          return false
        }
      })
    },
    // 发送验证码
    healdSendCode () {
      let mobile = this.userForm.mobile
      /** 由于定时器中拿不到组件实例，需要重新接收一下this */
      let _this = this
      axios({
        method: 'GET',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
      }).then(res => {
        const { data } = res.data
        window.initGeetest({
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: data.new_captcha,
          /**   隐式， 直接弹出 */
          product: 'bind'
        }, function (captchaObj) {
          captchaObj.onReady(function () {
            /** 显示验证的窗口 */
            captchaObj.verify()
          }).onSuccess(function () {
            /** 验证成功 */
            const { geetest_challenge: challenge,
              geetest_seccode: seccode,
              geetest_validate: validate } =
              captchaObj.getValidate()

            axios({
              method: 'GET',
              url: `http://ttapi.research.itcast.cn/mp/v1_0/sms/codes/${mobile}`,
              params: {
                challenge, seccode, validate
              }
            }).then(res => {
              /** 倒计时 */
              _this.sending = false
              let setTimer = setInterval(() => {
                _this.countDown--
                if (_this.countDown <= 0) {
                  _this.sending = true
                  window.clearInterval(setTimer)
                }
              }, 1000)
            })
          }).onError(function () {
            /** 验证失败 */
          })
        })
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
