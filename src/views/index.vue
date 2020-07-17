<template>
  <div class='index'>
    <div class="head" ref="head">
    </div>
    <div class="content" @scroll="handleScroll" ref="parent">
      <div class="shade" ref="child"></div>
      <div class="real-content">
        <!-- 暂时隐藏 -->
        <div class="icon-box">
          <!--<div v-for="(item,i) in iconList" :key="i">-->
            <!--<img :src="item.src" alt="" class="mrb-5">-->
            <!--<p class="mrb-5 fw ft1">{{item.num}}</p>-->
            <!--<p class="ft2">{{item.name}}</p>-->
          <!--</div>-->
        </div>
        <div>
          <md-field>
            <md-input-item ref="name" preview-type="text" v-model="loanAmount" title="贷款金额" placeholder="您的期望贷款金额"
                           is-title-latent @change="handleChange" @blur="scrollVal">
              <div class="ft3" slot="right">万元</div>
            </md-input-item>
            <md-input-item ref="name" preview-type="text" v-model="expire" title="贷款期限" placeholder="您的期望贷款期限"
                           is-title-latent @change="handleChange" @blur="scrollVal">
              <div class="ft3" slot="right">个月</div>
            </md-input-item>
            <md-input-item ref="name" preview-type="text" v-model="customerName" :disabled="isDisabled" title="姓名"
                           placeholder="您的姓名" maxlength="10" @change="handleName" @blur="scrollVal" :error="errorName"
                           is-title-latent>
            </md-input-item>
            <md-input-item ref="name" preview-type="text" v-model="phone" title="手机号" :disabled="isDisabled"
                           placeholder="您的手机号" maxlength="11" is-title-latent @change="handleChange" @blur="scrollVal">
              <div class="ft4" slot="right" @click="handleGetCode">{{btnContent}}</div>
            </md-input-item>
            <md-input-item ref="name" preview-type="text" v-model="verifyCode" title="验证码" placeholder="4位数验证码"
                           is-title-latent @change="handleChange" @blur="scrollVal"></md-input-item>
          </md-field>
          <div class="c-flex-center">
            <span class="click-area" @click="checkChange"><img :src="checkedImg[checkedIndex]" alt="" class="check"></span>
            <span>
                <!--本人已阅读并同意签署-->
                <span class="cl-5388F6" @click="goProtocol">我已阅读并同意《小豆芽助手协议》</span>
            </span>
          </div>
          <div style="padding-top: 30px">
            <md-button type="primary" @click="handleSubmit" v-show="flag">测算额度</md-button>
            <md-button type="primary" class="btn-g" v-show="!flag">测算额度</md-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import icon1 from '../assets/images/index/icon1.png'
import icon2 from '../assets/images/index/icon2.png'
import icon3 from '../assets/images/index/icon3.png'
import { queryStatistical, querySendSms, postSave, getUserInfo } from '@/api/index'
import { scrollTo } from '@/libs/utils'
import { Toast } from 'mand-mobile'

export default {
  name: 'Index',
  data() {
    return {
      flag: false,
      errorName: '',
      btnContent: '获取验证码',
      time: 0,
      disabled: false,
      isDisabled: false,
      // 选中图标
      checkedIndex: 0,
      checkedImg: [require('@/assets/images/index/checked-1.png'), require('@/assets/images/index/checked.png')],
      phone: '',
      // 解决bug
      // openId: JSON.parse(sessionStorage.userInfo).openid,
      // openId: JSON.parse(localStorage['userInfo']).openid,
      customerName: '',
      cusSource: this.$route.query.cusSource || 0,
      organUserId: this.$route.query.organUserId,
      expire: '',
      loanAmount: '',
      verifyCode: '',
      iconList: [
        {
          src: icon1,
          num: '',
          name: '申请用户(人)'
        },
        {
          src: icon2,
          num: '',
          name: '入驻银行(家)'
        },
        {
          src: icon3,
          num: '',
          name: '注册客服(人)'
        }
      ]
    }
  },
  mounted() {
    // let params = {}
    // queryStatistical(params).then(res => {
    //   if (res.code === 200) {
    //     let data = res.data
    //     this.iconList[0].num = data.userApplyNum
    //     this.iconList[1].num = data.organApplyNum
    //     this.iconList[2].num = data.userRegisterNum
    //   }
    // })
    // getUserInfo(params).then(res => {
    //   if (res.code === 200) {
    //     let data = res.data
    //     if (data != null) {
    //       this.isDisabled = true
    //       this.customerName = data.customerName
    //       this.phone = data.mobile
    //     }
    //   }
    // })
  },
  methods: {
    scrollVal() {
      scrollTo()
    },
    handleChange() {
      let vm = this
      console.log(vm.checkedIndex)
      if (vm.loanAmount && vm.expire && vm.customerName && vm.phone && vm.verifyCode && vm.errorName === '' && vm.checkedIndex === 1) {
        vm.flag = true
        return
      }
      vm.flag = false
    },
    handleName(name, value) {
      let reg = /^[A-Za-z\u4e00-\u9fa5]+$/
      if (!reg.test(value)) {
        this.errorName = '姓名只能为汉字或字母'
        this.flag = false
        return
      }
      this.errorName = ''
      this.handleChange()
    },
    // 点击获取验证码
    handleGetCode() {
      var vm = this
      var myreg = /^[1][3-9][0-9]{9}$/
      var params = {
        cellPhone: vm.phone
      }
      if (!vm.phone) {
        Toast({
          content: '手机号码不能为空',
          position: 'bottom',
          duration: 3000
        })
        return
      }
      if (!myreg.test(vm.phone)) {
        Toast({
          content: '手机号码格式错误',
          position: 'bottom',
          duration: 3000
        })
        return
      }
      if (this.disabled) {
        return
      }
      querySendSms(params)
        .then(res => {
          if (res.status === 200) {
            var data = res.data
            Toast({
              content: data.message,
              position: 'bottom',
              duration: 3000
            })
          }
        })
      this.time = 60
      this.timer()
    },
    // 定时器
    timer() {
      if (this.time > 0) {
        this.time--
        this.btnContent = this.time + 's后重新获取'
        this.disabled = true
        var timer = setTimeout(this.timer, 1000)
      } else if (this.time === 0) {
        this.btnContent = '获取验证码'
        clearTimeout(timer)
        this.disabled = false
      }
    },
    handleScroll() {
      var parentScrollTop = this.$refs.parent.scrollTop
      var childH = this.$refs.child.scrollHeight
      if (parentScrollTop > 0 && parentScrollTop <= childH) {
        var a = parentScrollTop / childH
        this.$refs.head.style.opacity = 1 - a
      }
    },
    handleSubmit() {
      let vm = this
      let myreg = /^[1][3-9][0-9]{9}$/
      let params = {
        customerName: vm.customerName,
        expire: vm.expire,
        loanAmount: vm.loanAmount,
        organUserId: vm.organUserId,
        cusSource: vm.cusSource,
        mobile: vm.phone,
        // openId: vm.openId,
        verifyCode: vm.verifyCode
      }
      // if (!vm.loanAmount) {
      //   Toast({
      //     content: '贷款金额不能为空',
      //     position: 'bottom',
      //     duration: 3000
      //   })
      //   return
      // }
      // if (!vm.expire) {
      //   Toast({
      //     content: '贷款期限不能为空',
      //     position: 'bottom',
      //     duration: 3000
      //   })
      //   return
      // }
      // if (!vm.customerName) {
      //   Toast({
      //     content: '姓名不能为空',
      //     position: 'bottom',
      //     duration: 3000
      //   })
      //   return
      // }
      // if (!vm.phone) {
      //   Toast({
      //     content: '手机号码不能为空',
      //     position: 'bottom',
      //     duration: 3000
      //   })
      //   return
      // }
      // if (!vm.verifyCode) {
      //   Toast({
      //     content: '验证码不能为空',
      //     position: 'bottom',
      //     duration: 3000
      //   })
      //   return
      // }
      if (!myreg.test(vm.phone)) {
        Toast({
          content: '手机号码格式错误',
          position: 'bottom',
          duration: 3000
        })
        return
      }
      postSave(params).then(res => {
        if (res.code === 200) {
          let data = res.data
          console.log(data)
          this.$router.push({
            path: '/socialSecurity',
            query: {
              amount: data.amount,
              orderId: data.orderId
            }
          })
        }
      })
    },
    // 查看协议
    goProtocol() {
      this.$router.push({
        path: '/protocol'
      })
    },
    // 选中切换
    checkChange() {
      this.checkedIndex === 0 ? this.checkedIndex = 1 : this.checkedIndex = 0
      this.handleChange()
    }
  }
}
</script>

<style scoped lang='less'>
  .index {
    height: 100%;

    .ft3 {
      font-size: 16px;
      color: #353d53;
    }

    .ft4 {
      font-size: 12px;
      color: #3077ff;
    }

    .head {
      width: 100%;
      height: 222px;
      background: url("../assets/images/index/title_bg.jpg");
      background-size: 100%;
    }

    .content {
      height: 100%;
      width: 100%;
      overflow: scroll;
      // 解决ios滚动不顺畅问题
      -webkit-overflow-scrolling: touch;
      position: absolute;
      top: 0;

      .shade {
        width: 100%;
        height: 190px;
      }

      .real-content {
        height: 690px;
        border-radius: 15px 15px 0 0;
        background: #fff;

        .icon-box {
          display: flex;
          justify-content: space-around;
          text-align: center;
          padding-top: 20px;

          .ft1 {
            font-size: 16px;
          }

          .ft2 {
            font-size: 10px;
            color: #5d616e;
          }

          img {
            height: 31px;
          }
        }
      }
    }

    .md-button {
      width: 320px;
      border-radius: 2px;
    }

    .btn-g {
      background: rgba(0, 122, 255, 1);
      opacity: 0.3;
    }
  }

  .c-flex-center {
    text-align: center;
    color: #3077ff;

    .check {
      margin-right: 6px;
      width: 12px;
      vertical-align: bottom;
    }
  }
  .click-area {
    position: relative;
  }

  .click-area:after {
    content: '';
    position: absolute;
    top: -10px;
    left: -30px;
    right: -15px;
    bottom: -5px;
  }
</style>
