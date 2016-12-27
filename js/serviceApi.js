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


}


