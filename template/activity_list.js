
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

        Service.articleGetList(this.category_id,this.page,this.pagesize,function(data)
        {
            var info = data.data.info;
            if(info)
            {
                if(info.length < ActivityListPageModel.pagesize)
                {
                    ActivityListPageModel.end = true;
                }
                else
                {
                    ActivityListPageModel.end = false;
                    ActivityListPageModel.page += 1;
                }

                callback(info,ActivityListPageModel.end);

            }
            ActivityListPageModel.running = false;

        });
    },


};


var ActivityListModel;


requirejs(['main'], function (main) {

    $(".index_info_list").load("./template/activity_list.html",function(){

    require(['vue','serviceApi','auislide'], function(Vue) {

        ActivityListModel = new Vue({
            el: '#activity_list_ul',
            data: {
                info: []
            },

            updated:function()
            {

            }

        });

    });



    });

});




