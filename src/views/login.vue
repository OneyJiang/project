<template>
  <div class="regist-container">
    <div class="regist-warpper">
      <div class="regist-left">
        <img :src="loginPic" alt="">
      </div>
      <div class="regist-right">
        <h1>欢迎登录</h1>
        <input type="text" v-model="username" placeholder="请输入您的用户名">
        <input type="text" v-model="password" placeholder="请输入您的密码">
        <button @click="check">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { setStorage } from '../util/common.js';

export default {
  name: 'userIndexComp',
  data () {
    return {
      username: '',
      password: '',
      loginPic: 'https://by-image.oss-cn-shanghai.aliyuncs.com/yfront/static/auth/pic_denglu_wode.png'
    }
  },
  computed: {
    ...mapState({
      user: state => state.login.user,
      isLogin: state => state.login.isLogin
    })
  },
  methods: {
    ...mapMutations([
      'updateLoginState', 'setUser'
    ]),
    check () {
      if(!this.username) {
        this.$message({
          message: '请填写您的用户名',
          type: 'warning'
        });
        return
      }
      if(!this.password) {
        this.$message({
          message: '请输入密码',
          type: 'warning'
        });
        return
      }
      this.login()
    },
    async login () {
      let data = await this.yPost('user/login', {
        username: this.username,
        password: this.password
      })

      if(data){

        this.userInfo = data.user;

        setStorage('user',data.user)
        this.setUser(data.user);
        this.$router.replace({
          name: 'mall'
        });
      }
    }
  },
}
</script>

<style scoped lang="scss">
.regist-container{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .regist-warpper{
    width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-shadow: 2px 3px 7px #d8d8d8;
    border-radius: 8px;
    .regist-left{
      width: 500px;
      padding: 40px;
      img{
        width: 100%;
      }
    }
    .regist-right{
      width: 500px;
      display: flex;
      flex-direction: column;
      align-items: center;
      h1{
        font-size: 24px;
        color: #333;
        line-height: 60px;
      }
      input {
        width: 300px;
        height: 40px;
        border: solid 1px #eee;
        margin: 15px 0;
        padding: 0 10px;
        border-radius: 4px;
        font-size: 14px;
        color: #333;
      }
      button{
        width: 300px;
        height: 40px;
        border-radius: 6px;
        background: #6963d0;
        font-size: 16px;
        color: #fff;
        font-weight: 600;
        margin: 20px 0 0;
      }
    }
  }
}
</style>