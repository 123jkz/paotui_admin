// pages/administer/administer.js
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isadmin:false,
        hasadminister:false,
        administerlist:[]
    },
    
    refuse(e){
        const index = e.currentTarget.dataset.index;
        const {_id} =this.data.administerlist[index];
        const that=this;
        wx.cloud.callFunction({
            name:"deleteadmin",
            data:{
                _id:_id
            },
            success(res){
                that.onLoad();
                wx.showToast({
                  title: '已删除',
                })
            },
        })
    },

    add(){
        wx.navigateTo({
          url: '../addadmin/addadmin',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const that=this;
        const name=wx.getStorageSync('name');
        if(name=='admin'){
            that.setData({
                isadmin:true
            });
        }
        db.collection('admininfo').get({
            success(res){
                that.setData({
                    administerlist:res.data,
                    hasadminister: !res.data.length,
                });
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