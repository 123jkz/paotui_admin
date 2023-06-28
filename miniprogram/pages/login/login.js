// pages/login/login.js
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name:'',
        mypassword:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    getName(e){
        let name=this.data.name;
        name= e.detail.value;
        this.setData({
            name,
        })
    },

    getpassword(e){
        let password=this.data.password;
        password= e.detail.value;
        this.setData({
            password,
        })
    },

    check(){
        var that=this.data;
        let name=that.name;
        let password=that.password;
        console.log(name,password);
        db.collection('admininfo').where({
            name:name,
            password:password,
        }).get({
            success(res){
                if(res.data.length==0){
                    wx.showToast({
                      title: '登录信息错误',
                      icon:'error'
                    })
                    return;
                }
                wx.switchTab({
                  url: '../admin/admin',
                })
            }
        })
    },


    onLoad(options) {

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