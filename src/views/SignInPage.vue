<template>
    <div class="signIn-container">
        <el-form ref="signInForm" :model="signInForm" :rules="signInRules" class="signIn-form" auto-complete="on" label-position="left">

            <div class="title-container">
                <h3 class="title">sign In</h3>
            </div>

            <!--账号-->
            <el-form-item prop="account">
                <span class="svg-container">
                  <svg-icon icon-class="user" />
                </span>
                <el-input
                        ref="account"
                        v-model="signInForm.account"
                        placeholder="Account"
                        name="account"
                        type="text"
                        tabindex="1"
                        auto-complete="on"
                />
            </el-form-item>

            <!--名称-->
            <el-form-item prop="username">
                <span class="svg-container">
                  <svg-icon icon-class="user" />
                </span>
                <el-input
                        ref="username"
                        v-model="signInForm.username"
                        placeholder="Username"
                        name="username"
                        type="text"
                        tabindex="1"
                        auto-complete="on"
                />
            </el-form-item>

            <!--密码-->
            <el-form-item prop="password">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                        :key="passwordType"
                        ref="password"
                        v-model="signInForm.password"
                        :type="passwordType"
                        placeholder="Password"
                        name="password"
                        tabindex="2"
                        auto-complete="on"
                />
                <!--@keyup.enter.native="handleSignIn"用户按下 Enter 键时触发，本来放在上面的el-input标签里面-->
                <span class="show-pwd" @click="showPwd">
                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
            </el-form-item>

            <!--确认密码-->
            <el-form-item prop="password_confirm">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                        :key="passwordType"
                        ref="password_confirm"
                        v-model="signInForm.password_confirm"
                        :type="passwordType"
                        placeholder="Password Confirm"
                        name="password_confirm"
                        tabindex="2"
                        auto-complete="on"
                />
                <span class="show-pwd" @click="showPwd">
                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
            </el-form-item>

            <!--角色（0:学生；1:教师）-->
            <el-form-item prop="role">
                <span class="svg-container">
                  <svg-icon icon-class="user" />
                </span>
                <el-radio v-model="signInForm.role" label="0" style="color: #bfbebe">Student</el-radio>
                <el-radio v-model="signInForm.role" label="1" style="color: #bfbebe">Teacher</el-radio>
            </el-form-item>

            <!--性别（0:男；1:女）-->
            <el-form-item prop="sex">
                <span class="svg-container">
                  <svg-icon icon-class="user" />
                </span>
                <el-radio v-model="signInForm.sex" label="0" style="color: #bfbebe">Male</el-radio>
                <el-radio v-model="signInForm.sex" label="1" style="color: #bfbebe">Female</el-radio>
            </el-form-item>
            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleSignIn">Sign In</el-button>
        </el-form>
    </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
    name: 'SignInPage',
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!validUsername(value)) {
                callback(new Error('Please enter the correct user name'))
            } else {
                callback()
            }
        }
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('The password can not be less than 6 digits'))
            } else {
                callback()
            }
        }
        const validatePassword_confirm = (rule, value, callback) => {
            if (value!==this.signInForm.password) {
                callback(new Error('Confirm password error. The two passwords are different'))
            } else {
                callback()
            }
        }

        return {
            signInForm: {
                account: '',
                username: '',
                password: '',
                password_confirm: '',
                role: '',
                sex: ''
            },
            signInRules: {
                // account: [{ required: true, trigger: 'blur', validator: validateAccount }], 账号没有限制
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePassword }],
                password_confirm: [{ required: true, trigger: 'blur', validator: validatePassword_confirm }],
                role: [{ required: true, trigger: 'blur'}],
                sex: [{ required: true, trigger: 'blur' }]
            },
            loading: false,
            passwordType: 'password',
            redirect: undefined
        }
    },
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true
        }
    },
    methods: {
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = ''
            } else {
                this.passwordType = 'password'
            }
            this.$nextTick(() => {
                this.$refs.password.focus()
            })
        },
        handleSignIn() {
            this.$refs.signInForm.validate(valid => {
                if (valid) {
                    this.loading = true
                    this.$store.dispatch('user/signIn', this.signInForm).then(() => {
                        this.$router.push({ path: this.redirect || '/' })
                        this.loading = false
                    }).catch(() => {
                        this.loading = false
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .signIn-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.signIn-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.signIn-container {
  min-height: 100%;
  width: 100%;
  //background-color: $bg;
  background-image: url("https://th.bing.com/th/id/R.c2d3d4e56ebdf1905254ce7314557ad7?rik=Or9hsdRbhIOwpw&riu=http%3a%2f%2fimgs.wljyyjy.com%2farticle%2f95%2f10_1aj5z__.jpg&ehk=bb9ZPFYEXZEIiLYXjDF%2bNAByiPV8GenmWf76r0vZtzM%3d&risl=&pid=ImgRaw&r=0");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  overflow: hidden;

  .signIn-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
      &:last-of-type {
        margin-left: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 38px;
      //color: $light_gray;
      color: #263445;
      font-family: "Kaiti SC";
      font-style: revert;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
