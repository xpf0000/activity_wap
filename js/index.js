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

    getUserCollectlist : function(callback)
    {
        if(this.end || this.running)
        {
            console.log("end: "+this.end+" | running: "+this.running);
            return;
        }

        this.running = true;

        var abc = this;

        Service.usersGetCollectList(this.user,this.page,this.pagesize,function(data)
        {
            abc.handleData(data,callback);
        });

    },

    getUserJoinlist : function(callback)
    {
        if(this.end || this.running)
        {
            console.log("end: "+this.end+" | running: "+this.running);
            return;
        }

        this.running = true;

        var abc = this;

        Service.usersGetJoinList(this.user,this.page,this.pagesize,function(data)
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
var myApp = null;
var WapBaseUrl = "http://192.168.1.105/activity_wap/";
var Service;
var User = {
    id:'',
    uid:'',
    username:'',
    nickname:'尚未登录',
    headimage:'images/face02.jpg',
    msg:'登录',
};


function checkLogin()
{

    if(User.username == null || User.username == undefined || User.username == "")
    {
        mainView.router.loadPage({url:'login.html',pushState:true});
        return false;
    }

    return true;
}


requirejs(['main'], function (main) {

    require(['vue','store','Service','xupload','toast','auislide'], function(v,store,s) {

        Vue = v;
        $$ = Dom7;
        Service = s;

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

        myApp = new Framework7();

        mainView = myApp.addView('.view-main', {
            // Because we want to use dynamic navbar, we need to enable it for this view:
            dynamicNavbar: true
        });


        function initUser(u)
        {
            var obj;

            if(u != null && u != undefined)
            {
                obj = u;
            }
            else {
                obj = store.get("user");
            }

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

            var fvm = new Vue({
                el: '#filter',
                data: {
                    category:[],
                },

                methods:{

                    chooseid: function (id,title)
                    {
                        vm.filter.id = id;
                        vm.filter.title = title;
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
                fvm.category = arr;
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
                    list:[],
                },

            });

            var bottom = new Vue({
                el: '#info_bottom',
                data: {
                    orcollect:'',
                    type:'1',
                    orjoin:'',
                    btitle:'报名',
                },

                methods:{

                    joinclick:function()
                    {
                        if(!checkLogin())
                        {
                            return;
                        }

                        if(bottom.orjoin == "")
                        {
                            myApp.popup(".picker_b");
                        }
                        else
                        {
                            Service.usersDelJoin(vm.info.id,User,function(b){

                                if(b)
                                {
                                    bottom.orjoin = '';
                                    bottom.btitle = '报名';
                                    initUserList2JS(vm.info.id);
                                }

                            });
                        }

                    },

                    doCollect:function()
                    {
                        if(!checkLogin())
                        {
                            return;
                        }


                        if(bottom.orcollect == "")
                        {
                            Service.articleAddCollect(vm.info.id,User,function(b){

                                if(b)
                                {
                                    bottom.orcollect ="2";
                                }

                            });
                        }
                        else
                        {
                            Service.usersDelCollect(vm.info.id,User,function(b){

                                if(b)
                                {
                                    bottom.orcollect = '';
                                    initUserList2JS(vm.info.id);
                                }

                            });
                        }



                    },
                },

            });

            var join = new Vue({
                el: '#join',
                data: {
                    ulist:[],
                    info:{},
                    uiid : '0',
                    name : '',
                    sex : '0',
                    mobile : '',
                    idcard : '',

                },

                methods:{

                    chooseUser: function(index)
                    {

                        console.log(index);

                        var obj = join.ulist[index];

                        console.log(obj);

                        join.uiid = obj.id;
                        join.name = obj.name;


                    },

                    doJoin:function()
                    {
                        if(!checkLogin())
                        {
                            return;
                        }

                        if(join.name.length * join.mobile.length * join.idcard.length == 0)
                        {
                            var toast = myApp.toast("请完善报名信息", '', {});
                            toast.show();
                            return;
                        }

                        var form = new FormData();
                        form.append('id',vm.info.id);
                        form.append('uid',User.id);
                        form.append('username',User.username);

                        form.append('uiid',join.uiid);
                        form.append('name',join.name);
                        form.append('sex',join.sex);
                        form.append('mobile',join.mobile);
                        form.append('idcard',join.idcard);


                        Service.articleAddJoin(form,function(b){

                            if(b)
                            {
                                bottom.orjoin = '2';
                                bottom.btitle = '取消报名';
                                myApp.closeModal(".picker_b");
                                getulist();
                                join.uiid = "0";
                                join.name = "";
                                join.sex = "0";
                                join.mobile = "";
                                join.idcard = "";

                            }


                        });



                    },
                },

            });

            function getulist()
            {
                if(User.id != null && User.id != undefined && User.id != "")
                {

                    Service.usersGetUinfoList(User,function(data)
                    {
                        var info = data.data.info;
                        if(info)
                        {
                            join.ulist = info;
                        }
                    });

                }
            };

            function getinfo()
            {
                Service.articleGetEvent(id,function(data)
                {
                    var info = data.data.info;
                    if(info)
                    {
                        var obj = info[0];
                        obj.s_str = DateTimeUtil.UnixToDate(obj.s_time);
                        obj.e_str = DateTimeUtil.UnixToDate(obj.e_time);

                        join.info = obj;
                    }
                });
            }

            getinfo();
            getulist();

            Service.articleGetArticle(id,User.id,function(data)
            {
                var info = data.data.info;
                if(info)
                {
                    var obj = info[0];

                    obj.time = DateTimeUtil.UnixToDate(obj.update_time);

                    try
                    {
                        var arr = JSON.parse(obj.content);
                        vm.list = arr;
                    }
                    catch (err)
                    {

                    }

                    if(obj.orcollect == null || obj.orcollect == undefined)
                    {
                        bottom.orcollect = "";
                    }
                    else
                    {
                        if(obj.orcollect == 0)
                        {
                            bottom.orcollect = "";
                        }
                        else
                        {
                            bottom.orcollect = "2";
                        }

                    }

                    if(obj.orjoin == null || obj.orjoin == undefined)
                    {
                        bottom.orjoin = "";
                        bottom.btitle = '报名';
                    }
                    else
                    {
                        if(obj.orjoin == 0)
                        {
                            bottom.orjoin = "";
                            bottom.btitle = '报名';
                        }
                        else
                        {
                            bottom.orjoin = "2";
                            bottom.btitle = '取消报名';
                        }

                    }

                    bottom.type = obj.type;
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

                    toUserList:function(flag)
                    {
                        if(!checkLogin())
                        {
                            return;
                        }

                        mainView.router.loadPage({url:'user_info_list2.html?flag='+flag});
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

                                    try
                                    {
                                        store.set("user",obj);
                                    }
                                    catch (err)
                                    {

                                    }

                                    initUser(obj);

                                    mainView.router.back({url:'index.html'});

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

            if(!checkLogin())
            {
                return;
            }

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
                        try
                        {
                            var URL = window.URL || window.webkitURL;
                            URL.revokeObjectURL(vm.headimg);
                        }
                        catch (e)
                        {

                        }

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
                        console.log(vm);

                        vm.address = $$("#picker-dependent").val();
                        Service.userUserEdit(vm,function(data)
                        {
                            var code = data.data.code;
                            var msg = data.data.msg;

                            if(code == 0)
                            {
                                msg = "修改成功";
                            }

                            initUser(User);

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
            vm.address = User.address;
            vm.birthday = User.birthday;
            vm.sex = User.sex;

            if(vm.birthday != "")
            {
                $$("#calendar-default").val(DateTimeUtil.UnixToDate(vm.birthday));
            }

            $$("#picker-dependent").val(vm.address);



            var calendarDefault = myApp.calendar({
                input: '#calendar-default',

                formatValue: function (picker, values) {
                    vm.birthday = values/1000;
                    return DateTimeUtil.UnixToDate(values/1000);
                },
            });

            require(['city_picker'],function(){
                CityPicker.init('#picker-dependent',myApp);

            });


        }

        function initPublishJS()
        {
            var input = new Vue({
                el: '#txtinput',
                data: {},
                methods: {

                    txteditend: function () {

                        var str = $$(".p_content").val();

                        if (vm.isnew) {
                            var obj = {};
                            obj.txt = str;
                            obj.img = "http://static2.ivwen.com/user/7224114/c75747eb2c500001204e135077f080c0.jpg";
                            vm.list.splice(vm.lastIndex, 0, obj);
                        }
                        else {
                            if (vm.lastIndex >= 0 && vm.lastIndex < vm.list.length) {
                                vm.list[vm.lastIndex].txt = str;
                            }
                        }

                        myApp.closeModal('.popup_a');
                        $$(".p_content").val("");

                        vm.isnew = false;
                    },
                },

            });

            var vm = new Vue({
                el: '#publish',
                data: {
                    list:[],
                    lastindex:-1,
                    cover:'http://static2.ivwen.com/user/7224114/c75747eb2c500001204e135077f080c0.jpg',
                    coverid:'',
                    isnew:false,
                    isactity:true,
                    title:'',
                    nowindex:-1,
                    clist:[],

                    s_time:'',
                    e_time:'',
                    price:'',
                    a_number:'',

                    cname : '',
                    cid : '',

                },

                methods:{

                    showTxtEdit:function(index,isnew)
                    {
                        console.log(isnew);

                        vm.isnew = isnew;

                        myApp.popup('.popup_a');
                        vm.lastIndex = index;
                    },

                    chooseCover:function()
                    {

                        //try {
                        //    var URL = window.URL || window.webkitURL;
                        //    URL.revokeObjectURL(vm.cover);
                        //}
                        //catch (e)
                        //{
                        //
                        //}

                        $$("#cover")[0].click();
                        //$$("#cover").trigger('click');
                    },

                    chooseimg:function(index,isnew)
                    {

                        //alert("4564658784545: "+isnew);

                        vm.isnew = isnew;
                        vm.nowindex = index;
                        if(isnew)
                        {
                            $$("#mfile").click();
                        }
                        else
                        {
                            $$("#file").click();
                        }

                    },

                    coverChange:function(event)
                    {

                        myApp.showPreloader("上传中...");

                        var p = {

                            url:"http://182.92.70.85/hlppapi/Public/Found/?service=Article.addPic",
                            upBody:{
                                uid: User.id,
                                username: User.username,
                            },

                        };

                        p.upBlock = function(data,err){

                            myApp.hidePreloader();

                            if(err == null)
                            {
                                var code = data.data.code;
                                var id = data.data.info[0].id;
                                var url = data.data.info[0].url;
                                if(code == 0)
                                {
                                    vm.coverid = id;
                                    vm.cover = url;
                                }
                            }


                        };

                        var upload = new XImageUpload(p);

                        upload.upLoad(event);

                    },

                    imgChange:function(event)
                    {
                        var index = vm.nowindex;

                        myApp.showPreloader("上传中...");

                        var p = {

                            url:"http://182.92.70.85/hlppapi/Public/Found/?service=Article.addPic",
                            upBody:{
                                uid: User.id,
                                username: User.username,
                            },

                        };

                        p.upBlock = function(data,err){

                            myApp.hidePreloader();

                            if(err == null)
                            {
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
                            }



                        }

                        var upload = new XImageUpload(p);

                        upload.upLoad(event);

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
                        if(vm.list.length == 1)
                        {
                            var toast = myApp.toast("至少要有一张图片或文字", '', {});
                            toast.show();
                            return;
                        }

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
                        if(User.id == null || User.id == undefined || User.id == "")
                        {
                            mainView.router.loadPage({url:'login.html',pushState:true});
                            return;
                        }

                        if(vm.coverid == "")
                        {
                            var toast = myApp.toast("请选择封面", '', {});
                            toast.show();
                            return;
                        }

                        if(vm.title == "")
                        {
                            var toast = myApp.toast("请输入标题", '', {});
                            toast.show();
                            return;
                        }

                        if(vm.list.length == 0)
                        {
                            var toast = myApp.toast("内容不能为空", '', {});
                            toast.show();
                            return;
                        }

                        if(vm.cname == "")
                        {
                            var toast = myApp.toast("请选择分类", '', {});
                            toast.show();
                            return;
                        }
                        else
                        {
                            $$.each(vm.clist,function(index,item){

                                if(item.title == vm.cname)
                                {
                                    vm.cid = item.id;
                                }

                            });
                        }

                        if(vm.isactity)
                        {
                            if(vm.s_time == "" || vm.e_time == "" || vm.price == "" || vm.a_number == "")
                            {
                                var toast = myApp.toast("请完善活动信息", '', {});
                                toast.show();
                                return;
                            }
                        }



                        var arrString=JSON.stringify(vm.list).replace("点击这里输入照片说明","");
                        myApp.showPreloader("上传中...");

                        var form = new FormData();
                        form.append('uid',User.id);
                        form.append('username',User.username);
                        form.append('category_id',vm.cid);
                        form.append('title',vm.title);
                        form.append('cover_id',vm.coverid);
                        form.append('content',arrString);

                        if(vm.isactity)
                        {

                            form.append('s_time',vm.s_time);
                            form.append('e_time',vm.e_time);
                            form.append('price',vm.price);
                            form.append('a_number',vm.a_number);

                            Service.articleAddEvent(form,function(data){

                                handleresult(data);

                            });
                        }
                        else
                        {
                            Service.articleAddArticle(form,function(data){

                                handleresult(data);

                            });
                        };

                    },


                },

            });


            function handleresult(data)
            {
                myApp.hidePreloader();

                var code = data.data.code;
                var msg = data.data.msg;

                if(code == 0)
                {
                    msg = "发布成功";
                }

                var toast = myApp.toast(msg, '', {});
                toast.show();

                mainView.router.back();


            }

            var s_calendar= myApp.calendar({
                input: '#calendar-stime',

                formatValue: function (picker, values) {
                    vm.s_time = values/1000;
                    return DateTimeUtil.UnixToDate(values/1000);
                },

            });

            var e_calendar= myApp.calendar({
                input: '#calendar-etime',

                formatValue: function (picker, values) {
                    vm.e_time = values/1000;
                    return DateTimeUtil.UnixToDate(values/1000);
                },

            });

            getCategory(function(info){
                vm.clist = [];
                vm.clist = info;
                var sarr = [];
                $$.each(info, function (i, item) {

                    sarr.push(item.title);

                });



                var cpicker = myApp.picker({
                    input: '#picker-device',

                    formatValue: function (picker, values) {
                        vm.cname = values;
                        return values;
                    },

                    cols: [
                        {
                            textAlign: 'center',
                            values: sarr,
                        }
                    ]
                });

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


            for(i=0;i<1;i++)
            {
                var obj = {};
                obj.txt = "点击这里输入照片说明";
                obj.img = "http://static2.ivwen.com/user/7224114/c75747eb2c500001204e135077f080c0.jpg";
                vm.list.push(obj);
            }

        }

        var userList2vm;
        function initUserList2JS(id)
        {

            if(id != null)
            {
                if(userList2vm == null || userList2vm == undefined)
                {
                    return;
                }

                var did = -1;
                $$.each(userList2vm.list,function(index,item){

                    if(item.id == id)
                    {
                        did = index;
                    }

                });

                if(did >= 0)
                {
                    var arr = userList2vm.list;
                    arr.splice(did,1);

                    userList2vm.list = arr;

                }

                return;
            }

            var flag = getUrlParam("flag");

            userList2vm = new Vue({
                el: '#user_info_list2',
                data: {
                    msg : '信息加载中...',
                    end : false,
                    list:[],
                    pagetitle:'',

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

                userList2vm.list = userList2vm.list.concat(arr);

                if(end)
                {
                    userList2vm.msg = "已全部加载完毕";
                    userList2vm.end = true;
                }

            }

            switch(flag)
            {
                case "1":
                    userList2vm.pagetitle = "我发布的";
                    listObj.getUserPostlist(getList);

                    $$('#user_info_list2').on('infinite', function () {

                        listObj.getUserPostlist(getList);

                    });
                    break;

                case "2":
                    userList2vm.pagetitle = "我收藏的";
                    listObj.getUserCollectlist(getList);

                    $$('#user_info_list2').on('infinite', function () {

                        listObj.getUserPostlist(getList);

                    });
                    break;

                case "3":
                    userList2vm.pagetitle = "我参与的";
                    listObj.getUserJoinlist(getList);

                    $$('#user_info_list2').on('infinite', function () {

                        listObj.getUserPostlist(getList);

                    });
                    break;

            }



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














