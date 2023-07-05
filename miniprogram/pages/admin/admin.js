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
        wx.showLoading({
            title:'处理中',
        })
        wx.cloud.callFunction({
            name:"accept",
            data:{
                _id:_id
            },
            success(res){
                that.onLoad();
                wx.hideLoading();
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
        wx.showModal({
            title: '删除',
            content: '确定要删除吗？',
            complete: (res) => {
            if (res.confirm) {
                wx.showLoading({
                    title:'处理中',
                })
                wx.cloud.callFunction({
                    name:"refuse",
                    data:{
                        _id:_id
                    },
                    success(res){
                        that.onLoad();
                        wx.hideLoading();
                        wx.showToast({
                          title: '已拒绝',
                        })
                    },
                })    
            }
            }
          })
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that = this;
        db.collection('mailmanapply').where({
            state:"审核中"
        }).watch({
            onChange: function(snapshot) {
            that.setData({
                applylist:snapshot.docs,
                hasapply:!snapshot.docs.length,
            })       
            },
            onError: function(err){
                console.log(err)
            }
            })
        
        //setTimeout(()=>{that.onLoad();},3000);
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