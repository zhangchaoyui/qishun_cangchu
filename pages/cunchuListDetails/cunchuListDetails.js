// pages/cunchuListDetails/cunchuListDetails.js
let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pick: ''
  },
  // 去处理
  confirmClick(e) {
    if (this.data.pick != 1) {
      wx.navigateTo({
        url: '/pages/confirmOrder/confirmOrder?orderId=' + e.currentTarget.dataset.id,
      })
    } else {
      wx.navigateTo({
        url: '/pages/pickConfirmOrder/pickConfirmOrder?orderId=' + e.currentTarget.dataset.id,
      })
    }
  },

  // 获取订单详情
  getPutOrderInfo(orderId, pick) {
    let str = '';
    console.log(pick);
    if (pick == 0) {
      app._post_form('wk_affirm_order/getPutOrderInfo', {
        order_id: orderId
      }, (res) => {
        // console.log(res);
        let hours = this.formatTimeTwo(res.data.data.put_goods_time, 'h');
        if (hours < 12) {
          str = '上午';
        } else {
          str = '下午';
        }
        res.data.data.user.contract.start_time = this.formatTimeTwo(res.data.data.user.contract.start_time, 'Y/M/D')
        res.data.data.user.contract.end_time = this.formatTimeTwo(res.data.data.user.contract.end_time, 'Y/M/D')
        res.data.data.put_goods_time = this.formatTimeTwo(res.data.data.put_goods_time, 'Y/M/D') + '   ' + str;
        this.setData({
          orderInfo: res.data,
          pick: pick
        })
      });
    } else {
      app._post_form('wk_affirm_order/getPickOrderInfo', {
        order_id: orderId
      }, (res) => {
        let hours = this.formatTimeTwo(res.data.data.pick_goods_time, 'h');
        if (hours < 12) {
          str = '上午';
        } else {
          str = '下午';
        }
        res.data.data.user.contract.start_time = this.formatTimeTwo(res.data.data.user.contract.start_time, 'Y/M/D')
        res.data.data.user.contract.end_time = this.formatTimeTwo(res.data.data.user.contract.end_time, 'Y/M/D')

        res.data.data.pick_goods_time = this.formatTimeTwo(res.data.data.pick_goods_time, 'Y/M/D') + '   ' + str;
        this.setData({
          orderInfo: res.data,
          pick: pick
        })
      });
    }
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    // 获取订单详情
    _this.getPutOrderInfo(options.orderId, options.pick);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

  previewMoreImage(e) {
    let src = e.currentTarget.dataset.src;
    app.previewMoreImage(src);
  }
})