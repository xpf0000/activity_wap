/**
 * Created by Administrator on 2016/12/21 0021.
 */
var page = 1;
var pagesize = 20;
var end = false;

var uid = "";
var uname="";

requirejs(['main'], function (main) {

    require(['vue','serviceApi','auislide','activitylist'], function(Vue) {

        console.log("index js loaded!!!!!!");




        var banner = new Vue({
            el: '#aui-slide3',
            data: {
                info: []
            },

            updated:function()
            {
                var slide3 = new auiSlide({
                    container:document.getElementById("aui-slide3"),
                    // "width":300,
                    "height":240,
                    "speed":500,
                    "autoPlay": 3000, //自动播放
                    "loop":true,
                    "pageShow":true,
                    "pageStyle":'dot',
                    'dotPosition':'center'
                });

            }

        });

        getGuanggao();

        function getGuanggao()
        {

            console.log(Service);

            Service.commonGetGuanggao("7",function(data)
            {

                var info = data.data.info;

                if(info)
                {

                    console.log(info);
                    banner.info = info;






                    //$(info).each(function(index,item)
                    //{
                    //    item.s_time_str = $.myTime.UnixToDate(item.s_time);
                    //});
                    //
                    //
                    //indexModel.tj = indexModel.tj.concat(data.data.info);
                    //
                    //page = page + 1;
                    //
                    //if(info.length<20)
                    //{
                    //    indexModel.end = true;
                    //    indexModel.msg = '已无更多!';
                    //}
                }



            });
        }




    });

});

function toQDGZ()
{
    sendMsgToAPP({'msg':'跳转签到规则','type':'0'});
}

function toGoodsCenter()
{
    sendMsgToAPP({'msg':'跳转怀府币商城','type':'3'});
}



