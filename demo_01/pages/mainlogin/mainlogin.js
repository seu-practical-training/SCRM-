// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    password: ''
  },
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  login: function () {
    if (this.data.name.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '用户名密码非空',
        icon: 'loading',
        duration: 2000
      })
    } else if (this.data.name == 'abc' && this.data.password == '123') {
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000
        }),
        wx.switchTab({
           url: '../userCenter/userCenter'
        })
    } else {
      wx.showToast({
        title: '密码错误！',
        icon: 'loading',
        duration: 2000
      })
    }
  },
  scanninglogin: function () {
    wx.navigateTo({
      url: '../login/login'
    })
  },

  register:function() {
    wx.navigateTo({
      url: '../register/register',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})