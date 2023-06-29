// pages/deliver/deliver.js
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        deliverlist:[],
        hasdeliver:false
    },

    refuse(e){
        const {index}=e.currentTarget.dataset;
        const {_id} =this.data.deliverlist[index];
        const that=this;
        wx.cloud.callFunction({
            name:"refuse",
            data:{
                _id:_id
            },
            success(res){
                that.onLoad();
                wx.showToast({
                  title: '已取消',
                })
            },
        })
    },

    selectdeliver(e){
        const {
            index
          } = e.currentTarget.dataset;
          const deliver = this.data.deliverlist[index];
          wx.setStorageSync('deliverNow', deliver);
          wx.navigateTo({
            url: '../deliverdetail/deliverdetail',
          })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that=this;
        db.collection('mailmanapply').where({
            state:"已通过"
        }).get({
            success(res){
                that.setData({
                    deliverlist:res.data,
                    hasdeliver:!res.data.length,
                })
            },
            fail(res){
                console.log(res);
            }
        });
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
        this.onLoad();
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