
function XHttpGet(url,callBack)
{

	console.log(url);

	$$.getJSON(url, function(data){

		callBack(data);

	});

}



//function XHttpUpload(url,data,callBack)
//{
//
//	console.log(data);
//
//	$.support.cors = true;
//
//				$.ajax
//				({
//
//            		type: "POST",
//            		cache: false,
//					dataType: "json",
//					data: data,
//					processData: false,
//					contentType: false,
//					url: url,  //这里是网址
//					timeout:15000, //超时时间
//					success:function(data)
//					{
//						console.log(data);
//	          	  		callBack(data);
//            		},
//					error: function (err)
//					{
//						console.log(err);
//						callBack(err);
//            		}
//        		});
//}