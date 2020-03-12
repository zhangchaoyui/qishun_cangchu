// pages/aboutMine/aboutMine.js
// 富文本插件
import wxParse from '../../wxParse/wxParse.js';
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    let articleInfo=[];
    app._post_form('index/getArticleInfo', {
      article_id: 3,
    }, (res) => {
      articleInfo =res.data[0];
      // 富文本转码
      if (articleInfo.content.length > 0) {
        wxParse.wxParse('content', 'html', articleInfo.content, _this, 10, app.globalData.url);
      }
      // console.log(articleInfo);
      _this.setData({
        articleInfo: articleInfo
      });
    });
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