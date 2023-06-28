// pages/admin/admin.js
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        applylist:[],
        hasapply:false
    },

    accept(e){
        const {index}=e.currentTarget.dataset;
        const {_id} =this.data.applylist[index];
        const that=this;
        wx.cloud.callFunction({
            name:"accept",
            data:{
                _id:_id
            },
            success(res){
                that.onLoad();
                wx.showToast({
                  title: '已通过',
                })
            },
        })
    },

    refuse(e){
        const {index}=e.currentTarget.dataset;
        const {_id} =this.data.applylist[index];
        const that=this;
        wx.cloud.callFunction({
            name:"refuse",
            data:{
                _id:_id
            },
            success(res){
                that.onLoad();
                wx.showToast({
                  title: '已通过',
                })
            },
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that=this;
        db.collection('mailmanapply').where({
            state:"审核中"
        }).get({
            success(res){
                that.setData({
                    applylist:res.data,
                    hasapply:!res.data
                })
            },
            fail(res){
                console.log(res);
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        //wx.hideLoading();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        wx.hideHomeButton();
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