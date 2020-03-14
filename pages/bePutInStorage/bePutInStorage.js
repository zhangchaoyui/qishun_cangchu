// pages/cunchuList/cunchuList.js
let app = getApp();
var time = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mineTabList: ["未处理", "已处理"],
    username: wx.getStorageSync('username'),
    currtabMine: 0,
    dataList: [],
    startTime: '',
    endTime: '',
    inputValue: '',
    page: 1,
    isLoadMore: true,
    last_page: 0
  },
  // 搜索
  inputClick(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },
  searchOrders() {
    let _this = this;
    _this.getPutOrder(_this.data.currtabMine);
  },
  // 时间筛选
  timeToScreen() {
    wx.navigateTo({
      url: '/pages/timeToScreen/timeToScreen',
    })
  },

  // 订单切换
  mineTab(e) {
    this.setData({
      currtabMine: e.currentTarget.dataset.index,
      page: 1
    });
    // 获取订单列表
    this.getPutOrder(e.currentTarget.dataset.index);
  },

  // 订单详情
  itemsClick(e) {
    wx.navigateTo({
      url: '/pages/cunchuListDetails/cunchuListDetails?orderId=' + e.currentTarget.dataset.id + '&pick=' + e.currentTarget.dataset.pick,
    });
  },

  // 去处理
  confirmClick(e) {
    // app._post_form('wk_affirm_order/getPutOrderInfo', {
    //   order_id: e.currentTarget.dataset.id,
    //   // type:1
    // }, (res) => {
    //   // console.log(res);
    // });
    wx.navigateTo({
      url: '/pages/pickConfirmOrder/pickConfirmOrder?orderId=' + e.currentTarget.dataset.id,
    })
  },

  // 获取订单信息
  getPutOrder(status) {
    let currtabMine = this.data.currtabMine,
      type;
    if (currtabMine == 1) {
      type = 2
    } else {
      type = currtabMine
    }
    var getData = {
      status: type,
      search: {
        key: this.data.inputValue,
        start_time: this.data.startTime,
        end_time: this.data.endTime
      },
      page: this.data.page || 1
    };
    let hours = '',
      str = '';
    app._get('wk_affirm_order/getPickOrder', getData, (res) => {
      let resList = res.data.data.data;
      if (resList.length > 0) {
        for (let i in resList) {
          let hours = this.formatTimeTwo(resList[i].pick_goods_time, 'h');
          if (hours < 12) {
            str = '上午';
          } else {
            str = '下午';
          }
          resList[i].pick_goods_time = this.formatTimeTwo(resList[i].pick_goods_time, 'Y/M/D') + '   ' + str;
          resList[i].create_time = this.formatTimeTwo(resList[i].create_time, 'Y/M/D h:m');
          resList[i].update_time = this.formatTimeTwo(resList[i].update_time, 'Y/M/D h:m');
        }
      }
      if (this.data.page == 1) {
        this.setData({
          dataList: resList,
          last_page: res.data.data.last_page
        });
      } else {
        this.setData({
          dataList: this.data.dataList.concat(resList),
          last_page: res.data.data.last_page
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this,
      startTime = wx.getStorageSync('startTime'),
      endTime = wx.getStorageSync('endTime'),
      is_auth = wx.getStorageSync("is_auth");
    // 选择的时间
    _this.setData({
      startTime: startTime,
      endTime: endTime
    });

    if (is_auth) {
      wx.navigateTo({
        url: '/pages/loginAccredit/loginAccredit',
      });
    };
    _this.getPutOrder(_this.data.currtabMine);
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
    let _this = this;
    if (_this.data.page >= _this.data.last_page) {
      _this.setData({
        isLoadMore: false,
      });
      return false;
    } else {
      _this.setData({
        page: ++_this.data.page
      });
      _this.getPutOrder(_this.data.currtabMine);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },

  /** 
   * 时间戳转化为年 月 日 时 分 秒 
   * number: 传入时间戳 
   * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
   */
  formatTimeTwo(number, format) {
    var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    var returnArr = [];
    var date = new Date(number * 1000);
    returnArr.push(date.getFullYear());
    returnArr.push(this.formatNumber(date.getMonth() + 1));
    returnArr.push(this.formatNumber(date.getDate()));
    returnArr.push(this.formatNumber(date.getHours()));
    returnArr.push(this.formatNumber(date.getMinutes()));
    returnArr.push(this.formatNumber(date.getSeconds()));
    for (var i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
  }
})