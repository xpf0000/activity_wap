/**
 * Created by Administrator on 2016/12/21 0021.
 */


requirejs(['main'], function (main) {

    require(['vue','serviceApi','framework7'], function(Vue) {

        var myApp = new Framework7();
        var mainView = myApp.addView('.view-main', {
            // Because we want to use dynamic navbar, we need to enable it for this view:
            dynamicNavbar: true
        });

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
            el: '#aui-slide3',
            data: {
                info: []
            },

            updated:function()
            {

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




        function getList(arr,end)
        {

            console.log("length: "+ActivityListModel.info.length);

            ActivityListModel.info = ActivityListModel.info.concat(arr);

            if(end)
            {
                vm.msg = "已全部加载完毕";
                vm.end = true;
            }

        }

        //ActivityListPageModel.getlist(getList);

    });

});









