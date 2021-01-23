import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js";
import { login } from "../../utils/asyncWx.js"
Page({
  async handleGetUserInfo(e) {
    try{
      const { encryptedData, rawData, iv, singnature } = e.detail;
      const { code } = await login();
      const loginParams = { encryptedData, rawData, iv, singnature, code };
      const { token } = await request({url: "/users/wxlogin", data: loginParams, method: "post"});
      wx.setStorageSync("token", token);
      wx.wx.navigateBack({
        delta: 1
      });
    } catch(error) {
      console.log(error);
    }
  }
})