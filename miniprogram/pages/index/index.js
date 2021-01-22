import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js";
Page({
  data: {
    swiperList: [],
    catesList: [],
    floorList: []
  },
  onLoad(options) {
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
  },
  async getSwiperList() {
    const result = await request({url: '/home/swiperdata'});
    this.setData({
      swiperList: result
    })
  }, async getCatesList() {
    const result = await request({url: '/home/catitems'});
    this.setData({
      catesList: result
    })
  }, async getFloorList() {
    const result = await request({url: '/home/floordata'});
    this.setData({
      floorList: result
    })
  }
})