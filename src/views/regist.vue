<template>
  <div class="regist-container">
    <div class="regist-warpper">
      <div class="regist-left">
        <img :src="loginPic" alt="">
      </div>
      <div class="regist-right">
        <h1>注册新用户</h1>
        <input type="text" name="ssss" placeholder="用户名：6位以上数字和密码组成">
        <input type="password" v-model="password" placeholder="密码" autocomplete="off">
        <input type="text" v-model="school" placeholder="学校">
        <input type="text" v-model="nickname" placeholder="昵称">
        <input type="number" v-model="age" placeholder="请输入年龄">
        <el-select v-model="gender" placeholder="请选择性别">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <button @click="isEmpty">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'regist',
  data () {
    return {
      username: '', // 用户名
      password: '', // 密码
      school: '', // 学校
      nickname: '', // 昵称
      age: '', // 签名
      gender: 1, // 0：女   1：男  默认男
      options: [
        { value: 1, label: '男' },
        { value: 0, label: '女' }
      ],
      loginPic: 'https://by-image.oss-cn-shanghai.aliyuncs.com/yfront/static/auth/pic_denglu_wode.png'
    }
  },
  methods: {
    /** 是否含有中文 */
    hasChinese (str) {
      var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
      if(reg.test(str)){
        console.log("包含汉字！");
        return true
      } else {
        console.log("不包含汉字！");
        return false
      }
    },
    // 验证密码
    checkPassword (str) {
      // 数字或大小写字母
      
      //  var reg=/^(\w){6,20}$/;  
      //  if (!reg.exec(str)) return false
      //  return true

      if (str == null || str.length <6) {
        this.showMsg('密码不能少于6位');
        return false;
      }
      var reg1 = new RegExp(/^[0-9A-Za-z]+$/);
      if (!reg1.test(str)) {
        this.showMsg('密码只能使用英文或数字组合');
        return false;
      } else {
        return true
      }
    },
    checkData () {
      if(this.hasChinese(this.username)){
        this.showMsg('用户名不能包含汉字哦');
        return
      }
      if(!this.checkPassword(this.password)){
        return false
      }
      if(!this.hasChinese(this.school)){
        return false
      }
      this.regist()
    },
    isEmpty () {
      if(this.username&&this.password&&this.school&&this.nickname&&this.age){
        this.checkData();
      } else {
        this.$message({
          message: '请完善您的信息，每一项都是必填',
          type: 'warning'
        });
      }
    },
    showMsg (msg) {
      this.$message({
        message: msg,
        type: 'warning'
      });
    },
    async regist () {
      let params = {
        username: this.username,
        password: this.password,
        school: this.school,
        nickname: this.nickname,
        age: this.age,
        gender: this.gender
      }
      const data = await this.yPost('user/regist', params)
      console.log('data', data);
      if (data) {
        this.showMsg('恭喜您注册成功，2秒后跳转到登录页面');
        setTimeout(()=>{
          this.$router.push({
            name: 'login'
          })
        }, 2000)
      }
    }
  },
}
</script>

<style lang="scss">
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
      }
      input {
        width: 300px;
        height: 40px;
        border: solid 1px #eee;
        margin: 10px 0;
        padding: 0 10px;
        border-radius: 4px;
        font-size: 14px;
        color: #333;
      }
      textarea {
        width: 300px;
        height: 80px;
        border: solid 1px #eee;
        padding: 10px;
        line-height: 24px;
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