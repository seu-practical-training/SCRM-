const app = getApp()
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    nickName: "name",
    src: "", //图片的链接
    token: "24.2289840d3c758d6e288b2079ebd8593c.2592000.1568941024.282335-17051910",
    base64: "",
    msg: ""
  },

  //拍照
  takePhoto() {
    var that = this;
    //拍照
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath //获取图片
        })

        //图片base64编码
        wx.getFileSystemManager().readFile({
          filePath: this.data.src, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            this.setData({
              base64: res.data
            })
          }
        })
      } //拍照成功结束

    }) //调用相机结束

    //上传人脸进行注册-----test
    wx.request({
        url: 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/user/add?access_token=' + this.data.token,
        method: 'POST',
        data: {
          image: this.data.base64,
          image_type: 'BASE64',
          group_id: 'item', //自己建的用户组id
          user_id: this.data.nickName //这里获取用户昵称
        },
        header: {
          'Content-Type': 'application/json' // 默认值
        },
        success(res) {
          that.setData({
            msg: res.data.error_msg
          })
          console.log(that.data.msg)
          //做成功判断
          if (that.data.msg == 'SUCCESS') { //微信js字符串请使用单引号
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 2000
            })
            wx.navigateTo({
              url: '../login/login'
            })

          }

        }
      }),

      //失败尝试
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