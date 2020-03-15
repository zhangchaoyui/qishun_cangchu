// pages/pickConfirmOrder/pickConfirmOrder.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIndex: 0,
    maskData: [{
      title: '客户信息',
    }, {
      title: '司机信息',
    }, {
      title: '订单信息',
    }],
    // 货物
    placeAList: [],
    showModalStatusFinsh: false,
    // 产地
    placeCure: null,
    placeData: [],
    userData: [],
    userData_gn: [],
    userData_gw: [],
    userData_zc: [],
    // 型号
    versionData: [],
    versionCure: null,
    versionUserData: ["正品", "副品"],
    max: 200,
    huowuDun: "4.54",
    goodsCodingValue: "",
    // 卸货方式
    unloadImg: false,
    unloadImgA: false,
    mutuoValue: "",
    // 用户卸货
    unload: [{
      text: "叉车卸货费用",
      select: false
    }, {
      text: "用户人工自卸",
      select: false
    }],
    // 选择车型
    careXz: false,
    itemCx: ["车型一", "车型二", "车型二"],
    cxCurrect: 333,
    cargoTonValue: "",
    cargoPieceValue: "",
    packTonValue: "",
    packPieceValue: "",
    administrativeFeeValue: "",
    xzCurrect: "请选择车型",
    unloadValue: "",
    driver_money_if: 0, //司机货车是否自付费用
    packaging: false,
    unloadImgA: true,
    textarea: false
  },

  // 展开折叠选择 
  panel: function (e) {
    var idx = e.currentTarget.dataset.index;
    if (idx != this.data.showIndex) {
      this.setData({
        showIndex: idx
      })
    } else {
      this.setData({
        showIndex: 0
      })
    }
  },

  // 获取货物吨数
  huowuDun(e) {
    var index = e.currentTarget.dataset.index,
      weight = "weight";
    this.input(index, weight, e.detail.value)
  },

  // 获取货物吨数
  huowuDun2(e) {
    console.log(e)
    var index = e.currentTarget.dataset.index,
      change_weight = "change_weight";
    this.input(index, change_weight, e.detail.value)
  },

  // 获取货物吨数
  huowuDun3(e) {
    var index = e.currentTarget.dataset.index,
      pullback_weight = "pullback_weight";
    console.log(index)
    this.input(index, pullback_weight, e.detail.value)
  },

  //循环套用输入方法
  input(index, name, value) {
    let goods = this.data.goods;
    console.log(goods);
    // for (let i in this.data.goods) {
    //   if (index == i) {
    //     console.log(21)
    goods[index][name] = value;
    // }else{
    //   this.data.goods[i][name] = '';
    // }
    // }
    console.log(goods[index])
    this.setData({
      goods: this.data.goods
    });
  },

  // 获取货物件数
  huowuJian(e) {
    var index = e.currentTarget.dataset.index;
    this.data.cargoList[index].huowuJian = e.detail.value;
    this.setData({
      cargoList: this.data.cargoList
    });
  },

  // 获取木托数量
  wooden(e) {
    console.log(e);
    var index = e.currentTarget.dataset.goodsindex,
      packid = e.currentTarget.dataset.packid,
      value = e.detail.value,
      goods = this.data.goods;
    goods[index].pack_id = packid;
    goods[index].pack_num = value;
    this.setData({
      goods: goods
    });
  },

  // 获取塑托数量
  sul(e) {
    var index = e.currentTarget.dataset.index;
    this.data.cargoList[index].sul = e.detail.value;
    this.setData({
      cargoList: this.data.cargoList
    });
  },

  // 获取倒车数量吨
  backCarTon(e) {
    var index = e.currentTarget.dataset.index;
    this.data.cargoList[index].backCarTonValue = e.detail.value;
    this.setData({
      cargoList: this.data.cargoList
    });
  },
  // 获取倒车数量件
  backCarPiece(e) {
    var index = e.currentTarget.dataset.index;
    this.data.cargoList[index].backCarPieceValue = e.detail.value;
    this.setData({
      cargoList: this.data.cargoList
    });
  },

  // 获取货物编号
  goodsCoding(e) {
    var index = e.currentTarget.dataset.index,
      goods_codes = "goods_codes";
    // this.setData({
    //   goods:this.data.goods[index].
    // })
    this.input(index, goods_codes, e.detail.value);
  },

  // 到换车
  haveMent(e) {
    var index = e.currentTarget.dataset.index;
    this.data.cargoList[index].reaImg = true;
    this.setData({
      cargoList: this.data.cargoList
    });
    if (this.data.cargoList[index].reaImg) {
      this.data.cargoList[index].reaImgA = false;
      this.setData({
        cargoList: this.data.cargoList
      });
    }
  },
  notHaveMent(e) {
    var index = e.currentTarget.dataset.index;
    this.data.cargoList[index].reaImgA = true;
    this.setData({
      cargoList: this.data.cargoList
    });
    if (this.data.cargoList[index].reaImgA) {
      this.data.cargoList[index].reaImg = false;
      this.setData({
        cargoList: this.data.cargoList
      });
    }
  },

  // 卸货方式
  haveUnload() {
    this.setData({
      unloadImg: true
    });
    if (this.data.unloadImg) {
      this.setData({
        unloadImgA: false
      });
    }
  },
  notHaveUnload() {
    this.setData({
      unloadImgA: true
    });
    if (this.data.unloadImgA) {
      this.setData({
        unloadImg: false
      });
    }
  },

  // 获取叉车卸货
  mutuo(e) {
    this.setData({
      mutuoValue: e.detail.value
    });
  },

  // 选择是否使用叉车
  xzItem(e) {
    let eIndx = e.currentTarget.dataset.index;
    console.log(eIndx);
    this.data.unload.forEach((item, idx) => {
      if (eIndx == idx) {
        this.data.unload[idx].select = !this.data.unload[idx].select;
        this.setData({
          unload: this.data.unload
        })
      }
    });
  },

  // 请选择车型
  xzClick() {
    this.setData({
      careXz: !this.data.careXz
    })
  },

  // 获取卸货工人
  unload(e) {
    this.setData({
      unloadValue: e.detail.value
    });
  },

  // 获取挑包件数
  outerInput(e) {
    this.setData({
      outerValue: e.detail.value
    });
  },

  // 点击车型
  itemCxClick(e) {
    console.log(e)
    this.setData({
      cxCurrect: e.currentTarget.dataset.index,
      xzCurrect: this.data.cars[e.currentTarget.dataset.index].type_name,
      car_type: this.data.cars[e.currentTarget.dataset.index].id
    });
  },

  // 司机是否自付费用
  have() {
    this.setData({
      driver_money_if: !this.data.driver_money_if
    });
  },

  notHave() {
    this.setData({
      showAImage: true
    });
    if (this.data.showAImage) {
      this.setData({
        showImage: false
      });
    }
  },


  placeAClick(e) {
    this.setData({
      placeACure: e.currentTarget.dataset.index
    });
    if (e.currentTarget.dataset.index == 0) {
      this.setData({
        placeBList: this.data.placeBListOne
      });
    } else if (e.currentTarget.dataset.index == 1) {
      this.setData({
        placeBList: this.data.placeBListTwo
      });
    } else if (e.currentTarget.dataset.index == 2) {
      this.setData({
        placeBList: this.data.placeBListThree
      });
    } else if (e.currentTarget.dataset.index == 3) {
      this.setData({
        placeBList: this.data.placeBListFoure
      });
    }

    this.setData({
      itemA: e.currentTarget.dataset.item
    });

    console.log(this.data.itemA);

  },
  placeBClick(e) {
    this.setData({
      placeBCure: e.currentTarget.dataset.index
    });

    this.setData({
      itemB: e.currentTarget.dataset.item
    })
  },
  placeCClick(e) {
    this.setData({
      placeCCure: e.currentTarget.dataset.index
    });
    this.setData({
      itemC: e.currentTarget.dataset.item
    })
  },

  // 备注
  inputs: function (e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);

    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len //当前字数
    });
  },

  //隐藏对话框-提交
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false,
        textarea: false
      })
    }.bind(this), 200)
  },

  //显示对话框-提交
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true,
      textarea: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },

  // 获取货物数量吨
  cargoTon(e) {
    this.setData({
      cargoTonValue: e.detail.value
    });
  },
  // 获取货物数量件
  cargoPiece(e) {
    this.setData({
      cargoPieceValue: e.detail.value
    });
  },
  // 获取外包装吨
  packTon(e) {
    this.setData({
      packTonValue: e.detail.value
    });
  },
  // 获取外包装件
  packPiece(e) {
    this.setData({
      packPieceValue: e.detail.value
    });
  },

  // 获取大车进场管理费
  administrativeFee(e) {
    this.setData({
      administrativeFeeValue: e.detail.value
    });
  },
  // 获取备注信息
  postscript(e) {
    this.setData({
      postscriptValue: e.detail.value
    });
  },

  // 获取司机自付费用
  driver(e) {
    this.setData({
      driver_money: e.detail.value
    });
  },

  // 获取费用说明
  cost(e) {
    this.setData({
      money_comment: e.detail.value
    });
  },

  // 确定提交
  btnClick(e) {
    // 获取订单信息数据
    console.log(this.data.cargoList);
    // 平台卸货(叉车)
    console.log(this.data.mutuoValue)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      itemhuowu: "日用塑料制品·自产·型号1·副品",
      orderId: options.orderId
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
    let data = {},
      goods = [],
      goods_name = "";
    data.order_id = this.data.orderId;
    app._post_form('wk_affirm_order/getPickOrderInfo', data, res => {
      for (let i in res.data.data.goods) {
        if (res.data.data.goods[i].pick_status > 0) {
          goods_name = res.data.data.goods[i].pack.pack_name
        } else {
          goods_name = res.data.data.goods[i].goods.goods_name
        }
        let pageData = {
          packs: res.data.pack,
          goods_name: goods_name,
          goods_id: res.data.data.goods[i].goods_id,
          weight: res.data.data.goods[i].weight / 1000,
          piece: res.data.data.goods[i].piece,
          pick_goods_id: res.data.data.goods[i].id,
          change_weight: 0,
          pullback_weight: 0,
          goods_codes: '',
          pick_status: res.data.data.goods[i].pick_status,
          goods_all_weight: res.data.data.goods[i].goods_all_weight / 1000,
        };
        goods.push(pageData);
      }
      this.setData({
        orderInfo: res.data.data,
        pack: res.data.pack,
        goods,
        cars: res.data.cars,
        nickName: wx.getStorageSync('nickName')
      })
    })
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

  },

  //仓管确认出库
  onclickFrom() {
    let that = this,
      data = {},
      handling = {}, //卸货数据
      orderid = this.data.orderInfo.id, //订单
      goods = this.data.goods, //货物数据
      remark = this.data.currentWordNumber, //仓管备注
      dray_manage_money = this.data.administrativeFeeValue, //大车进场管理费
      driver_money_if = this.data.driver_money_if, //司机是否自付费用 0否 1是
      money_comment = this.data.money_comment, //司机自付费用说明
      driver_money = this.data.driver_money; //司机自付费用值
    if (driver_money_if) {
      driver_money_if = 1
    } else {
      driver_money_if = 0
    }
    if (this.data.unloadImgA) {
      handling = {
        status: 1,
        car_type: this.data.car_type || '',
        handling_man: this.data.unloadValue || '',
        weight: '',
        handling_money: this.data.outerValue || '',
      }
    } else {
      handling = {
        status: 0,
        car_type: this.data.car_type || '',
        handling_man: this.data.unloadValue || '',
        weight: '',
        handling_money: this.data.outerValue || '',
      }
    }
    // 表单验证
    if (this.data.orderId == 0) {
      app.hintComifg('订单id不能为空')
      return false;
    }
    for (let i in goods) {
      if (goods[i].goods_id == 0) {
        app.hintComifg('货物名称不能为空');
        return false;
      }
      // console.log(Orderfrom);
      // if (goods[i].goods_codes == '') {
      //   app.hintComifg('请填写货物编码');
      //   return false;
      // }
      if (goods[i].weight == 0) {
        app.hintComifg('货物重量与货物件数必须填入一个');
        return false;
      } else if (!(/^[+]?\d+(\.\d+)?$|^$|^(\d+|\-){7,}$/.test(goods[i].weight))) {
        app.showError('货物重量必须为数字');
        return false;
      }
      if (goods[i].cate_id == 0) {
        app.hintComifg('型号不能为空');
        return false;
      }
      for (let y in goods[i].pack) {
        if (goods[i].pack[y].pack_id == 0) {
          app.hintComifg('外包装不能为空');
          return false;
        }
        if (goods[i].pack[y].pack_num == 0) {
          app.hintComifg('外包装数量不能为空');
          return false;
        }
      }
      //倒换车
      if (goods[i].replace == 1) {
        if (goods[i].replace_weight == 0) {
          app.hintComifg('倒换数量不能为空');
          return false;
        }
        if (goods[i].replace_money == 0) {
          app.hintComifg('倒换费用不能为空');
          return false;
        }
      }
    }
    if (handling.status == 0) {
      //用户自卸
      if (this.data.unload == true) {
        if (handling.handling_money != "") {
          if (!(/^[+]?\d+(\.\d+)?$|^$|^(\d+|\-){7,}$/.test(handling.handling_money))) {
            app.hintComifg('自卸叉车费用只能为数字')
            return false;
          }
        }
      }
    } else {
      //平台卸货
      if (handling.car_type == 0) {
        app.hintComifg('装卸车型不能为空')
        return false;
      }
      if (handling.handling_man == '') {
        app.hintComifg('装卸工人员不能为空')
        return false;
      }
      if (handling.handling_money != "") {
        if (!(/^[+]?\d+(\.\d+)?$|^$|^(\d+|\-){7,}$/.test(handling.handling_money))) {
          app.hintComifg('挑包只能为数字')
          return false;
        }
      }
    }
    if (driver_money_if != 0) {
      if (driver_money != 0) {
        if (!(/^[+]?\d+(\.\d+)?$|^$|^(\d+|\-){7,}$/.test(driver_money))) {
          app.hintComifg('司机自费只能为数字')
          return false;
        }
      }
    }
    for (let jj in goods) {
      delete goods[jj].goods_name;
      delete goods[jj].goods_all_weight;
      for (let ii in goods[jj].packs) {
        let pack = {};
        pack.pack_id = goods[jj].packs[ii].id
        pack.pack_num = goods[jj].packs[ii].pack_unit
        delete goods[jj].pack
        goods[jj].packs[ii] = pack
      }
    }
    data = {
      'goods': JSON.stringify(goods),
      'handling': JSON.stringify(handling),
      'order_id': orderid,
      'remark': remark || '', //仓管备注
      'dray_manage_money': dray_manage_money,
      'driver_money_if': driver_money_if,
      'money_comment': money_comment || '', //司机自付费用说明
      'driver_money': driver_money || 0,
    };
    app._post_form('wk_affirm_order/affirmPickOrder', data, res => {
      wx.hideLoading();
      if (res.code == 1) {
        wx.showToast({
          title: '订单处理成功~',
          icon: 'none',
          duration: 1500
        })
        setTimeout(res => {
          that.setData({
            showModalStatus: false,
          })
          wx.switchTab({
            url: '../bePutInStorage/bePutInStorage',
          })
        }, 1500)
      }
    })
  },

  //返回首页
  returnIndex() {

  },
  cang_baozhuang(e) {
    let index = e.currentTarget.dataset.index,
      cindex = e.currentTarget.dataset.cindex,
      goods = this.data.goods;
    goods[index].packs[cindex].pack_unit = e.detail.value
    this.setData({
      goods: goods
    })
  },

  packaging() {
    this.setData({
      packaging: !this.data.packaging
    })
  },

  //  查看详情
  listClick() {
    wx.switchTab({
      url: '../bePutInStorage/bePutInStorage',
    })
  },
  
  previewMoreImage(e) {
    let src = e.currentTarget.dataset.src;
    app.previewMoreImage(src);
  },
})