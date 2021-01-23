import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js";
Page({
  data: {
    orders: [],
    tabs: [
      {
        id: 0,
        title: '全部订单',
        isActive: true
      },
      {
        id: 1,
        title: '待付款',
        isActive: false
      },
      {
        id: 2,
        title: '待收货',
        isActive: false
      },
      {
        id: 3,
        title: '退款/退货',
        isActive: false
      }
    ]
  },

//   onShow() {
//     const token = wx.getStorageSync("token");
//     if(!token) {
//       wx.navigateTo({
//         url: '/pages/auth/index'
//       });
//       return;
//     }

//     let pages = getCurrentPages();
//     let currentPage = pages[pages.length-1];
//     const { type } = currentPage.options;
//     this.changeTitleByIndex(type-1);
//     this.getOrderList(type);
//   },
//   async getOrderList(type) {
//     const res = await request({url: '/my/orders/all', data: {type}});
//     this.setData({
//       orders: res.orders.map(v => ({...v, creat_time_cn: (new Date(v.create_time*1000).toLocaleString())}))
//     })
//   },
//   changeTitleByIndex(index) {
//     let { tabs } = this.data;
//     tabs.forEach((item, i) => item.isActive = index === i ? true : false);
//     this.setData({
//       tabs
//     })
//   },
//   handleItemChange(e) {
//     const { index } = e.detail;
//     changeTitleByIndex(index);
//     this.getOrderList(index+1);
//   }
})