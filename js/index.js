/**
 * Created by Administrator on 2016/12/21 0021.
 */

var ActivityListPageModel = {

    running : false,

    page:1,

    pagesize : 10,

    end : false,

    category_id : '',

    user:{},

    reset : function()
    {
        this.page = 1;
        this.pagesize = 10;
        this.end = false;
        this.running = false;
    },

    handleData: function(data,callback)
    {
        var info = data.data.info;
        if(info)
        {
            if(info.length < this.pagesize)
            {
                this.end = true;
            }
            else
            {
                this.end = false;
                this.page += 1;
            }

            callback(info,this.end);

        }
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
            abc.handleData(data,callback);
        });

    },

    getUserPostlist : function(callback)
    {
        if(this.end || this.running)
        {
            console.log("end: "+this.end+" | running: "+this.running);
            return;
        }

        this.running = true;

        var abc = this;

        Service.usersGetArticleList(this.user,this.page,this.pagesize,function(data)
        {
            abc.handleData(data,callback);
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
    id:'',
    uid:'',
    username:'',
    nickname:'尚未登录',
    headimage:'images/face02.jpg',
    msg:'登录',
};

var WapBaseUrl = "http://192.168.1.105/activity_wap/";

requirejs(['main'], function (main) {

    require(['vue','store','serviceApi','toast','auislide'], function(v,store) {

        Vue = v;
        $$ = Dom7;

        initUser();

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
            else if(page.name == 'user_edit_info')
            {
                console.log("user_edit_info page !!!!!!!!!");
                setTimeout(function(){

                    initUserEditJS();

                },1);

            }
            else if(page.name == 'publish')
            {
                console.log("publish page !!!!!!!!!");
                setTimeout(function(){

                    initPublishJS();

                },1);

            }
            else if(page.name == 'user_info_list2')
            {
                console.log("user_info_list2 page !!!!!!!!!");
                setTimeout(function(){

                    initUserList2JS();

                },1);

            }
            else if(page.name == 'test')
            {
                console.log("test page !!!!!!!!!");
                console.log(myApp);
                setTimeout(function(){

                    initTestJS();

                },1);

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


        function initUser()
        {
            var obj = store.get("user");
            if(obj != null && obj != undefined)
            {
                User = obj;
                Service.userGetUserInfo(User,function(data){

                    var info = data.data.info;
                    if(info.length > 0)
                    {
                        var obj = info[0];
                        store.set("user",obj);
                        User = obj;
                        User.msg = '退出登录';

                        try
                        {
                            UserVM.uinfo = User;
                        }
                        catch(e){

                        }

                    }

                });


            }
        }


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

        var UserVM;
        function initUserIndexJS()
        {

            UserVM = new Vue({
                el: '#user_index',
                data: {
                    uinfo:User,
                },

                methods:{

                    toUserList:function()
                    {
                        if(!checkLogin())
                        {
                            return;
                        }

                        mainView.router.loadPage({url:'user_info_list2.html'});
                    },

                    toUserEdit:function()
                    {
                        if(!checkLogin())
                        {
                            return;
                        }

                        mainView.router.loadPage({url:'user_edit_info.html'});

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
                                username:'',
                                nickname:'尚未登录',
                                headimage:'images/face02.jpg',
                                msg:'登录',
                            };

                            UserVM.uinfo = User;
                        }

                    },

                },

            });

            UserVM.uinfo = User;

            function checkLogin()
            {

                console.log(User);

                if(User.username == null || User.username == undefined || User.username == "")
                {
                    mainView.router.loadPage({url:'login.html',pushState:true});
                    return false;
                }

                return true;
            }


        }

        function initLoginJS()
        {


            var vm = new Vue({
                el: '#login',
                data: {
                    account:'17719226070',
                    pass:'123456',
                    running: false,
                },

                methods:{
                    doLogin:function(flag)
                    {

                        if (vm.running){return;};
                        vm.running = true;

                        if(flag == 0)
                        {
                            Service.userLogin(vm.account,vm.pass,function(data)
                            {
                                var code = data.data.code;
                                var msg = data.data.msg;
                                var info = data.data.info;
                                if(info.length > 0)
                                {
                                    var obj = info[0];
                                    store.set("user",obj);

                                    initUser();

                                    mainView.router.back();

                                    return;
                                }

                                var toast = myApp.toast(msg, '', {});
                                toast.show();

                                toast.onDissMissListener(function(){

                                    vm.running = false;

                                })

                            });
                        }
                        else
                        {

                        }

                    },

                },

            });


        }

        function initUserEditJS()
        {

            var vm = new Vue({
                el: '#user_edit_info',
                data: {
                    headimg:'images/face02.jpg',
                    birthday:'',
                    nickname:'',
                    sex:'0',
                    address:'',
                    username:'',
                    truename:'',
                },

                methods:{
                    choosehead:function()
                    {
                        var URL = window.URL || window.webkitURL;
                        URL.revokeObjectURL(vm.headimg);
                        $$("#file").click();
                    },

                    fileChange:function(event)
                    {
                        var files = event.target.files, file;
                        if (files && files.length > 0) {

                            file = files[0];


                            if(file.size > 1024 * 1024 * 2) {
                                alert('图片大小不能超过 2MB!');
                                return false;
                            }

                            var URL = window.URL || window.webkitURL;

                            var imgURL = URL.createObjectURL(file);

                            console.log("imgURL: "+imgURL);


                            vm.headimg = imgURL;

                        }
                    },

                    doSubmit:function()
                    {
                        console.log("!!!!!!!!!!!!!!!!!!!!");

                        Service.userUserEdit(vm,function(data)
                        {
                            var code = data.data.code;
                            var msg = data.data.msg;

                            if(code == 0)
                            {
                                msg = "修改成功";
                            }

                            var toast = myApp.toast(msg, '', {});
                            toast.show();

                        });

                        if($$("#file")[0].files.length > 0)
                        {

                            var form = new FormData($$( "#uploadHead" )[0]);
                            form.append('username',vm.username);

                            Service.userHeadEdit(form,function(data){

                                console.log("用户头像更新结果：");
                                console.log(data);

                            });


                        }








                    },

                },

            });

            vm.headimg = User.headimage;
            vm.username = User.username;
            vm.nickname = User.nickname;
            vm.sex = User.sex;

            var calendarDefault = myApp.calendar({
                input: '#calendar-default',
            });

            require(['city_picker'],function(){

                CityPicker.init('#picker-dependent',myApp);

            });


        }

        function initPublishJS()
        {

            var vm = new Vue({
                el: '#publish',
                data: {
                    list:[],
                    lastindex:-1,
                    cover:'http://static2.ivwen.com/user/7224114/c75747eb2c500001204e135077f080c0.jpg',
                    coverid:'',
                    isnew:false,
                    isactity:false,
                    title:'dsjfkdsjkf',
                },

                methods:{

                    txteditend:function()
                    {

                        var str = $$(".p_content").val();

                        if(vm.isnew)
                        {
                            var obj = {};
                            obj.txt = str;
                            vm.list.splice(vm.lastIndex, 0, obj);
                        }
                        else
                        {
                            if(vm.lastIndex >= 0 && vm.lastIndex < vm.list.length)
                            {
                                vm.list[vm.lastIndex].txt = str;
                            }
                        }

                        myApp.closeModal('.popup_a');
                        $$(".p_content").val("");

                        vm.isnew = false;
                    },

                    showTxtEdit:function(index,isnew)
                    {
                        console.log(isnew);

                        vm.isnew = isnew;

                        myApp.popup('.popup_a');
                        vm.lastIndex = index;
                    },

                    chooseCover:function()
                    {
                        var URL = window.URL || window.webkitURL;
                        URL.revokeObjectURL(vm.cover);
                        $$("#cover").click();
                    },

                    chooseimg:function(index,isnew)
                    {
                        vm.isnew = isnew;
                        $$("#file"+index).click();

                    },

                    coverChange:function(event)
                    {
                        var files = event.target.files, file;
                        if (files && files.length > 0) {

                            file = files[0];


                            if(file.size > 1024 * 1024 * 2) {
                                alert('图片大小不能超过 2MB!');
                                return false;
                            }

                            var URL = window.URL || window.webkitURL;

                            var imgURL = URL.createObjectURL(file);

                            console.log("imgURL: "+imgURL);


                            vm.cover = imgURL;

                            var form = new FormData($$( "#coverform" )[0]);
                            form.append('uid',User.id);
                            form.append('username',User.username);

                            Service.articleAddPic(form,function(data){

                                var code = data.data.code;
                                var id = data.data.info[0].id;
                                var url = data.data.info[0].url;
                                if(code == 0)
                                {
                                    vm.coverid = id;
                                    vm.cover = url;
                                }

                            });



                        }
                    },

                    imgChange:function(event,index)
                    {
                        var files = event.target.files;
                        if (files && files.length > 0) {

                            var form = new FormData($$( "#mform"+index)[0]);
                            form.append('uid',User.id);
                            form.append('username',User.username);

                            Service.articleAddPic(form,function(data){

                                var code = data.data.code;
                                var info = data.data.info;
                                if(code == 0)
                                {
                                    if(info.length > 1)
                                    {
                                        $$.each(info, function (i, item) {

                                            if(i == 0)
                                            {
                                                vm.list[index].imgid = item.id;
                                                vm.list[index].img = item.url;
                                            }
                                            else
                                            {
                                                var obj = {};
                                                obj.txt = "点击这里输入照片说明";
                                                obj.img = item.url;
                                                obj.imgid = item.id;
                                                vm.list.splice(index, 0, obj);
                                                vm.isnew = false;
                                            }

                                        });
                                    }
                                    else
                                    {
                                        vm.list[index].imgid = info[0].id;
                                        vm.list[index].img = info[0].url;
                                    }

                                }

                            });


                        }
                    },

                    addclick:function(index)
                    {
                        console.log("index: "+index);
                        $$("#p_upload_class"+index).show();
                        $$("#p_add"+index).hide();

                        if(vm.lastindex >= 0)
                        {
                            $$("#p_upload_class"+vm.lastindex).hide();
                            $$("#p_add"+vm.lastindex).show();
                        }

                        vm.lastindex = index;


                    },

                    clip:function(index)
                    {
                        if(index >= 0 )
                        {
                            vm.list.splice(index,1);
                        }
                    },

                    movedown:function(index)
                    {

                        console.log("index: "+index);

                        if(index < vm.list.length-1)
                        {
                            var obj = vm.list[index];
                            var obj1 = vm.list[index+1];

                            Vue.set(vm.list, index, obj1);
                            Vue.set(vm.list, index+1, obj);

                        }
                    },

                    doSubmit:function()
                    {
                        var arrString=JSON.stringify(vm.list);
                        console.log(arrString);

                        alert(arrString);

                        var form = new FormData();
                        form.append('uid',User.id);
                        form.append('username',User.username);
                        form.append('category_id',"1");
                        form.append('title',vm.title);
                        form.append('cover_id',vm.coverid);
                        form.append('content',arrString);

                        alert("!!!!!!!!!!!!!!!!!");

                        Service.articleAddArticle(form,function(data){

                            alert(data);

                            var code = data.data.code;
                            var msg = data.data.msg;

                            if(code == 0)
                            {
                                msg = "发布成功";
                            }

                            var toast = myApp.toast(msg, '', {});

                            toast.onDissMissListener(function(){

                                mainView.router.back();

                            });

                            toast.show();

                        });

                    },


                },

            });


            require(['zepto'],function(){

                $("#p_sign_up").click(function(){
                    $("#p_form_li").toggle();
                    vm.isactity = !vm.isactity;
                });
                $("#em01").click(function(){
                    $("#em01").toggleClass("c_em");
                });
                $("#em02").click(function(){
                    $("#em02").toggleClass("c_em");
                });
                $("#em03").click(function(){
                    $("#em03").toggleClass("c_em");
                });
                $("#em04").click(function(){
                    $("#em04").toggleClass("c_em");
                });
                $("#em05").click(function(){
                    $("#em05").toggleClass("c_em");
                });
                $("#em06").click(function(){
                    $("#em06").toggleClass("c_em");
                });
                $("#em07").click(function(){
                    $("#em07").toggleClass("c_em");
                });
                $("#em08").click(function(){
                    $("#em08").toggleClass("c_em");
                });
                $("#em09").click(function(){
                    $("#em09").toggleClass("c_em");
                });
                $("#em10").click(function(){
                    $("#em10").toggleClass("c_em");
                });
                $("#em11").click(function(){
                    $("#em11").toggleClass("c_em");
                });
                $("#em12").click(function(){
                    $("#em12").toggleClass("c_em");
                });


            });


            for(i=0;i<3;i++)
            {
                var obj = {};
                obj.txt = "点击这里输入照片说明";
                obj.img = "http://static2.ivwen.com/user/7224114/c75747eb2c500001204e135077f080c0.jpg";
                vm.list.push(obj);
            }

        }


        function initUserList2JS()
        {
            var vm = new Vue({
                el: '#user_info_list2',
                data: {
                    msg : '信息加载中...',
                    end : false,
                    list:[],
                },

                methods:{

                },

            });


            var listObj = Object.create(ActivityListPageModel);
            listObj.user = User;
            function getList(arr,end)
            {

                $$.each(arr, function (index, item) {
                    item.timestr = DateTimeUtil.UnixToDate(item.create_time);
                });

                vm.list = vm.list.concat(arr);

                if(end)
                {
                    vm.msg = "已全部加载完毕";
                    vm.end = true;
                }

            }

            listObj.getUserPostlist(getList);


            $$('#user_info_list2').on('infinite', function () {

                listObj.getUserPostlist(getList);

            });

            $$('#user_info_list2').on('scroll', handleInfiniteScroll);
        }



        function initTestJS()
        {

            console.log(myApp);

            var calendarDefault = myApp.calendar({
                input: '#calendar-default',
            });


        }





    });

});














