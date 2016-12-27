/**
 * Created by Administrator on 2016/12/21 0021.
 */

var ActivityListPageModel = {

    running : false,

    page:1,

    pagesize : 10,

    end : false,

    category_id : '',

    reset : function()
    {
        this.page = 1;
        this.pagesize = 10;
        this.end = false;
        this.running = false;
    },

    getlist : function(callback)
    {
        if(this.end || this.running)
        {
            console.log("end: "+this.end+" | running: "+this.running);
            return;
        }

        this.running = true;

        var abc = this;

        Service.articleGetList(this.category_id,this.page,this.pagesize,function(data)
        {
            var info = data.data.info;
            if(info)
            {
                if(info.length < abc.pagesize)
                {
                    abc.end = true;
                }
                else
                {
                    abc.end = false;
                    abc.page += 1;
                }

                callback(info,abc.end);

            }
            abc.running = false;

            abc = null;

        });
    },

};

function getCategory(callback)
{
    Service.articleGetCategory(function(data)
    {
        var info = data.data.info;

        if(info)
        {
            var item = {
                id : 0,
                title : '更多',
            }

            info.push(item);
            callback(info);
        }
    });

};


var handleInfiniteScroll = function()
{
    /*jshint validthis:true */
    var inf = $$(this);
    var scrollTop = inf[0].scrollTop;
    var scrollHeight = inf[0].scrollHeight;
    var height = inf[0].offsetHeight;
    var distance = inf[0].getAttribute('data-distance');
    var virtualListContainer = inf.find('.virtual-list');
    var virtualList;
    var onTop = inf.hasClass('infinite-scroll-top');
    if (!distance) distance = 50;
    if (typeof distance === 'string' && distance.indexOf('%') >= 0) {
        distance = parseInt(distance, 10) / 100 * height;
    }
    if (distance > height) distance = height;
    if (onTop) {
        if (scrollTop < distance) {
            inf.trigger('infinite');
        }
    }
    else {
        if (scrollTop + height >= scrollHeight - distance) {
            if (virtualListContainer.length > 0) {
                virtualList = virtualListContainer[0].f7VirtualList;
                if (virtualList && !virtualList.reachEnd) return;
            }
            inf.trigger('infinite');
        }
    }
}

var Vue;
var $$;
var UrlArr = [];

var User = {
    nickname:'尚未登录',
    headimage:'images/face02.jpg',
    msg:'登录',
};

var WapBaseUrl = "http://192.168.1.105/activity_wap/";

requirejs(['main'], function (main) {

    require(['vue','store','serviceApi','framework7','auislide'], function(v,store) {

        Vue = v;
        $$ = Dom7;

        var isback = false;

        $$(document).on('pageInit', function (e) {
            // Get page data from event data

            var page = e.detail.page;

            console.log("page name: "+page.name);
            console.log("page url: "+page.url);

            var herf = window.location.toString();

            var trueurl = "";
            if(page.url == null || page.url == undefined)
            {
                console.log("~~~ url: "+WapBaseUrl+page.name+".html");
                trueurl=WapBaseUrl+page.name+".html";
            }
            else
            {
                console.log("@@@ url: "+WapBaseUrl+page.url);
                trueurl=WapBaseUrl+page.url;
            }

            if(herf.indexOf(trueurl)>=0)
            {
                if(herf.length > trueurl.length)
                {
                    trueurl = herf;
                }
            }

            if(!isback)
            {
                window.history.pushState({},0,trueurl);
                UrlArr.push(trueurl);
            }

            isback = false;

            if (page.name == 'index') {
                initIndexJS();
            }
            else if(page.name == 'list')
            {
                initListJS();
            }
            else if(page.name == 'info')
            {
                console.log("info page !!!!!!!!!");
                initInfoJS();
            }
            else if(page.name == 'user_index')
            {
                console.log("user_index page !!!!!!!!!");
                initUserIndexJS();
            }
            else if(page.name == 'login')
            {
                console.log("login page !!!!!!!!!");
                initLoginJS();
            }
        });

        $$(document).on('pageAfterBack', function (e) {

            UrlArr.pop();
            var l = UrlArr.length;
            var u = UrlArr[l-1];
            window.history.pushState({},0,u);

            if(l == 1)
            {
                isback = false;
            }
            else
            {
                isback = true;
            }


        });

        var myApp = new Framework7();

        mainView = myApp.addView('.view-main', {
            // Because we want to use dynamic navbar, we need to enable it for this view:
            dynamicNavbar: true
        });




        function initIndexJS()
        {


            $$('.infinite-scroll').on('infinite', function () {

                console.log("infinite !!!!!!!!!!!!!!!!!");

                indexlist.getlist(getList);

            });


            function currentFun(index) {
                console.log(index);
            }

            var vm = new Vue({
                el: '#page_load',
                data: {
                    msg : '信息加载中...',
                    end : false,
                },

            });

            var category = new Vue({

                el: '#nav',

                data: {
                    info : []
                },

            });

            var banner = new Vue({
                el: '#aui-slide',
                data: {
                    info: []
                },

                updated:function()
                {

                    var slide = new auiSlide({
                        container:document.getElementById("aui-slide"),
                        // "width":300,
                        "height":120,
                        "speed":300,
                        "pageShow":true,
                        "pageStyle":'dot',
                        "loop":true,
                        'dotPosition':'center',
                        currentPage:currentFun
                    });

                }

            });


            var listVM = new Vue({
                el: '#index_list',
                data: {
                    info: []
                },

                updated:function()
                {

                }

            });

            getGuanggao();
            getCategory(function(arr)
            {
                category.info = arr;
            });

            function getGuanggao()
            {
                Service.commonGetGuanggao("7",function(data)
                {
                    var info = data.data.info;

                    if(info)
                    {
                        console.log(info);
                        banner.info = info;
                    }
                });

            };

            var indexlist = Object.create(ActivityListPageModel);

            function getList(arr,end)
            {

                listVM.info = listVM.info.concat(arr);

                if(end)
                {
                    vm.msg = "已全部加载完毕";
                    vm.end = true;
                }

            }

            indexlist.getlist(getList);
        }


        function initListJS()
        {
            var id = getUrlParam("id");
            var title = getUrlParam("title");

            var vm = new Vue({
                el: '#list',
                data: {
                    msg : '信息加载中...',
                    end : false,
                    filter:{

                        id : '',
                        title: '',
                        time: '',
                        price : '',


                    },

                    list:[],

                    category:[],


                },

                methods:{

                    chooseid: function (id,title)
                    {
                        this.filter.id = id;
                        this.filter.title = title;
                        vm.msg = "加载中...";
                        vm.end = false;
                        vm.list = [];
                        listObj.category_id = id;
                        listObj.reset();
                        listObj.getlist(getList);

                        var u=WapBaseUrl+"list.html?id="+id+"&title="+title;
                        window.history.pushState({},0,u);

                    }

                },

            });

            if(id != null && id != undefined)
            {
                vm.filter.id = id;
            }

            if(title != null && title != undefined)
            {
                vm.filter.title = title;
            }


            var listObj = Object.create(ActivityListPageModel);
            listObj.category_id = vm.filter.id;

            function getList(arr,end)
            {

                vm.list = vm.list.concat(arr);

                if(end)
                {
                    vm.msg = "已全部加载完毕";
                    vm.end = true;
                }

            }

            listObj.getlist(getList);

            getCategory(function(arr)
            {
                vm.category = arr;
            });


            $$('#list').on('infinite', function () {

                console.log("list infinite !!!!!!!!!!!!!!!!!");

                listObj.getlist(getList);

            });

            $$('#list').on('scroll', handleInfiniteScroll);

        }


        function initInfoJS()
        {
            var id = getUrlParam("id");

            var vm = new Vue({
                el: '#info',
                data: {
                    info:{},
                },

                methods:{

                    doCollect:function()
                    {

                        console.log("点击收藏！！！！");

                        var user = store.get("user");

                        if(user == null || user == undefined)
                        {

                        }


                    },
                },

            });

            Service.articleGetArticle(id,function(data)
            {
                var info = data.data.info;
                if(info)
                {
                    var obj = info[0];

                    obj.time = DateTimeUtil.UnixToDate(obj.update_time);

                    vm.info = obj;
                }
            });




        }


        function initUserIndexJS()
        {

            var vm = new Vue({
                el: '#user_index',
                data: {
                    uinfo:User,
                },

                methods:{
                    toUserEdit:function()
                    {
                        if(!checkLogin())
                        {
                            return;
                        }

                        mainView.router.loadPage({url:'user_edit_info.html',pushState:true});

                    },

                    logout: function()
                    {
                        if(!checkLogin())
                        {
                            return;
                        }
                        else
                        {
                            store.remove("user");
                            User = {
                                nickname:'尚未登录',
                                headimage:'images/face02.jpg',
                                msg:'登录',
                            };

                            vm.uinfo = User;
                        }

                    },

                },

            });

            var obj = store.get("user");
            if(obj != null && obj != undefined)
            {
                User = obj;
                User.msg = '退出登录';
                vm.uinfo = User;
            }

            function checkLogin()
            {
                var user = store.get("user");
                console.log(user);
                if(user == null || user == undefined)
                {
                    mainView.router.loadPage({url:'login.html',pushState:true});
                    return false;
                }
                else
                {
                    User = obj;
                    User.msg = "退出登录";
                }

                vm.uinfo = User;

                return true;
            }


        }

        function initLoginJS()
        {

            var vm = new Vue({
                el: '#login',
                data: {

                },

                methods:{
                    doLogin:function(flag)
                    {
                        Service.userLogin("17719226070","123456",function(data)
                        {
                            var info = data.data.info;
                            if(info)
                            {
                                var obj = info[0];
                                store.set("user",obj);
                                User = obj;
                                User.msg = '退出登录';

                                mainView.router.back();
                            }
                        });

                    },

                },

            });


        }




    });

});














