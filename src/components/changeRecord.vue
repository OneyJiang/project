<template>
  <div class="tab2-container">
    <div class="tab2-list">
      <div class="tab2-item">
        <h2>小熊小熊小熊安琪拉的小熊</h2>
        <h3>2019-23-23 23:23</h3>
      </div>
      <div class="tab2-item">
        <h2>小熊小熊小熊安琪拉的小熊</h2>
        <h3>2019-23-23 23:23</h3>
      </div>
      <div class="tab2-item">
        <h2>小熊小熊小熊安琪拉的小熊</h2>
        <h3>2019-23-23 23:23</h3>
      </div>
      <div class="tab2-item">
        <h2>小熊小熊小熊安琪拉的小熊</h2>
        <h3>2019-23-23 23:23</h3>
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
    }
  },
  mounted() {
    // this.getChangeRecord();
  },
  methods: {
    async getChangeRecord () {
      let data = await this.yGet('shop/exchangeRecord', {
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
.tab2-container {
  .tab2-list{
    .tab2-item{
      border-bottom: solid 1px #f3f3f3;
      padding: 30px 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      h2{
        font-size: 16px;
        color: #555;
        font-weight: 500;
      }
      h3{
        font-size: 14px;
        color: #999;
        line-height: 20px;
        font-weight: 400;
      }
    }
  }
}
</style>