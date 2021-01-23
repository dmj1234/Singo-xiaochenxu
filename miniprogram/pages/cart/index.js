import { getSetting, openSetting, chooseAddress, showModal } from "../../utils/asyncWx.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js";
Page({
  data: {
    addressInfo: {},
    cart: [],
    allChecked: true,
    totalPrice: 0,
    totalNum: 0
  },

  onShow() {
    const addressInfo = wx.getStorageSync('address');
    const cart = wx.getStorageSync('cart') || [];
    this.setData({ addressInfo });
    this.setCart(cart);
  },

  async handleChooseAddress(e) {
    try {
      const res = await getSetting();
      const scopeAdderss = res.authSetting['scope.address'];
      if (scopeAdderss === false) {
        await openSetting();
      }
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      wx.setStorageSync('address', address);
    } catch (error) {
      console.log(error);
    }
  },

  handleItemChange(e) {
    const { id } = e.currentTarget.dataset;
    let { cart } = this.data;
    let index = cart.findIndex(v => v.goods_id === id);
    cart[index].checked = ! cart[index].checked;
    this.setData({ cart });
    this.setCart(cart);
  },

  setCart(cart) {
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if(v.checked) {
        totalPrice += v.goods_price * v.num;
        totalNum += v.num;
      }else{
        allChecked = false;
      }
    });
    allChecked = cart.length !== 0 ? allChecked : false;
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync('cart', cart);
  },
  handleAllChange() {
    let { cart, allChecked } = this.data;
    allChecked = !allChecked;
    cart.forEach(v => v.checked = allChecked);
    this.setCart(cart);
  },
  async handleItemNumEdit(e) {
    const { id,  operation } = e.currentTarget.dataset;
    let { cart } = this.data;
    const index = cart.findIndex(v => v.goods_id === id);
    if(cart[index].num === 1 && operation === -1) {
      const result = await showModal({content: '是否要删除此商品？'});
      if(result.confirm) {
        cart.splice(index, 1);
        this.setCart(cart);
      }
    } else {
      cart[index].num += operation;
      this.setCart(cart);
    }
  },
  handelPay() {
    const { addressInfo, totalNum } = this.data;
    if(!addressInfo) {
      wx.showToast({ 
        title: '还没有添加收货地址',
        icon: 'none'
      });
      return;
    }
    if(totalNum === 0) {
      wx.showToast({ 
        title: '还没有添加商品',
        icon: 'none'
      });
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    });
  }
})