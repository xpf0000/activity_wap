/**
 * Created by Administrator on 2016/12/22 0022.
 */
/**
 * Created by Administrator on 2016/12/21 0021.
 */

requirejs(['main'], function (main) {

    require(['vue','serviceApi'], function(Vue) {

        //$(function () {
        //    'use strict';
        //
        //    //无限滚动
        //    $(document).on("pageInit", "#page-infinite-scroll-bottom", function(e, id, page) {
        //
        //        $(page).on('infinite', function() {
        //
        //            ActivityListPageModel.getlist(getList);
        //
        //        });
        //    });
        //
        //    $.init();
        //});/**
        // * Created by Administrator on 2016/12/23 0023.
        // */

        console.log("list js loaded!!!!!!");

        var id = getUrlParam('id');
        var title = getUrlParam('title');

        console.log("id: "+id);
        console.log("title: "+title);

        var filter = new Vue({
            el: '#m-filter',
            data: {
                id : '',
                title : '',
                info : [],


            },

            methods: {

                chooseid : function(id,title)
                {
                    menu_listclose();
                    console.log(id+" | "+title);
                    ActivityListModel.info = [];
                    this.id = id;
                    this.title = title;
                    //ActivityListPageModel.category_id = id;
                    //ActivityListPageModel.reset();
                    //ActivityListPageModel.getlist(getList);

                },

            },

        });

        filter.id = id;
        filter.title = title;

        //ActivityListPageModel.category_id = filter.id;

        var vm = new Vue({
            el: '#page_load',
            data: {
                msg : '信息加载中...',
                end : false,
            },

        });

        //menu_listInit();

        getCategory();

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

                    filter.info = info;
                }
            });

        };




        function getList(arr,end)
        {
            //ActivityListModel.info = ActivityListModel.info.concat(arr);

            if(end)
            {
                vm.msg = "已全部加载完毕";
                vm.end = true;
            }

        }


        //ActivityListPageModel.getlist(getList);






    });

});






