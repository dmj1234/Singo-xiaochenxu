import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js";
Page({

  data: {
    leftMenuList: [],
    rightContent: [],
    currentIndex: 0,
    scrollTop: 0
  },
  Cates: [],
  onLoad(options) {

    const Cates = wx.getStorageSync('cates');
    if (!Cates) {
      this.getCates();
    } else {
      if(Date.now() - Cates.time > 1000*60*5) {
        this.getCates();
      } else {
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(Cates => Cates.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },

  async getCates() {
    const result = await request({ url: '/categories' });
    this.Cates = result;
    wx.setStorageSync('cates', { time: Date.now(), data: this.Cates });
    let leftMenuList = this.Cates.map(Cates => Cates.cat_name);
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  handleItemTap(e) {
    const { index } = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })
  }
})