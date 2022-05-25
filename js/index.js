showdown.setOption({ "ghCompatibleHeaderId": true, "parseImgDimensions": true, "strikethrough": true, "tables": true, "tablesHeaderId": true, "tasklists": true, "requireSpaceBeforeHeadingText": true })

function Web_getHTMLParameters() {
	if (typeof urlStr == "undefined") {
		var url = decodeURI(location.search);
	} else {
		var url = "?" + urlStr.split("?")[1];
	}
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		var strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
		}
	} else {
		return null;
	}
	return theRequest;
}


function createxmlHttpRequest() {
	if (window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP");
	} else if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	}
}

function convertData(data) {
	if (typeof data === 'object') {
		var convertResult = "";
		for (var c in data) {
			convertResult += c + "=" + data[c] + "&";
		}
		convertResult = convertResult.substring(0, convertResult.length - 1)
		return convertResult;
	} else {
		return data;
	}
}

function ajax() {
	var ajaxData = {
		type: (arguments[0].type || "GET").toUpperCase(),
		url: arguments[0].url || "",
		async: arguments[0].async || "true",
		data: arguments[0].data || null,
		dataType: arguments[0].dataType || "json",
		contentType: arguments[0].contentType || "application/x-www-form-urlencoded; charset=utf-8",
		beforeSend: arguments[0].beforeSend || function () { },
		success: arguments[0].success || function () { },
		error: arguments[0].error || function () { }
	}

	ajaxData.beforeSend()
	var xhr = createxmlHttpRequest();
	xhr.responseType = ajaxData.dataType;
	xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
	xhr.setRequestHeader("Content-Type", ajaxData.contentType);
	xhr.send(convertData(ajaxData.data));

	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				ajaxData.success(xhr.response)
			} else {
				ajaxData.error()
			}
		}
	}
}

var converter = new showdown.Converter();

function Web_loadJSONConfiguration(data, type) {
	switch (type) {
		case "json":
			{

				JSONData = JSON.parse(data);
				if (JSONData === null) {
					JSONData = JSON.parse('{"type":"markdown","direction":"index.md"}');
				}
				console.log(JSONData.type)
				switch (JSONData.type) {
					case "markdown":
						{
							ajax({
								url: "./data/" + JSONData["direction"],
								dataType: "text",
								success: function (data) {

									main.innerHTML = converter.makeHtml(data);

									hljs.highlightAll();
								}
							})
							break;
						}
					case "code":
						{
							let result = ""
							for (let i=0;i<JSONData["direction"].length;i++) {
								
								ajax({
									dataType: "text",
									url: "data/" + JSONData["direction"][i],
									success: function (data) {


										var dirPath = JSONData["direction"][i].split("/");
										var fileName = dirPath[dirPath.length - 1];
										var list = fileName.split(".");
										var type = "";
										switch (list[list.length - 1]) {
											case "c":
												type = "c";
												break;
											case "c++":
												type = "cpp";
												break;
											case "html":
												type = "html";
												break;
											case "js":
												type = "javascript";
												break;
											case "css":
												type = "css";
												break;
											case "java":
												type = "java";
												break;
											case "py":
												type = "python";
												break;
											case "json":
												type = "json";
												break;
											case "xml":
												type = "xml";
												break;
											case "r":
												type = "r";
												break;
											default:
												type = "text";
												break;
										}
										
										result += fileName + "\n\n" + "```" + type + "\n" + data + "\n\n```" + "\n\n";

										main.innerHTML = converter.makeHtml(result);
										hljs.highlightAll();


									}
								})
							}
							break;
						}
					case "list":
						{

							var str = "# " + JSONData.title + "\n";
							console.log(str);
							for (var i in JSONData.series) {
								str += "[" + i + "](index.html?navigation=" + JSONData.series[i]['navigation'] + "&type=" + JSONData.series[i]['type'] + ")\n";
								console.log(str)
							}

							main.innerHTML = converter.makeHtml(str);
							break;
						}
				}
				break;
			}
		case "md":
			{

				main.innerHTML = converter.makeHtml(data);

				hljs.highlightAll();
				break;
			}
	}

}

window.onload = function () {
	$GLOBAL_PARAMETERS = Web_getHTMLParameters()
	if ($GLOBAL_PARAMETERS === null) { $GLOBAL_PARAMETERS = { navigation: "index", type: "json" } }
	console.log($GLOBAL_PARAMETERS.navigation + "." + $GLOBAL_PARAMETERS.type)
	ajax({
		url: 'data/' + $GLOBAL_PARAMETERS.navigation + "." + $GLOBAL_PARAMETERS.type,
		dataType: "text",
		success: function (data) { Web_loadJSONConfiguration(data, $GLOBAL_PARAMETERS.type) },
		error: function () { main.innerHTML = '<center><font size="20px">404 Not Found</font><br /><a href="javascript:window.history.go(-1)">返回上一页</a></center>' }
	})
}