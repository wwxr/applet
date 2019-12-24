// pages/code/logisticstrace/index.js
let app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ordertrace:[],
    isShow:false,
    orderinfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    console.log(app.globalData.httpurl);
    wx.request({
      url: app.globalData.httpurl + "/finedo/orderTrace/getTrace",
      data: {
        logisticCode:"773015869383124",
        orderCode:"11"
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      //箭头函数
      success: (res) => {
        console.log('res:', res)
        if (res.data.object !== null) {
          that.setData({
            orderinfo: res.data.object
          })
          if (res.data.object.traces.length == 0) {
            that.setData({
              isShow: true,
              ordertrace: [res.data.object.reson]
            })
          }else{
            that.setData({
              isShow: true,
              ordertrace: res.data.object.traces.reverse()
            })
          }
        } else {
          if (res.data.object.traces.length==0){
            that.setData({
              isShow: false,
              ordertrace: []
            })
          }
         
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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