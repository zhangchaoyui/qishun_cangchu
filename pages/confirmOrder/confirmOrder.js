// pages/confirmOrder/confirmOrder.js
let app = getApp();
let index = 0;
let goods = {};
let goodsdata = {};
let pack = {};
let packdata = {};
let handling = {
  status: 0,
  car_type: 0,
  handling_man: '',
  weight: 0,
  handling_money: 0
};
let wk_comment = '';
let dray_manage_money = 0;
let driver_money_if = 0;
let money_comment = '';
let is_room = 0;
let driver_money = 0;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showIndex: 3,
    maskData: [{
      title: '客户信息',
    }, {
      title: '司机信息',
    }, {
      title: '订单信息',
    }],
    // 货物
    placeAList: [],
    // 产地
    placeData: [], //产地第一级
    userData: [],
    userData_gn: [],
    userData_gw: [],
    userData_zc: [],
    // 型号
    versionData: [],
    versionCure: 99,
    versionUserData: ["正品", "副品"],
    max: 200,
    // 卸货方式
    unloadImg: '',
    unloadImgA: false,
    mutuoValue: "",
    // 用户卸货
    unload: [{
      text: "叉车卸货",
      select: false
    }, {
      text: "用户人工自卸",
      select: false
    }],
    // 选择车型
    careXz: false,
    itemCx: [],
    cxCurrect: 333,
    cargoTonValue: "",
    cargoPieceValue: "",
    packTonValue: "",
    packPieceValue: "",
    administrativeFeeValue: "",
    xzCurrect: "请选择车型",
    unloadValue: "",
    showArea: false,
    huowuShow: false,
    producedShow: false,
    placeCure: 99,
    modelImg: false,
    packaging: false,
    packagingW: false,
    Change: false,
    showAImage: true,
    showImage: false,
    unloadImg: true,
    textarea: false
  },

  // 面积租赁
  areaClick() {
    is_room = this.data.showArea ? 0 : 1;
    // console.log(is_room);
    this.setData({
      showArea: !this.data.showArea
    })
  },
  //是否外包装入库
  packaging(e) {
    let index = e.currentTarget.dataset.index,
      Orderfrom = this.data.Orderfrom,
      pack = this.data.pack;
    for (let i in Orderfrom) {
      Orderfrom[i].cang_pack = pack
    }
    this.setData({
      packaging: !this.data.packaging,
      packagingW: !this.data.packagingW,
      Orderfrom: Orderfrom
    })
  },

  packagingW() {
    this.setData({
      packagingW: !this.data.packagingW,
      packaging: !this.data.packaging,
    })
  },

  Change(e) {
    let index = e.currentTarget.dataset.index,
      Orderfrom = this.data.Orderfrom,
      replace;
    this.data.Orderfrom[index].replace = !this.data.Orderfrom[index].replace
    this.setData({
      Orderfrom: Orderfrom,
    })
  },

  cang_baozhuang(e) {
    let Orderfrom = this.data.Orderfrom,
      cindex = e.currentTarget.dataset.cindex,
      index = e.currentTarget.dataset.index;
    Orderfrom[index].pack[cindex].pack_unit = e.detail.value;
    Orderfrom[index].pack[cindex].piece = e.detail.value;
    console.log(Orderfrom)
    this.setData({
      Orderfrom: Orderfrom
    })
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
  // 货物
  huowuShow(e) {
    this.setData({
      huowuShow: !this.data.huowuShow
    })
  },
  // 货物选择
  cargoItem(e) {
    var index = e.currentTarget.dataset.index,
      item = e.currentTarget.dataset.item,
      goods_id = e.currentTarget.dataset.goods_id,
      goods_name = e.currentTarget.dataset.goods_name;
    this.data.Orderfrom[index].goods_id = goods_id;
    this.data.Orderfrom[index].goods_name = goods_name;
    this.setData({
      Orderfrom: this.data.Orderfrom,
    });
  },
  // 产地
  producedShow(e) {
    this.setData({
      producedShow: !this.data.producedShow
    });
  },
  // 产地一级选择
  placeCure(e) {
    let userData = [];
    let index = e.currentTarget.dataset.index,
      indexs = e.currentTarget.dataset.indexs,
      item = e.currentTarget.dataset.item;
    this.setData({
      placeCure: e.currentTarget.dataset.index,
    });
    // console.log(index);
    for (let i in this.data.placeData) {
      if (index == i) {
        userData = this.data.placeData[i].child;
      }
    }
    this.setData({
      userData: userData,
    });
  },
  // 产地选择  
  placeItem(e) {
    var index = e.currentTarget.dataset.index,
      item = e.currentTarget.dataset.item,
      place_id = e.currentTarget.dataset.place_id,
      Orderfrom = this.data.Orderfrom;
    Orderfrom[index].place_id = place_id;
    Orderfrom[index].place_name = item;
    this.setData({
      Orderfrom: this.data.Orderfrom,
    });
  },
  // 型号
  modelShow(e) {
    this.setData({
      modelImg: !this.data.modelImg
    });
  },
  // 型号一级选择
  versionCure(e) {
    // console.log(e);
    let index = e.currentTarget.dataset.index,
      indexs = e.currentTarget.dataset.indexs,
      item = e.currentTarget.dataset.item,
      cate_id = e.currentTarget.dataset.cate_id,
      Orderfrom = this.data.Orderfrom;
    Orderfrom[indexs].cate_id = cate_id;
    Orderfrom[indexs].cate_name = item;
    this.setData({
      Orderfrom: Orderfrom,
      versionCure: index,
    });
  },
  // 型号选择  
  versionItem(e) {
    var index = e.currentTarget.dataset.index,
      item = e.currentTarget.dataset.item,
      cate_type = e.currentTarget.dataset.cate_type,
      Orderfrom = this.data.Orderfrom;
    console.log(Orderfrom);
    Orderfrom[index].Ccate_name = item;
    Orderfrom[index].cate_type = cate_type;
    this.setData({
      Orderfrom: Orderfrom,
    })
  },

  // 获取货物吨数
  huowuDun(e) {
    var index = e.currentTarget.dataset.index;
    this.data.Orderfrom[index].weight = e.detail.value;
    this.setData({
      Orderfrom: this.data.Orderfrom,
    });
  },

  // 获取货物件数
  huowuJian(e) {
    var index = e.currentTarget.dataset.index;
    this.data.Orderfrom[index].piece = e.detail.value;
    this.setData({
      Orderfrom: this.data.Orderfrom,
    });
  },

  getwooden(e) {
    var index = e.currentTarget.dataset.index;
    var wid = e.currentTarget.dataset.wid;
    for (var i in this.data.cargoList[index].pack) {
      if (this.data.cargoList[index].pack[i].id == wid) {
        pack = {
          [i]: {
            pack_id: wid,
            pack_num: e.detail.value
          }
        };
        this.setData({
          cargoList: this.data.cargoList,
        });
        this.data.cargoList[index].pack[i].piece = e.detail.value;
      }
    }
    goods[index].pack = pack;
    this.setData({
      cargoList: this.data.cargoList,
    });
  },

  // 获取木托数量
  wooden(e) {
    var index = e.currentTarget.dataset.index;
    this.data.cargoList[index].wooden = e.detail.value;
    this.setData({
      cargoList: this.data.cargoList
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
    this.data.Orderfrom[index].replace_weight = e.detail.value;
    this.setData({
      Orderfrom: this.data.Orderfrom
    });
  },

  // 获取倒车数量件
  backCarPiece(e) {
    var index = e.currentTarget.dataset.index;
    this.data.Orderfrom[index].replace_money = e.detail.value;
    this.setData({
      Orderfrom: this.data.Orderfrom
    });
  },

  // 获取货物编号
  goodsCoding(e) {
    var index = e.currentTarget.dataset.index;
    this.data.Orderfrom[index].goods_codes = e.detail.value;
    this.setData({
      Orderfrom: this.data.Orderfrom
    });
  },

  // 倒换车
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
      handling.status = 1;
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
      handling.status = 0;
      this.setData({
        unloadImg: false
      });
    }
  },

  // 获取叉车卸货
  mutuo(e) {
    handling.handling_money = e.detail.value;
    this.setData({
      mutuoValue: e.detail.value
    });
  },

  // 选择是否使用叉车
  xzItem(e) {
    let eIndx = e.currentTarget.dataset.index;
    // console.log(eIndx);
    this.data.unload.forEach((item, idx) => {
      if (eIndx == idx) {
        this.data.unload[idx].select = !this.data.unload[idx].select;
      }
      this.setData({
        unload: this.data.unload
      })
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
    handling.handling_man = e.detail.value;
    this.setData({
      unloadValue: e.detail.value
    });
  },

  // 获取挑包件数
  outerInput(e) {
    handling.weight = e.detail.value;
    this.setData({
      outerValue: e.detail.value
    });
  },

  // 点击车型
  itemCxClick(e) {
    let car_type = e.currentTarget.dataset.car_type,
      car_name = e.currentTarget.dataset.item;
    this.setData({
      cxCurrect: e.currentTarget.dataset.index,
      car_type: car_type,
      car_name: car_name
    });
    // console.log(xzCurrect);
    // if (e.currentTarget.dataset.index == this.data.cxCurrect) {
    //   handling.car_type = car_type;
    //   this.setData({
    //     xzCurrect: e.currentTarget.dataset.item
    //   });
    // }
  },

  // 司机是否自付费用
  have() {
    this.setData({
      showImage: true
    });
    if (this.data.showImage) {
      driver_money_if = 1;
      this.setData({
        showAImage: false
      });
    }
  },

  notHave() {
    this.setData({
      showAImage: true
    });
    if (this.data.showAImage) {
      driver_money_if = 0;
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
    // console.log(this.data.itemA);
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
      textarea: false
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
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
    dray_manage_money = e.detail.value;
    this.setData({
      administrativeFeeValue: e.detail.value
    });
  },

  // 获取备注信息
  postscript(e) {
    wk_comment = e.detail.value;
    this.setData({
      postscriptValue: e.detail.value
    });
  },
  // 获取司机自付费用
  driver(e) {
    driver_money = e.detail.value;
    this.setData({
      driverValue: e.detail.value
    });
  },

  // 获取费用说明
  cost(e) {
    money_comment = e.detail.value;
    this.setData({
      costValue: e.detail.value
    });
  },

  // 确定提交
  btnClick(e) {
    let _this = this,
      is_self;
    let order_id = e.currentTarget.dataset.dataid,
      handling = {},
      unloadImg = this.data.unloadImg,
      handling_money,
      driver_money_if,
      money_comment, Orderfrom = this.data.Orderfrom,
      goods = [],
      dray_manage_money = this.data.administrativeFeeValue,
      is_room;

    if (unloadImg) {
      unloadImg = 1
      handling_money = this.data.outerValue
      is_self = 0
    } else {
      unloadImg = 0
      handling_money = this.data.mutuoValue
      is_self = this.data.unload[1].select == true ? 1 : 0
    }

    if (this.data.showImage) {
      driver_money_if = 1
    } else {
      driver_money_if = 0
    }

    if (this.data.showArea) {
      is_room = 1
    } else {
      is_room = 0
    }
    handling = {
      status: unloadImg,
      car_type: this.data.car_type ? this.data.car_type : 0,
      handling_man: this.data.unloadValue ? this.data.unloadValue : '',
      handling_money: handling_money,
      is_self: is_self
    }
    console.log(handling)
    // 表单验证
    if (order_id == 0) {
      app.hintComifg('订单id不能为空')
      return false;
    }
    for (let i in Orderfrom) {
      if (Orderfrom[i].goods_id == 0) {
        app.hintComifg('货物名称不能为空');
        return false;
      }
      // if (Orderfrom[i].goods_codes == '') {
      //   app.hintComifg('请填写货物编号');
      //   return false;
      // }
      if (Orderfrom[i].weight == 0 && Orderfrom[i].piece == 0) {
        app.hintComifg('货物重量与货物件数必须填入一个');
        return false;
      } else if (!(/^[+]?\d+(\.\d+)?$|^$|^(\d+|\-){7,}$/.test(Orderfrom[i].weight)) || !(/^[+]?\d+(\.\d+)?$|^$|^(\d+|\-){7,}$/.test(Orderfrom[i].piece))) {
        app.showError('货物重量与货物件数必须为数字');
        return false;
      }
      if (Orderfrom[i].cate_id == 0) {
        app.hintComifg('型号不能为空');
        return false;
      }
      for (let y in Orderfrom[i].pack) {
        if (Orderfrom[i].pack[y].pack_id == 0) {
          app.hintComifg('外包装不能为空');
          return false;
        }
        if (Orderfrom[i].pack[y].pack_num == 0) {
          app.hintComifg('外包装数量不能为空');
          return false;
        }
      }
      //倒换车
      if (Orderfrom[i].replace == 1) {
        if (Orderfrom[i].replace_weight == 0) {
          app.hintComifg('倒换数量不能为空');
          return false;
        }
        if (Orderfrom[i].replace_money == 0) {
          app.hintComifg('倒换费用不能为空');
          return false;
        }
      }
    }
    console.log(handling)
    if (handling.status == 0) {
      //用户自卸
      if (handling.handling_money != "") {
        if (!(/^[+]?\d+(\.\d+)?$|^$|^(\d+|\-){7,}$/.test(handling.handling_money))) {
          app.hintComifg('自卸叉车费用只能为数字')
          return false;
        }
      } else {
        app.hintComifg('自卸叉车费用不能为空')
        return false;
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
      } else if (driver_money == "") {
        app.hintComifg('司机自费不能为空')
        return false;
      }
    }

    if (dray_manage_money == '') {
      app.hintComifg('大车进场管理费不能为空')
      return false;
    }

    for (let jj in Orderfrom) {
      delete Orderfrom[jj].place_name;
      delete Orderfrom[jj].cate_name;
      for (let ii in Orderfrom[jj].pack) {
        let pack = {};
        pack.pack_id = Orderfrom[jj].pack[ii].id
        pack.pack_num = Orderfrom[jj].pack[ii].piece
        console.log(pack)
        delete Orderfrom[jj].pack[ii].id
        delete Orderfrom[jj].pack[ii].pack_name
        delete Orderfrom[jj].pack[ii].pack_unit
        delete Orderfrom[jj].pack[ii].status
        Orderfrom[jj].pack[ii] = pack
      }
      if (Orderfrom[jj].Ccate_name == "正品") {
        Orderfrom[jj].cate_type = 0
      } else {
        Orderfrom[jj].cate_type = 1
      }
      delete Orderfrom[jj].Ccate_name;
      delete Orderfrom[jj].cang_pack
      delete Orderfrom[jj].canginput
      delete Orderfrom[jj].goods_name
    }
    console.log(Orderfrom, '这是数据');
    // 获取订单信息数据
    let postdata = {
      order_id: this.data.orderInfo.id,
      goods: JSON.stringify(Orderfrom),
      handling: JSON.stringify(handling),
      wk_comment: this.data.postscriptValue ? this.data.postscriptValue : '',
      dray_manage_money: dray_manage_money, //进场管理费
      driver_money_if: driver_money_if, //driver_money_if
      money_comment: this.data.costValue ? this.data.costValue : '', //自费说明
      is_room: is_room, //是否放入面积房 0否,1是
      driver_money: this.data.driverValue ? this.data.driverValue : 0
    }
    this.setData({
      showModalStatus: false,
      showModalStatusFinsh: true
    });
    app._post_form('wk_affirm_order/affirmPutOrder', postdata, res => {
      if (res.code == 1 && res.msg == 'success') {
        wx.hideLoading();
        wx.showToast({
          title: '订单处理成功~',
          icon: 'none',
          duration: 1500
        })
        setTimeout(aa => {
          wx.redirectTo({
            url: '../cunchuListDetails/cunchuListDetails?orderId=' + order_id + "&pick=" + 0,
          })
        }, 1500)
      } else {
        app.hintComifg(res.msg);
      }
    })
    return false;
  },



  // 获取订单详情
  getPutOrderInfo(orderId) {
    let _this = this;
    let placeAList = [];
    let Orderfrom = [];
    let placeData = [];
    let placeSonData = [];
    let versionData = [];
    let itemCx = [];
    let str = '';
    app._post_form('user/getPutOrderInfo', {
      order_id: orderId,
      type: 1
    }, (res) => {
      // console.log(res)
      let hours = this.formatTimeTwo(res.data.data.put_goods_time, 'h');
      if (hours < 12) {
        str = '上午';
      } else {
        str = '下午';
      }
      res.data.data.put_goods_time = this.formatTimeTwo(res.data.data.put_goods_time, 'M/D') + '   ' + str;
      if (res.data.data.user != null && res.data.data.user.contract != null) {
        res.data.data.user.contract.start_time = this.formatTimeTwo(res.data.data.user.contract.start_time, 'Y-M-D');
        res.data.data.user.contract.end_time = this.formatTimeTwo(res.data.data.user.contract.end_time, 'Y-M-D');
      }
      for (let z in res.data.data.goods) {
        let pageData = {
          pack: [], //产品外包装数组
          goods_id: res.data.data.goods[z].goods.id, //货物ID
          goods_name: res.data.data.goods[z].goods.goods_name, //  货物姓名
          place_id: res.data.data.goods[z].region.id, //  产地ID
          place_name: res.data.data.goods[z].region.place_name, //  产地名
          cate_id: res.data.data.goods[z].cate.id, //型号id
          cate_name: res.data.data.goods[z].cate.cate_name, //  型号名
          goods_codes: '', //货物编码
          Ccate_name: '',
          put_goods_id: res.data.data.goods[z].id,
          // canginput: [], //仓管端存储外包装
          pack: res.data.data.goods[z].pack_idss, //订单原始外包装
          weight: res.data.data.goods[z].weight / 1000, //商品重量
          piece: res.data.data.goods[z].piece, //  商品件数
          // cang_pack: res.data.pack, //仓管端显示外包装
          cate_type: res.data.data.goods[z].cate_type, //正副品 0正品 1副品
          replace: 0, //是否有到换车
          replace_weight: '', //是否有到换车重量
          replace_money: '', //到换车费用
        };
        // Orderfrom[i].cang_pack.push(res.data.pack);
        Orderfrom.push(pageData);
      }
      for (let x in res.data.places) {
        placeSonData[x] = res.data.places[x].child;
      }
      for (let j in res.data.pack) {
        res.data.pack[j].pack_unit = 0;
      }

      _this.setData({
        orderInfo: res.data.data,
        cars: res.data.cars,
        placeAList: res.data.goods,
        Orderfrom: Orderfrom,
        placeData: res.data.places,
        placeSonData: placeSonData,
        versionData: res.data.cates,
        pack: res.data.pack,
        user_Remarks: res.data.data.comment,
        username: wx.getStorageSync('username')
      });
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    this.setData({
      orderId: options.orderId,
      itemhuowu: "日用塑料制品·自产·型号1·副品",
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    let _this = this;
    // 获取订单详情
    _this.getPutOrderInfo(_this.data.orderId);
  },
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

  previewMoreImage(e) {
    let src = e.currentTarget.dataset.src;
    app.previewMoreImage(src);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
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