
function XHttpGet(url,callBack)
{

	console.log(url);

	$$.getJSON(url, function(data){

		console.log(data);
		callBack(data);

	});

}

function XHttpUpload(url,data,callBack)
{
	console.log(url);
	console.log(data);

	$$.post(url,data,function(d){

		console.log(d);

		callBack(d);

	});
}