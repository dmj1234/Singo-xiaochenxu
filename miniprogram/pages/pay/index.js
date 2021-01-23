import { getSetting, openSetting, chooseAddress, showModal, requestPayment } from "../../utils/asyncWx.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js";
import { request } from "../../request/index.js"
Page({
  data: {
    addressInfo: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    const addressInfo = wx.getStorageSync('address');
    let cart = wx.getStorageSync('cart') || [];
    cart = cart.filter(v => v.checked);
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.goods_price * v.num;
      totalNum += v.num;
    });
    this.setData({
      addressInfo,
      cart,
      totalPrice,
      totalNum
    })
  },

  async handleOrderPay() {
    try {
      const token = wx.getStorageSync('token');
      if(!token){
        wx.navigateTo({
          url: '/pages/auth/index'
        });
        return;
      }
      const order_price = this.data.totalPrice;
      const consignee_addr = this.data.addressInfo.all;
      const goods = [];
      cart.forEach(v => goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }))
      const orderParams = { order_price, consignee_addr, goods };
      const { order_number } = await request({url: "/my/orders/create", method: "post", data: orderParams});
      const { pay } = await request({url: "/my/orders/req_unifiedorder", method: "post", data: order_number});
      await requestPayment(pay);
      const res = await request({url: "/my/orders/chkOrder", method: "post", data: order_number});
      await showToast({title: "支付成功"})
      let newCart = wx.getStorageSync("cart");
      newCart = newCart.filter(v => !v.checked);
      wx.setStorageSync("cart", newCart);
      wx.navigateTo({
        url: '/pages/order/index'
      });
    } catch (error) {
      await showToast({title: "支付失败"})
      console.log(error);
    }
  }
})