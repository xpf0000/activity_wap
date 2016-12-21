/**
 * Created by Administrator on 2016/12/21 0021.
 */

var Service =
{

    commonGetGuanggao: function(typeid,callBack)
    {
        var url = BaseUrl+"Common.getGuanggao&typeid="+typeid;

        XHttpGet( url, callBack);
    },

    articleGetList: function(category_id,page,perNumber,callBack)
    {
        var url = BaseUrl+"Article.getList&category_id="+category_id+"&page="+page+"&perNumber+"+perNumber;

        XHttpGet( url, callBack);
    }


}


