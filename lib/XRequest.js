
function XHttpGet(url,callBack)
{

	console.log(url);

	$$.getJSON(url, function(data){

		callBack(data);

	});

}



function XHttpUpload(url,data,callBack)
{
	console.log(url);
	console.log(data);

	$$.post(url,data,function(d){

		callBack(d);

	});
}