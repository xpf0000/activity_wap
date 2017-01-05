/**
 * Created by Administrator on 2016/12/21 0021.
 */
//var BaseUrl = "http://182.92.70.85/hlppapi/Public/Found/?service=";

define(["Service"], function(Service) {
        return {

            BaseUrl : "http://182.92.70.85/hlppapi/Public/Found/?service=",

            //广告
            commonGetGuanggao: function(typeid,callBack)
            {
                var url = this.BaseUrl+"Common.getGuanggao&typeid="+typeid;

                XHttpGet( url, callBack);
            },

            //活动列表
            articleGetList: function(category_id,page,perNumber,callBack)
            {
                var url = this.BaseUrl+"Article.getList&category_id="+category_id+"&page="+page+"&perNumber="+perNumber;

                XHttpGet( url, callBack);
            },

            //首页分类
            articleGetCategory: function(callBack)
            {


                var url = this.BaseUrl+"Article.getCategory";

                XHttpGet( url, callBack);
            },

            //活动详情
            articleGetArticle: function(id,callBack)
            {
                var url = this.BaseUrl+"Article.getArticle&id="+id;

                XHttpGet( url, callBack);
            },

            //活动详情
            articleAddCollect: function(id,uid,username,callBack)
            {
                var url = this.BaseUrl+"Article.addCollect&id="+id+"&uid="+uid+"&username="+username;

                XHttpGet( url, callBack);
            },

            //登录
            userLogin: function(mobile,password,callBack)
            {
                ///alert("45454546788989");

                var url = this.BaseUrl+"User.login&mobile="+mobile+"&password="+password;

                XHttpGet( url, callBack);
            },

            //用户信息修改
            userUserEdit: function(user,callBack)
            {
                var url = this.BaseUrl+"User.userEdit&username="+user.username+
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
                var url = this.BaseUrl+"User.headEdit";
                XHttpUpload(url,data,callBack);

            },

            //获取用户信息
            userGetUserInfo: function(user,callBack)
            {
                var url = this.BaseUrl+"User.getUserInfo&username="+user.username;

                XHttpGet( url, callBack);

            },

            //新增普通图片
            articleAddPic: function(data,callBack)
            {
                var url = this.BaseUrl+"Article.addPic";
                XHttpUpload(url,data,callBack);
            },

            //新增文章信息
            articleAddArticle: function(data,callBack)
            {
                var url = this.BaseUrl+"Article.addArticle";
                XHttpUpload(url,data,callBack);

            },

            //获取用户发布列表
            usersGetArticleList: function(user,page,perNumber,callBack)
            {
                var url = this.BaseUrl+"Users.getArticleList&uid="+user.id+"&page="+page+"&perNumber="+perNumber;

                XHttpGet( url, callBack);

            },

            //新增活动信息
            articleAddEvent: function(data,callBack)
            {
                var url = this.BaseUrl+"Article.addEvent";
                XHttpUpload(url,data,callBack);

            },

            //获取用户收藏列表信息
            usersGetCollectList: function(user,page,perNumber,callBack)
            {
                var url = this.BaseUrl+"Users.getCollectList&uid="+user.id+"&page="+page+"&perNumber="+perNumber;

                XHttpGet( url, callBack);

            },

            //获取用户报名列表信息
            usersGetJoinList: function(user,page,perNumber,callBack)
            {
                var url = this.BaseUrl+"Users.getJoinList&uid="+user.id+"&page="+page+"&perNumber="+perNumber;

                XHttpGet( url, callBack);

            },

            //增加活动收藏信息
            articleAddCollect: function(id,user,success,err,callBack)
            {
                var url = this.BaseUrl+"Article.addCollect&id="+id+"&uid="+user.id+"&username="+user.username;

                XHttpDo( url,success,err,callBack);

            },


            //活动报名
            articleAddJoin: function(id,user,success,err,callBack)
            {
                var url = this.BaseUrl+"Article.addJoin&id="+id+"&uid="+user.id+"&username="+user.username;
                XHttpDo( url,success,err,callBack);
            },




        }

    }
);





