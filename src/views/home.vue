<template>
    <div class="home">
        <div class="slide-main">
            <div class="user-info">
                <img :src="avatar" class="user-avatar" alt="">
                <p>阿扎西</p>
                <p>{{ $route.name }}</p>
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
import _ from 'lodash';
import { getStorage, removeStorage} from '../util/common';
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

    // this.getExchangedRecord();

    // this.changePassword();

    // this.getShopList();

    // this.insertShopItem();

    // this.updateShopItem();

    // this.deleteShopItem();
  },
  methods: {
    ...mapMutations([
      'clearUser', 'updateLoginState'
    ]),

    // 获取用户信息
    async getUserInfo () {

      await this.yGet('/user/userinfo',{
        params: {
          id: _.get(getStorage('user'),'_id')
        }
      })
    },

    // 兑换记录
    async getExchangedRecord () {
      let res = await this.yGet('shop/exchangedRecord',{
        params:{
          id: _.get(getStorage('user'),'_id')
        }
      })
      console.log(res);
    },

    // 修改密码
    async changePassword () {
     
      const res = await this.yPut('user/changePassword', {
    
          oldPassword: 'banyuan123',
          newPassword:'banyuan223'
        
      });
      console.log(res);
    },

    // admin 获取商品列表
    async getShopList () {

      await this.yGet('/admin/shopList',{})
    },

    // admin 加入商品
    async insertShopItem(){
      await this.yPost('/admin/shopItem',{
        name:'测试商品',
        price:100
      })
    },

    // admin 更新商品
    async updateShopItem(){
      await this.yPut('/admin/shopItem',{
        data:{
          _id:'5f69599d0023164a8b9f3ee2',
          name:'测试商品',
          price:10
        }
      })
    },

    // admin 删除商品
    async deleteShopItem(){
      await this.yDel('/admin/shopItem',{
        id:'5f69599d0023164a8b9f3ee2'
      })
    },
    /** 退出 */
    async quit () {
     
        this.clearUser()
        this.updateLoginState(false);
       removeStorage('user')
        this.$router.replace({
          name: 'login'
        });
      
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