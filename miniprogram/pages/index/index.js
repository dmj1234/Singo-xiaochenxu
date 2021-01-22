import { request } from "../../request/index.js";
Page({
  data: {
    swiperList: [],
  },
  onLoad(options) {
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success:(result) =>{
        this.setData({
          swiperList:result.data.message
        })
      }
    })
  },
  
})