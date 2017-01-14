"use strict"

define (function() {
	
	var share = {};
	
	share.shareUrl = {
		//分享地址
	 qzone : 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&title={title}&pics={pic}&summary={content}',
	 sina : 'http://service.weibo.com/share/share.php?url={url}&title={title}&pic={pic}&searchPic=false',
	 qq : 'http://share.v.t.qq.com/index.php?c=share&a=index&url={url}&title={title}&appkey=801cf76d3cfc44ada52ec13114e84a96',
	 douban : 'http://www.douban.com/share/service?href={url}&name={title}&text={content}&image={pic}',
	 weixin : 'http://qr.liantu.com/api.php?text={url}',
	 qqAPP: 'mqqapi://share/to_fri?src_type=web&version=1&file_type=news&share_id=1101685683&title={title}&thirdAppDisplayName={appname}&url={url}'
	};
	
	
	share.replaceAPI = function(api,options) {
		api = api.replace('{url}', options.url);
		api = api.replace('{title}', options.title);
		api = api.replace('{content}', options.content);
		api = api.replace('{pic}', options.pic);
		api = api.replace('{appname}', options.appname);

		return api;
	}
	
    share.extend = function(obj1,obj2)
    {
	    var t = obj1;
	    for(var i in obj2)
	    {
		    t[i] = obj2[i];
	    }
	    
	    return t;
    }
    
    
    //插件方法
	share.methods = {	
		QQ:function(options){
			window.location.href = share.replaceAPI(share.shareUrl['qqAPP'],options);
		},
		QZone:function(options){
			window.open(share.replaceAPI(share.shareUrl['qzone'],options));
		},
		Sina:function(options) {
			window.open(share.replaceAPI(share.shareUrl['sina'],options));
		},
		Douban:function(options) {
			window.open(share.replaceAPI(share.shareUrl['douban'],options));
		},
		Weixin:function(options){
		    window.open(share.replaceAPI(share.shareUrl['weixin'],options));
	    }
	}


		
	
	share.Share = function(options, param) {
	    
	    console.log("^^^^^^^^^^^^^^^^^^6");
	    
        if(typeof options == 'string'){
		    var method = share.methods[options];
			if(method)
			{
				var defaults ={
					url: window.location.href,
					title: document.title,
					content: '',
					pic: ''
				}
				
				var options = share.extend(defaults,param);
				return method(param);
			}
				
			}
			else
			{
				console.log("尚未配置该分享平台信息 !!!");
			}
			
    }

	return share;
	
});
