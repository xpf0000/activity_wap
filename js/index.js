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
var myApp = null;
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
        mainView.router.loadPage({url:'login.html'});
        return false;
    }

    return true;
}


requirejs(['main'], function (main) {

    require(['vue','store','Service','share','wx','xupload','toast','auislide'], function(v,store,s,share,wx) {

        Vue = v;
        $$ = Dom7;
        Service = s;

        initUser();

        $$(document).on('pageInit', function (e) {
            var page = e.detail.page;

            if (page.name == 'index') {
                initIndexJS();
            }
            else if(page.name == 'list')
            {
                initListJS(page.query);
            }
            else if(page.name == 'info')
            {
                console.log("info page !!!!!!!!!");
                var id = page.query.id;
                if(id == null || id == undefined)
                {
	                id = getUrlParam('id');
                }
                
                initInfoJS(id);
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

                    initPublishJS(page.query);

                },1);

            }
            else if(page.name == 'user_info_list2')
            {
                console.log("user_info_list2 page !!!!!!!!!");
                setTimeout(function(){

                    initUserList2JS(null,page.query);

                },1);

                return;

            }
            else if(page.name == 'user_info_list')
            {
                console.log("user_info_list page !!!!!!!!!");
                setTimeout(function(){

                    initUserListJS(page.query);

                },1);

            }
            else if(page.name == 'info_m')
            {
                console.log("info_m page !!!!!!!!!");
                setTimeout(function(){

                    initInfoMJS(null,page.query);

                },1);

            }
            else if(page.name == 'reg')
            {
                console.log("reg page !!!!!!!!!");
                setTimeout(function(){

                    initRegJS(page.query);

                },1);

            }
            else if(page.name == 'findpass')
            {
                console.log("findpass page !!!!!!!!!");
                setTimeout(function(){

                    initFindPassJS(page.query);

                },1);

            }
            else if(page.name == 'updatePass')
            {
                console.log("updatePass page !!!!!!!!!");
                setTimeout(function(){

                    initUpdatePassJS();

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

            var page = e.detail.page;
            console.log("pageAfterBack: "+page.name);

        });


        myApp = new Framework7({
            modalButtonOk: '确定',
            modalButtonCancel: '取消',
            pushStateSeparator : '',
            pushState : true,
        });

        mainView = myApp.addView('.view-main', {
            //domCache: true,
        });

        function initWeixin()
        {
            Service.weixinConfig(function (res) {

                wx.config({
                    debug: true,
                    appId: res["appId"],
                    timestamp: res["timestamp"],
                    nonceStr: res["nonceStr"],
                    signature: res["signature"],
                    jsApiList: ['chooseImage', 'uploadImage', 'downloadImage', 'previewImage']
                });

                wx.ready(function() {

                    document.getElementById('morePic').onclick = function() {
                        var images = {localIds:[],serverId:[]};

                        wx.chooseImage({
                            count: 9,
                            sizeType: ['original', 'compressed'],
                            sourceType: ['album'],
                            success: function(res) {
                                images.localIds = res.localIds;


                                alert(res);
                                alert(res.localIds);
                                console.log(res);
                                console.log(res.localIds);

                                var i = 0; var length = images.localIds.length;

                                var upload = function() {
                                    wx.uploadImage({
                                        localId:images.localIds[i],
                                        success: function(res) {

                                            images.serverId.push(res.serverId);

                                            //如果还有照片，继续上传
                                            i++;
                                            if (i < length) {
                                                upload();
                                            }
                                        }
                                    });
                                };

                                upload();
                            }
                        });
                    }
                });




            })
        }

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
	            if(arr.length > 4)
	            {
		            var t = arr.splice(0, 4);
		            category.info = t;
	            }
	            else
	            {
		            category.info = arr;
	            }
	            
	            
                
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
	            var t = listVM.info;
	            t = t.concat(arr);
	            
	            listVM.info = t;
	            

                if(end)
                {
                    vm.msg = "已全部加载完毕";
                    vm.end = true;
                }

            }

            indexlist.getlist(getList);
            
            OnNotice("addActivitySuccess",function(obj){
	            
	            console.log("观察者模式 !!!!!!! 000");
	            
	            listVM.info = [];
	            indexlist.reset();
	            indexlist.getlist(getList);
	            
	            console.log("观察者模式 !!!!!!! 111");
	            
            })
            
            
        }


        function initListJS(query)
        {

            var id = query.id;
            var title = query.title;

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

                        //var u=WapBaseUrl+"list.html?id="+id+"&title="+title;
                        //window.history.pushState({},0,u);

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


        function initInfoJS(id)
        {
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
            
             var join = new Vue({
                el: '#share',
                data: {
                   
                },

                methods:{
	                
	                doShare:function(flag)
	                {
		                
		                console.log("do share !!!!! "+flag);
		                
		                var option = {
			                url: window.location.href,
							title: vm.info.title,
							content: vm.info.title,
							pic: vm.info.url,
		                };
		                
		                switch(flag)
		                {
			                case 0 :
			                
			                console.log(share);
			                
			                share.Share("Weixin",option);
			                
			                break;
			                
			                case 1 :
			                share.Share("Weixin",option);
			                break;
			                
			                case 2 :
			                
			                option = {
			                url: Base64.encode(window.location.href),
							title: Base64.encode(vm.info.title),
							content: '',
							pic: '',
							appname: Base64.encode('河洛泡泡'),
		                	};

			                share.Share("QQ",option);
			                break;
			                
			                case 3 :
			                share.Share("Sina",option);
			                break;
			                
			                
		                }
		                
	                }
	                
				}
				
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
	                if(data.data.code != 0){return;}
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
                        if(flag == "4")
                        {
	                        mainView.router.loadPage({url:'edit_password.html'});
                        }
                        else
                        {
	                        mainView.router.loadPage({url:'user_info_list2.html?flag='+flag});
                        }

                        
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
                                initUser(User);

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
	                
	                console.log(values);
	                
                    vm.birthday = values/1000;
                    return DateTimeUtil.UnixToDate(values/1000);
                },
            });

            require(['city_picker'],function(){
                CityPicker.init('#picker-dependent',myApp);

            });


        }

        function initPublishJS(query)
        {

            var id = query.id;
            if(id == null || id == undefined)
            {
	           id = getUrlParam('id');
            }

            var input = new Vue({
                el: '#txtinput',
                data: {
	                edittxt:'',
                },
                methods: {

                    txteditend: function () {

                        var str = input.edittxt;

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
                        input.edittxt = "";

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
                    isactity:false,
                    title:'',
                    nowindex:-1,
                    clist:[],
                    astyle:"none",
                    s_time:'',
                    e_time:'',
                    price:'',
                    a_number:'',
                    address:'',
                    cname : '',
                    cid : '',

                },

                methods:{

                    showTxtEdit:function(index,isnew,oldtxt)
                    {
                        console.log(isnew);

                        vm.isnew = isnew;
                        
                        if(isnew)
                        {
	                        input.edittxt = "";
                        }
                        else
                        {
	                        if(oldtxt != null && oldtxt != undefined)
							{
	                        	input.edittxt = oldtxt;
                        	}
                        }
                        
                        

                        myApp.popup('.popup_a');
                        vm.lastIndex = index;
                    },

                    chooseCover:function()
                    {
                        if(!checkLogin())
                        {
                            return;
                        }

                        $$("#cover")[0].click();
                    },

                    chooseimg:function(index,isnew)
                    {
                        if(!checkLogin())
                        {
                            return;
                        }

                        vm.isnew = isnew;
                        vm.nowindex = index;
                        if(isnew)
                        {
                            $$("#mfile").click();
                            sendMsgToAPP({"type":"0","msg":"选择多张图片"});
                        }
                        else
                        {
                            $$("#file").click();
                            sendMsgToAPP({"type":"0","msg":"选择单张图片"});
                        }



                    },

                    coverChange:function(event)
                    {

                        myApp.showPreloader("上传中...");

                        var p = {

                            url:Service.BaseUrl+"Article.addPic",
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

                            url:Service.BaseUrl+"Article.addPic",
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
                                    if(vm.isnew)
                                    {
                                        $$.each(info, function (i, item) {

                                            var obj = {};
                                            obj.txt = "";
                                            obj.img = item.url;
                                            obj.imgid = item.id;
                                            vm.list.splice(index, 0, obj);

                                        });

                                        vm.isnew = false;
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
                            mainView.router.loadPage({url:'login.html'});
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
                            form.append('address',vm.address);



                            if(id != null && id != undefined)
                            {
                                form.append('aid',id);

                                console.log(form.toString());

                                Service.articleEditEvent(form,function(data){

                                    handleresult(data);

                                });
                            }
                            else
                            {
                                Service.articleAddEvent(form,function(data){

                                    handleresult(data);

                                });
                            }


                        }
                        else
                        {
                            if(id != null && id != undefined)
                            {
                                form.append('aid',id);

                                Service.articleEditArticle(form,function(data){

                                    handleresult(data);

                                });
                            }
                            else
                            {
                                Service.articleAddArticle(form,function(data){

                                    handleresult(data);

                                });
                            }

                        };

                    },


                    showActivity:function()
                    {

                        if(id != null && id != undefined)
                        {
                            return;
                        }

                        if(vm.isactity)
                        {
                            vm.astyle = 'block';
                        }
                        else
                        {
                            vm.astyle = 'none';
                        }

                    }


                },

            });


            if(id != null && id != undefined)
            {

                $$('#ckbox').attr("disabled",true);

                Service.articleGetArticle(id,User.id,function(data)
                {
                    var info = data.data.info;
                    if(info)
                    {
                        var obj = info[0];
                        vm.coverid = obj.cover_id;
                        vm.cover = obj.url;
                        vm.title = obj.title;
                        vm.isactity = obj.type == '2';
                        vm.cid = obj.category_id;

                        $$.each(vm.clist, function (i, item) {
                            if(item.id+"" == vm.cid+"")
                            {
                                vm.cname = item.title;
                            }
                        });

                        if(vm.isactity)
                        {
                            vm.astyle = 'block';
                        }
                        else
                        {
                            vm.astyle = 'none';
                        }
                        var arr = JSON.parse(obj.content);
                        vm.list = arr;

                    }
                });

                Service.articleGetEvent(id,function(data){

                    var info = data.data.info;
                    if(info)
                    {
                        var obj = info[0];

                        vm.s_time = obj.s_time;
                        vm.e_time = obj.e_time;

                        $$('#calendar-stime').val(DateTimeUtil.UnixToDate(vm.s_time));
                        $$('#calendar-etime').val(DateTimeUtil.UnixToDate(vm.e_time));

                        vm.price = obj.price;
                        vm.a_number = obj.a_number;
                        vm.address = obj.address;

                    }

                });

            }




            function handleresult(data)
            {
                myApp.hidePreloader();

                var code = data.data.code;
                var msg = data.data.msg;
                
                console.log(code);
                console.log(msg);

                if(code == 0)
                {
                    msg = "发布成功";
                    
                    console.log("id: "+id);
                    if(id != null && id != undefined)
                    {
	                    initInfoMJS(id,null);
                    }
                    
					postNotice("addActivitySuccess");

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
                    if(item.id+"" == vm.cid+"")
                    {
                        vm.cname = item.title;
                    }

                });

                var cpicker = myApp.picker({
                    input: '#picker-device',

                    formatValue: function (picker, values) {

                        console.log(values);

                        vm.cname = values[0];
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


            for(i=0;i<1;i++)
            {
                var obj = {};
                obj.txt = "";
                obj.img = "http://static2.ivwen.com/user/7224114/c75747eb2c500001204e135077f080c0.jpg";
                vm.list.push(obj);
            }

        }

        var userList2vm;
        function initUserList2JS(id,query)
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

            var flag = query.flag;
            
            if(flag == null || flag == undefined)
            {
	            flag = getUrlParam("flag");
            }

            userList2vm = new Vue({
                el: '#user_info_list2',
                data: {
                    msg : '信息加载中...',
                    end : false,
                    list:[],
                    pagetitle:'',
                },

                methods:{

                    toInfo:function(id)
                    {
                        if(flag == 1)
                        {
                            mainView.router.loadPage({url:'info_m.html?id='+id});
                        }
                        else
                        {
                            mainView.router.loadPage({url:'info.html?id='+id});
                        }

                    }

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

                        listObj.getUserCollectlist(getList);

                    });
                    break;

                case "3":
                    userList2vm.pagetitle = "我参与的";
                    listObj.getUserJoinlist(getList);

                    $$('#user_info_list2').on('infinite', function () {

                        listObj.getUserJoinlist(getList);

                    });
                    break;

            }



            $$('#user_info_list2').on('scroll', handleInfiniteScroll);
            
            
            
            OnNotice("DelActivitySuccess",function(o){
	            
	            userList2vm.list = [];
	            listObj.reset();
	            switch(flag)
				{
                case "1":
                    
                    listObj.getUserPostlist(getList);
                    break;

                case "2":
                    
                    listObj.getUserCollectlist(getList);
                    break;

                case "3":                  
                    listObj.getUserJoinlist(getList);
                    break;

            }

	            
	            
	            
            });
            
            
        }

        function initUserListJS(query)
        {

            var uid = query.uid;
            var nick = query.nick;
            var pic = query.pic;
            
            if(uid == null || uid == undefined)
            {
	            uid = getUrlParam('uid');
	            nick = getUrlParam('nick');
	            pic = getUrlParam('pic');
            }

            var vm = new Vue({
                el: '#user_info_list',
                data: {

                    list:[],
                    msg : '信息加载中...',
                    end : false,

                    info:{
                        nickname:nick,
                        headimage:pic,
                    },

                },

                methods:{

                },

            });

            var listObj = Object.create(ActivityListPageModel);
            listObj.user = {id:uid};
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

            $$('#user_info_list').on('infinite', function () {

                listObj.getUserPostlist(getList);

            });

            $$('#user_info_list').on('scroll', handleInfiniteScroll);


        }


        var infomVM = null;
        function initInfoMJS(aid,query)
        {

            if(aid != null && aid != undefined)
            {
                if(infomVM == null || infomVM == undefined)
                {
                    return;
                }

                getinfo();

                return;
            }

            var id = query.id;
            if(id == null || id == undefined)
            {
	           id = getUrlParam('id');
            }

            infomVM = new Vue({
                el: '#info_m',
                data: {
                    info:{},
                    einfo:{},
                    id:id,
                },

                methods:{

                },

            });

            getinfo();

            function getinfo()
            {
                infomVM.info = {};
                infomVM.einfo = {};

                Service.articleGetArticle(infomVM.id,User.id,function(data)
                {
	                if(data.data.code != 0)
					{
						return;
					}
					
                    var info = data.data.info;
                    if(info)
                    {
                        var obj = info[0];
                        obj.s_str = DateTimeUtil.UnixToDate(obj.s_time);
                        obj.e_str = DateTimeUtil.UnixToDate(obj.e_time);

                        infomVM.info = obj;
                    }
                });

                Service.articleGetEvent(infomVM.id,function(data){

					if(data.data.code != 0)
					{
						return;
					}

                    var info = data.data.info;
                    if(info)
                    {
                        var obj = info[0];
                        obj.s_str = DateTimeUtil.UnixToDate(obj.s_time);
                        obj.e_str = DateTimeUtil.UnixToDate(obj.e_time);

                        infomVM.einfo = obj;
                    }

                });
            }

            $$('.confirm-ok').on('click', function () {
                myApp.confirm('确定删除?',"提醒", function () {

                    Service.usersDelArticle(id,User,function(b){

                        if(b)
                        {
                            //initUserList2JS(id);
                            postNotice("DelActivitySuccess");
                            mainView.router.back({url:'index.html'});
                        }

                    });

                });
            })

        }
        
        function initRegJS(query)
        {


            var vm = new Vue({
                el: '#reg',
                data: {
                    mobil:'',
                    code:'',
                    pass1:'',
                    pass2:'',
                    nickname:'',
                    codebtn:'获取验证码',
                    running: false,
                },

                methods:{
	                
	                sendMsg:function()
	                {
		                
		                if(vm.codebtn != '获取验证码')
		                {
			             	return;   
		                }
		                
		                if(!validatemobile(vm.mobil))
		                {
			                return;
		                }
		              		                
		            
		                
		                Service.userSmsSend(vm.mobil,"1",function(b){			                
			           
			           store.set("SMSSendTime",new Date().getTime());
  
			                if(b)
			                {		             
				                settime();
			                }
			                
		                });
		                
	                },
	                
                    doReg:function()
                    {
	                    
	                    if(!validatemobile(vm.mobil))
		                {
			                return;
		                }

						if(vm.code == "")
						{
							var toast = myApp.toast('请输入验证码', '', {});
							toast.show();
							return;
						}
						
						if(vm.nickname == "")
						{
							var toast = myApp.toast('请输入昵称', '', {});
							toast.show();
							return;
						}
						
						if(vm.pass1 == "" || vm.pass2 == "")
						{
							var toast = myApp.toast('请输入密码和确认密码', '', {});
							toast.show();
							return;
						}
						
						if(vm.pass1 != vm.pass2)
						{
							var toast = myApp.toast('密码和确认密码不一致', '', {});
							toast.show();
							return;
						}

						
						myApp.showPreloader("注册中...");

                        if (vm.running){return;};
                        vm.running = true;

                        Service.userRegister(vm.mobil,vm.pass1,vm.code,vm.nickname,function(data)
                            {
	                            myApp.hidePreloader();
	                            
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
                            
                            
                    },

                },

            });
            
            
            
            function settime()
            {
	            var old = store.get("SMSSendTime");
	            if(old == null || old == undefined){return;}
	            
	            var t = (new Date().getTime() - old)/1000;
	            t = parseInt(t);
	            if(t < 60)
	            {
		            vm.codebtn = (60-t)+"秒";
		            
		            setTimeout(function() {
						settime()
					},1000);
					
	            }
	            else
	            {
		            vm.codebtn = "获取验证码";
	            }
 
	            
            }
            
            settime();


        }
        
        function initFindPassJS(query)
        {

            var vm = new Vue({
                el: '#findpass',
                data: {
                    mobil:'',
                    code:'',
                    pass1:'',
                    pass2:'',
                    codebtn:'获取验证码',
                    running: false,
                },

                methods:{
	                
	                sendMsg:function()
	                {
		                
		                if(vm.codebtn != '获取验证码')
		                {
			             	return;   
		                }
		                
		                if(!validatemobile(vm.mobil))
		                {
			                return;
		                }
		              		                
		            
		                
		                Service.userSmsSend(vm.mobil,"2",function(b){			                
			           
			           store.set("SMSSendTime",new Date().getTime());
           
			                if(b)
			                {
				                settime();
			                }
			                
		                });
		                
	                },
	                
                    doSubmit:function()
                    {
	                    if(!validatemobile(vm.mobil))
		                {
			                return;
		                }

						if(vm.code == "")
						{
							var toast = myApp.toast('请输入验证码', '', {});
							toast.show();
							return;
						}
						
						if(vm.pass1 == "" || vm.pass2 == "")
						{
							var toast = myApp.toast('请输入密码和确认密码', '', {});
							toast.show();
							return;
						}
						
						if(vm.pass1 != vm.pass2)
						{
							var toast = myApp.toast('密码和确认密码不一致', '', {});
							toast.show();
							return;
						}

						myApp.showPreloader("");

                        if (vm.running){return;};
                        vm.running = true;

                        Service.userUpdatePass(vm.mobil,vm.pass1,vm.code,function(b)
                            {
	                            myApp.hidePreloader();
	                            
	                            if(b)
	                            {
		                            mainView.router.back({url:'index.html'});
	                            }
    
                            });
                            
                            
                    },

                },

            });
            
            
            
            function settime()
            {
	            var old = store.get("SMSSendTime");
	            if(old == null || old == undefined){return;}
	            
	            var t = (new Date().getTime() - old)/1000;
	            t = parseInt(t);
	            if(t < 60)
	            {
		            vm.codebtn = (60-t)+"秒";
		            
		            setTimeout(function() {
						settime()
					},1000);
					
	            }
	            else
	            {
		            vm.codebtn = "获取验证码";
	            }
 
	            
            }
            
            settime();


        }
        
        
        function initUpdatePassJS()
        {

            var vm = new Vue({
                el: '#updatePass',
                data: {
                    oldpass:'',
                    pass1:'',
                    pass2:'',
                    running: false,
                },

                methods:{
        
                    doSubmit:function()
                    {
	                    						
						if(vm.oldpass == "" || vm.pass1 == "" || vm.pass2 == "")
						{
							var toast = myApp.toast('请输入原密码,新密码和确认密码', '', {});
							toast.show();
							return;
						}
						
						if(vm.pass1 != vm.pass2)
						{
							var toast = myApp.toast('密码和确认密码不一致', '', {});
							toast.show();
							return;
						}

						myApp.showPreloader("");

                        if (vm.running){return;};
                        vm.running = true;

                        Service.userUpdatePass2(User.mobile,vm.oldpass,vm.pass1,function(b)
                            {
	                            myApp.hidePreloader();
	                            
	                            if(b)
	                            {
		                            mainView.router.back({url:'index.html'});
	                            }
    
                            });
                            
                            
                    },

                },

            });
            
            
            
           
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














