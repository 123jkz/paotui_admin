// pages/deliverdetail/deliverdetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:'',
        name:'',
        userIDImg:'',
        userID:'',
        gender:'',
        count:0,
        like:0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const deliver=wx.getStorageSync('deliverNow');
        console.log(deliver);
        const {userInfo,userIDImg,name,userID,gender,count,like}=wx.getStorageSync('deliverNow');
        this.setData({
            userInfo,
            userIDImg,
            name,
            userID,
            gender,
            count,
            like
        })
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})