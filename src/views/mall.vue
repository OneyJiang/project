<template>
  <div class="mall-container">
    <div class="step-flag">
      <p>商城</p>
    </div>
    <div class="my-integral">
      <h2>当前积分</h2>
      <h3>19999933</h3>
    </div>
    <div class="pro-main">
      <h1>商品列表</h1>
      <div class="pro-list">
        <div class="pro-item" v-for="(item, index) in list" :key="'pro'+index">
          <pro-item :item="item" @change="change"></pro-item>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import proItem from '../components/pro-item'
export default {
  name: 'mall',
  components: {
    proItem
  },
  data () {
    return {
      list: [{},{},{},{}]

    }
  },
  mounted() {
    this.getList();

    // this.change({id:'5f558c8b0f6bd110655503ed'})
  },
  methods: {
    async getList () {
      let res = await this.yGet('shop/shopList')
      if(res){
        
        this.list = res.list;
      }
    },
    async change (data) {
     
      const res = await this.yPut('shop/exchange', {
    
          id: data.id,
        
      });
      console.log(res);
    }
  }
}
</script>

<style scoped lang="scss">
.mall-container {
  width: 960px;
  height: 100%;
  padding-top: 56px;
  margin: 0 auto;
  .step-flag{
    height: 56px;
    padding: 0 40px;
    background: #fff;
    -webkit-box-shadow: 5px 6px 4px rgba(213,209,209,.5);
    box-shadow: 5px 6px 4px rgba(213,209,209,.5);
    position: fixed;
    top: 0;
    left: 300px;
    right: 0;
    z-index: 9999;
    p{
      font-size: 16px;
      font-weight: 400;
      color: #202020;
      line-height: 56px;
      text-align: left;
    }
  }
  .my-integral{
    width: 960px;
    height: 160px;
    background: url('https://by-image.oss-cn-shanghai.aliyuncs.com/yfront/static/user/mall/pic_beijing0_jifen.png') 100% 100%;
    margin: 46px auto;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h2{
      font-size: 20px;
      color: #fff;
      font-weight: bold;
    }
    h3{
      font-size: 30px;
      color: #fff;
      font-weight: bold;
    }
  }
  .pro-main{
    width: 1000px;
    h1{
      font-size: 16px;
      color: #333;
      padding-bottom: 20px;
    }
    .pro-list{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      .pro-item{
        padding: 0 30px 50px 0;
        width: 25%;
      }
    }
  }
}
</style>