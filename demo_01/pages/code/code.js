//const config = require('../../config/config.default.js')

Page({
  data:{
    disabled:true,
    password:'',
    reInput:'',
    correct:false,
    length:false
  },

  inputPassword: function(e){
    let password = e.detail.value
    this.setData({
      password: password
    })
    if(password.length >=8)
    {console.log('password:' + this.data.password)
      this.setData({
        length:true
      })
    }
  },

  checkPassword: function(e){
    let reInput = e.detail.value
    this.setData({
      reInput: reInput
    })
    if(reInput == this.data.password && this.data.length){
      this.setData({
        correct: true
      })
      this.setData({
        disabled: false
      })
    }

  },
  
  navigate() {
    wx.navigateTo({
      url: "/pages/collect/collect"
    })
  },

})