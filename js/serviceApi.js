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


}


