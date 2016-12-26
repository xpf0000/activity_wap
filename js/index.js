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

requirejs(['main'], function (main) {

    require(['vue','serviceApi','framework7','auislide'], function(Vue) {

        var myApp = new Framework7();
        var mainView = myApp.addView('.view-main', {
            // Because we want to use dynamic navbar, we need to enable it for this view:
            dynamicNavbar: true
        });


        $$('.infinite-scroll').on('infinite', function () {

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

                //var config = {
                //    roundLengths:true,
                //    autoplay:2000,
                //    loop:true,
                //    setWrapperSize :true,
                //}
                //
                //$(".swiper-container").swiper(config);

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
        getCategory();

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


        function getCategory()
        {
            Service.articleGetCategory(function(data)
            {
                var info = data.data.info;

                if(info)
                {
                    console.log(info);

                    var item = {
                        id : 0,
                        title : '更多',
                    }

                    info.push(item);

                    category.info = info;
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

    });

});









