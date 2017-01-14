/**
 * Created by Administrator on 2017/1/4 0004.
 */
(function () {

    'use strict';

    window.XImageUpload = function (params){
        var app = this;
        app.version = '1.0.0';

        //    用于压缩图片的canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext('2d');

        //    瓦片canvas
        var tCanvas = document.createElement("canvas");
        var tctx = tCanvas.getContext("2d");

        app.params = {

            file:{},
            chooseBlock:function(){},
            upBlock:function(){},
            src:[],
            datas:[],
            upBody:{},
            url:'',
            maxsize : 100 * 1024,
            count:0,

        };

        for (var param in params) {
            app.params[param] = params[param];
        };

        app.upLoad  = function(event)
        {

            var files = event.target.files;

            if (!files.length) return;

            var files = Array.prototype.slice.call(files);

            if (files.length > 9) {
                app.params.upBlock(null,"最多同时只可上传9张图片");

                var toast = myApp.toast("最多同时只可上传9张图片", '', {});
                toast.show();

                return;
            }

            app.params.count = files.length;

            files.forEach(function(file, i) {
                if (!/\/(?:jpeg|png|gif)/i.test(file.type)) return;

                var reader = new FileReader();

                reader.onload = function() {
                    var result = this.result;
                    var img = new Image();
                    img.src = result;
                    app.params.src.push(result);

                    //如果图片大小小于100kb，则直接上传
                    if (result.length <= app.params.maxsize) {
                        img = null;

                        handleBlob(result, file.type);

                        return;
                    }

//      图片加载完毕之后进行压缩，然后上传
                    if (img.complete) {
                        callback();
                    } else {
                        img.onload = callback;
                    }

                    function callback() {
                        var data = compress(img);

                        handleBlob(data, file.type);

                        img = null;
                    }

                };

                reader.readAsDataURL(file);
            })


        };



        //    使用canvas对大图片进行压缩
        function compress(img) {
            var initSize = img.src.length;
            var width = img.width;
            var height = img.height;

            //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
            var ratio;
            if ((ratio = width * height / 4000000) > 1) {
                ratio = Math.sqrt(ratio);
                width /= ratio;
                height /= ratio;
            } else {
                ratio = 1;
            }

            canvas.width = width;
            canvas.height = height;

//        铺底色
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            //如果图片像素大于100万则使用瓦片绘制
            var count;
            if ((count = width * height / 1000000) > 1) {
                count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片

//            计算每块瓦片的宽和高
                var nw = ~~(width / count);
                var nh = ~~(height / count);

                tCanvas.width = nw;
                tCanvas.height = nh;

                for (var i = 0; i < count; i++) {
                    for (var j = 0; j < count; j++) {
                        tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);

                        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                    }
                }
            } else {
                ctx.drawImage(img, 0, 0, width, height);
            }

            //进行最小压缩
            var ndata = canvas.toDataURL('image/jpeg', 0.1);

            console.log('压缩前：' + initSize);
            console.log('压缩后：' + ndata.length);
            console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");

            tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;

            return ndata;
        };



        //    图片上传，将base64的图片转成二进制对象，塞进formdata上传
        function handleBlob(basestr, type) {

            var text = window.atob(basestr.split(",")[1]);
            var buffer = new Uint8Array(text.length);

            for (var i = 0; i < text.length; i++) {
                buffer[i] = text.charCodeAt(i);
            }

            var blob = getBlob([buffer], type);

            app.params.datas.push(blob);

            if(app.params.datas.length == app.params.count)
            {
                doUpload();
            }


        }

        function doUpload()
        {
            var xhr = new XMLHttpRequest();

            var formdata = getFormData();

            for(var i=0;i<app.params.datas.length;i++)
            {
                formdata.append('file[]', app.params.datas[i],'upload'+i+'.jpg');
            }
            
            console.log(app.params.url);
            console.log(app.params.upBody)

            for (var param in app.params.upBody) {
	            
	            console.log(param);
	            console.log(app.params.upBody[param]);
	            
                formdata.append(param, app.params.upBody[param]);
            };


            xhr.open('post', app.params.url);

            xhr.onload = function () {
                //如果请求成功
                if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
             
                    var jsonData = JSON.parse(xhr.responseText.trim().replace("\xEF\xBB\xBF", ""));
                    
                    console.log(jsonData)
                    
                    app.params.upBlock(jsonData,null);
                }
                else
                {
                    app.params.upBlock(null,xhr.responseText);
                }
            }

            //数据发送进度
            xhr.upload.addEventListener('progress', function(e) {

                var pecent = ~~(100 * e.loaded / e.total);
                console.log("上传进度： "+pecent);

            }, false);

            xhr.send(formdata);
        }

        /**
         * 获取blob对象的兼容性写法
         * @param buffer
         * @param format
         * @returns {*}
         */
        function getBlob(buffer, format) {
            try {
                return new Blob(buffer, {type: format});
            } catch (e) {
                var bb = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
                buffer.forEach(function(buf) {
                    bb.append(buf);
                });
                return bb.getBlob(format);
            }
        }

        /**
         * 获取formdata
         */
        function getFormData() {
            var isNeedShim = ~navigator.userAgent.indexOf('Android')
                && ~navigator.vendor.indexOf('Google')
                && !~navigator.userAgent.indexOf('Chrome')
                && navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534;

            return isNeedShim ? new FormDataShim() : new FormData()
        }

        /**
         * formdata 补丁, 给不支持formdata上传blob的android机打补丁
         * @constructor
         */
        function FormDataShim() {
            console.warn('using formdata shim');

            var o = this,
                parts = [],
                boundary = Array(21).join('-') + (+new Date() * (1e16 * Math.random())).toString(36),
                oldSend = XMLHttpRequest.prototype.send;

            this.append = function(name, value, filename) {
                parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"');

                if (value instanceof Blob) {
                    parts.push('; filename="' + (filename || 'blob') + '"\r\nContent-Type: ' + value.type + '\r\n\r\n');
                    parts.push(value);
                }
                else {
                    parts.push('\r\n\r\n' + value);
                }
                parts.push('\r\n');
            };

            // Override XHR send()
            XMLHttpRequest.prototype.send = function(val) {
                var fr,
                    data,
                    oXHR = this;

                if (val === o) {
                    // Append the final boundary string
                    parts.push('--' + boundary + '--\r\n');

                    // Create the blob
                    data = getBlob(parts);

                    // Set up and read the blob into an array to be sent
                    fr = new FileReader();
                    fr.onload = function() {
                        oldSend.call(oXHR, fr.result);
                    };
                    fr.onerror = function(err) {
                        throw err;
                    };
                    fr.readAsArrayBuffer(data);

                    // Set the multipart content type and boudary
                    this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
                    XMLHttpRequest.prototype.send = oldSend;
                }
                else {
                    oldSend.call(this, val);
                }
            };
        }



        return app;

    };


})();