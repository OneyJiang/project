<template>
  <div class="tab1-container">
    <img :src="avatar" class="user-avatar" alt="">
    <div class="user-info">
      <div class="user-item-info">
        <span>姓名：</span>
        <span>DP-28轻机枪</span>
      </div>
      <div class="user-item-info">
        <span>学校：</span>
        <span>哈尔滨理工大学</span>
      </div>
      <div class="user-item-info">
        <span>昵称：</span>
        <span>大盘鸡</span>
      </div>
      <div class="user-item-info">
        <span>密码：</span>
        <span>******</span>
      </div>
      <div class="user-item-info">
        <span>签名：</span>
        <span>gefwoeudhibkn</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userIndexComp',
  props: {
    uid: {
        type: [String, Number],
        require: true
    }
},
  data () {
    return {
      avatar: "https://by-image.oss-cn-shanghai.aliyuncs.com/images/159169228111094950.jpg",
      userInfo: {}
    }
  },
  methods: {
    async getList () {
      let data = await this.yGet('user/userinfo', {
        params: {
          id: this.uid
        }
      })
      if(data){
        console.log('data', data)
        this.userInfo = data.list;
      }
    }
  },
}
</script>

<style lang="scss">
.tab1-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  .user-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    width: 660px;
    margin-left: 40px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    .user-item-info {
      width: 280px;
      padding: 14px 0;
      span {
        font-size: 16px;
        color: #666;
        font-weight: 400;
        line-height: 30px;
        margin-right: 20px;
      }
    }
  }
}
</style>