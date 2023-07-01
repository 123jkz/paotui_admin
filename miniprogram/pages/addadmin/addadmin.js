// pages/addadmin/addadmin.js
const db = wx.cloud.database();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name:'',
        password:'',
        configpassword:''
    },

    getName(e){
        let name= e.detail.value;
        this.setData({
            name,
        })
    },
    getUserpassword(e){
        let password= e.detail.value;
        this.setData({
            password,
        })
    },
    getUserpasswordagain(e){
        let password= e.detail.value;
        this.setData({
            configpassword:password,
        })
    },

    submit(){
        const that=this.data;
        var dec=0;
        var chart=0;
        var  i=0;
        if(that.name.length<2||that.name.length>8){
            wx.showToast({
              title: '用户名要求2至8位',
              icon: 'none',
            })
            return;
        }
        if(that.password.length<6||that.password.length>20){
            wx.showToast({
                title: '密码要求6至20位',
                icon: 'none',
              })
              return;
        }
        for(i=0;i<that.password.length;i++){
            if(that.password.charCodeAt(i)>=48&&that.password.charCodeAt(i)<=57){
                dec++;
            }
            else if(that.password.charCodeAt(i)>=65&&that.password.charCodeAt(i)<=90){
                chart++;
            }
            else if(that.password.charCodeAt(i)>=97&&that.password.charCodeAt(i)<=122){
                chart++;
            }
            else{
                wx.showToast({
                    title: '密码非法',
                    icon: 'none',
                  })
                return;
            }
        }
        if(dec==0||chart==0){
            wx.showToast({
                title: '密码要求为数字和字母的组合',
                icon: 'none',
              })
              return;
        }
        if(that.password!=that.configpassword){
            wx.showToast({
                title: '两次输入的密码不同',
                icon: 'none',
              })
              return;
        }
        db.collection('admininfo').add({
            data: {
                name:that.name,
                password:that.password
            },
            success: (res) => {
                wx.showToast({
                  title: '提交成功',
                })
                setTimeout(function(){
                    wx.switchTab({
                      url: '../administer/administer',
                     })}
                     ,600);
            },
            fail: (res) => {
                wx.showToast({
                  icon: 'none',
                  title: '上传失败',
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
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
        wx.showToast({
            title: '用户名要求2至8位。密码为6~18位字母和数字组合',
            icon: 'none',
            duration: 3000,
          })
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