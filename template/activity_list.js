requirejs(['main'], function (main) {

    $(".index_info_list").load("./template/activity_list.html",function(){

    require(['vue','serviceApi','auislide'], function(Vue) {

        var list = new Vue({
            el: '#activity_list_ul',
            data: {
                info: []
            },

            updated:function()
            {

            }

        });

        getlist();

        function getlist()
        {
            Service.articleGetList('','1','20',function(data)
            {

                var info = data.data.info;

                if(info)
                {

                    console.log(info);
                    list.info = info;


                }



            });
        }





        });



    });

});




