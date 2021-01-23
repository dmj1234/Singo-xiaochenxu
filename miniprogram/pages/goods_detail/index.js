import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js";
Page({

  data: {
    goodsDetail: {},
    isCollect: false
  },

  onShow() {
    let pages =  getCurrentPages();
    let currentPages = pages[pages.length-1];
    const { goods_id } = currentPages.options;
    this.getGoodsDetail(goods_id);
  },

  GoodsDetail: {},

  async getGoodsDetail(id) {
    const result = await request({url: '/goods/detail?goods_id=' + id});
    this.GoodsDetail = result;
    let collect = wx.getStorageSync("collect") || [];
    let isCollect = collect.some(v => v.goods_id === this.GoodsDetail.goods_id);
    this.setData({
      goodsDetail: {
        pics            : result.pics,
        goods_price     : result.goods_price,
        goods_name      : result.goods_name,
        goods_introduce : result.goods_introduce.replace(/\.webp/g, '.jpg')
      },
      isCollect
    })
  },

  handlePrevewImage(e) {
    const urls = this.GoodsDetail.pics.map(v => v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
  },

  handleCartAdd() {
    let cart = wx.getStorageSync('cart') || [];
    let index = cart.findIndex(v => v.goods_id === this.GoodsDetail.goods_id);
    if(index === -1) {
      this.GoodsDetail.num = 1;
      this.GoodsDetail.checked = true;
      cart.push(this.GoodsDetail);
    } else {
      cart[index].num ++;
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      mask: true  
    })
  },

  handleCollect() {
    let isCollect = false;
    let collect = wx.getStorageSync("collect") || [];
    let index = collect.findIndex(v => v.goods_id === this.GoodsDetail.goods_id);
    if(index !== -1) {
      collect.splice(index, 1);
      isCollect = false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true,
      });
    }else{
      collect.push(this.GoodsDetail);
      isCollect = true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true,
      });
    }
    wx.setStorageSync("collect", collect);
    this.setData({
      isCollect
    })
  }
})