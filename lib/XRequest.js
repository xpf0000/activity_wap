
function XHttpGet(url,callBack)
{
	console.log(url);

	$$.getJSON(url, function(data){

		console.log(data);
		callBack(data);

	},function(eee){
			
			try
			{
				var data = JSON.parse(eee.responseText.toString().trim().replace("\xEF\xBB\xBF", ""));			
				console.log(data);
				callBack(data);
				
			}
			catch(a)
			{
				console.log(url);
				console.log(eee);
				callBack({});
			}

			

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
			
			try
			{
				var data = JSON.parse(eee.responseText.toString().trim().replace("\xEF\xBB\xBF", ""));
				
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
			catch(a)
			{
				console.log(eee);
				var toast = myApp.toast(eee.responseText.toString(), '', {});
				toast.show();
				callBack(false);
			}

			

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

function XHttpDo2(url,data,success,err,callBack)
{
	console.log(url);

	try
	{
		$$.post(url,data, function(data){

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

			try
			{
				var data = JSON.parse(eee.responseText.toString().trim().replace("\xEF\xBB\xBF", ""));
				
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
			catch(a)
			{
				console.log(eee);
				var toast = myApp.toast(eee.responseText.toString(), '', {});
				toast.show();
				callBack(false);
			}


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

	},function(e){

		try
			{
				var data = JSON.parse(e.responseText.toString().trim().replace("\xEF\xBB\xBF", ""));
			
				console.log(data);
				callBack(data);
				
			}
			catch(a)
			{
				console.log(e);
				callBack({});
			}

	});
}