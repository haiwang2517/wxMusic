var imageUtil = require('../../utils/imgUtil.js');
const innerAudioContext = wx.createInnerAudioContext()
var num = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [{
      url: "https://music.163.com/song/media/outer/url?id=531295576.mp3"
    }, {
      url: "https://music.163.com/song/media/outer/url?id=531295576.mp3"
    }],
    pictures: [
      {
        url: 'http://chuantu.biz/t6/322/1527790831x-1404793447.jpg',
        text:'我一直都在你身后'
      },
      {
        url: 'http://chuantu.biz/t6/322/1527790818x-1404793447.jpg',
        text: '能够遇见你，我想这是世界上最幸运的事情了'
      },
      {
        url: 'http://chuantu.biz/t6/322/1527790805x-1404793447.jpg',
        text: '每个人不是生来就会傻笑的。只是因为遇见你了。'
      },
      {
        url: 'http://chuantu.biz/t6/322/1527790782x-1404793447.jpg',
        text: '亲爱的，你是我的，你是我一个人的。'
      },
      {
        url: 'http://chuantu.biz/t6/322/1527790743x-1404758413.jpg',
        text: '每天醒来阳光和你都在，这才是我想要的未来。'
      }      
    ]
  },
  previewImage: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,
      pictures = this.data.pictures;
      wx.previewImage({
        current: pictures[index],
        urls: pictures
      })
  },
  imageLoad: function (e) {
    var imageSize = imageUtil.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    innerAudioContext.autoplay = true
    innerAudioContext.loop = false
    innerAudioContext.src = this.data["data"][num - 1].url
    //  innerAudioContext.seek(220)
    innerAudioContext.play()
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
    innerAudioContext.onEnded(() => {
      console.log('音乐播放完了,切换下一首')
      innerAudioContext.src = this.data["data"][num].url
      // innerAudioContext.seek(380)
      innerAudioContext.play()
      if (num == 1) {
        num = 0
      } else {
        num = 1
      }
    })
    innerAudioContext.onPause(() => {
      console.log('暂停了')
    })
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('已经拉倒最底部啦')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

    console.log('分享按钮')
  }
})