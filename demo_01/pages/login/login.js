Page({
  data: {
    base64: "",
    token: "24.2289840d3c758d6e288b2079ebd8593c.2592000.1568941024.282335-17051910",
    msg: null
  },

  register: function(){
    wx.navigateTo({
      url: '../register/register',
    })
  },

  //拍照并编码
  takePhoto() {
    //拍照
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
      }
    })

    var that = this;
    //图片base64编码
    wx.getFileSystemManager().readFile({
      filePath: this.data.src, //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      success: res => { //成功的回调
        that.setData({
          base64: res.data
        })
      }
    })

    // //acess_token获取
    // wx.request({
    //   url: 'https://aip.baidubce.com/oauth/2.0/token', //真实的接口地址
    //   data: {
    //     grant_type: 'client_credentials',
    //     client_id: '876695de75e84b35866435f92e2b5643',
    //     client_secret: '20dd0ea66d014e0ca545a9149c236275'//用自己的
    //   },
    //   header: {
    //     'Content-Type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     that.setData({
    //       token: res.data.access_token//获取到token
    //     })
    //   }
    // })

    //上传人脸进行 比对
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/search?access_token=' + that.data.token,
      method: 'POST',
      data: {
        image: this.data.base64,
        image_type: 'BASE64',
        group_id_list: 'item'//自己建的用户组id
      },
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          msg: res.data.result.user_list[0].score
        })
        if (that.data.msg > 80) {
          wx.showToast({
            title: '验证通过',
            icon: 'success',
            duration: 1000
          })
          //验证通过，跳转至tab页面
          wx.switchTab({
            url: '../userCenter/userCenter'
          })
        }
      }
    });

    wx.showToast({
      title: '请重试',
      icon: 'loading',
      duration: 500
    })
  },
  error(e) {
    console.log(e.detail)
  }
})