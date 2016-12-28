/**
 * Created by Administrator on 2016/12/21 0021.
 */

var Service =
{

    //广告
    commonGetGuanggao: function(typeid,callBack)
    {
        var url = BaseUrl+"Common.getGuanggao&typeid="+typeid;

        XHttpGet( url, callBack);
    },

    //活动列表
    articleGetList: function(category_id,page,perNumber,callBack)
    {
        var url = BaseUrl+"Article.getList&category_id="+category_id+"&page="+page+"&perNumber="+perNumber;

        XHttpGet( url, callBack);
    },

    //首页分类
    articleGetCategory: function(callBack)
    {
        var url = BaseUrl+"Article.getCategory";

        XHttpGet( url, callBack);
    },

    //活动详情
    articleGetArticle: function(id,callBack)
    {
        var url = BaseUrl+"Article.getArticle&id="+id;

        XHttpGet( url, callBack);
    },

    //活动详情
    articleAddCollect: function(id,uid,username,callBack)
    {
        var url = BaseUrl+"Article.addCollect&id="+id+"&uid="+uid+"&username="+username;

        XHttpGet( url, callBack);
    },

    //登录
    userLogin: function(mobile,password,callBack)
    {
        var url = BaseUrl+"User.login&mobile="+mobile+"&password="+password;

        XHttpGet( url, callBack);
    },

    //用户信息修改
    userUserEdit: function(user,callBack)
    {
        var url = BaseUrl+"User.userEdit&username="+user.username+
                "&nickname="+user.nickname+
                "&truename="+user.truename+
                "&sex="+user.sex+
                "&birthday="+user.birthday+
                "&address="+user.address;

        XHttpGet( url, callBack);
    },

    //用户头像修改
    userHeadEdit: function(data,callBack)
    {
        var url = BaseUrl+"User.headEdit";
        XHttpUpload(url,data,callBack);

    },

    //获取用户信息
    userGetUserInfo: function(user,callBack)
    {
        var url = BaseUrl+"User.getUserInfo&username="+user.username;

        XHttpGet( url, callBack);

    },


}


