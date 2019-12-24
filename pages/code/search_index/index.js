//js用到的全局变量
Page({
  data: {
    isShow: true,
    searchRecord: [],
  },
  //搜索的时候缓存到本地

  searchBox: function (e) {
    let that = this;
    let inputVal = e.detail.value.ip;
    let searchRecord = this.data.searchRecord;
    if (inputVal == "") {
      that.setData({
        ip: inputVal
      })
      return
    } else {
      if (searchRecord.length < 10) {
        searchRecord.unshift(inputVal);
      } else {
        searchRecord.pop();
        searchRecord.unshift(inputVal);
      }
      //将历史记录数组整体储存到缓存中
      wx.setStorageSync('searchRecord', Array.from(new Set(searchRecord)));
    }
    that.setData({
      ip: e.detail.value.ip
    })
  },
  // 缓存历史
  openHistorySearch: function () {
    let that = this;
    that.setData({
      searchRecord: wx.getStorageSync('searchRecord') || [], //若无储存则为空
    })
    console.log(that.data.searchRecord);
  },
  // 清空搜索历史
  clear_search: function () {
    let that = this;
    wx.clearStorageSync('searhRecord')
    that.setData({
      searchRecord: [],
      isShow: false
    })

  },
  // 点击历史搜索
  search_his: function (e) {
    let that = this;
    let his = e.currentTarget.dataset.his;
    that.setData({
      ip: his,
      isShow: false
    });
    that.search_host();
  },

})
