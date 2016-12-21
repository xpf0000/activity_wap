
function XHttpGet(url,callBack)
{
	$.support.cors = true;
	
				$.ajax
				({
            
            		type: "GET",
					contentType: "application/x-www-form-urlencoded",
					dataType: "json",
					url: url,  //这里是网址
					timeout:15000, //超时时间
					success:function(data)
					{
						console.log(url);
						console.log(data);
	          	  		callBack(data);	                
            		}, 
					error: function (err) 
					{
						console.log(url);
						console.log(err);
						callBack(err);
            		}
        		});
}



function XHttpUpload(url,data,callBack)
{
	
	console.log(data);
	
	$.support.cors = true;
	
				$.ajax
				({
            
            		type: "POST",
            		cache: false,
					dataType: "json",
					data: data,
					processData: false,
					contentType: false,
					url: url,  //这里是网址
					timeout:15000, //超时时间
					success:function(data)
					{
						console.log(data);
	          	  		callBack(data);	                
            		}, 
					error: function (err) 
					{
						console.log(err);
						callBack(err);
            		}
        		});
}