const app = getApp()
Page({
  data: {
    value: '',
    searchstoragelist: [],
    searchRecord:[],
    isShow: false,
  },

  onLoad: function (options) {
    this.openHistorySearch()
  },
  onChange(e) {
    console.log('onChange', e)
    this.setData({
      value: e.detail.value,
    })
  },
  onFocus(e) {
    console.log('onFocus', e)
  },
  onBlur(e) {
    console.log('onBlur', e)
  },
  onConfirm(e) {
    var _this=this;
    console.log(app.globalData.userInfo)
    console.log('onConfirm', e);
    var searchstoragelist=[];
    //1. 先取缓存
    searchstoragelist=wx.getStorageSync("searchstoragelist")
    console.log(searchstoragelist);

    //2.取输入值
    var history = [e.detail.value];
    console.log(history)
    if (history != [""] | history != null) {
      //3.输入值不为空，添加到全局变量原来的列表
      
      _this.setData({
        searchstoragelist: _this.data.searchstoragelist.concat(history)
      })
    }
    // 4.将新的放入缓存中
    wx.setStorageSync('searchstoragelist', _this.data.searchstoragelist);
  },
  onClear(e) {
    var _this = this;
    console.log('onClear', e)
    _this.setData({
      value: '',
    })
  },
  onCancel(e) {
    console.log('onCancel', e)
  },
  searchBox: function (e) {
    console.log(app.globalData.userInfo)
    let that = this;
    //获取输入值
    let inputVal = e.detail.value;
    console.log("inputVal",inputVal)
    //获取全局变量历史记录
    let searchRecord = this.data.searchRecord;
    console.log("searchRecord", searchRecord)
    if (inputVal == "") {
      return
    } else {
      if (searchRecord.length < 10) {
        //在前方添加搜索记录
        searchRecord.unshift(inputVal);
      } else {
        //大于10条删除之前的
        searchRecord.pop();
        searchRecord.unshift(inputVal);
      }
      console.log(Array.from(new Set(searchRecord)));
      //将历史记录数组整体储存到缓存中
      wx.setStorageSync('searchRecord', Array.from(new Set(searchRecord)));
      // that.setData({
      //   isShow: true
      // })
      //将数据放到全局变量中
      that.setData({
        searchRecord: wx.getStorageSync('searchRecord') || [], //若无储存则为空
      })
    }
    
  },
  // 展示缓存历史
  openHistorySearch: function () {
    let that = this;
    let searchRecord = wx.getStorageSync('searchRecord');
    if (searchRecord==''){
        that.setData({
          isShow:false,
        })
    }else{
      that.setData({
        isShow: true,

      })
    }
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
  }
})