
require.config({
    baseUrl: 'lib',  //相对于index.html页面文件的地址
    paths:{   //这里配置的地址，都是相对于上方的baseUrl的
        vue: 'vue',
        domReady:'domReady',
        net: 'XRequest',
        serviceApi: '../js/serviceApi',
        framework7:'framework7',
        zepto:'zepto',
        auislide:'aui-slide',
        store:'store',
        json2:'json2',
        toast:'toast',
        city_picker:'city_picker',
    },
    shim:{
        vue: { deps: ['domReady!'],exports: "vue" },
        net:{ deps: ['framework7']},
        toast:{ deps: ['framework7']},
        serviceApi:{ deps: ['net'],exports: "serviceApi"},
        store:{ deps: ['json2']},
    }
});


require(['framework7'], function() {

    //$$ = Dom7;

});

Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};

function getUrlParam(name)
{
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return decodeURIComponent(r[2]);
    return null;
}

//只能输入数字
function onlyNumber(event){
	

   var keyCode = event.keyCode;   
  
     if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) || keyCode == 8)    
    {   
	    
	    
         event.returnValue = true;    
     } else {    
	     
	      event.preventDefault();  
          event.returnValue = false;    
    }       
    
    
}


//发送验证码时添加cookie
function addCookie(name,value,expiresHours){ 
  var cookieString=name+"="+escape(value); 
  
  console.log(cookieString);
  
  //判断是否设置过期时间,0代表关闭浏览器时失效
  if(expiresHours>0){ 
    var date=new Date(); 
    date.setTime(date.getTime()+expiresHours*1000); 
    cookieString=cookieString+";expires=" + date.toUTCString(); 
  } 
  
   console.log(cookieString);
  
    document.cookie=cookieString; 
} 

//修改cookie的值
function editCookie(name,value,expiresHours){ 
  var cookieString=name+"="+escape(value); 
  if(expiresHours>0){ 
   var date=new Date(); 
   date.setTime(date.getTime()+expiresHours*1000); //单位是毫秒
   cookieString=cookieString+";expires=" + date.toGMTString(); 
  } 
   document.cookie=cookieString; 
} 

//根据名字获取cookie的值
function getCookieValue(name)
{ 
   var strCookie=document.cookie; 
   
   var arrCookie=strCookie.split("; "); 
   
   for(var i=0;i<arrCookie.length;i++){ 
	   
    var arr=arrCookie[i].split("="); 
    
    if(arr[0]==name)
    {
     return unescape(arr[1]);
    }
         
   } 
   
   return "";
     
}



function sendMsgToAPP(json)
    {
	    console.log(json);
	    
        try    {
            window.webkit.messageHandlers.JSHandle.postMessage(JSON.stringify(json));
        }
        catch  (e)
        {
            try
                {
                    APP.jsMessage(JSON.stringify(json));
            }
            catch(e)
            {
	            try
	            {
		            window.android.runAndroidMethod(JSON.stringify(json));
	            }
	            catch(e)
	            {
		            
	            }
                
            }
            
        }
        
}


var DateTimeUtil =  {
            /**
             * 当前时间戳
             * @return <int>        unix时间戳(秒)
             */
            CurTime: function() {
                return Date.parse(new Date()) / 1000;
            },
            /**
             * 日期 转换为 Unix时间戳
             * @param <string> 2014-01-01 20:20:20  日期格式
             * @return <int>        unix时间戳(秒)
             */
            DateToUnix: function(string) {
                var f = string.split(' ', 2);
                var d = (f[0] ? f[0] : '').split('-', 3);
                var t = (f[1] ? f[1] : '').split(':', 3);
                return (new Date(
                        parseInt(d[0], 10) || null,
                        (parseInt(d[1], 10) || 1) - 1,
                        parseInt(d[2], 10) || null,
                        parseInt(t[0], 10) || null,
                        parseInt(t[1], 10) || null,
                        parseInt(t[2], 10) || null
                    )).getTime() / 1000;
            },
            /**
             * 时间戳转换日期
             * @param <int> unixTime    待时间戳(秒)
             * @param <bool> isFull    返回完整时间(Y-m-d 或者 Y-m-d H:i:s)
             * @param <int>  timeZone   时区
             */
            UnixToDate: function(unixTime, isFull, timeZone) {
                if (typeof (timeZone) == 'number')
                {
                    unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
                }
                var time = new Date(unixTime * 1000);
                var ymdhis = "";
                ymdhis += time.getUTCFullYear() + "-";
                ymdhis += (time.getUTCMonth() + 1) + "-";
                ymdhis += time.getUTCDate();
                if (isFull === true)
                {
                    ymdhis += " " + time.getUTCHours() + ":";
                    ymdhis += time.getUTCMinutes() + ":";
                    ymdhis += time.getUTCSeconds();
                }
                return ymdhis;
            },

            UnixToDateFormat: function(unixTime, format ,timeZone) {
                if (typeof (timeZone) == 'number')
                {
                    unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
                }
                var time = new Date(unixTime * 1000);

                var ymdhis = "";

                if(format)
                {
                    ymdhis = format;
                    ymdhis = ymdhis.replace("yyyy", time.getUTCFullYear()+"");

                    var month = (time.getUTCMonth() + 1)+"";
                    if(month.length < 2)
                    {
                        ymdhis = ymdhis.replace("MM", "0"+month);
                    }
                    ymdhis = ymdhis.replace("MM", month);
                    ymdhis = ymdhis.replace("M", month);


                    var day = time.getUTCDate()+"";
                    if(day.length < 2)
                    {
                        ymdhis = ymdhis.replace("dd", "0"+day);
                    }
                    ymdhis = ymdhis.replace("dd", day);
                    ymdhis = ymdhis.replace("d", day);


                    var hours = time.getUTCHours()+"";
                    if(hours.length < 2)
                    {
                        ymdhis = ymdhis.replace("HH", "0"+hours);
                    }
                    ymdhis = ymdhis.replace("HH", hours);
                    ymdhis = ymdhis.replace("H", hours);


                    var minutes = time.getUTCMinutes()+"";
                    if(minutes.length < 2)
                    {
                        ymdhis = ymdhis.replace("mm", "0"+minutes);
                    }
                    ymdhis = ymdhis.replace("mm", minutes);
                    ymdhis = ymdhis.replace("m", minutes);


                    var seconds = time.getUTCSeconds()+"";
                    if(seconds.length < 2)
                    {
                        ymdhis = ymdhis.replace("ss", "0"+seconds);
                    }
                    ymdhis = ymdhis.replace("ss", seconds);
                    ymdhis = ymdhis.replace("s", seconds);

                }
                else
                {
                    ymdhis += time.getUTCFullYear() + "-";
                    ymdhis += (time.getUTCMonth() + 1) + "-";
                    ymdhis += time.getUTCDate();
                    ymdhis += " " + time.getUTCHours() + ":";
                    ymdhis += time.getUTCMinutes() + ":";
                    ymdhis += time.getUTCSeconds();

                }

                return ymdhis;
            },



            /**
             * [dateDiff 算时间差]
             * @param  {[type=Number]} hisTime [历史时间戳，必传]
             * @param  {[type=Number]} nowTime [当前时间戳，不传将获取当前时间戳]
             * @return {[string]}         [string]
             */
            DateDiff : function(hisTime,nowTime)
            {
                if(!arguments.length) return '';
                var arg = arguments,
                    now =arg[1]?arg[1]:new Date().getTime()/1000,
                    diffValue = now - arg[0],
                    result='',

                    minute = 60,
                    hour = minute * 60,
                    day = hour * 24,
                    halfamonth = day * 15,
                    month = day * 30,
                    year = month * 12,

                    _year = diffValue/year,
                    _month =diffValue/month,
                    _week =diffValue/(7*day),
                    _day =diffValue/day,
                    _hour =diffValue/hour,
                    _min =diffValue/minute;

                if(_year>=1) result=parseInt(_year) + "年前";
                else if(_month>=1) result=parseInt(_month) + "个月前";
                else if(_week>=1) result=parseInt(_week) + "周前";
                else if(_day>=1) result=parseInt(_day) +"天前";
                else if(_hour>=1) result=parseInt(_hour) +"个小时前";
                else if(_min>=1) result=parseInt(_min) +"分钟前";
                else result="刚刚";
                return result;
            }


        };




