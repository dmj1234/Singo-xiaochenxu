// pages/index/index.js
// 引入用来发送到请求的方法
import { request} from "../../request/index";
Page({
    data: {
swiperList:[],
//导航数组
catesList:[],
//楼层数据
floorList:[],
    },
    onLoad:function(options){
        //优化可以通过es6的promise来解决问题
//         wx.request({
//           url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
//         // url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
// success:(result) => {
//    this.setData({
//        swiperList:result.data.message
//    })
// }
//         });
this.getSwiperList();
this.getCateList();
this.getFloorList();
    },
    //获取轮播图数据
    getSwiperList(){
        request({url: '/home/swiperdata'})
        .then(result=> {
            this.setData({
                swiperList:result
            })
        })
    },
    //获取 分类导航数据
    getCateList(){
        request({url: '/home/catitems'})
        .then(result=> {
            this.setData({
               catesList:result
            })
        })
    },
    // 获取楼层数据
    getFloorList(){
        request({url: '/home/floordata'})
        .then(result=> {
            this.setData({
               floorList:result
            })
        })
    }
})