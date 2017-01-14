/**
 * Created by Administrator on 2016/12/21 0021.
 */
//var BaseUrl = "http://182.92.70.85/hlppapi/Public/Found/?service=";
//https://api.ihlpp.com/Public/Found/?service=Common.getGuanggao&typeid=7

define(["Service"], function(Service) {
        return {

            BaseUrl : "https://api.ihlpp.com/Public/Found/?service=",
            //BaseUrl : "http://182.92.70.85/hlppapi/Public/Found/?service=",

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
            articleGetArticle: function(id,uid,callBack)
            {
                var url = this.BaseUrl+"Article.getArticle&id="+id+"&uid="+uid;

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

            //编辑文章信息
            articleEditArticle: function(data,callBack)
            {
                var url = this.BaseUrl+"Article.editArticle";
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

            //编辑活动信息
            articleEditEvent: function(data,callBack)
            {
                var url = this.BaseUrl+"Article.editEvent";
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
            articleAddCollect: function(id,user,callBack)
            {
                var url = this.BaseUrl+"Article.addCollect&id="+id+"&uid="+user.id+"&username="+user.username;

                XHttpDo( url,"收藏成功","收藏失败",callBack);

            },

            //删除收藏信息
            usersDelCollect: function(id,user,callBack)
            {
                var url = this.BaseUrl+"Users.delCollect&id="+id+"&uid="+user.id+"&username="+user.username;
                XHttpDo( url,"取消收藏成功","取消收藏失败",callBack);
            },


            //获取报名用户信息列表
            usersGetUinfoList: function(user,callBack)
            {
                var url = this.BaseUrl+"Users.getUinfoList&uid="+user.id;

                XHttpGet( url, callBack);

            },

            //活动报名
            articleAddJoin: function(data,callBack)
            {
                var url = this.BaseUrl+"Article.addJoin";
                XHttpDo2(url,data,"报名成功","报名失败",callBack);

            },

            //取消报名
            usersDelJoin: function(id,user,callBack)
            {
                var url = this.BaseUrl+"Users.delJoin&id="+id+"&uid="+user.id+"&username="+user.username;
                XHttpDo(url,"取消报名成功","取消报名失败",callBack);

            },

            //删除发布
            usersDelArticle: function(id,user,callBack)
            {
                var url = this.BaseUrl+"Users.delArticle&id="+id+"&uid="+user.id+"&username="+user.username;
                XHttpDo(url,"删除成功","删除失败",callBack);

            },



            //获取活动信息
            articleGetEvent: function(id,callBack)
            {
                var url = this.BaseUrl+"Article.getEvent&id="+id;

                XHttpGet( url, callBack);

            },
            
            //短信验证码发送 类型；1，注册验证2，变更验证
            userSmsSend: function(mobile,type,callBack)
            {
                var url = this.BaseUrl+"User.smsSend&mobile="+mobile+"&type="+type;
                XHttpDo(url,"短信发送成功","短信发送失败",callBack);

            },
            
            //新用户注册
            userRegister: function(mobile,password,code,nickname,callBack)
            {
                var url = this.BaseUrl+"User.register&mobile="+mobile+"&password="+password+"&code="+code+"&nickname="+nickname;
                XHttpUpload(url,null,callBack);

            },
            
            //用户密码重置
            userUpdatePass: function(mobile,password,code,callBack)
            {
                var url = this.BaseUrl+"User.updatePass&mobile="+mobile+"&password="+password+"&code="+code;
                XHttpDo(url,"密码重置成功","密码重置失败",callBack);

            },
            
            //用户密码修改
            userUpdatePass2: function(mobile,oldpass,newpass,callBack)
            {
                var url = this.BaseUrl+"User.updatePass2&mobile="+mobile+"&oldpass="+oldpass+"&newpass="+newpass;
                XHttpDo(url,"修改密码成功","修改密码失败",callBack);

            },



        }

    }
);





