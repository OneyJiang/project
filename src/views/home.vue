<template>
    <div class="home">
        <div class="slide-main">
            <div class="user-info">
                <img :src="avatar" class="user-avatar" alt="">
                <p>阿扎西</p>
            </div>
            <ul>
              <li> <router-link to="/mall" class="router-link"> 积分商城</router-link></li>
              <li> <router-link to="/user" class="router-link"> 个人中心</router-link></li>
              <li @click="quit">退出</li>
            </ul>
        </div>
        <div class="home-right">
          <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: "Home",
  data() {
    return {
      title: "首页",
      avatar: "https://by-image.oss-cn-shanghai.aliyuncs.com/images/159169228111094950.jpg",
    };
  },
  computed: {
    ...mapState({
      'isLogin': state => state.login.isLogin
    })
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    ...mapMutations([
      'clearUser', 'updateLoginState'
    ]),
    async getUserInfo () {
      const data = await this.yGet('/user/userinfo')
      console.log('user info data', data);
    },
    /** 退出 */
    async quit () {
      const data = await this.yPost('quit', {
        id: this.user.id
      })
      if (data) {
        this.clearUser()
        this.updateLoginState(false);
        this.$router.replace({
          name: 'login'
        });
      }
    }
  },
};
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  font-size: 0;
}
.slide-main {
  width: 300px;
  background: #333;
  display: inline-block;
  vertical-align: top;
  text-align: center;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  .user-info {
    padding: 100px 0 0;
    .user-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
    }
    p{
      font-size: 14px;
      color: #fff;
      font-weight: bold;
      padding: 20px 0;
    }
  }
  ul{
    margin-top: 20px;
    li{
      font-size: 16px;
      color: #fff;
      font-weight: bold;
      line-height: 50px;
      height: 50px;
      cursor: pointer;
      .router-link{
        font-size: 16px;
        color: #fff;
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
}
.home-right{
  display: inline-block;
  vertical-align: top;
  height: 100%;
  width: 100%;
  padding-left: 300px;
}
</style>