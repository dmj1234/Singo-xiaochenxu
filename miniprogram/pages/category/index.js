// pages/category/index.js
import regeneratorRuntime from '../../lib/runtime/runtime'
import { request } from "../../request/index";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        leftMenuList: [],
        rightMenuList: [],
        currentIndex: 0,
        scrollTop:0
    },
    //接口返回数据
    Cates: [],

    onLoad: function (options) {
        // 小程序中： wx.setStorageSync("cates" ,{time:Date.now(),data:this.Cates});
        // 先判断一下本地存储中有没有旧的数据
        // 没有旧数据 直接发送新请求
        // 有旧的数据同时旧的数据也没有过期  就使用本地存储中的旧数据即可
      
        //先获取本地存储中的数据（小程序也是存在本地存储）
        const Cates = wx.getStorageSync("cates")
        //开始判断
        if(!Cates) {
            //不存在   发送请求数据
            this.getCates();
        }else{
            //有旧的数据  判断有没有过期   先定义一个  
            if(Date.now() - Cates.time>1000*10){
                this.getCates();
            }else{
                this.Cates = Cates.data;
                let leftMenuList = this.Cates.map(v => v.cat_name);
                let rightContent = this.Cates[0].children;
                this.setData({
                    leftMenuList,
                    rightContent,
                })
            }
        }
    },
   async getCates() {
        // request({
        //     url: "/categories"
        // })
        //     .then(res => {
        //         this.Cates = res.data.message;
        //         //把接口的数据存入本地的存储中
        //         wx.setStorageSync("cates" ,{time:Date.now(),data:this.Cates});
        //         //构造左侧大菜单数据
        //         let leftMenuList = this.Cates.map(v => v.cat_name);
        //         //构造右侧商品数据
        //         let rightContent = this.Cates[0].children;
        //         this.setData({
        //             leftMenuList,
        //             rightContent
        //         })
        //     })
        const res=await request({url:"/categories"})
        this.Cates = res;
                //把接口的数据存入本地的存储中
                wx.setStorageSync("cates" ,{time:Date.now(),data:this.Cates});
                //构造左侧大菜单数据
                let leftMenuList = this.Cates.map(v => v.cat_name);
                //构造右侧商品数据
                let rightContent = this.Cates[0].children;
                this.setData({
                    leftMenuList,
                    rightContent
                })
    },
    // 左侧带单的点击就的事件
    // 给data中的currentIndex赋值就可以了
    handleItemTap(e) {
        const { index } = e.currentTarget.dataset;
        let rightContent = this.Cates[index].children;
        this.setData({
            currentIndex: index,
            rightContent,
            scrollTop:0
        })

    }

})