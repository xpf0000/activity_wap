
function XHttpGet(url,callBack)
{
	console.log(url);

	$$.getJSON(url, function(data){

		console.log(data);
		callBack(data);

	});

}

function XHttpDo(url,success,err,callBack)
{
	console.log(url);

	try
	{
		$$.getJSON(url, function(data){

			try{

				var code = data.data.code;
				var msg = data.data.msg;
				msg = msg == null || msg == undefined || msg == "" ? err : msg;
				if(code == 0)
				{
					var toast = myApp.toast(success, '', {});
					toast.show();
					callBack(true);

					return;
				}

				var toast = myApp.toast(msg, '', {});
				toast.show();
				callBack(false);

			}
			catch (e)
			{
				console.log(e);
				var toast = myApp.toast(e.toString(), '', {});
				toast.show();
				callBack(false);
			}

		},function(eee){

			console.log(eee);
			var toast = myApp.toast(eee.responseText.toString(), '', {});
			toast.show();
			callBack(false);

		});

	}
	catch (err)
	{
		console.log(err);
		var toast = myApp.toast(err.toString(), '', {});
		toast.show();
		callBack(false);
	}


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